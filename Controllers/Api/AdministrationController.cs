using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Security.Claims;

namespace EasyEdu.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "SuperAdmin,Admin")]
    public class AdministrationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdministrationController(ApplicationDbContext context)
        {
            _context = context;
        }

        private int CurrentCompanyId => int.TryParse(User.FindFirstValue("CompanyId"), out var id) ? id : 0;

        // --- Admission Queries ---
        [HttpGet("AdmissionQuery")]
        public async Task<IActionResult> GetAdmissionQueries()
        {
            var queries = await _context.AdmissionQueries
                .Where(q => CurrentCompanyId == 0 || q.CompanyId == CurrentCompanyId)
                .OrderByDescending(q => q.Date)
                .ToListAsync();
            return Ok(queries);
        }

        [HttpPost("AdmissionQuery")]
        public async Task<IActionResult> CreateAdmissionQuery([FromBody] AdmissionQuery query)
        {
            query.CompanyId = CurrentCompanyId == 0 ? 1 : CurrentCompanyId;
            query.Date = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc);
            _context.AdmissionQueries.Add(query);
            await _context.SaveChangesAsync();
            return Ok(new { success = true, id = query.Id });
        }

        [HttpDelete("AdmissionQuery/{id}")]
        public async Task<IActionResult> DeleteAdmissionQuery(int id)
        {
            var query = await _context.AdmissionQueries.FindAsync(id);
            if (query == null) return NotFound();
            _context.AdmissionQueries.Remove(query);
            await _context.SaveChangesAsync();
            return Ok(new { success = true });
        }

        // --- Visitor Book ---
        [HttpGet("VisitorBook")]
        public async Task<IActionResult> GetVisitors()
        {
            var visitors = await _context.VisitorBooks
                .Where(v => CurrentCompanyId == 0 || v.CompanyId == CurrentCompanyId)
                .OrderByDescending(v => v.Date)
                .ToListAsync();
            return Ok(visitors);
        }

        [HttpPost("VisitorBook")]
        public async Task<IActionResult> CreateVisitorRecord([FromBody] VisitorBook visitor)
        {
            visitor.CompanyId = CurrentCompanyId == 0 ? 1 : CurrentCompanyId;
            visitor.Date = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc);
            _context.VisitorBooks.Add(visitor);
            await _context.SaveChangesAsync();
            return Ok(new { success = true, id = visitor.Id });
        }

        [HttpDelete("VisitorBook/{id}")]
        public async Task<IActionResult> DeleteVisitor(int id)
        {
            var visitor = await _context.VisitorBooks.FindAsync(id);
            if (visitor == null) return NotFound();
            _context.VisitorBooks.Remove(visitor);
            await _context.SaveChangesAsync();
            return Ok(new { success = true });
        }

        // --- Complaints ---
        [HttpGet("Complaint")]
        public async Task<IActionResult> GetComplaints()
        {
            var complaints = await _context.Complaints
                .Where(c => CurrentCompanyId == 0 || c.CompanyId == CurrentCompanyId)
                .OrderByDescending(c => c.Date)
                .ToListAsync();
            return Ok(complaints);
        }

        [HttpPost("Complaint")]
        public async Task<IActionResult> CreateComplaint([FromBody] Complaint complaint)
        {
            complaint.CompanyId = CurrentCompanyId == 0 ? 1 : CurrentCompanyId;
            complaint.Date = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc);
            _context.Complaints.Add(complaint);
            await _context.SaveChangesAsync();
            return Ok(new { success = true, id = complaint.Id });
        }

        [HttpDelete("Complaint/{id}")]
        public async Task<IActionResult> DeleteComplaint(int id)
        {
            var complaint = await _context.Complaints.FindAsync(id);
            if (complaint == null) return NotFound();
            _context.Complaints.Remove(complaint);
            await _context.SaveChangesAsync();
            return Ok(new { success = true });
        }

        // --- Postal Logs ---
        [HttpGet("PostalLog")]
        public async Task<IActionResult> GetPostalLogs(string type = "Receive")
        {
            var logs = await _context.PostalLogs
                .Where(l => (CurrentCompanyId == 0 || l.CompanyId == CurrentCompanyId) && l.Type == type)
                .OrderByDescending(l => l.Date)
                .ToListAsync();
            return Ok(logs);
        }

        [HttpPost("PostalLog")]
        public async Task<IActionResult> CreatePostalLog([FromBody] PostalLog log)
        {
            log.CompanyId = CurrentCompanyId == 0 ? 1 : CurrentCompanyId;
            log.Date = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc);
            _context.PostalLogs.Add(log);
            await _context.SaveChangesAsync();
            return Ok(new { success = true, id = log.Id });
        }

        [HttpDelete("PostalLog/{id}")]
        public async Task<IActionResult> DeletePostalLog(int id)
        {
            var log = await _context.PostalLogs.FindAsync(id);
            if (log == null) return NotFound();
            _context.PostalLogs.Remove(log);
            await _context.SaveChangesAsync();
            return Ok(new { success = true });
        }

        // --- Certificates ---
        [HttpGet("Certificates")]
        public async Task<IActionResult> GetCertificates()
        {
            var certificates = await _context.Certificates
                .Include(c => c.Student)
                .OrderByDescending(c => c.IssueDate)
                .ToListAsync();
            return Ok(certificates);
        }
    }
}

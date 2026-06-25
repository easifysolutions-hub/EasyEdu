using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Security.Claims;
using System.Linq;

namespace EasyEdu.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ExamsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ExamsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetExams()
        {
            var companyIdClaim = User.Claims.FirstOrDefault(c => c.Type == "CompanyId")?.Value;
            int? companyId = string.IsNullOrEmpty(companyIdClaim) ? null : int.Parse(companyIdClaim);

            var query = _context.Examinations
                .Include(e => e.AcademicYear)
                .AsQueryable();

            if (companyId.HasValue)
            {
                query = query.Where(e => e.AcademicYear.CompanyId == companyId);
            }

            var exams = await query
                .OrderByDescending(e => e.StartDate)
                .Take(50)
                .Select(e => new
                {
                    id = e.Id,
                    name = e.Name,
                    description = e.Description,
                    startDate = e.StartDate.ToString("MMM dd, yyyy"),
                    endDate = e.EndDate.ToString("MMM dd, yyyy"),
                    isActive = e.IsActive,
                    academicYear = e.AcademicYear.Name,
                    marksCount = _context.Marks.Count(m => m.ExaminationId == e.Id),
                    status = (e.EndDate < DateTime.Now) ? "Completed" : (e.StartDate > DateTime.Now ? "Upcoming" : "Ongoing")
                })
                .ToListAsync();

            return Ok(exams);
        }
    }
}

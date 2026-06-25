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
    public class HomeworkController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public HomeworkController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetHomeworks()
        {
            var companyIdClaim = User.Claims.FirstOrDefault(c => c.Type == "CompanyId")?.Value;
            int? companyId = string.IsNullOrEmpty(companyIdClaim) ? null : int.Parse(companyIdClaim);

            var query = _context.Homeworks
                .Include(h => h.Class)
                .Include(h => h.Subject)
                .AsQueryable();

            if (companyId.HasValue)
            {
                // Homework relies on Class, and Class has CompanyId
                query = query.Where(h => h.Class.CompanyId == companyId);
            }

            var homeworks = await query
                .OrderByDescending(h => h.AssignDate)
                .Take(50)
                .Select(h => new
                {
                    id = h.Id,
                    title = h.Title,
                    description = h.Description,
                    subjectName = h.Subject != null ? h.Subject.Name : "N/A",
                    className = h.Class != null ? h.Class.Name : "N/A",
                    assignDate = h.AssignDate.ToString("MMM dd, yyyy"),
                    submissionDate = h.SubmissionDate.ToString("MMM dd, yyyy"),
                    isOverdue = h.SubmissionDate < DateTime.Now,
                    color = h.SubmissionDate < DateTime.Now ? "#EF4444" : "#10B981"
                })
                .ToListAsync();

            return Ok(homeworks);
        }
    }
}

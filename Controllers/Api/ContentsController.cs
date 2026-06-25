using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Security.Claims;

namespace EasyEdu.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ContentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ContentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetContents(string? type)
        {
            var companyIdClaim = User.Claims.FirstOrDefault(c => c.Type == "CompanyId")?.Value;
            int? companyId = string.IsNullOrEmpty(companyIdClaim) ? null : int.Parse(companyIdClaim);

            var query = _context.StudyMaterials
                .Include(s => s.Class)
                .Include(s => s.Subject)
                .AsQueryable();

            if (companyId.HasValue)
            {
                query = query.Where(s => s.Class.CompanyId == companyId);
            }

            if (!string.IsNullOrEmpty(type))
            {
                query = query.Where(s => s.Type == type);
            }

            var contents = await query
                .OrderByDescending(s => s.UploadDate)
                .Select(s => new {
                    s.Id,
                    s.Title,
                    s.Type,
                    className = s.Class != null ? s.Class.Name : "All",
                    subjectName = s.Subject != null ? s.Subject.Name : "General",
                    s.FilePath,
                    s.FileExtension,
                    uploadDate = s.UploadDate.ToString("MMM dd, yyyy"),
                    s.Description
                })
                .ToListAsync();

            return Ok(contents);
        }

        [HttpGet("types")]
        public IActionResult GetTypes()
        {
            var types = new[] { "Assignment", "Syllabus", "Video", "Other" };
            return Ok(types);
        }
    }
}

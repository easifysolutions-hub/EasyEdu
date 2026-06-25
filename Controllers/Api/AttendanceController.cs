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
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class AttendanceController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AttendanceController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("classes")]
        public async Task<IActionResult> GetClasses()
        {
            var companyIdClaim = User.Claims.FirstOrDefault(c => c.Type == "CompanyId")?.Value;
            int? companyId = string.IsNullOrEmpty(companyIdClaim) ? null : int.Parse(companyIdClaim);

            var query = _context.ClassSections
                .Include(cs => cs.Class)
                .Include(cs => cs.Section)
                .AsQueryable();

            if (companyId.HasValue)
            {
                query = query.Where(cs => cs.Class.CompanyId == companyId);
            }

            var classSections = await query
                .Select(cs => new
                {
                    classId = cs.ClassId,
                    sectionId = cs.SectionId,
                    className = cs.Class.Name,
                    sectionName = cs.Section.Name,
                    displayName = $"{cs.Class.Name} - {cs.Section.Name}"
                })
                .OrderBy(c => c.className).ThenBy(c => c.sectionName)
                .ToListAsync();

            return Ok(classSections);
        }

        [HttpGet("students")]
        public async Task<IActionResult> GetStudents(int classId, int sectionId, DateTime date)
        {
            var companyIdClaim = User.Claims.FirstOrDefault(c => c.Type == "CompanyId")?.Value;
            int? companyId = string.IsNullOrEmpty(companyIdClaim) ? null : int.Parse(companyIdClaim);

            var query = _context.Students.Where(s => s.ClassId == classId && s.SectionId == sectionId);

            if (companyId.HasValue)
            {
                query = query.Where(s => s.CompanyId == companyId);
            }

            var students = await query
                .OrderBy(s => s.RollNumber).ThenBy(s => s.FirstName)
                .Select(s => new
                {
                    id = s.Id,
                    name = s.FullName,
                    roll = s.RollNumber != null ? s.RollNumber.ToString() : "N/A"
                })
                .ToListAsync();

            var studentIds = students.Select(s => s.id).ToList();
            var attendances = await _context.Attendances
                .Where(a => studentIds.Contains(a.StudentId) && a.Date.Date == date.Date)
                .ToDictionaryAsync(a => a.StudentId, a => a.Status);

            var result = students.Select(s => new
            {
                s.id,
                s.name,
                s.roll,
                status = attendances.ContainsKey(s.id) ? attendances[s.id] : "Not Marked"
            });

            return Ok(result);
        }

        public class MarkAttendanceRequest
        {
            public int ClassId { get; set; }
            public int SectionId { get; set; }
            public DateTime Date { get; set; }
            public List<StudentAttendanceInfo> Attendances { get; set; } = new List<StudentAttendanceInfo>();
        }

        public class StudentAttendanceInfo
        {
            public int StudentId { get; set; }
            public string Status { get; set; } = string.Empty;
        }

        [HttpPost("mark")]
        public async Task<IActionResult> MarkAttendance([FromBody] MarkAttendanceRequest request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var studentIds = request.Attendances.Select(a => a.StudentId).ToList();
            var existingAttendances = await _context.Attendances
                .Where(a => studentIds.Contains(a.StudentId) && a.Date.Date == request.Date.Date)
                .ToDictionaryAsync(a => a.StudentId, a => a);

            foreach (var attInfo in request.Attendances)
            {
                if (existingAttendances.TryGetValue(attInfo.StudentId, out var existing))
                {
                    existing.Status = attInfo.Status;
                    existing.MarkedBy = userId;
                }
                else
                {
                    _context.Attendances.Add(new Attendance
                    {
                        StudentId = attInfo.StudentId,
                        Date = request.Date.Date,
                        Status = attInfo.Status,
                        AttendanceMethod = "Mobile App",
                        MarkedBy = userId
                    });
                }
            }

            await _context.SaveChangesAsync();

            return Ok(new { success = true, message = "Attendance marked successfully" });
        }
    }
}

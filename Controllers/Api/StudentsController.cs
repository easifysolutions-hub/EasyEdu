using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Security.Claims;

namespace EasyEdu.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class StudentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public StudentsController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetStudents(string? searchQuery)
        {
            var companyIdClaim = User.Claims.FirstOrDefault(c => c.Type == "CompanyId")?.Value;
            int? companyId = string.IsNullOrEmpty(companyIdClaim) ? null : int.Parse(companyIdClaim);

            var query = _context.Students
                .Include(s => s.Class)
                .Include(s => s.Section)
                .AsQueryable();

            if (companyId.HasValue)
            {
                query = query.Where(s => s.CompanyId == companyId);
            }

            // User-wise restriction
            if (!User.IsInRole("SuperAdmin") && !User.IsInRole("Admin") && !User.IsInRole("Teacher") && !User.IsInRole("Accountant"))
            {
                // Regular users (Students/Parents) only see their own record
                var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                query = query.Where(s => s.UserId == currentUserId);
            }

            if (!string.IsNullOrEmpty(searchQuery))
            {
                query = query.Where(s => s.FirstName.Contains(searchQuery) ||
                                         s.LastName.Contains(searchQuery) ||
                                         s.AdmissionNumber.Contains(searchQuery));
            }

            var students = await query
                .OrderBy(s => s.FirstName)
                .Take(50) // limit for mobile
                .Select(s => new {
                    id = s.Id,
                    name = s.FullName,
                    roll = s.RollNumber != null ? s.RollNumber.ToString() : "N/A",
                    className = s.Class != null ? $"{s.Class.Name} - {s.Section.Name}" : "N/A",
                    admissionNumber = s.AdmissionNumber
                })
                .ToListAsync();

            return Ok(students);
        }

        [HttpPost]
        [Authorize(Roles = "SuperAdmin,Admin")]
        public async Task<IActionResult> CreateStudent([FromBody] CreateStudentRequest request)
        {
            var companyIdClaim = User.Claims.FirstOrDefault(c => c.Type == "CompanyId")?.Value;
            if (string.IsNullOrEmpty(companyIdClaim)) return BadRequest("Institution context not found.");
            int companyId = int.Parse(companyIdClaim);

            var lastStudent = await _context.Students.OrderByDescending(s => s.Id).FirstOrDefaultAsync();
            int nextId = (lastStudent?.Id ?? 0) + 1;
            string admissionNo = "ADM-" + nextId.ToString("D4");

            var student = new Student
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                AdmissionNumber = admissionNo,
                ClassId = request.ClassId,
                SectionId = request.SectionId,
                AdmissionDate = DateTime.Today,
                Email = request.Email,
                Phone = request.Phone,
                Gender = request.Gender,
                DateOfBirth = request.DateOfBirth,
                CompanyId = companyId,
                CreatedAt = DateTime.UtcNow,
                IsActive = true
            };

            _context.Students.Add(student);
            await _context.SaveChangesAsync();

            return Ok(new { success = true, studentId = student.Id, admissionNumber = student.AdmissionNumber });
        }
    }

    public class CreateStudentRequest
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public int ClassId { get; set; }
        public int SectionId { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string Gender { get; set; } = "Male";
        public DateTime DateOfBirth { get; set; }
    }
}

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
    public class StaffController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public StaffController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetStaff()
        {
            var companyIdClaim = User.Claims.FirstOrDefault(c => c.Type == "CompanyId")?.Value;
            int? companyId = string.IsNullOrEmpty(companyIdClaim) ? null : int.Parse(companyIdClaim);

            var query = _context.Teachers
                .Include(t => t.Department)
                .Include(t => t.Designation)
                .AsQueryable();

            if (companyId.HasValue)
            {
                query = query.Where(t => t.CompanyId == companyId);
            }

            // User-wise restriction
            if (!User.IsInRole("SuperAdmin") && !User.IsInRole("Admin"))
            {
                var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                query = query.Where(t => t.UserId == currentUserId);
            }

            var staff = await query
                .OrderBy(t => t.FirstName)
                .Select(t => new {
                    id = t.Id,
                    name = t.FullName,
                    department = t.Department != null ? t.Department.Name : "N/A",
                    designation = t.Designation != null ? t.Designation.Title : "N/A",
                    phone = t.Phone,
                    email = t.Email,
                    staffId = t.EmployeeNumber ?? "N/A",
                    status = "Active" // Default for now
                })
                .ToListAsync();

            return Ok(staff);
        }

        [HttpPost]
        [Authorize(Roles = "SuperAdmin,Admin")]
        public async Task<IActionResult> CreateStaff([FromBody] CreateStaffRequest request)
        {
            var companyIdClaim = User.Claims.FirstOrDefault(c => c.Type == "CompanyId")?.Value;
            if (string.IsNullOrEmpty(companyIdClaim)) return BadRequest("Institution context not found.");
            int companyId = int.Parse(companyIdClaim);

            var staff = new Teacher
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                EmployeeNumber = "STF-" + DateTime.Now.Ticks.ToString().Substring(12),
                Email = request.Email,
                Phone = request.Phone,
                Gender = request.Gender,
                DateOfBirth = request.DateOfBirth,
                JoiningDate = DateTime.Today,
                DepartmentId = request.DepartmentId,
                DesignationId = request.DesignationId,
                CompanyId = companyId,
                CreatedAt = DateTime.UtcNow,
                IsActive = true
            };

            _context.Teachers.Add(staff);
            await _context.SaveChangesAsync();

            return Ok(new { success = true, id = staff.Id, staffId = staff.EmployeeNumber });
        }

        [HttpGet("meta")]
        public async Task<IActionResult> GetMeta()
        {
            var companyIdClaim = User.Claims.FirstOrDefault(c => c.Type == "CompanyId")?.Value;
            int? companyId = string.IsNullOrEmpty(companyIdClaim) ? null : int.Parse(companyIdClaim);

            var departments = await _context.Departments
                .Where(d => !companyId.HasValue || d.CompanyId == companyId)
                .Select(d => new { d.Id, d.Name })
                .ToListAsync();

            var designations = await _context.Designations
                .Where(d => !companyId.HasValue || d.CompanyId == companyId)
                .Select(d => new { d.Id, title = d.Title })
                .ToListAsync();

            return Ok(new { departments, designations });
        }
    }

    public class CreateStaffRequest
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Gender { get; set; } = "Male";
        public DateTime DateOfBirth { get; set; }
        public int DepartmentId { get; set; }
        public int DesignationId { get; set; }
    }
}

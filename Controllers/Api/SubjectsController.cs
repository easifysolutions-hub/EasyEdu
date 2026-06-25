using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using EasyEdu.Models;

namespace EasyEdu.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class SubjectsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public SubjectsController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetSubjects()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var user = await _userManager.Users
                .Include(u => u.Student)
                .Include(u => u.Teacher)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null) return NotFound();

            var query = _context.Subjects
                .Include(s => s.Teacher)
                .AsQueryable();

            if (user.Student != null)
            {
                query = query.Where(s => s.ClassId == user.Student.ClassId);
            }
            else if (user.Teacher != null)
            {
                query = query.Where(s => s.TeacherId == user.Teacher.Id);
            }
            else if (user.CompanyId.HasValue)
            {
                query = query.Where(s => s.Class.CompanyId == user.CompanyId);
            }

            var subjects = await query
                .Select(s => new
                {
                    id = s.Id,
                    name = s.Name,
                    code = s.Code,
                    description = s.Description,
                    credits = s.Credits,
                    type = s.Type,
                    teacherName = s.Teacher != null ? s.Teacher.FullName : "N/A"
                })
                .ToListAsync();

            return Ok(subjects);
        }
    }
}

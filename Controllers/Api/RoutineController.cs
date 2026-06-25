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
    public class RoutineController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public RoutineController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetRoutine()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var user = await _userManager.Users
                .Include(u => u.Student)
                .Include(u => u.Teacher)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null) return NotFound();

            var query = _context.TimeTables
                .Include(t => t.Subject)
                .Include(t => t.Teacher)
                .Include(t => t.ClassRoom)
                .AsQueryable();

            if (user.Student != null)
            {
                query = query.Where(t => t.ClassId == user.Student.ClassId && t.SectionId == user.Student.SectionId);
            }
            else if (user.Teacher != null)
            {
                query = query.Where(t => t.TeacherId == user.Teacher.Id);
            }
            // For admins or other roles, we can simply restrict it to their CompanyId if needed
            else if (user.CompanyId.HasValue)
            {
                query = query.Where(t => t.Class.CompanyId == user.CompanyId);
            }

            var routines = await query
                .OrderBy(t => t.StartTime)
                .Select(t => new
                {
                    id = t.Id,
                    dayOfWeek = t.DayOfWeek,
                    startTime = t.StartTime.ToString(@"hh\:mm"),
                    endTime = t.EndTime.ToString(@"hh\:mm"),
                    subjectName = t.Subject != null ? t.Subject.Name : "N/A",
                    teacherName = t.Teacher != null ? t.Teacher.FullName : "N/A",
                    roomName = t.ClassRoom != null ? t.ClassRoom.RoomNo : "N/A",
                    isActive = t.IsActive
                })
                .ToListAsync();

            // Group by Day of Week
            var groupedRoutine = routines
                .GroupBy(r => r.dayOfWeek)
                .Select(g => new
                {
                    day = g.Key,
                    classes = g.ToList()
                })
                .ToList();

            return Ok(groupedRoutine);
        }
    }
}

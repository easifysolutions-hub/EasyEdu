using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;
using System.Security.Claims;

namespace EasyEdu.Controllers
{
    [Authorize]
    public class DashboardController : Controller
    {
        private readonly ApplicationDbContext _context;

        public DashboardController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            if (User.IsInRole("SuperAdmin") || User.IsInRole("Admin"))
            {
                return RedirectToAction("Index", "Administration");
            }

            if (User.IsInRole("Teacher"))
            {
                return RedirectToAction(nameof(TeacherDashboard));
            }

            if (User.IsInRole("Student"))
            {
                return RedirectToAction(nameof(StudentDashboard));
            }

            if (User.IsInRole("Parent"))
            {
                return RedirectToAction(nameof(ParentDashboard));
            }

            // Default for other staff
            return RedirectToAction(nameof(StaffDashboard));
        }

        public async Task<IActionResult> TeacherDashboard()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            // Add teacher specific stats here - fetching some data to satisfy async requirement
            var studentCount = await _context.Students.CountAsync();
            ViewBag.StudentCount = studentCount;
            return View();
        }

        public async Task<IActionResult> StudentDashboard()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            // Add student specific stats here
            var noticeCount = await _context.Notices.CountAsync();
            ViewBag.NoticeCount = noticeCount;
            return View();
        }

        public async Task<IActionResult> ParentDashboard()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            // Add parent specific stats here
            var eventCount = await _context.CalendarEvents.CountAsync();
            ViewBag.EventCount = eventCount;
            return View();
        }

        public async Task<IActionResult> StaffDashboard()
        {
            // Add staff specific stats here
            var staffCount = await _context.Teachers.CountAsync();
            ViewBag.StaffCount = staffCount;
            return View();
        }
    }
}

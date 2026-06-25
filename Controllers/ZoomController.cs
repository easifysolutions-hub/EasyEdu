using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;
using System.Security.Claims;

namespace EasyEdu.Controllers
{
    [Authorize(Roles = "SuperAdmin,Admin,Teacher")]
    public class ZoomController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ZoomController(ApplicationDbContext context)
        {
            _context = context;
        }

        private async Task<int> GetCompanyId()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _context.Users.FindAsync(userId);
            return user?.CompanyId ?? 1;
        }

        public async Task<IActionResult> Index()
        {
            var companyId = await GetCompanyId();
            var classes = await _context.ZoomVirtualClasses
                .Include(c => c.Class)
                .Include(c => c.Section)
                .Include(c => c.Subject)
                .Where(c => c.CompanyId == companyId)
                .OrderByDescending(c => c.Date)
                .Take(10)
                .ToListAsync();

            var meetings = await _context.ZoomVirtualMeetings
                .Where(m => m.CompanyId == companyId)
                .OrderByDescending(m => m.Date)
                .Take(10)
                .ToListAsync();

            ViewBag.MeetingsCount = await _context.ZoomVirtualMeetings.CountAsync(m => m.CompanyId == companyId);
            ViewBag.ClassesCount = await _context.ZoomVirtualClasses.CountAsync(c => c.CompanyId == companyId);

            return View(new ZoomDashboardViewModel { 
                RecentClasses = classes, 
                RecentMeetings = meetings 
            });
        }

        // --- Virtual Class ---
        public async Task<IActionResult> VirtualClass()
        {
            var companyId = await GetCompanyId();
            var classes = await _context.ZoomVirtualClasses
                .Include(c => c.Class)
                .Include(c => c.Section)
                .Include(c => c.Subject)
                .Where(c => c.CompanyId == companyId)
                .ToListAsync();
            
            ViewBag.Classes = await _context.Classes.Where(c => c.CompanyId == companyId).ToListAsync();
            ViewBag.Sections = await _context.Sections.ToListAsync();
            ViewBag.Subjects = await _context.Subjects.ToListAsync();

            return View(classes);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SaveVirtualClass(ZoomVirtualClass model)
        {
            model.CompanyId = await GetCompanyId();
            if (model.Id > 0)
            {
                _context.ZoomVirtualClasses.Update(model);
            }
            else
            {
                model.Status = "Pending";
                model.MeetingId = new Random().Next(100000000, 999999999).ToString();
                model.Password = "Edu123";
                model.JoinUrl = "https://zoom.us/j/" + model.MeetingId;
                model.StartUrl = "https://zoom.us/j/" + model.MeetingId;
                _context.ZoomVirtualClasses.Add(model);
            }
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(VirtualClass));
        }

        // --- Virtual Meeting ---
        public async Task<IActionResult> VirtualMeeting()
        {
            var companyId = await GetCompanyId();
            var meetings = await _context.ZoomVirtualMeetings
                .Where(m => m.CompanyId == companyId)
                .ToListAsync();
            return View(meetings);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SaveVirtualMeeting(ZoomVirtualMeeting model)
        {
            model.CompanyId = await GetCompanyId();
            if (model.Id > 0)
            {
                _context.ZoomVirtualMeetings.Update(model);
            }
            else
            {
                model.Status = "Pending";
                model.MeetingId = new Random().Next(100000000, 999999999).ToString();
                model.Password = "Meet123";
                model.JoinUrl = "https://zoom.us/j/" + model.MeetingId;
                model.StartUrl = "https://zoom.us/j/" + model.MeetingId;
                _context.ZoomVirtualMeetings.Add(model);
            }
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(VirtualMeeting));
        }

        // --- Reports ---
        public async Task<IActionResult> ClassReports()
        {
            var companyId = await GetCompanyId();
            var reports = await _context.ZoomVirtualClasses
                .Include(c => c.Class)
                .Include(c => c.Subject)
                .Where(c => c.CompanyId == companyId)
                .OrderByDescending(c => c.Date)
                .ToListAsync();
            return View(reports);
        }

        public async Task<IActionResult> MeetingReports()
        {
            var companyId = await GetCompanyId();
            var reports = await _context.ZoomVirtualMeetings
                .Where(m => m.CompanyId == companyId)
                .OrderByDescending(m => m.Date)
                .ToListAsync();
            return View(reports);
        }

        // --- Settings ---
        public async Task<IActionResult> Settings()
        {
            var companyId = await GetCompanyId();
            var settings = await _context.ZoomSettings.FirstOrDefaultAsync(s => s.CompanyId == companyId)
                           ?? new ZoomSetting { CompanyId = companyId };
            return View(settings);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SaveSettings(ZoomSetting settings)
        {
            var existing = await _context.ZoomSettings.FirstOrDefaultAsync(s => s.Id == settings.Id);
            if (existing != null) _context.Entry(existing).CurrentValues.SetValues(settings);
            else _context.ZoomSettings.Add(settings);
            await _context.SaveChangesAsync();
            TempData["Success"] = "Zoom API configuration updated successfully.";
            return RedirectToAction(nameof(Settings));
        }
    }

    public class ZoomDashboardViewModel {
        public List<ZoomVirtualClass> RecentClasses { get; set; } = new List<ZoomVirtualClass>();
        public List<ZoomVirtualMeeting> RecentMeetings { get; set; } = new List<ZoomVirtualMeeting>();
    }
}

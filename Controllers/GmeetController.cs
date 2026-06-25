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
    public class GmeetController : Controller
    {
        private readonly ApplicationDbContext _context;

        public GmeetController(ApplicationDbContext context)
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
            var classes = await _context.GmeetVirtualClasses
                .Include(c => c.Class).Include(c => c.Section).Include(c => c.Subject)
                .Where(c => c.CompanyId == companyId)
                .OrderByDescending(c => c.Date).Take(10).ToListAsync();

            var meetings = await _context.GmeetVirtualMeetings
                .Where(m => m.CompanyId == companyId)
                .OrderByDescending(m => m.Date).Take(10).ToListAsync();

            ViewBag.ClassCount = await _context.GmeetVirtualClasses.CountAsync(c => c.CompanyId == companyId);
            ViewBag.MeetingCount = await _context.GmeetVirtualMeetings.CountAsync(m => m.CompanyId == companyId);

            return View(new GmeetDashboardViewModel { RecentClasses = classes, RecentMeetings = meetings });
        }

        // --- Virtual Class ---
        public async Task<IActionResult> VirtualClass()
        {
            var companyId = await GetCompanyId();
            var classes = await _context.GmeetVirtualClasses
                .Include(c => c.Class).Include(c => c.Section).Include(c => c.Subject)
                .Where(c => c.CompanyId == companyId).ToListAsync();
            
            ViewBag.Classes = await _context.Classes.Where(c => c.CompanyId == companyId).ToListAsync();
            ViewBag.Sections = await _context.Sections.ToListAsync();
            ViewBag.Subjects = await _context.Subjects.ToListAsync();
            return View(classes);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SaveVirtualClass(GmeetVirtualClass model)
        {
            model.CompanyId = await GetCompanyId();
            if (string.IsNullOrEmpty(model.MeetUrl)) model.MeetUrl = "https://meet.google.com/" + Guid.NewGuid().ToString("N").Substring(0, 10);
            
            if (model.Id > 0) _context.GmeetVirtualClasses.Update(model);
            else _context.GmeetVirtualClasses.Add(model);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(VirtualClass));
        }

        // --- Virtual Meeting ---
        public async Task<IActionResult> VirtualMeeting()
        {
            var companyId = await GetCompanyId();
            var meetings = await _context.GmeetVirtualMeetings.Where(m => m.CompanyId == companyId).ToListAsync();
            return View(meetings);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SaveVirtualMeeting(GmeetVirtualMeeting model)
        {
            model.CompanyId = await GetCompanyId();
            if (string.IsNullOrEmpty(model.MeetUrl)) model.MeetUrl = "https://meet.google.com/" + Guid.NewGuid().ToString("N").Substring(0, 10);

            if (model.Id > 0) _context.GmeetVirtualMeetings.Update(model);
            else _context.GmeetVirtualMeetings.Add(model);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(VirtualMeeting));
        }

        // --- Reports ---
        public async Task<IActionResult> ClassReports()
        {
             var companyId = await GetCompanyId();
             var reports = await _context.GmeetVirtualClasses
                .Include(c => c.Class).Include(c => c.Subject)
                .Where(c => c.CompanyId == companyId).ToListAsync();
             return View(reports);
        }

        public async Task<IActionResult> MeetingReports()
        {
             var companyId = await GetCompanyId();
             var reports = await _context.GmeetVirtualMeetings
                .Where(m => m.CompanyId == companyId).ToListAsync();
             return View(reports);
        }

        // --- Settings ---
        public async Task<IActionResult> Settings()
        {
            var companyId = await GetCompanyId();
            var settings = await _context.GmeetSettings.FirstOrDefaultAsync(s => s.CompanyId == companyId)
                           ?? new GmeetSetting { CompanyId = companyId };
            return View(settings);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SaveSettings(GmeetSetting settings)
        {
            var companyId = await GetCompanyId();
            var existing = await _context.GmeetSettings.FirstOrDefaultAsync(s => s.CompanyId == companyId);
            if (existing != null) _context.Entry(existing).CurrentValues.SetValues(settings);
            else {
                settings.CompanyId = companyId;
                _context.GmeetSettings.Add(settings);
            }
            await _context.SaveChangesAsync();
            TempData["Success"] = "Google Meet API configuration updated.";
            return RedirectToAction(nameof(Settings));
        }
    }

    public class GmeetDashboardViewModel {
        public List<GmeetVirtualClass> RecentClasses { get; set; } = new List<GmeetVirtualClass>();
        public List<GmeetVirtualMeeting> RecentMeetings { get; set; } = new List<GmeetVirtualMeeting>();
    }
}

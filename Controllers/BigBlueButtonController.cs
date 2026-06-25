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
    public class BigBlueButtonController : Controller
    {
        private readonly ApplicationDbContext _context;

        public BigBlueButtonController(ApplicationDbContext context)
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
            var classes = await _context.BBBVirtualClasses
                .Include(c => c.Class).Include(c => c.Section).Include(c => c.Subject)
                .Where(c => c.CompanyId == companyId)
                .OrderByDescending(c => c.Date).Take(10).ToListAsync();

            var meetings = await _context.BBBVirtualMeetings
                .Where(m => m.CompanyId == companyId)
                .OrderByDescending(m => m.Date).Take(10).ToListAsync();

            ViewBag.ClassCount = await _context.BBBVirtualClasses.CountAsync(c => c.CompanyId == companyId);
            ViewBag.MeetingCount = await _context.BBBVirtualMeetings.CountAsync(m => m.CompanyId == companyId);
            ViewBag.RecordCount = await _context.BBBRecordings.CountAsync(r => r.CompanyId == companyId);

            return View(new BBBDashboardViewModel { RecentClasses = classes, RecentMeetings = meetings });
        }

        // --- Virtual Class ---
        public async Task<IActionResult> VirtualClass()
        {
            var companyId = await GetCompanyId();
            var classes = await _context.BBBVirtualClasses
                .Include(c => c.Class).Include(c => c.Section).Include(c => c.Subject)
                .Where(c => c.CompanyId == companyId).ToListAsync();
            
            ViewBag.Classes = await _context.Classes.Where(c => c.CompanyId == companyId).ToListAsync();
            ViewBag.Sections = await _context.Sections.ToListAsync();
            ViewBag.Subjects = await _context.Subjects.ToListAsync();
            return View(classes);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SaveVirtualClass(BBBVirtualClass model)
        {
            model.CompanyId = await GetCompanyId();
            model.MeetingId = string.IsNullOrEmpty(model.MeetingId) ? Guid.NewGuid().ToString("N").Substring(0, 10) : model.MeetingId;
            model.ModeratorPassword = string.IsNullOrEmpty(model.ModeratorPassword) ? "mod123" : model.ModeratorPassword;
            model.AttendeePassword = string.IsNullOrEmpty(model.AttendeePassword) ? "stu123" : model.AttendeePassword;

            if (model.Id > 0) _context.BBBVirtualClasses.Update(model);
            else _context.BBBVirtualClasses.Add(model);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(VirtualClass));
        }

        // --- Virtual Meeting ---
        public async Task<IActionResult> VirtualMeeting()
        {
            var companyId = await GetCompanyId();
            var meetings = await _context.BBBVirtualMeetings.Where(m => m.CompanyId == companyId).ToListAsync();
            return View(meetings);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SaveVirtualMeeting(BBBVirtualMeeting model)
        {
            model.CompanyId = await GetCompanyId();
            model.MeetingId = string.IsNullOrEmpty(model.MeetingId) ? Guid.NewGuid().ToString("N").Substring(0, 10) : model.MeetingId;
            model.ModeratorPassword = string.IsNullOrEmpty(model.ModeratorPassword) ? "admin123" : model.ModeratorPassword;
            model.AttendeePassword = string.IsNullOrEmpty(model.AttendeePassword) ? "meet123" : model.AttendeePassword;

            if (model.Id > 0) _context.BBBVirtualMeetings.Update(model);
            else _context.BBBVirtualMeetings.Add(model);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(VirtualMeeting));
        }

        // --- Reports ---
        public async Task<IActionResult> ClassReports()
        {
             var companyId = await GetCompanyId();
             var reports = await _context.BBBVirtualClasses
                .Include(c => c.Class).Include(c => c.Subject)
                .Where(c => c.CompanyId == companyId).ToListAsync();
             return View(reports);
        }

        public async Task<IActionResult> MeetingReports()
        {
             var companyId = await GetCompanyId();
             var reports = await _context.BBBVirtualMeetings
                .Where(m => m.CompanyId == companyId).ToListAsync();
             return View(reports);
        }

        // --- Record Lists ---
        public async Task<IActionResult> ClassRecordList()
        {
             var companyId = await GetCompanyId();
             var records = await _context.BBBRecordings.Where(r => r.CompanyId == companyId && r.Type == "Class").ToListAsync();
             return View(records);
        }

        public async Task<IActionResult> MeetingRecordList()
        {
             var companyId = await GetCompanyId();
             var records = await _context.BBBRecordings.Where(r => r.CompanyId == companyId && r.Type == "Meeting").ToListAsync();
             return View(records);
        }

        // --- Settings ---
        public async Task<IActionResult> Settings()
        {
            var companyId = await GetCompanyId();
            var settings = await _context.BBBSettings.FirstOrDefaultAsync(s => s.CompanyId == companyId)
                           ?? new BBBSetting { CompanyId = companyId };
            return View(settings);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SaveSettings(BBBSetting settings)
        {
            var existing = await _context.BBBSettings.FirstOrDefaultAsync(s => s.Id == settings.Id);
            if (existing != null) _context.Entry(existing).CurrentValues.SetValues(settings);
            else _context.BBBSettings.Add(settings);
            await _context.SaveChangesAsync();
            TempData["Success"] = "BigBlueButton API configuration updated.";
            return RedirectToAction(nameof(Settings));
        }
    }

    public class BBBDashboardViewModel {
        public List<BBBVirtualClass> RecentClasses { get; set; } = new List<BBBVirtualClass>();
        public List<BBBVirtualMeeting> RecentMeetings { get; set; } = new List<BBBVirtualMeeting>();
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using EasyEdu.Data;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Models;
using System.Security.Claims;

namespace EasyEdu.Controllers
{
    [Authorize(Roles = "SuperAdmin,Admin,Teacher")]
    public class QrAttendanceController : Controller
    {
        private readonly ApplicationDbContext _context;
        public QrAttendanceController(ApplicationDbContext context) => _context = context;

        private async Task<int> GetCompanyId()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _context.Users.FindAsync(userId);
            return user?.CompanyId ?? 1;
        }

        public async Task<IActionResult> Index()
        {
            var companyId = await GetCompanyId();
            var logs = await _context.Attendances
                .Include(a => a.Student)
                .ThenInclude(s => s.Class)
                .Where(a => a.AttendanceMethod == "QR" && a.Student.CompanyId == companyId)
                .OrderByDescending(a => a.CreatedAt)
                .Take(15)
                .ToListAsync();

            ViewBag.StatsToday = await _context.Attendances.CountAsync(a => a.AttendanceMethod == "QR" && a.Date.Date == DateTime.Today && a.Student.CompanyId == companyId);
            ViewBag.StatsTotal = await _context.Attendances.CountAsync(a => a.AttendanceMethod == "QR" && a.Student.CompanyId == companyId);
            ViewBag.LateToday = await _context.Attendances.CountAsync(a => a.AttendanceMethod == "QR" && a.Date.Date == DateTime.Today && a.Status == "Late" && a.Student.CompanyId == companyId);

            return View(logs);
        }

        public async Task<IActionResult> Settings()
        {
            var companyId = await GetCompanyId();
            var settings = await _context.QrAttendanceSettings.FirstOrDefaultAsync(s => s.CompanyId == companyId)
                           ?? new QrAttendanceSetting { CompanyId = companyId };
            return View(settings);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SaveSettings(QrAttendanceSetting settings)
        {
            var companyId = await GetCompanyId();
            var existing = await _context.QrAttendanceSettings.FirstOrDefaultAsync(s => s.CompanyId == companyId);
            
            if (existing != null) 
            {
                existing.IsEnabled = settings.IsEnabled;
                existing.QrSecret = settings.QrSecret;
                existing.ExpiryDurationSeconds = settings.ExpiryDurationSeconds;
                existing.RequireSelfie = settings.RequireSelfie;
                existing.RequireGeolocation = settings.RequireGeolocation;
                existing.UpdatedAt = DateTime.UtcNow;
            }
            else 
            {
                settings.CompanyId = companyId;
                _context.QrAttendanceSettings.Add(settings);
            }
            
            await _context.SaveChangesAsync();
            TempData["Success"] = "QR Core configurations synchronized.";
            return RedirectToAction(nameof(Settings));
        }

        public async Task<IActionResult> AutoSubmission()
        {
            var companyId = await GetCompanyId();
            var settings = await _context.QrAttendanceSettings.FirstOrDefaultAsync(s => s.CompanyId == companyId)
                           ?? new QrAttendanceSetting { CompanyId = companyId };
            return View(settings);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SaveAutoSubmission(QrAttendanceSetting settings)
        {
             var companyId = await GetCompanyId();
             var existing = await _context.QrAttendanceSettings.FirstOrDefaultAsync(s => s.CompanyId == companyId);

             if (existing != null)
             {
                 existing.AutoSubmission = settings.AutoSubmission;
                 existing.AutoSubmissionTime = settings.AutoSubmissionTime;
                 existing.DefaultStatus = settings.DefaultStatus;
                 existing.UpdatedAt = DateTime.UtcNow;
             }
             else 
             {
                 settings.CompanyId = companyId;
                 _context.QrAttendanceSettings.Add(settings);
             }

             await _context.SaveChangesAsync();
             TempData["Success"] = "Auto-submission paradigms synchronized.";
             return RedirectToAction(nameof(AutoSubmission));
        }
    }
}

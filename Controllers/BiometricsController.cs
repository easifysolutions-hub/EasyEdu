using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;
using System.Security.Claims;

namespace EasyEdu.Controllers
{
    [Authorize(Roles = "SuperAdmin,Admin")]
    public class BiometricsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public BiometricsController(ApplicationDbContext context)
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
            
            ViewBag.StudentSyncToday = await _context.Attendances
                .CountAsync(a => a.AttendanceMethod == "Biometric" && a.Date.Date == DateTime.Today && a.Student.CompanyId == companyId);
            
            ViewBag.StaffSyncToday = await _context.TeacherAttendances
                .CountAsync(a => a.AttendanceMethod == "Biometric" && a.Date.Date == DateTime.Today && a.Teacher.CompanyId == companyId);

            ViewBag.TotalDevices = await _context.BiometricSettings.CountAsync(s => s.CompanyId == companyId);

            var recentLogs = await _context.Attendances
                .Include(a => a.Student)
                .Where(a => a.AttendanceMethod == "Biometric" && a.Student.CompanyId == companyId)
                .OrderByDescending(a => a.CreatedAt)
                .Take(10)
                .ToListAsync();

            return View(recentLogs);
        }

        public async Task<IActionResult> Settings()
        {
            var companyId = await GetCompanyId();
            var settings = await _context.BiometricSettings.FirstOrDefaultAsync(s => s.CompanyId == companyId)
                           ?? new BiometricSetting { CompanyId = companyId };
            return View(settings);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SaveSettings(BiometricSetting settings)
        {
            var companyId = await GetCompanyId();
            var existing = await _context.BiometricSettings.FirstOrDefaultAsync(s => s.CompanyId == companyId);
            
            if (existing != null) 
            {
                existing.DeviceId = settings.DeviceId;
                existing.ApiKey = settings.ApiKey;
                existing.IntegrationUserId = settings.IntegrationUserId;
                existing.Provider = settings.Provider;
                existing.IpAddress = settings.IpAddress;
                existing.Port = settings.Port;
                existing.IsEnabled = settings.IsEnabled;
                existing.UpdatedAt = DateTime.UtcNow;
            }
            else 
            {
                settings.CompanyId = companyId;
                _context.BiometricSettings.Add(settings);
            }

            await _context.SaveChangesAsync();
            TempData["Success"] = "Biometric infrastructure parameters synchronized.";
            return RedirectToAction(nameof(Settings));
        }

        public async Task<IActionResult> StudentReport()
        {
            var companyId = await GetCompanyId();
            var logs = await _context.Attendances
                .Include(a => a.Student).ThenInclude(s => s.Class)
                .Where(a => a.AttendanceMethod == "Biometric" && a.Student.CompanyId == companyId)
                .OrderByDescending(a => a.Date)
                .ToListAsync();
            return View(logs);
        }

        public async Task<IActionResult> StaffReport()
        {
            var companyId = await GetCompanyId();
            var logs = await _context.TeacherAttendances
                .Include(a => a.Teacher)
                .Where(a => a.AttendanceMethod == "Biometric" && a.Teacher.CompanyId == companyId)
                .OrderByDescending(a => a.Date)
                .ToListAsync();
            return View(logs);
        }
    }
}

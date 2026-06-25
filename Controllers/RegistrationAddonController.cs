using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;
using System.Security.Claims;

namespace EasyEdu.Controllers
{
    [Authorize(Roles = "SuperAdmin,Admin")]
    public class RegistrationAddonController : Controller
    {
        private readonly ApplicationDbContext _context;

        public RegistrationAddonController(ApplicationDbContext context)
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
            var submissions = await _context.RegistrationSubmissions
                .Include(s => s.Class)
                .Where(s => s.CompanyId == companyId)
                .OrderByDescending(s => s.SubmittedAt)
                .Take(10)
                .ToListAsync();

            ViewBag.TotalCount = await _context.RegistrationSubmissions.CountAsync(s => s.CompanyId == companyId);
            ViewBag.PendingCount = await _context.RegistrationSubmissions.CountAsync(s => s.Status == "Pending" && s.CompanyId == companyId);
            ViewBag.ApprovedCount = await _context.RegistrationSubmissions.CountAsync(s => s.Status == "Approved" && s.CompanyId == companyId);

            return View(submissions);
        }

        // --- Registered Student List (Submissions) ---
        public async Task<IActionResult> StudentList()
        {
            var companyId = await GetCompanyId();
            var list = await _context.RegistrationSubmissions
                .Include(s => s.Class)
                .Where(s => s.CompanyId == companyId)
                .OrderByDescending(s => s.SubmittedAt)
                .ToListAsync();
            return View(list);
        }

        // --- Settings ---
        public async Task<IActionResult> Settings()
        {
            var companyId = await GetCompanyId();
            var settings = await _context.OnlineRegistrationSettings.FirstOrDefaultAsync(s => s.CompanyId == companyId)
                           ?? new OnlineRegistrationSetting { CompanyId = companyId };
            return View(settings);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SaveSettings(OnlineRegistrationSetting settings)
        {
            var existing = await _context.OnlineRegistrationSettings.FirstOrDefaultAsync(s => s.Id == settings.Id);
            if (existing != null) _context.Entry(existing).CurrentValues.SetValues(settings);
            else _context.OnlineRegistrationSettings.Add(settings);
            await _context.SaveChangesAsync();
            TempData["Success"] = "Online Admission configuration synchronized.";
            return RedirectToAction(nameof(Settings));
        }

        [HttpPost]
        public async Task<IActionResult> ChangeStatus(int id, string status)
        {
            var submission = await _context.RegistrationSubmissions.FindAsync(id);
            if (submission != null)
            {
                submission.Status = status;
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(StudentList));
        }
    }
}

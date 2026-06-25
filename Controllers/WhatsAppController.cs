using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;
using System.Security.Claims;

namespace EasyEdu.Controllers
{
    [Authorize(Roles = "SuperAdmin,Admin")]
    public class WhatsAppController : Controller
    {
        private readonly ApplicationDbContext _context;

        public WhatsAppController(ApplicationDbContext context)
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
            var module = await _context.SystemModules.FirstOrDefaultAsync(m => m.Name == "WhatsApp Support Addon");
            if (module == null || !module.IsEnabled) return RedirectToAction("Index", "Home");

            ViewBag.AgentCount = await _context.WhatsAppAgents.CountAsync(a => a.CompanyId == companyId);
            ViewBag.LogCount = await _context.WhatsAppLogs.CountAsync(l => l.CompanyId == companyId);
            ViewBag.SuccessRate = 98.5; // Mock analytic
            
            var recentLogs = await _context.WhatsAppLogs
                .Where(l => l.CompanyId == companyId)
                .OrderByDescending(l => l.SentAt)
                .Take(5)
                .ToListAsync();

            return View(recentLogs);
        }

        public async Task<IActionResult> Settings()
        {
            var companyId = await GetCompanyId();
            var settings = await _context.WhatsAppSettings.FirstOrDefaultAsync(s => s.CompanyId == companyId);
            if (settings == null)
            {
                settings = new WhatsAppSetting { CompanyId = companyId };
                _context.WhatsAppSettings.Add(settings);
                await _context.SaveChangesAsync();
            }
            return View(settings);
        }

        [HttpPost]
        public async Task<IActionResult> SaveSettings(WhatsAppSetting model)
        {
            var companyId = await GetCompanyId();
            var existing = await _context.WhatsAppSettings.FirstOrDefaultAsync(s => s.CompanyId == companyId);
            if (existing != null)
            {
                existing.Provider = model.Provider;
                existing.ApiKey = model.ApiKey;
                existing.AccountSid = model.AccountSid;
                existing.FromNumber = model.FromNumber;
                existing.IsEnabled = model.IsEnabled;
                existing.UpdatedAt = DateTime.UtcNow;
                _context.WhatsAppSettings.Update(existing);
            }
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Settings));
        }

        public async Task<IActionResult> Agents()
        {
            var companyId = await GetCompanyId();
            var agents = await _context.WhatsAppAgents.Where(a => a.CompanyId == companyId).ToListAsync();
            return View(agents);
        }

        [HttpPost]
        public async Task<IActionResult> SaveAgent(WhatsAppAgent model)
        {
            var companyId = await GetCompanyId();
            if (model.Id > 0)
            {
                var existing = await _context.WhatsAppAgents.FindAsync(model.Id);
                if (existing != null && existing.CompanyId == companyId)
                {
                    existing.Name = model.Name;
                    existing.PhoneNumber = model.PhoneNumber;
                    existing.Designation = model.Designation;
                    existing.IsOnline = model.IsOnline;
                    existing.WorkingHours = model.WorkingHours;
                    _context.WhatsAppAgents.Update(existing);
                }
            }
            else
            {
                model.CompanyId = companyId;
                _context.WhatsAppAgents.Add(model);
            }
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Agents));
        }

        public async Task<IActionResult> Analytics()
        {
            var companyId = await GetCompanyId();
            ViewBag.TotalSent = await _context.WhatsAppLogs.CountAsync(l => l.CompanyId == companyId);
            ViewBag.TotalDelivered = await _context.WhatsAppLogs.CountAsync(l => l.CompanyId == companyId && l.Status == "Delivered");
            ViewBag.TotalRead = await _context.WhatsAppLogs.CountAsync(l => l.CompanyId == companyId && l.Status == "Read");
            
            var logs = await _context.WhatsAppLogs.Where(l => l.CompanyId == companyId).ToListAsync();
            return View(logs);
        }
    }
}

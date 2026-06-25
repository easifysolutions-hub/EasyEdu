using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;
using System.Security.Claims;

namespace EasyEdu.Controllers
{
    [Authorize(Roles = "SuperAdmin")]
    public class SettingsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public SettingsController(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            var company = await _context.Companies.FirstOrDefaultAsync();
            if (company == null) return NotFound();

            var settings = await _context.SystemSettings.FirstOrDefaultAsync(s => s.CompanyId == company.Id);
            if (settings == null)
            {
                settings = new SystemSettings 
                { 
                    CompanyId = company.Id,
                    WeekendDays = "Friday,Saturday" // Default for many regions
                };
                _context.SystemSettings.Add(settings);
                await _context.SaveChangesAsync();
            }

            ViewBag.Company = company;
            return View(settings);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SaveSettings(SystemSettings settings)
        {
            var existing = await _context.SystemSettings.FindAsync(settings.Id);
            if (existing != null)
            {
                // Core Settings
                existing.EnableTwoFactor = settings.EnableTwoFactor;
                existing.CurrencyCode = settings.CurrencyCode;
                existing.CurrencySymbol = settings.CurrencySymbol;
                
                // Chat
                existing.EnableTawkTo = settings.EnableTawkTo;
                existing.TawkToWidgetId = settings.TawkToWidgetId;
                existing.EnableMessenger = settings.EnableMessenger;
                existing.MessengerAppId = settings.MessengerAppId;

                // Notifications
                existing.EmailNotification = settings.EmailNotification;
                existing.SmsNotification = settings.SmsNotification;

                // Email config
                existing.SmtpServer = settings.SmtpServer;
                existing.SmtpPort = settings.SmtpPort;
                existing.SmtpUser = settings.SmtpUser;
                if (!string.IsNullOrEmpty(settings.SmtpPassword)) 
                    existing.SmtpPassword = settings.SmtpPassword;
                existing.SmtpEnableSsl = settings.SmtpEnableSsl;

                // SMS config
                existing.SmsGatewayUrl = settings.SmsGatewayUrl;
                existing.SmsApiKey = settings.SmsApiKey;
                existing.SmsSenderId = settings.SmsSenderId;

                // Payment
                existing.EnableOnlinePayment = settings.EnableOnlinePayment;
                existing.StripePublicKey = settings.StripePublicKey;
                if (!string.IsNullOrEmpty(settings.StripeSecretKey))
                    existing.StripeSecretKey = settings.StripeSecretKey;

                // UX
                existing.EnablePreloader = settings.EnablePreloader;
                existing.PreloaderBackgroundColor = settings.PreloaderBackgroundColor;
                existing.WeekendDays = settings.WeekendDays;

                existing.UpdatedAt = DateTime.UtcNow;

                await _context.SaveChangesAsync();
                TempData["Success"] = "System configuration synchronized successfully.";
            }

            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Holiday()
        {
            var holidays = await _context.AcademicYears.ToListAsync(); // Assuming linked to academic years or separate model
            // For now, let's just show a view. In a real app we'd need a Holiday model.
            return View();
        }

        public IActionResult CronJob()
        {
            return View();
        }
    }
}

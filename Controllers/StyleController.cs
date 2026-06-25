using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;
using System.Security.Claims;

namespace EasyEdu.Controllers
{
    [Authorize(Roles = "SuperAdmin,Admin")]
    public class StyleController : Controller
    {
        private readonly ApplicationDbContext _context;

        public StyleController(ApplicationDbContext context)
        {
            _context = context;
        }

        private int CurrentCompanyId => int.TryParse(User.FindFirstValue("CompanyId"), out var id) ? id : 0;

        public async Task<IActionResult> Index()
        {
            var companyId = CurrentCompanyId;
            var settings = await _context.ThemeSettings
                .FirstOrDefaultAsync(s => s.CompanyId == companyId);

            if (settings == null)
            {
                settings = new ThemeSettings { CompanyId = companyId };
                _context.ThemeSettings.Add(settings);
                await _context.SaveChangesAsync();
            }

            return View(settings);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateTheme(ThemeSettings settings)
        {
            var existing = await _context.ThemeSettings.FindAsync(settings.Id);
            if (existing != null)
            {
                existing.PrimaryColor = settings.PrimaryColor;
                existing.SecondaryColor = settings.SecondaryColor;
                existing.SidebarBackground = settings.SidebarBackground;
                existing.SidebarText = settings.SidebarText;
                existing.BodyBackground = settings.BodyBackground;
                existing.BackgroundImageUrl = settings.BackgroundImageUrl;
                existing.ThemeName = settings.ThemeName;

                await _context.SaveChangesAsync();
                TempData["Success"] = "Visual theme updated successfully.";
            }
            return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        public async Task<IActionResult> ResetTheme()
        {
            var companyId = CurrentCompanyId;
            var settings = await _context.ThemeSettings
                .FirstOrDefaultAsync(s => s.CompanyId == companyId);

            if (settings != null)
            {
                settings.PrimaryColor = "#6366f1";
                settings.SecondaryColor = "#4f46e5";
                settings.SidebarBackground = "#ffffff";
                settings.SidebarText = "#334155";
                settings.BodyBackground = "#f8fafc";
                settings.BackgroundImageUrl = null;
                settings.ThemeName = "Default";

                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(Index));
        }
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;
using System.Security.Claims;

namespace EasyEdu.Controllers
{
    [Authorize(Roles = "SuperAdmin")]
    public class SystemController : Controller
    {
        private readonly ApplicationDbContext _context;

        public SystemController(ApplicationDbContext context)
        {
            _context = context;
        }

        private int CurrentCompanyId => int.TryParse(User.FindFirstValue("CompanyId"), out var id) ? id : 0;

        public async Task<IActionResult> ModuleManager()
        {
            // Robust CompanyId retrieval
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _context.Users.FindAsync(userId);
            int? companyId = user?.CompanyId;

            // Fallback for SuperAdmin who might not be assigned to a specific company
            if (!companyId.HasValue || companyId == 0)
            {
                var firstCompany = await _context.Companies.FirstOrDefaultAsync();
                companyId = firstCompany?.Id;
            }

            var existingModules = await _context.SystemModules
                .Where(m => m.CompanyId == companyId)
                .ToListAsync();

            var requiredModules = new List<(string Name, string Desc, string Ver)>
            {
                ("Zoom Addon", "Live virtual classes and meetings integration", "2.3.3"),
                ("Gmeet Addon", "Google Meet integration for virtual sessions", "2.0.3"),
                ("Jitsi Addon", "Open-source video conferencing integration", "1.4.6"),
                ("BigBlueButton Addon", "BBB integration for collaborative learning", "2.0.3"),
                ("In App Live Addon", "Native in-app live streaming capability", "1.0.0"),
                ("Online Exam Addon", "Comprehensive online examination engine", "1.0"),
                ("CBSE Exam Addon", "CBSE pattern examination and grading", "1.0"),
                ("LMS Addon", "Learning Management System features", "1.4"),
                ("Registration Addon", "Parent and student self-registration module", "3.0.3"),
                ("QR Code Attendance Addon", "QR code based student/staff attendance", "1.6"),
                ("Biometrics Addon", "Biometric device integration for attendance", "2.0.0"),
                ("WhatsApp Support Addon", "WhatsApp communication and notifications", "1.0"),
                ("Ai Content Addon", "AI-powered content generation for school", "1.3"),
                ("Certificate Addon", "Automated certificate generation engine", "1.5")
            };

            bool changed = false;
            foreach (var req in requiredModules)
            {
                if (!existingModules.Any(m => m.Name == req.Name))
                {
                    _context.SystemModules.Add(new SystemModule
                    {
                        Name = req.Name,
                        Description = req.Desc,
                        Version = req.Ver,
                        IsEnabled = true,
                        CompanyId = companyId,
                        InstalledAt = DateTime.UtcNow
                    });
                    changed = true;
                }
            }

            if (changed)
            {
                try 
                {
                    await _context.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    // Log error or handle it
                    TempData["Error"] = "Failed to sync system modules: " + ex.Message;
                }
                
                existingModules = await _context.SystemModules
                    .Where(m => m.CompanyId == companyId)
                    .ToListAsync();
            }

            return View(existingModules);
        }

        [HttpPost]
        public async Task<IActionResult> ToggleModule(int id)
        {
            var module = await _context.SystemModules.FindAsync(id);
            if (module != null)
            {
                module.IsEnabled = !module.IsEnabled;
                await _context.SaveChangesAsync();
                TempData["Success"] = $"Module {(module.IsEnabled ? "Enabled" : "Disabled")} successfully.";
            }
            return RedirectToAction(nameof(ModuleManager));
        }
    }
}

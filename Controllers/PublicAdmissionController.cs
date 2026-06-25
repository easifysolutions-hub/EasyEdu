using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;

namespace EasyEdu.Controllers
{
    [AllowAnonymous]
    public class PublicAdmissionController : Controller
    {
        private readonly ApplicationDbContext _context;

        public PublicAdmissionController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Apply(int? companyId)
        {
            if (!companyId.HasValue)
            {
                var firstCompany = await _context.Companies.FirstOrDefaultAsync();
                companyId = firstCompany?.Id ?? 1;
            }

            var company = await _context.Companies.FindAsync(companyId);
            if (company == null)
            {
                return NotFound("Company/School profile not found.");
            }

            var settings = await _context.AdmissionQuerySettings.FirstOrDefaultAsync(s => s.CompanyId == companyId);
            if (settings == null)
            {
                settings = new AdmissionQuerySetting
                {
                    CompanyId = companyId.Value,
                    FormTitle = "School Admission Query Form",
                    FormDescription = "Please fill out the form below to enquire about student admissions.",
                    ShowPhone = true,
                    RequirePhone = true,
                    ShowEmail = true,
                    RequireEmail = false,
                    ShowAddress = true,
                    RequireAddress = false,
                    ShowClass = true,
                    RequireClass = false,
                    ShowNumberOfChildren = false,
                    RequireNumberOfChildren = false,
                    ShowDescription = true,
                    RequireDescription = false,
                    AccentColor = "#4f46e5"
                };
            }

            ViewBag.Company = company;
            ViewBag.Classes = await _context.Classes.Where(c => c.CompanyId == companyId).ToListAsync();
            return View(settings);
        }

        [HttpPost]
        public async Task<IActionResult> Apply(AdmissionQuery query)
        {
            ModelState.Remove("Class");
            ModelState.Remove("Company");

            var settings = await _context.AdmissionQuerySettings.FirstOrDefaultAsync(s => s.CompanyId == query.CompanyId);
            if (settings == null)
            {
                settings = new AdmissionQuerySetting { CompanyId = query.CompanyId ?? 1 };
            }

            // Custom Validation based on settings
            if (settings.ShowPhone && settings.RequirePhone && string.IsNullOrEmpty(query.Phone))
            {
                ModelState.AddModelError("Phone", "Phone number is required.");
            }
            if (settings.ShowEmail && settings.RequireEmail && string.IsNullOrEmpty(query.Email))
            {
                ModelState.AddModelError("Email", "Email address is required.");
            }
            if (settings.ShowAddress && settings.RequireAddress && string.IsNullOrEmpty(query.Address))
            {
                ModelState.AddModelError("Address", "Address details are required.");
            }
            if (settings.ShowClass && settings.RequireClass && !query.ClassId.HasValue)
            {
                ModelState.AddModelError("ClassId", "Selecting a target grade/class is required.");
            }
            if (settings.ShowDescription && settings.RequireDescription && string.IsNullOrEmpty(query.Description))
            {
                ModelState.AddModelError("Description", "A brief note or description is required.");
            }

            if (ModelState.IsValid)
            {
                query.Date = DateTime.Now;
                query.Status = "Pending";
                query.Description = query.Description ?? "";
                query.Email = query.Email ?? "";
                query.Address = query.Address ?? "";
                query.Reference = "WEB-APPLY";
                query.Source = "Web Form";
                query.AssignedTo = "";
                
                _context.Add(query);
                await _context.SaveChangesAsync();

                var className = "N/A";
                if (query.ClassId.HasValue)
                {
                    var cls = await _context.Classes.FindAsync(query.ClassId.Value);
                    className = cls?.Name ?? "N/A";
                }

                return RedirectToAction(nameof(Success), new { 
                    name = query.Name, 
                    className = className, 
                    id = query.Id 
                });
            }

            ViewBag.Company = await _context.Companies.FindAsync(query.CompanyId);
            ViewBag.Classes = await _context.Classes.Where(c => c.CompanyId == query.CompanyId).ToListAsync();
            return View(settings);
        }

        [HttpGet]
        public IActionResult Success(string name, string className, int id)
        {
            ViewBag.Name = name;
            ViewBag.ClassName = className;
            ViewBag.RefId = $"ENQ-{DateTime.Now.Year}-{id:D4}";
            return View();
        }
    }
}

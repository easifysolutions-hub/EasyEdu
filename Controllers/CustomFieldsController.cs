using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;

namespace EasyEdu.Controllers
{
    [Authorize(Roles = "SuperAdmin, Admin")]
    public class CustomFieldsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CustomFieldsController(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index(string formType = "Student")
        {
            ViewBag.FormType = formType;
            var fields = await _context.CustomFields
                .Where(f => f.FormType == formType)
                .ToListAsync();
            return View(fields);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CustomField field)
        {
            // Default company for now
            var company = await _context.Companies.FirstOrDefaultAsync();
            field.CompanyId = company?.Id ?? 1;

            if (ModelState.IsValid)
            {
                _context.Add(field);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index), new { formType = field.FormType });
            }
            return RedirectToAction(nameof(Index), new { formType = field.FormType });
        }

        [HttpPost]
        public async Task<IActionResult> Edit(CustomField field)
        {
            if (ModelState.IsValid)
            {
                var existing = await _context.CustomFields.FindAsync(field.Id);
                if (existing != null)
                {
                    existing.FieldName = field.FieldName;
                    existing.FieldType = field.FieldType;
                    existing.Options = field.Options;
                    existing.IsRequired = field.IsRequired;
                    existing.IsActive = field.IsActive;
                    await _context.SaveChangesAsync();
                }
            }
            return RedirectToAction(nameof(Index), new { formType = field.FormType });
        }

        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            var field = await _context.CustomFields.FindAsync(id);
            if (field != null)
            {
                _context.CustomFields.Remove(field);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index), new { formType = field.FormType });
            }
            return RedirectToAction(nameof(Index));
        }
    }
}

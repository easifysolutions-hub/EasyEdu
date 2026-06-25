using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;

namespace EasyEdu.Controllers
{
    [Authorize(Roles = "SuperAdmin,Admin")]
    public class SectionController : Controller
    {
        private readonly ApplicationDbContext _context;

        public SectionController(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            return View(await _context.Sections.OrderByDescending(s => s.CreatedAt).ToListAsync());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Section section)
        {
            if (ModelState.IsValid)
            {
                section.CreatedAt = DateTime.UtcNow;
                _context.Add(section);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View("Index", await _context.Sections.ToListAsync());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, string name, bool isActive)
        {
            var section = await _context.Sections.FindAsync(id);
            if (section != null)
            {
                section.Name = name;
                section.IsActive = isActive;
                _context.Update(section);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            var section = await _context.Sections.FindAsync(id);
            if (section != null)
            {
                _context.Sections.Remove(section);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return NotFound();
        }
    }
}

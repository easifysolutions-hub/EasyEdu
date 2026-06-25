using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;

namespace EasyEdu.Controllers
{
    [Authorize(Roles = "SuperAdmin,Admin")]
    public class SubjectsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public SubjectsController(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            await PrepareDropdowns();
            return View(await _context.Subjects.Include(s => s.Class).OrderBy(s => s.Name).ToListAsync());
        }

        private async Task PrepareDropdowns()
        {
            ViewBag.ClassId = new SelectList(await _context.Classes.OrderBy(c => c.Name).ToListAsync(), "Id", "Name");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Subject subject, List<int> classIds)
        {
            ModelState.Remove("Class");
            ModelState.Remove("Teacher");
            ModelState.Remove("ClassId");

            if (classIds == null || !classIds.Any())
            {
                ModelState.AddModelError("ClassId", "The Class field is required.");
            }

            if (ModelState.IsValid)
            {
                try
                {
                    foreach (var classId in classIds)
                    {
                        var newSubject = new Subject
                        {
                            Name = subject.Name,
                            Code = subject.Code,
                            Description = subject.Description,
                            Credits = subject.Credits,
                            ClassId = classId,
                            TeacherId = subject.TeacherId,
                            IsActive = subject.IsActive,
                            IsOptional = subject.IsOptional,
                            Type = subject.Type,
                            CreatedAt = DateTime.UtcNow
                        };
                        _context.Add(newSubject);
                    }
                    await _context.SaveChangesAsync();
                    TempData["Success"] = "Subject(s) created successfully.";
                    return RedirectToAction(nameof(Index));
                }
                catch (Exception ex)
                {
                    ModelState.AddModelError("", "Error saving subject: " + ex.Message);
                }
            }
            
            await PrepareDropdowns();
            return View("Index", await _context.Subjects.Include(s => s.Class).OrderBy(s => s.Name).ToListAsync());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, string name, string code, string type, int classId, bool isOptional)
        {
            try
            {
                var subject = await _context.Subjects.FindAsync(id);
                if (subject == null) return NotFound();

                subject.Name = name;
                subject.Code = code;
                subject.Type = type;
                subject.ClassId = classId;
                subject.IsOptional = isOptional;

                _context.Update(subject);
                await _context.SaveChangesAsync();
                TempData["Success"] = "Subject updated successfully.";
            }
            catch (Exception ex)
            {
                TempData["Error"] = "Error updating: " + ex.Message;
            }
            return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var subject = await _context.Subjects.FindAsync(id);
                if (subject != null)
                {
                    _context.Subjects.Remove(subject);
                    await _context.SaveChangesAsync();
                    TempData["Success"] = "Subject deleted successfully.";
                }
            }
            catch (Exception ex)
            {
                TempData["Error"] = "Error deleting: " + ex.Message;
            }
            return RedirectToAction(nameof(Index));
        }
    }
}

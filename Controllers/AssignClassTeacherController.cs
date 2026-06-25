using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;

namespace EasyEdu.Controllers
{
    [Authorize(Roles = "SuperAdmin,Admin")]
    public class AssignClassTeacherController : Controller
    {
        private readonly ApplicationDbContext _context;

        public AssignClassTeacherController(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            ViewBag.Classes = new SelectList(await _context.Classes.OrderBy(c => c.Name).ToListAsync(), "Id", "Name");
            ViewBag.Teachers = new SelectList(await _context.Teachers.Where(t => t.IsActive).OrderBy(t => t.FirstName).Select(t => new { Id = t.Id, FullName = t.FirstName + " " + t.LastName }).ToListAsync(), "Id", "FullName");

            var assignments = await _context.AssignClassTeachers
                .Include(a => a.Class)
                .Include(a => a.Section)
                .Include(a => a.Teacher)
                .OrderByDescending(a => a.CreatedAt)
                .ToListAsync();

            return View(assignments);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(AssignClassTeacher assignment)
        {
            ModelState.Remove("Class");
            ModelState.Remove("Section");
            ModelState.Remove("Teacher");

            if (ModelState.IsValid)
            {
                // Check for duplicates (Teacher already assigned to this Class+Section)
                var exists = await _context.AssignClassTeachers
                    .AnyAsync(a => a.ClassId == assignment.ClassId && a.SectionId == assignment.SectionId && a.TeacherId == assignment.TeacherId);

                if (!exists)
                {
                    // Also check if multiple teachers can be assigned to same class section? Standard logic usually allows one.
                    // If strict one-teacher-per-section:
                    var existingTeacher = await _context.AssignClassTeachers
                        .FirstOrDefaultAsync(a => a.ClassId == assignment.ClassId && a.SectionId == assignment.SectionId);
                    
                    if(existingTeacher != null)
                    {
                        // Replace or Error? Infix usually adds multiple or deletes old. Let's add multiple for now or just add.
                    }

                    _context.Add(assignment);
                    await _context.SaveChangesAsync();
                    return RedirectToAction(nameof(Index));
                }
                else
                {
                     ModelState.AddModelError("", "This teacher is already assigned to this class section.");
                }
            }
            
            // Reload lists on error
            ViewBag.Classes = new SelectList(await _context.Classes.OrderBy(c => c.Name).ToListAsync(), "Id", "Name", assignment.ClassId);
            ViewBag.Teachers = new SelectList(await _context.Teachers.Where(t => t.IsActive).OrderBy(t => t.FirstName).Select(t => new { Id = t.Id, FullName = t.FirstName + " " + t.LastName }).ToListAsync(), "Id", "FullName", assignment.TeacherId);
            
            var list = await _context.AssignClassTeachers
                .Include(a => a.Class)
                .Include(a => a.Section)
                .Include(a => a.Teacher)
                .OrderByDescending(a => a.CreatedAt)
                .ToListAsync();

            return View("Index", list);
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var assignment = await _context.AssignClassTeachers.FindAsync(id);
            if (assignment == null)
            {
                return NotFound();
            }

            ViewBag.Classes = new SelectList(await _context.Classes.OrderBy(c => c.Name).ToListAsync(), "Id", "Name", assignment.ClassId);
            
            var sections = await _context.ClassSections
                .Where(cs => cs.ClassId == assignment.ClassId)
                .Include(cs => cs.Section)
                .Select(cs => cs.Section)
                .OrderBy(s => s.Name)
                .ToListAsync();
            ViewBag.Sections = new SelectList(sections, "Id", "Name", assignment.SectionId);

            ViewBag.Teachers = new SelectList(await _context.Teachers.Where(t => t.IsActive).OrderBy(t => t.FirstName).Select(t => new { Id = t.Id, FullName = t.FirstName + " " + t.LastName }).ToListAsync(), "Id", "FullName", assignment.TeacherId);

            return View(assignment);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, AssignClassTeacher assignment)
        {
            if (id != assignment.Id)
            {
                return NotFound();
            }

            ModelState.Remove("Class");
            ModelState.Remove("Section");
            ModelState.Remove("Teacher");

            if (ModelState.IsValid)
            {
                // Check for duplicates excluding current assignment
                var exists = await _context.AssignClassTeachers
                    .AnyAsync(a => a.ClassId == assignment.ClassId && a.SectionId == assignment.SectionId && a.TeacherId == assignment.TeacherId && a.Id != id);

                if (!exists)
                {
                    try
                    {
                        _context.Update(assignment);
                        await _context.SaveChangesAsync();
                        return RedirectToAction(nameof(Index));
                    }
                    catch (DbUpdateConcurrencyException)
                    {
                        if (!_context.AssignClassTeachers.Any(e => e.Id == assignment.Id))
                        {
                            return NotFound();
                        }
                        else
                        {
                            throw;
                        }
                    }
                }
                else
                {
                    ModelState.AddModelError("", "This teacher is already assigned to this class section.");
                }
            }

            // Reload lists on error
            ViewBag.Classes = new SelectList(await _context.Classes.OrderBy(c => c.Name).ToListAsync(), "Id", "Name", assignment.ClassId);
            
            var sections = await _context.ClassSections
                .Where(cs => cs.ClassId == assignment.ClassId)
                .Include(cs => cs.Section)
                .Select(cs => cs.Section)
                .OrderBy(s => s.Name)
                .ToListAsync();
            ViewBag.Sections = new SelectList(sections, "Id", "Name", assignment.SectionId);

            ViewBag.Teachers = new SelectList(await _context.Teachers.Where(t => t.IsActive).OrderBy(t => t.FirstName).Select(t => new { Id = t.Id, FullName = t.FirstName + " " + t.LastName }).ToListAsync(), "Id", "FullName", assignment.TeacherId);

            return View(assignment);
        }

        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            var assignment = await _context.AssignClassTeachers.FindAsync(id);
            if (assignment != null)
            {
                _context.AssignClassTeachers.Remove(assignment);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(Index));
        }

        [HttpGet]
        public async Task<IActionResult> GetSectionsByClass(int classId)
        {
            var sections = await _context.ClassSections
                .Where(cs => cs.ClassId == classId)
                .Include(cs => cs.Section)
                .Select(cs => new { id = cs.Section.Id, name = cs.Section.Name })
                .ToListAsync();

            return Json(sections);
        }
    }
}

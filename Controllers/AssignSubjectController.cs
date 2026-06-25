using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;

namespace EasyEdu.Controllers
{
    [Authorize(Roles = "SuperAdmin,Admin")]
    public class AssignSubjectController : Controller
    {
        private readonly ApplicationDbContext _context;

        public AssignSubjectController(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            ViewBag.Classes = new SelectList(await _context.Classes.OrderBy(c => c.Name).ToListAsync(), "Id", "Name");
            ViewBag.Teachers = new SelectList(await _context.Teachers.Where(t => t.IsActive).OrderBy(t => t.FirstName).Select(t => new { Id = t.Id, FullName = t.FirstName + " " + t.LastName }).ToListAsync(), "Id", "FullName");

            var getAssignSubjects = await _context.AssignSubjects
                .Include(a => a.Class)
                .Include(a => a.Section)
                .Include(a => a.Subject)
                .Include(a => a.Teacher)
                .OrderByDescending(a => a.CreatedAt)
                .ToListAsync();

            return View(getAssignSubjects);
        }

        [HttpGet]
        public IActionResult Create()
        {
            return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(AssignSubject assignment)
        {
            ModelState.Remove("Class");
            ModelState.Remove("Section");
            ModelState.Remove("Subject");
            ModelState.Remove("Teacher");

            if (ModelState.IsValid)
            {
                var exists = await _context.AssignSubjects
                    .AnyAsync(a => a.ClassId == assignment.ClassId && a.SectionId == assignment.SectionId && a.SubjectId == assignment.SubjectId);

                if (!exists)
                {
                    _context.Add(assignment);
                    await _context.SaveChangesAsync();
                    TempData["Success"] = "Subject assigned successfully!";
                    return RedirectToAction(nameof(Index));
                }
                else
                {
                    ModelState.AddModelError("", "This subject is already assigned for this class/section.");
                }
            }
            
            ViewBag.Classes = new SelectList(await _context.Classes.OrderBy(c => c.Name).ToListAsync(), "Id", "Name", assignment.ClassId);
            ViewBag.Teachers = new SelectList(await _context.Teachers.Where(t => t.IsActive).OrderBy(t => t.FirstName).Select(t => new { Id = t.Id, FullName = t.FirstName + " " + t.LastName }).ToListAsync(), "Id", "FullName", assignment.TeacherId);

            var list = await _context.AssignSubjects
               .Include(a => a.Class)
               .Include(a => a.Section)
               .Include(a => a.Subject)
               .Include(a => a.Teacher)
               .OrderByDescending(a => a.CreatedAt)
               .ToListAsync();
            
            return View("Index", list);
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var assignment = await _context.AssignSubjects.FindAsync(id);
            if (assignment == null) return NotFound();

            ViewBag.Classes = new SelectList(await _context.Classes.OrderBy(c => c.Name).ToListAsync(), "Id", "Name", assignment.ClassId);
            ViewBag.Teachers = new SelectList(await _context.Teachers.Where(t => t.IsActive).OrderBy(t => t.FirstName).Select(t => new { Id = t.Id, FullName = t.FirstName + " " + t.LastName }).ToListAsync(), "Id", "FullName", assignment.TeacherId);
            return View(assignment);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, AssignSubject assignment)
        {
            ModelState.Remove("Class");
            ModelState.Remove("Section");
            ModelState.Remove("Subject");
            ModelState.Remove("Teacher");

            if (id != assignment.Id) return NotFound();

            if (ModelState.IsValid)
            {
                var exists = await _context.AssignSubjects
                    .AnyAsync(a => a.ClassId == assignment.ClassId && a.SectionId == assignment.SectionId && a.SubjectId == assignment.SubjectId && a.Id != id);

                if (!exists)
                {
                    _context.Update(assignment);
                    await _context.SaveChangesAsync();
                    TempData["Success"] = "Assignment updated successfully!";
                    return RedirectToAction(nameof(Index));
                }
                else
                {
                    ModelState.AddModelError("", "This subject is already assigned for this class/section.");
                }
            }

            ViewBag.Classes = new SelectList(await _context.Classes.OrderBy(c => c.Name).ToListAsync(), "Id", "Name", assignment.ClassId);
            ViewBag.Teachers = new SelectList(await _context.Teachers.Where(t => t.IsActive).OrderBy(t => t.FirstName).Select(t => new { Id = t.Id, FullName = t.FirstName + " " + t.LastName }).ToListAsync(), "Id", "FullName", assignment.TeacherId);
            return View(assignment);
        }

        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            var assignment = await _context.AssignSubjects.FindAsync(id);
            if (assignment != null)
            {
                _context.AssignSubjects.Remove(assignment);
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
                .Select(cs => new { id = cs.SectionId, name = cs.Section.Name })
                .ToListAsync();

            return Json(sections);
        }

        [HttpGet]
        public async Task<IActionResult> GetSubjectsByClass(int classId)
        {
             var subjects = await _context.Subjects
                .Where(s => s.ClassId == classId)
                .Select(s => new { id = s.Id, name = s.Name + " (" + s.Code + ")" })
                .ToListAsync();

            return Json(subjects);
        }
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;

namespace EasyEdu.Controllers
{
    [Authorize(Roles = "SuperAdmin,Admin,Teacher")]
    public class ClassRoutineController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ClassRoutineController(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index(int? classId, int? sectionId)
        {
            ViewBag.Classes = new SelectList(await _context.Classes.OrderBy(c => c.Name).ToListAsync(), "Id", "Name", classId);
            
            if (classId.HasValue)
            {
                var sections = await _context.ClassSections
                    .Where(cs => cs.ClassId == classId)
                    .Include(cs => cs.Section)
                    .Select(cs => cs.Section)
                    .ToListAsync();
                ViewBag.Sections = new SelectList(sections, "Id", "Name", sectionId);
            }
            else
            {
                ViewBag.Sections = new SelectList(Enumerable.Empty<Section>(), "Id", "Name");
            }

            if (classId.HasValue && sectionId.HasValue)
            {
                var routine = await _context.TimeTables
                    .Where(t => t.ClassId == classId && t.SectionId == sectionId)
                    .Include(t => t.Subject)
                    .Include(t => t.Teacher)
                    .Include(t => t.ClassRoom)
                    .OrderBy(t => t.StartTime)
                    .ToListAsync();

                var days = new List<string> { "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" };
                
                var viewModel = new ClassRoutinePageViewModel
                {
                    ClassId = classId.Value,
                    SectionId = sectionId.Value,
                    Days = days,
                    RoutineData = routine.GroupBy(r => r.DayOfWeek).ToDictionary(g => g.Key, g => g.ToList())
                };

                // For Add Modal
                ViewBag.Teachers = new SelectList(await _context.Teachers.Where(t => t.IsActive).Select(t => new { Id = t.Id, Name = t.FirstName + " " + t.LastName }).ToListAsync(), "Id", "Name");
                ViewBag.Rooms = new SelectList(await _context.ClassRooms.Where(r => r.IsActive).ToListAsync(), "Id", "RoomNo");
                ViewBag.Subjects = new SelectList(await _context.Subjects.Where(s => s.ClassId == classId).ToListAsync(), "Id", "Name");

                return View(viewModel);
            }

            return View(new ClassRoutinePageViewModel());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddRoutine(TimeTable routine)
        {
            ModelState.Remove("Class");
            ModelState.Remove("Section");
            ModelState.Remove("Subject");
            ModelState.Remove("Teacher");
            ModelState.Remove("ClassRoom");

            if (ModelState.IsValid)
            {
                _context.TimeTables.Add(routine);
                await _context.SaveChangesAsync();
                TempData["Success"] = "Class routine saved successfully!";
                return RedirectToAction(nameof(Index), new { classId = routine.ClassId, sectionId = routine.SectionId });
            }
            TempData["Error"] = "Failed to save class routine: " + string.Join(", ", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage));
            return RedirectToAction(nameof(Index), new { classId = routine.ClassId, sectionId = routine.SectionId });
        }

        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            var routine = await _context.TimeTables.FindAsync(id);
            if (routine != null)
            {
                int cId = routine.ClassId;
                int sId = routine.SectionId;
                _context.TimeTables.Remove(routine);
                await _context.SaveChangesAsync();
                TempData["Success"] = "Class routine deleted successfully!";
                return RedirectToAction(nameof(Index), new { classId = cId, sectionId = sId });
            }
            return RedirectToAction(nameof(Index));
        }
    }

    public class ClassRoutinePageViewModel
    {
        public int ClassId { get; set; }
        public int SectionId { get; set; }
        public List<string> Days { get; set; } = new List<string>();
        public Dictionary<string, List<TimeTable>> RoutineData { get; set; } = new Dictionary<string, List<TimeTable>>();
    }
}

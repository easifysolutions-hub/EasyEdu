using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;

namespace EasyEdu.Controllers
{
    [Authorize(Roles = "SuperAdmin,Admin,Teacher")]
    public class TimeTableController : Controller
    {
        private readonly ApplicationDbContext _context;

        public TimeTableController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: TimeTable
        public async Task<IActionResult> Index(int? classId)
        {
            var classes = await _context.Classes.ToListAsync();
            ViewBag.Classes = new SelectList(classes, "Id", "Name", classId);

            if (classId.HasValue)
            {
                var schedules = await _context.TimeTables
                    .Include(t => t.Subject)
                    .Include(t => t.Teacher)
                    .Where(t => t.ClassId == classId.Value)
                    .ToListAsync();
                
                ViewBag.Class = await _context.Classes.FindAsync(classId.Value);
                return View(schedules);
            }

            return View(new List<TimeTable>());
        }

        // GET: TimeTable/Create
        public async Task<IActionResult> Create(int classId)
        {
            ViewBag.Class = await _context.Classes.FindAsync(classId);
            ViewBag.Subjects = new SelectList(await _context.Subjects.Where(s => s.ClassId == classId).ToListAsync(), "Id", "Name");
            ViewBag.Teachers = new SelectList(await _context.Teachers.ToListAsync(), "Id", "FullName");
            
            var days = new List<string> { "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" };
            ViewBag.Days = new SelectList(days);

            return View(new TimeTable { ClassId = classId });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(TimeTable timeTable)
        {
            if (ModelState.IsValid)
            {
                _context.Add(timeTable);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index), new { classId = timeTable.ClassId });
            }
            return View(timeTable);
        }

        public async Task<IActionResult> TeacherSchedule(int teacherId)
        {
            var schedules = await _context.TimeTables
                .Include(t => t.Class)
                .Include(t => t.Subject)
                .Where(t => t.TeacherId == teacherId)
                .ToListAsync();
            return View(schedules);
        }
    }
}

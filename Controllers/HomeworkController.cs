using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace EasyEdu.Controllers
{
    public class HomeworkController : Controller
    {
        private readonly ApplicationDbContext _context;

        public HomeworkController(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            var homeworks = await _context.Homeworks
                .Include(h => h.Class)
                .Include(h => h.Subject)
                .ToListAsync();
            return View(homeworks);
        }

        public IActionResult Create()
        {
            ViewBag.Classes = new SelectList(_context.Classes.ToList(), "Id", "Name");
            ViewBag.Subjects = new SelectList(_context.Subjects.ToList(), "Id", "Name");
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(Homework homework, IFormFile? file)
        {
            if (ModelState.IsValid)
            {
                if (file != null)
                {
                    string wwwRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
                    string fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                    string path = Path.Combine(wwwRootPath, @"uploads\homework");
                    if (!Directory.Exists(path)) Directory.CreateDirectory(path);
                    using (var fileStream = new FileStream(Path.Combine(path, fileName), FileMode.Create))
                    {
                        file.CopyTo(fileStream);
                    }
                    homework.FilePath = @"\uploads\homework\" + fileName;
                }
                homework.CreatedBy = User.Identity?.Name ?? "Admin";
                _context.Add(homework);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewBag.Classes = new SelectList(await _context.Classes.ToListAsync(), "Id", "Name", homework.ClassId);
            ViewBag.Subjects = new SelectList(await _context.Subjects.ToListAsync(), "Id", "Name", homework.SubjectId);
            return View(homework);
        }

        public async Task<IActionResult> HomeworkReport(int? classId, int? subjectId)
        {
            var homeworks = await _context.Homeworks
                .Include(h => h.Class)
                .Include(h => h.Subject)
                .Where(h => (!classId.HasValue || h.ClassId == classId.Value) && (!subjectId.HasValue || h.SubjectId == subjectId.Value))
                .ToListAsync();

            ViewBag.Classes = new SelectList(await _context.Classes.ToListAsync(), "Id", "Name", classId);
            return View(homeworks);
        }
    }
}

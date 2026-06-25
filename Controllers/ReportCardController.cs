using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;

namespace EasyEdu.Controllers
{
    [Authorize]
    public class ReportCardController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ReportCardController(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index(int studentId, int academicYearId)
        {
            var student = await _context.Students
                .Include(s => s.Class)
                .Include(s => s.Company)
                .FirstOrDefaultAsync(s => s.Id == studentId);

            if (student == null) return NotFound();

            var marks = await _context.Marks
                .Include(m => m.Subject)
                .Include(m => m.Examination)
                .Where(m => m.StudentId == studentId && m.Examination.AcademicYearId == academicYearId)
                .ToListAsync();

            ViewBag.Marks = marks;
            ViewBag.AcademicYear = await _context.AcademicYears.FindAsync(academicYearId);

            return View(student);
        }
    }
}

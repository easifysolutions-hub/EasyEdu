using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;

namespace EasyEdu.Controllers
{
    [Authorize(Roles = "SuperAdmin,Admin")]
    public class TeacherEvaluationController : Controller
    {
        private readonly ApplicationDbContext _context;

        public TeacherEvaluationController(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> ApprovedReport()
        {
            var evaluations = await _context.TeacherEvaluations
                .Include(te => te.Teacher)
                .Where(te => te.Status == "Approved")
                .ToListAsync();
            return View(evaluations);
        }

        public async Task<IActionResult> PendingReport()
        {
            var evaluations = await _context.TeacherEvaluations
                .Include(te => te.Teacher)
                .Where(te => te.Status == "Pending")
                .ToListAsync();
            return View(evaluations);
        }

        public async Task<IActionResult> TeacherWiseReport(int? teacherId)
        {
            if (teacherId.HasValue)
            {
                var reports = await _context.TeacherEvaluations
                    .Include(te => te.Teacher)
                    .Where(te => te.TeacherId == teacherId.Value)
                    .ToListAsync();
                ViewBag.Reports = reports;
            }

            ViewBag.Teachers = new SelectList(await _context.Teachers.ToListAsync(), "Id", "FullName");
            return View();
        }

        public async Task<IActionResult> Settings()
        {
            var criteria = await _context.EvaluationCriteria.ToListAsync();
            return View(criteria);
        }

        [HttpPost]
        public async Task<IActionResult> AddCriterion(EvaluationCriterion criterion)
        {
            if (ModelState.IsValid)
            {
                _context.EvaluationCriteria.Add(criterion);
                await _context.SaveChangesAsync();
                TempData["Success"] = "Criterion added successfully.";
            }
            return RedirectToAction(nameof(Settings));
        }

        [HttpPost]
        public async Task<IActionResult> Approve(int id)
        {
            var eval = await _context.TeacherEvaluations.FindAsync(id);
            if (eval != null)
            {
                eval.Status = "Approved";
                await _context.SaveChangesAsync();
                TempData["Success"] = "Evaluation Approved.";
            }
            return RedirectToAction(nameof(PendingReport));
        }
    }
}

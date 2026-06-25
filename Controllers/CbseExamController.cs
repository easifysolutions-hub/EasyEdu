using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;
using System.Security.Claims;

namespace EasyEdu.Controllers
{
    [Authorize(Roles = "SuperAdmin,Admin,Teacher")]
    public class CbseExamController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CbseExamController(ApplicationDbContext context)
        {
            _context = context;
        }

        private async Task<int> GetCompanyId()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _context.Users.FindAsync(userId);
            return user?.CompanyId ?? 1;
        }

        public async Task<IActionResult> Index()
        {
            var companyId = await GetCompanyId();
            ViewBag.ExamCount = await _context.CbseExams.CountAsync(x => x.CompanyId == companyId);
            ViewBag.TermCount = await _context.CbseTerms.CountAsync(x => x.CompanyId == companyId);
            return View();
        }

        // --- Exams ---
        public async Task<IActionResult> Exams()
        {
            var companyId = await GetCompanyId();
            var exams = await _context.CbseExams.Include(e => e.Term).Where(e => e.CompanyId == companyId).ToListAsync();
            ViewBag.Terms = await _context.CbseTerms.Where(t => t.CompanyId == companyId).ToListAsync();
            return View(exams);
        }

        [HttpPost]
        public async Task<IActionResult> SaveExam(CbseExam model)
        {
            model.CompanyId = await GetCompanyId();
            if (model.Id > 0) _context.CbseExams.Update(model);
            else _context.CbseExams.Add(model);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Exams));
        }

        // --- Exam Schedule ---
        public async Task<IActionResult> ExamSchedule()
        {
            var companyId = await GetCompanyId();
            var schedules = await _context.CbseExamSchedules
                .Include(s => s.CbseExam)
                .Include(s => s.Class)
                .Include(s => s.Subject)
                .Where(s => s.CbseExam.CompanyId == companyId).ToListAsync();
            
            ViewBag.Exams = await _context.CbseExams.Where(e => e.CompanyId == companyId).ToListAsync();
            ViewBag.Classes = await _context.Classes.Where(c => c.CompanyId == companyId).ToListAsync();
            ViewBag.Subjects = await _context.Subjects.ToListAsync();
            return View(schedules);
        }

        [HttpPost]
        public async Task<IActionResult> SaveSchedule(CbseExamSchedule model)
        {
            if (model.Id > 0) _context.CbseExamSchedules.Update(model);
            else _context.CbseExamSchedules.Add(model);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(ExamSchedule));
        }

        // --- Print Marksheet ---
        public async Task<IActionResult> PrintMarksheet()
        {
            var companyId = await GetCompanyId();
            ViewBag.Classes = await _context.Classes.Where(c => c.CompanyId == companyId).ToListAsync();
            ViewBag.Exams = await _context.CbseExams.Where(e => e.CompanyId == companyId).ToListAsync();
            return View();
        }

        // --- Exam Grade ---
        public async Task<IActionResult> ExamGrade()
        {
            var companyId = await GetCompanyId();
            var grades = await _context.CbseGrades.Where(g => g.CompanyId == companyId).ToListAsync();
            return View(grades);
        }

        [HttpPost]
        public async Task<IActionResult> SaveGrade(CbseGrade model)
        {
            model.CompanyId = await GetCompanyId();
            if (model.Id > 0) _context.CbseGrades.Update(model);
            else _context.CbseGrades.Add(model);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(ExamGrade));
        }

        // --- Observations & Parameters ---
        public async Task<IActionResult> Observations()
        {
            var companyId = await GetCompanyId();
            var observations = await _context.CbseObservations.Include(o => o.Parameters).Where(o => o.CompanyId == companyId).ToListAsync();
            return View(observations);
        }

        [HttpPost]
        public async Task<IActionResult> SaveObservation(CbseObservation model)
        {
            model.CompanyId = await GetCompanyId();
            if (model.Id > 0) _context.CbseObservations.Update(model);
            else _context.CbseObservations.Add(model);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Observations));
        }

        public async Task<IActionResult> ObservationParameters()
        {
            var companyId = await GetCompanyId();
            var parameters = await _context.CbseObservationParameters.Include(p => p.Observation).Where(p => p.Observation.CompanyId == companyId).ToListAsync();
            ViewBag.Observations = await _context.CbseObservations.Where(o => o.CompanyId == companyId).ToListAsync();
            return View(parameters);
        }

        [HttpPost]
        public async Task<IActionResult> SaveParameter(CbseObservationParameter model)
        {
            if (model.Id > 0) _context.CbseObservationParameters.Update(model);
            else _context.CbseObservationParameters.Add(model);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(ObservationParameters));
        }

        // --- Assign Observations ---
        public async Task<IActionResult> AssignObservations()
        {
            var companyId = await GetCompanyId();
            ViewBag.Classes = await _context.Classes.Where(c => c.CompanyId == companyId).ToListAsync();
            ViewBag.Terms = await _context.CbseTerms.Where(t => t.CompanyId == companyId).ToListAsync();
            return View();
        }

        // --- Assessments ---
        public async Task<IActionResult> Assessments()
        {
            var companyId = await GetCompanyId();
            var assessments = await _context.CbseAssessments.Where(a => a.CompanyId == companyId).ToListAsync();
            return View(assessments);
        }

        [HttpPost]
        public async Task<IActionResult> SaveAssessment(CbseAssessment model)
        {
            model.CompanyId = await GetCompanyId();
            if (model.Id > 0) _context.CbseAssessments.Update(model);
            else _context.CbseAssessments.Add(model);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Assessments));
        }

        // --- Terms ---
        public async Task<IActionResult> Terms()
        {
            var companyId = await GetCompanyId();
            var terms = await _context.CbseTerms.Where(t => t.CompanyId == companyId).ToListAsync();
            return View(terms);
        }

        [HttpPost]
        public async Task<IActionResult> SaveTerm(CbseTerm model)
        {
            model.CompanyId = await GetCompanyId();
            if (model.Id > 0) _context.CbseTerms.Update(model);
            else _context.CbseTerms.Add(model);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Terms));
        }

        // --- Templates ---
        public async Task<IActionResult> Templates()
        {
            var companyId = await GetCompanyId();
            var templates = await _context.CbseMarkSheetTemplates.Where(t => t.CompanyId == companyId).ToListAsync();
            return View(templates);
        }

        [HttpPost]
        public async Task<IActionResult> SaveTemplate(CbseMarkSheetTemplate model)
        {
            model.CompanyId = await GetCompanyId();
            if (model.Id > 0) _context.CbseMarkSheetTemplates.Update(model);
            else _context.CbseMarkSheetTemplates.Add(model);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Templates));
        }

        // --- Reports ---
        public IActionResult Reports()
        {
            return View();
        }
    }
}

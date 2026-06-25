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
    public class OnlineExamController : Controller
    {
        private readonly ApplicationDbContext _context;

        public OnlineExamController(ApplicationDbContext context)
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
            var exams = await _context.OnlineExams.Where(e => _context.Classes.Any(c => c.Id == e.ClassId && c.CompanyId == companyId)).ToListAsync();
            return View(exams);
        }

        public async Task<IActionResult> QuestionGroup()
        {
            var companyId = await GetCompanyId();
            // Since QuestionGroup doesn't have CompanyId, we'll just show all or add CompanyId later.
            // For now, let's assume it's shared or company-agnostic (not ideal).
            return View(await _context.QuestionGroups.ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> CreateQuestionGroup(QuestionGroup group)
        {
            _context.QuestionGroups.Add(group);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(QuestionGroup));
        }

        public async Task<IActionResult> QuestionBank()
        {
            var companyId = await GetCompanyId();
            ViewBag.Groups = new SelectList(await _context.QuestionGroups.ToListAsync(), "Id", "Title");
            var questions = await _context.QuestionBanks.Include(q => q.QuestionGroup).ToListAsync();
            return View(questions);
        }

        [HttpPost]
        public async Task<IActionResult> CreateQuestion(QuestionBank examQuestion)
        {
            _context.QuestionBanks.Add(examQuestion);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(QuestionBank));
        }

        public async Task<IActionResult> OnlineExam()
        {
            var companyId = await GetCompanyId();
            ViewBag.Classes = new SelectList(await _context.Classes.Where(c => c.CompanyId == companyId).ToListAsync(), "Id", "Name");
            ViewBag.Subjects = new SelectList(await _context.Subjects.ToListAsync(), "Id", "Name");
            var exams = await _context.OnlineExams.Where(e => _context.Classes.Any(c => c.Id == e.ClassId && c.CompanyId == companyId)).ToListAsync();
            return View(exams);
        }

        public async Task<IActionResult> AddOnlineExam()
        {
            var companyId = await GetCompanyId();
            ViewBag.Classes = new SelectList(await _context.Classes.Where(c => c.CompanyId == companyId).ToListAsync(), "Id", "Name");
            ViewBag.Subjects = new SelectList(await _context.Subjects.ToListAsync(), "Id", "Name");
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> CreateOnlineExam(OnlineExam exam)
        {
            _context.OnlineExams.Add(exam);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(OnlineExam));
        }

        public async Task<IActionResult> WrittenExam()
        {
            var companyId = await GetCompanyId();
            ViewBag.Classes = new SelectList(await _context.Classes.Where(c => c.CompanyId == companyId).ToListAsync(), "Id", "Name");
            ViewBag.Subjects = new SelectList(await _context.Subjects.ToListAsync(), "Id", "Name");
            var exams = await _context.WrittenExams.Where(e => e.CompanyId == companyId).ToListAsync();
            return View(exams);
        }

        [HttpPost]
        public async Task<IActionResult> CreateWrittenExam(WrittenExam model)
        {
            model.CompanyId = await GetCompanyId();
            _context.WrittenExams.Add(model);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(WrittenExam));
        }

        public async Task<IActionResult> Settings()
        {
            var companyId = await GetCompanyId();
            var settings = await _context.OnlineExamSettings.FirstOrDefaultAsync(s => s.CompanyId == companyId);
            if (settings == null)
            {
                settings = new OnlineExamSetting { CompanyId = companyId };
                _context.OnlineExamSettings.Add(settings);
                await _context.SaveChangesAsync();
            }
            return View(settings);
        }

        [HttpPost]
        public async Task<IActionResult> SaveSettings(OnlineExamSetting model)
        {
            var companyId = await GetCompanyId();
            var existing = await _context.OnlineExamSettings.FirstOrDefaultAsync(s => s.CompanyId == companyId);
            if (existing != null)
            {
                existing.EnableNegativeMarking = model.EnableNegativeMarking;
                existing.ShowResultImmediately = model.ShowResultImmediately;
                existing.AllowRetry = model.AllowRetry;
                existing.SessionTimeoutMinutes = model.SessionTimeoutMinutes;
                _context.OnlineExamSettings.Update(existing);
            }
            else
            {
                model.CompanyId = companyId;
                _context.OnlineExamSettings.Add(model);
            }
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Settings));
        }
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;
using System.Security.Claims;

namespace EasyEdu.Controllers
{
    [Authorize(Roles = "SuperAdmin,Admin")]
    public class ExamSettingsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ExamSettingsController(ApplicationDbContext context)
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
            var settings = await _context.ExamSettings.FirstOrDefaultAsync(s => s.CompanyId == companyId)
                           ?? new ExamSettings { CompanyId = companyId };
            return View(settings);
        }

        // --- Format Settings ---
        public async Task<IActionResult> FormatSettings()
        {
            var companyId = await GetCompanyId();
            var settings = await _context.ExamFormatSettings.FirstOrDefaultAsync(s => s.CompanyId == companyId)
                           ?? new ExamFormatSetting { CompanyId = companyId };
            return View(settings);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SaveFormatSettings(ExamFormatSetting settings)
        {
            var existing = await _context.ExamFormatSettings.FirstOrDefaultAsync(s => s.Id == settings.Id);
            if (existing != null)
            {
                _context.Entry(existing).CurrentValues.SetValues(settings);
            }
            else
            {
                _context.ExamFormatSettings.Add(settings);
            }
            await _context.SaveChangesAsync();
            TempData["Success"] = "Exam Format Settings updated.";
            return RedirectToAction(nameof(FormatSettings));
        }

        // --- Setup Exam Rule ---
        public async Task<IActionResult> SetupExamRule()
        {
            var companyId = await GetCompanyId();
            var rules = await _context.ExamRules.Where(r => r.CompanyId == companyId).ToListAsync();
            return View(rules);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SaveExamRule(ExamRule rule)
        {
            rule.CompanyId = await GetCompanyId();
            if (rule.Id > 0)
            {
                _context.ExamRules.Update(rule);
            }
            else
            {
                _context.ExamRules.Add(rule);
            }
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(SetupExamRule));
        }

        // --- Position / Ranking Logic ---
        public async Task<IActionResult> Position(int? examinationId)
        {
            var companyId = await GetCompanyId();
            ViewBag.Exams = await _context.Examinations.Where(e => e.AcademicYear.CompanyId == companyId).ToListAsync();
            
            if (examinationId.HasValue)
            {
                var positions = await _context.ExamPositions
                    .Include(p => p.Student)
                    .Where(p => p.ExaminationId == examinationId.Value)
                    .OrderBy(p => p.Rank)
                    .ToListAsync();
                return View(positions);
            }
            return View(new List<ExamPosition>());
        }

        [HttpPost]
        public async Task<IActionResult> GeneratePositions(int examinationId)
        {
            // Logic to calculate ranks based on marks
            var marks = await _context.Marks
                .Where(m => m.ExaminationId == examinationId)
                .GroupBy(m => m.StudentId)
                .Select(g => new { StudentId = g.Key, Total = g.Sum(m => m.MarksObtained) })
                .OrderByDescending(x => x.Total)
                .ToListAsync();

            // Clear old positions
            var old = _context.ExamPositions.Where(p => p.ExaminationId == examinationId);
            _context.ExamPositions.RemoveRange(old);

            int rank = 1;
            foreach (var m in marks)
            {
                _context.ExamPositions.Add(new ExamPosition
                {
                    StudentId = m.StudentId,
                    ExaminationId = examinationId,
                    TotalMarks = m.Total,
                    Rank = rank++
                });
            }

            await _context.SaveChangesAsync();
            TempData["Success"] = "Merit positions generated successfully.";
            return RedirectToAction(nameof(Position), new { examinationId });
        }

        public async Task<IActionResult> AllExamPosition()
        {
            var positions = await _context.ExamPositions
                .Include(p => p.Student)
                .Include(p => p.Examination)
                .OrderByDescending(p => p.GeneratedAt)
                .Take(100)
                .ToListAsync();
            return View(positions);
        }

        // --- Signature Settings ---
        public async Task<IActionResult> SignatureSettings()
        {
            var companyId = await GetCompanyId();
            var settings = await _context.ExamSignatureSettings.FirstOrDefaultAsync(s => s.CompanyId == companyId)
                           ?? new ExamSignatureSetting { CompanyId = companyId };
            return View(settings);
        }

        [HttpPost]
        public async Task<IActionResult> SaveSignatureSettings(ExamSignatureSetting settings, IFormFile? principalSig, IFormFile? teacherSig)
        {
            var existing = await _context.ExamSignatureSettings.FirstOrDefaultAsync(s => s.Id == settings.Id);
            
            if (principalSig != null)
            {
                var path = await SaveFile(principalSig, "signatures");
                settings.PrincipalSignaturePath = path;
            }
            if (teacherSig != null)
            {
                var path = await SaveFile(teacherSig, "signatures");
                settings.TeacherSignaturePath = path;
            }

            if (existing != null)
            {
                _context.Entry(existing).CurrentValues.SetValues(settings);
                if (settings.PrincipalSignaturePath == null) settings.PrincipalSignaturePath = existing.PrincipalSignaturePath;
                if (settings.TeacherSignaturePath == null) settings.TeacherSignaturePath = existing.TeacherSignaturePath;
            }
            else
            {
                _context.ExamSignatureSettings.Add(settings);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(SignatureSettings));
        }

        // --- Admit Card Setting ---
        public async Task<IActionResult> AdmitCardSetting()
        {
            var companyId = await GetCompanyId();
            var settings = await _context.AdmitCardSettings.FirstOrDefaultAsync(s => s.CompanyId == companyId)
                           ?? new AdmitCardSetting { CompanyId = companyId };
            return View(settings);
        }

        [HttpPost]
        public async Task<IActionResult> SaveAdmitCardSetting(AdmitCardSetting settings)
        {
             var existing = await _context.AdmitCardSettings.FirstOrDefaultAsync(s => s.Id == settings.Id);
            if (existing != null) _context.Entry(existing).CurrentValues.SetValues(settings);
            else _context.AdmitCardSettings.Add(settings);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(AdmitCardSetting));
        }

        // --- Seat Plan Setting ---
        public async Task<IActionResult> SeatPlanSetting()
        {
            var companyId = await GetCompanyId();
            var settings = await _context.SeatPlanSettings.FirstOrDefaultAsync(s => s.CompanyId == companyId)
                           ?? new SeatPlanSetting { CompanyId = companyId };
            return View(settings);
        }

        [HttpPost]
        public async Task<IActionResult> SaveSeatPlanSetting(SeatPlanSetting settings)
        {
             var existing = await _context.SeatPlanSettings.FirstOrDefaultAsync(s => s.Id == settings.Id);
            if (existing != null) _context.Entry(existing).CurrentValues.SetValues(settings);
            else _context.SeatPlanSettings.Add(settings);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(SeatPlanSetting));
        }

        private async Task<string> SaveFile(IFormFile file, string folder)
        {
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads", folder, fileName);
            Directory.CreateDirectory(Path.GetDirectoryName(filePath)!);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            return $"/uploads/{folder}/{fileName}";
        }
    }
}

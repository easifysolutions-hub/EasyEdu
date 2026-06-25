using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;

namespace EasyEdu.Controllers
{
    [Authorize(Roles = "SuperAdmin,Admin,Teacher")]
    public class LessonPlanController : Controller
    {
        private readonly ApplicationDbContext _context;

        public LessonPlanController(ApplicationDbContext context)
        {
            _context = context;
        }

        // --- Lessons ---
        public async Task<IActionResult> Lesson()
        {
            var lessons = await _context.Lessons
                .Include(l => l.Class)
                .Include(l => l.Subject)
                .ToListAsync();
            ViewBag.Classes = new SelectList(await _context.Classes.ToListAsync(), "Id", "Name");
            return View(lessons);
        }

        [HttpGet]
        public async Task<IActionResult> GetSubjectsByClass(int classId)
        {
            var subjects = await _context.Subjects
                .Where(s => s.ClassId == classId)
                .Select(s => new { id = s.Id, name = s.Name })
                .ToListAsync();
            return Json(subjects);
        }

        [HttpPost]
        public async Task<IActionResult> CreateLesson(Lesson lesson)
        {
            ModelState.Remove("Subject");
            ModelState.Remove("Class");
            ModelState.Remove("Topics");

            if (ModelState.IsValid)
            {
                _context.Lessons.Add(lesson);
                await _context.SaveChangesAsync();
                TempData["Success"] = "Lesson created successfully.";
            }
            else
            {
                TempData["Error"] = "Failed to create lesson: " + string.Join(", ", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage));
            }
            return RedirectToAction(nameof(Lesson));
        }

        // --- Topics ---
        public async Task<IActionResult> Topic()
        {
            var topics = await _context.Topics
                .Include(t => t.Lesson)
                .ThenInclude(l => l.Subject)
                .ToListAsync();
            ViewBag.Lessons = new SelectList(await _context.Lessons.ToListAsync(), "Id", "LessonName");
            return View(topics);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTopic(Topic topic)
        {
            ModelState.Remove("Lesson");

            if (ModelState.IsValid)
            {
                _context.Topics.Add(topic);
                await _context.SaveChangesAsync();
                TempData["Success"] = "Topic created successfully.";
            }
            else
            {
                TempData["Error"] = "Failed to create topic: " + string.Join(", ", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage));
            }
            return RedirectToAction(nameof(Topic));
        }

        // --- Topic Overview ---
        public async Task<IActionResult> TopicOverview(int? classId, int? subjectId)
        {
            var topics = _context.Topics
                .Include(t => t.Lesson)
                .ThenInclude(l => l.Subject)
                .AsQueryable();

            if (classId.HasValue) topics = topics.Where(t => t.Lesson.ClassId == classId.Value);
            if (subjectId.HasValue) topics = topics.Where(t => t.Lesson.SubjectId == subjectId.Value);

            ViewBag.Classes = new SelectList(await _context.Classes.ToListAsync(), "Id", "Name", classId);
            return View(await topics.ToListAsync());
        }

        // --- Lesson Plan ---
        public async Task<IActionResult> Index()
        {
            var plans = await _context.LessonPlans
                .Include(p => p.Teacher)
                .Include(p => p.Lesson)
                .Include(p => p.Topic)
                .ToListAsync();
            
            ViewBag.Teachers = new SelectList(await _context.Teachers.ToListAsync(), "Id", "FullName");
            ViewBag.Lessons = new SelectList(await _context.Lessons.ToListAsync(), "Id", "LessonName");
            ViewBag.Topics = new SelectList(await _context.Topics.ToListAsync(), "Id", "TopicName");
            
            return View(plans);
        }

        [HttpPost]
        public async Task<IActionResult> CreateLessonPlan(LessonPlan plan)
        {
            ModelState.Remove("Teacher");
            ModelState.Remove("Lesson");
            ModelState.Remove("Topic");

            if (ModelState.IsValid)
            {
                _context.LessonPlans.Add(plan);
                await _context.SaveChangesAsync();
                TempData["Success"] = "Lesson Plan assigned successfully.";
            }
            else
            {
                TempData["Error"] = "Failed to assign lesson plan: " + string.Join(", ", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage));
            }
            return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        public async Task<IActionResult> EditLessonPlan(LessonPlan plan)
        {
            ModelState.Remove("Teacher");
            ModelState.Remove("Lesson");
            ModelState.Remove("Topic");

            if (ModelState.IsValid)
            {
                var existing = await _context.LessonPlans.FindAsync(plan.Id);
                if (existing != null)
                {
                    existing.TeacherId = plan.TeacherId;
                    existing.LessonId = plan.LessonId;
                    existing.TopicId = plan.TopicId;
                    existing.ExecutionDate = plan.ExecutionDate;
                    existing.Status = plan.Status;

                    _context.Update(existing);
                    await _context.SaveChangesAsync();
                    TempData["Success"] = "Lesson Plan updated successfully.";
                }
                else
                {
                    TempData["Error"] = "Lesson Plan not found.";
                }
            }
            else
            {
                TempData["Error"] = "Failed to update lesson plan: " + string.Join(", ", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage));
            }
            return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        public async Task<IActionResult> DeleteLessonPlan(int id)
        {
            var plan = await _context.LessonPlans.FindAsync(id);
            if (plan != null)
            {
                _context.LessonPlans.Remove(plan);
                await _context.SaveChangesAsync();
                TempData["Success"] = "Lesson Plan deleted successfully.";
            }
            else
            {
                TempData["Error"] = "Lesson Plan not found.";
            }
            return RedirectToAction(nameof(Index));
        }

        // --- Lesson Plan Overview ---
        public async Task<IActionResult> LessonPlanOverview(int? teacherId)
        {
            var plans = _context.LessonPlans
                .Include(p => p.Teacher)
                .Include(p => p.Lesson)
                .Include(p => p.Topic)
                .AsQueryable();

            if (teacherId.HasValue) plans = plans.Where(p => p.TeacherId == teacherId.Value);
            
            ViewBag.Teachers = new SelectList(await _context.Teachers.ToListAsync(), "Id", "FullName", teacherId);
            return View(await plans.ToListAsync());
        }

        // --- Settings ---
        [HttpGet]
        public async Task<IActionResult> Settings()
        {
            var company = await _context.Companies.FirstOrDefaultAsync();
            var companyId = company?.Id ?? 0;
            var settings = await _context.LessonPlanSettings.FirstOrDefaultAsync(s => s.CompanyId == companyId);
            
            if (settings == null && company != null)
            {
                settings = new LessonPlanSettings 
                { 
                    CompanyId = company.Id,
                    RestrictEdit = true,
                    NotifyStudents = false,
                    RequireApproval = false,
                    WarningDays = 3
                };
                _context.LessonPlanSettings.Add(settings);
                await _context.SaveChangesAsync();
            }
            
            return View(settings);
        }

        [HttpPost]
        public async Task<IActionResult> Settings(LessonPlanSettings settings)
        {
            ModelState.Remove("Company");

            if (ModelState.IsValid)
            {
                _context.Update(settings);
                await _context.SaveChangesAsync();
                TempData["Success"] = "Lesson Plan Settings updated successfully.";
            }
            else
            {
                TempData["Error"] = "Failed to update settings: " + string.Join(", ", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage));
            }
            return View(settings);
        }
    }
}

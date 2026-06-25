using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;

namespace EasyEdu.Controllers
{
    [Authorize(Roles = "SuperAdmin,Admin,Teacher")]
    public class ExaminationsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ExaminationsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Examinations
        public async Task<IActionResult> Index()
        {
            var exams = await _context.Examinations
                .Include(e => e.AcademicYear)
                .OrderByDescending(e => e.StartDate)
                .ToListAsync();
            return View(exams);
        }


        // GET: Examinations/Create
        public IActionResult Create()
        {
            ViewBag.AcademicYearId = new SelectList(_context.AcademicYears, "Id", "Name");
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Examination examination)
        {
            if (ModelState.IsValid)
            {
                examination.CreatedAt = DateTime.UtcNow;
                _context.Add(examination);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewBag.AcademicYearId = new SelectList(_context.AcademicYears, "Id", "Name", examination.AcademicYearId);
            return View(examination);
        }

        // GET: Examinations/EnterMarks
        public async Task<IActionResult> EnterMarks(int examId, int classId, int subjectId)
        {
            var students = await _context.Students
                .Where(s => s.ClassId == classId)
                .OrderBy(s => s.FirstName)
                .ToListAsync();

            var existingMarks = await _context.Marks
                .Where(m => m.ExaminationId == examId && m.SubjectId == subjectId)
                .ToDictionaryAsync(m => m.StudentId);

            ViewBag.Exam = await _context.Examinations.FindAsync(examId);
            ViewBag.Class = await _context.Classes.FindAsync(classId);
            ViewBag.Subject = await _context.Subjects.FindAsync(subjectId);
            ViewBag.ExistingMarks = existingMarks;

            return View(students);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SaveMarks(int examId, int subjectId, Dictionary<int, decimal> marksData, Dictionary<int, string> remarksData)
        {
            foreach (var item in marksData)
            {
                int studentId = item.Key;
                decimal marksObtained = item.Value;
                string remark = remarksData.ContainsKey(studentId) ? remarksData[studentId] : string.Empty;

                var existing = await _context.Marks
                    .FirstOrDefaultAsync(m => m.ExaminationId == examId && m.SubjectId == subjectId && m.StudentId == studentId);

                if (existing != null)
                {
                    existing.MarksObtained = marksObtained;
                    existing.Remarks = remark;
                }
                else
                {
                    _context.Marks.Add(new Mark
                    {
                        ExaminationId = examId,
                        SubjectId = subjectId,
                        StudentId = studentId,
                        MarksObtained = marksObtained,
                        MaxMarks = 100, // Default for now
                        Remarks = remark,
                        CreatedAt = DateTime.UtcNow
                    });
                }
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
        // Exam Type Management
        public async Task<IActionResult> ExamType()
        {
            return View(await _context.ExamTypes.ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> CreateExamType(ExamType examType)
        {
            _context.ExamTypes.Add(examType);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(ExamType));
        }

        // Exam Schedule
        public async Task<IActionResult> ExamSchedule(int? examId, int? classId)
        {
            var query = _context.ExamSchedules
                .Include(s => s.Examination)
                .Include(s => s.Class)
                .Include(s => s.Subject)
                .Include(s => s.ClassRoom)
                .AsQueryable();

            if (examId.HasValue) query = query.Where(s => s.ExaminationId == examId.Value);
            if (classId.HasValue) query = query.Where(s => s.ClassId == classId.Value);

            ViewBag.Exams = new SelectList(await _context.Examinations.ToListAsync(), "Id", "Name");
            ViewBag.Classes = new SelectList(await _context.Classes.ToListAsync(), "Id", "Name");
            
            return View(await query.ToListAsync());
        }

        // Exam Attendance
        public async Task<IActionResult> ExamAttendance(int? scheduleId)
        {
            if (scheduleId.HasValue)
            {
                var schedule = await _context.ExamSchedules.Include(s => s.Class).FirstOrDefaultAsync(s => s.Id == scheduleId);
                var students = await _context.Students.Where(s => s.ClassId == schedule.ClassId).ToListAsync();
                ViewBag.Schedule = schedule;
                return View(students);
            }
            ViewBag.Schedules = new SelectList(await _context.ExamSchedules.Include(s => s.Subject).Include(s => s.Class).ToListAsync(), "Id", "Subject.Name");
            return View(new List<Student>());
        }

        // Marks Register
        public async Task<IActionResult> MarksRegister(int? examId, int? classId)
        {
            var query = _context.Marks
                .Include(m => m.Student)
                .Include(m => m.Examination)
                .Include(m => m.Subject)
                .AsQueryable();

            if (examId.HasValue) query = query.Where(m => m.ExaminationId == examId.Value);
            if (classId.HasValue) query = query.Where(m => m.Student.ClassId == classId.Value);

            ViewBag.Exams = new SelectList(await _context.Examinations.ToListAsync(), "Id", "Name");
            ViewBag.Classes = new SelectList(await _context.Classes.ToListAsync(), "Id", "Name");

            return View(await query.ToListAsync());
        }

        // Marks Grade
        public async Task<IActionResult> MarksGrade()
        {
            return View(await _context.MarkGrades.OrderByDescending(g => g.MinPercentage).ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> CreateGrade(MarkGrade grade)
        {
            _context.MarkGrades.Add(grade);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(MarksGrade));
        }

        // Send Marks via SMS
        public IActionResult SendMarksBySms()
        {
            ViewBag.Exams = new SelectList(_context.Examinations.ToList(), "Id", "Name");
            return View();
        }

        [HttpPost]
        public IActionResult ProcessSms(int examId, int classId)
        {
            // Logic to trigger SMS gateway for individual student results
            TempData["Success"] = "SMS process initiated for selected class.";
            return RedirectToAction(nameof(SendMarksBySms));
        }

        public async Task<IActionResult> ReportCard(int studentId, int academicYearId)
        {
            var student = await _context.Students
                .Include(s => s.Class)
                .FirstOrDefaultAsync(s => s.Id == studentId);
            
            if (student == null) return NotFound();

            var marks = await _context.Marks
                .Include(m => m.Subject)
                .Include(m => m.Examination)
                .Where(m => m.StudentId == studentId && m.Examination.AcademicYearId == academicYearId)
                .OrderBy(m => m.Examination.StartDate)
                .ToListAsync();

            ViewBag.Student = student;
            ViewBag.AcademicYear = await _context.AcademicYears.FindAsync(academicYearId);
            
            return View(marks);
        }
    }
}

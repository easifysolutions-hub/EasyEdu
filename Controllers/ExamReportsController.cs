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
    public class ExamReportsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ExamReportsController(ApplicationDbContext context)
        {
            _context = context;
        }

        private async Task<int?> GetCompanyId()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _context.Users.FindAsync(userId);
            return user?.CompanyId;
        }

        // 1. Exam Routine
        public async Task<IActionResult> ExamRoutine(int? examId, int? classId, int? sectionId)
        {
            ViewBag.Examinations = new SelectList(await _context.Examinations.ToListAsync(), "Id", "Name", examId);
            ViewBag.Classes = new SelectList(await _context.Classes.ToListAsync(), "Id", "Name", classId);
            
            var query = _context.ExamSchedules
                .Include(s => s.Examination)
                .Include(s => s.Class)
                .Include(s => s.Section)
                .Include(s => s.Subject)
                .Include(s => s.ClassRoom)
                .AsQueryable();

            if (examId.HasValue) query = query.Where(s => s.ExaminationId == examId.Value);
            if (classId.HasValue) query = query.Where(s => s.ClassId == classId.Value);
            if (sectionId.HasValue) query = query.Where(s => s.SectionId == sectionId.Value);

            var model = await query.OrderBy(s => s.ExamDate).ThenBy(s => s.StartTime).ToListAsync();
            return View(model);
        }

        // 2. Merit List Report
        public async Task<IActionResult> MeritList(int? examId, int? classId, int? sectionId)
        {
            ViewBag.Examinations = new SelectList(await _context.Examinations.ToListAsync(), "Id", "Name", examId);
            ViewBag.Classes = new SelectList(await _context.Classes.ToListAsync(), "Id", "Name", classId);

            if (examId.HasValue && classId.HasValue)
            {
                var students = await _context.Students
                    .Include(s => s.Class)
                    .Include(s => s.Section)
                    .Where(s => s.ClassId == classId.Value && (!sectionId.HasValue || s.SectionId == sectionId.Value))
                    .ToListAsync();

                var marks = await _context.Marks
                    .Where(m => m.ExaminationId == examId.Value && m.Student.ClassId == classId.Value)
                    .ToListAsync();

                var meritList = students.Select(s => new MeritListItemViewModel
                {
                    AdmissionNumber = s.AdmissionNumber,
                    StudentName = s.FirstName + " " + s.LastName,
                    TotalMarks = marks.Where(m => m.StudentId == s.Id).Sum(m => m.MarksObtained),
                    MaxPossibleMarks = marks.Where(m => m.StudentId == s.Id).Sum(m => m.MaxMarks),
                    AveragePercentage = marks.Where(m => m.StudentId == s.Id).Any() 
                        ? (marks.Where(m => m.StudentId == s.Id).Sum(m => m.MarksObtained) / (marks.Where(m => m.StudentId == s.Id).Sum(m => m.MaxMarks) > 0 ? marks.Where(m => m.StudentId == s.Id).Sum(m => m.MaxMarks) : 1)) * 100
                        : 0
                })
                .OrderByDescending(m => m.TotalMarks)
                .ToList();

                for (int i = 0; i < meritList.Count; i++) meritList[i].Position = i + 1;

                return View(meritList);
            }

            return View(new List<MeritListItemViewModel>());
        }

        // 3. Online Exam Report
        public async Task<IActionResult> OnlineExamReport(int? examId, int? classId)
        {
            ViewBag.OnlineExams = new SelectList(await _context.OnlineExams.ToListAsync(), "Id", "Title", examId);
            ViewBag.Classes = new SelectList(await _context.Classes.ToListAsync(), "Id", "Name", classId);

            var query = _context.OnlineExams.AsQueryable();
            if (examId.HasValue) query = query.Where(e => e.Id == examId.Value);
            if (classId.HasValue) query = query.Where(e => e.ClassId == classId.Value);

            var model = await query.ToListAsync();
            return View(model);
        }

        // 4. Subject Wise Marksheet Report
        public async Task<IActionResult> SubjectWiseMarksheet(int? examId, int? classId, int? subjectId)
        {
            ViewBag.Examinations = new SelectList(await _context.Examinations.ToListAsync(), "Id", "Name", examId);
            ViewBag.Classes = new SelectList(await _context.Classes.ToListAsync(), "Id", "Name", classId);
            
            if (classId.HasValue)
                ViewBag.Subjects = new SelectList(await _context.Subjects.Where(s => s.ClassId == classId.Value).ToListAsync(), "Id", "Name", subjectId);
            else
                ViewBag.Subjects = new SelectList(new List<Subject>(), "Id", "Name");

            if (examId.HasValue && classId.HasValue && subjectId.HasValue)
            {
                var marks = await _context.Marks
                    .Include(m => m.Student)
                    .Include(m => m.Subject)
                    .Where(m => m.ExaminationId == examId.Value && m.Student.ClassId == classId.Value && m.SubjectId == subjectId.Value)
                    .OrderBy(m => m.Student.AdmissionNumber)
                    .ToListAsync();
                return View(marks);
            }

            return View(new List<Mark>());
        }

        // 5. Tabulation Sheet Report
        public async Task<IActionResult> TabulationSheet(int? examId, int? classId, int? sectionId)
        {
            ViewBag.Examinations = new SelectList(await _context.Examinations.ToListAsync(), "Id", "Name", examId);
            ViewBag.Classes = new SelectList(await _context.Classes.ToListAsync(), "Id", "Name", classId);

            if (examId.HasValue && classId.HasValue)
            {
                var students = await _context.Students
                    .Include(s => s.Section)
                    .Where(s => s.ClassId == classId.Value)
                    .OrderBy(s => s.AdmissionNumber)
                    .ToListAsync();

                var subjects = await _context.Subjects
                    .Where(s => s.ClassId == classId.Value)
                    .ToListAsync();

                var marks = await _context.Marks
                    .Where(m => m.ExaminationId == examId.Value && m.Student.ClassId == classId.Value)
                    .ToListAsync();

                ViewBag.Subjects = subjects;
                ViewBag.Marks = marks;
                return View(students);
            }

            return View(new List<Student>());
        }

        // 6. Progress Card Report
        public async Task<IActionResult> ProgressCard(int? studentId, int? examId)
        {
            ViewBag.Students = new SelectList(await _context.Students.OrderBy(s => s.FirstName).ToListAsync(), "Id", "AdmissionNumber");
            ViewBag.Examinations = new SelectList(await _context.Examinations.ToListAsync(), "Id", "Name");

            if (studentId.HasValue && examId.HasValue)
            {
                var student = await _context.Students
                    .Include(s => s.Class)
                    .Include(s => s.Section)
                    .FirstOrDefaultAsync(s => s.Id == studentId.Value);

                var marks = await _context.Marks
                    .Include(m => m.Subject)
                    .Where(m => m.StudentId == studentId.Value && m.ExaminationId == examId.Value)
                    .ToListAsync();

                ViewBag.Student = student;
                ViewBag.Exam = await _context.Examinations.FindAsync(examId.Value);
                ViewBag.Grades = await _context.MarkGrades.ToListAsync();
                return View(marks);
            }

            return View();
        }

        // 7. Mark Sheet Report
        public async Task<IActionResult> MarkSheetReport(int? studentId, int? examId)
        {
            // Similar to ProgressCard but with a focus on raw marks and grades
            return await ProgressCard(studentId, examId);
        }

        // 8. Progress Card Report 100 Percent
        public async Task<IActionResult> ProgressCard100Percent(int? studentId, int? examId)
        {
            // Premium full-page variant
            return await ProgressCard(studentId, examId);
        }

        // 9. Previous Result
        public async Task<IActionResult> PreviousResult(int? studentId)
        {
            ViewBag.Students = new SelectList(await _context.Students.ToListAsync(), "Id", "AdmissionNumber");
            
            if (studentId.HasValue)
            {
                var model = await _context.Marks
                    .Include(m => m.Examination)
                    .Include(m => m.Subject)
                    .Include(m => m.Student)
                    .Where(m => m.StudentId == studentId.Value)
                    .OrderByDescending(m => m.Examination.Id)
                    .ToListAsync();
                return View(model);
            }

            return View(new List<Mark>());
        }
    }

    public class MeritListItemViewModel
    {
        public int Position { get; set; }
        public string AdmissionNumber { get; set; } = string.Empty;
        public string StudentName { get; set; } = string.Empty;
        public decimal TotalMarks { get; set; }
        public decimal MaxPossibleMarks { get; set; }
        public decimal AveragePercentage { get; set; }
        public string Grade => GetGrade(AveragePercentage);

        private string GetGrade(decimal percentage)
        {
            if (percentage >= 90) return "A+";
            if (percentage >= 80) return "A";
            if (percentage >= 70) return "B";
            if (percentage >= 60) return "C";
            if (percentage >= 50) return "D";
            return "F";
        }
    }
}

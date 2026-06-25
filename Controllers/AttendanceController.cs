using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;
using EasyEdu.ViewModels;

namespace EasyEdu.Controllers
{
    [Authorize(Roles = "SuperAdmin,Admin,Teacher")]
    public class AttendanceController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;

        public AttendanceController(ApplicationDbContext context, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            _hostEnvironment = hostEnvironment;
        }

        // GET: Attendance
        public async Task<IActionResult> Index()
        {
            var classes = await _context.Classes.ToListAsync();
            ViewBag.Classes = new SelectList(classes, "Id", "Name");
            return View();
        }

        // GET: Attendance/MarkStudentAttendance
        public async Task<IActionResult> MarkStudentAttendance(int classId, DateTime? date)
        {
            var attendanceDate = date ?? DateTime.Today;
            var students = await _context.Students
                .Where(s => s.ClassId == classId)
                .OrderBy(s => s.FirstName)
                .ToListAsync();

            var existingAttendance = await _context.Attendances
                .Where(a => a.Date.Date == attendanceDate.Date && a.Student.ClassId == classId)
                .ToDictionaryAsync(a => a.StudentId);

            ViewBag.Class = await _context.Classes.FindAsync(classId);
            ViewBag.Date = attendanceDate;
            ViewBag.ExistingAttendance = existingAttendance;

            return View(students);
        }

        // POST: Attendance/SaveAttendance
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SaveAttendance(int classId, DateTime date, Dictionary<int, string> attendanceData)
        {
            foreach (var studentData in attendanceData)
            {
                int studentId = studentData.Key;
                string status = studentData.Value;

                var existing = await _context.Attendances
                    .FirstOrDefaultAsync(a => a.StudentId == studentId && a.Date.Date == date.Date);

                if (existing != null)
                {
                    existing.Status = status;
                    existing.MarkedBy = User.Identity?.Name;
                }
                else
                {
                    _context.Attendances.Add(new Attendance
                    {
                        StudentId = studentId,
                        Date = date,
                        Status = status,
                        AttendanceMethod = "Manual",
                        MarkedBy = User.Identity?.Name,
                        CreatedAt = DateTime.UtcNow
                    });
                }
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(AttendanceReport), new { classId, date });
        }

        // GET: Attendance/AttendanceReport
        public async Task<IActionResult> AttendanceReport(int? classId, DateTime? date)
        {
            var attendanceDate = date ?? DateTime.Today;
            var query = _context.Attendances
                .Include(a => a.Student)
                .ThenInclude(s => s.Class)
                .Where(a => a.Date.Date == attendanceDate.Date);

            if (classId.HasValue)
            {
                query = query.Where(a => a.Student.ClassId == classId.Value);
            }

            ViewBag.Classes = new SelectList(await _context.Classes.ToListAsync(), "Id", "Name", classId);
            ViewBag.Date = attendanceDate;

            return View(await query.ToListAsync());
        }

        // GET: Attendance/QRScanner
        public IActionResult QRScanner()
        {
            return View();
        }

        // POST: Attendance/MarkByQR
        [HttpPost]
        public async Task<IActionResult> MarkByQR([FromBody] QRDataModel data)
        {
            // In a real app, 'data.Token' would be a decrypted/validated student identifier
            var student = await _context.Students.FirstOrDefaultAsync(s => s.AdmissionNumber == data.Token);
            if (student == null) return Json(new { success = false, message = "Student not found" });

            var today = DateTime.Today;
            var existing = await _context.Attendances
                .FirstOrDefaultAsync(a => a.StudentId == student.Id && a.Date.Date == today);

            if (existing != null) return Json(new { success = true, message = "Attendance already marked" });

            _context.Attendances.Add(new Attendance
            {
                StudentId = student.Id,
                Date = today,
                Status = "Present",
                AttendanceMethod = "QR Code",
                GeolocationData = data.GeoLocation,
                MarkedBy = "System(QR)",
                CreatedAt = DateTime.UtcNow
            });

            await _context.SaveChangesAsync();
            return Json(new { success = true, message = $"Attendance marked for {student.FirstName}" });
        }

        // GET: Attendance/StudentAttendanceReport
        public async Task<IActionResult> StudentAttendanceReport(int? classId, int? month, int? year)
        {
            // Default to current month/year if not provided
            int m = month ?? DateTime.Now.Month;
            int y = year ?? DateTime.Now.Year;

            ViewBag.Classes = new SelectList(await _context.Classes.ToListAsync(), "Id", "Name", classId);
            ViewBag.Month = m;
            ViewBag.Year = y;

            var viewModel = new StudentAttendanceReportViewModel
            {
                Month = m,
                Year = y,
                Students = new List<StudentAttendanceRow>(),
                Days = Enumerable.Range(1, DateTime.DaysInMonth(y, m))
                        .Select(day => new DateTime(y, m, day))
                        .ToList()
            };

            if (classId.HasValue)
            {
                var schoolClass = await _context.Classes.FindAsync(classId.Value);
                if (schoolClass != null)
                {
                    viewModel.ClassId = schoolClass.Id;
                    viewModel.ClassName = schoolClass.Name;

                    var students = await _context.Students
                        .Where(s => s.ClassId == classId.Value && s.IsActive)
                        .OrderBy(s => s.FirstName)
                        .ToListAsync();

                    var attendances = await _context.Attendances
                        .Where(a => a.Student.ClassId == classId.Value && 
                                    a.Date.Year == y && 
                                    a.Date.Month == m)
                        .ToListAsync();

                    foreach (var student in students)
                    {
                        var row = new StudentAttendanceRow
                        {
                            StudentId = student.Id,
                            StudentName = $"{student.FirstName} {student.LastName}",
                            AdmissionNumber = student.AdmissionNumber,
                            ProfilePicture = student.ProfilePicture
                        };

                        var studentAttendances = attendances.Where(a => a.StudentId == student.Id).ToList();

                        foreach (var att in studentAttendances)
                        {
                            row.DailyStatuses[att.Date.Day] = att.Status;
                        }

                        row.PresentCount = studentAttendances.Count(a => a.Status == "Present");
                        row.AbsentCount = studentAttendances.Count(a => a.Status == "Absent");
                        row.LateCount = studentAttendances.Count(a => a.Status == "Late");
                        row.HalfDayCount = studentAttendances.Count(a => a.Status == "Half Day");
                        row.HolidayCount = studentAttendances.Count(a => a.Status == "Holiday");
                        row.OnLeaveCount = studentAttendances.Count(a => a.Status == "On Leave");

                        viewModel.Students.Add(row);
                    }
                }
            }

            return View(viewModel);
        }

        // GET: Attendance/SubjectWiseAttendance
        public async Task<IActionResult> SubjectWiseAttendance(int? classId, int? sectionId, int? subjectId, DateTime? date)
        {
            var attendanceDate = date ?? DateTime.Today;
            ViewBag.Classes = new SelectList(await _context.Classes.ToListAsync(), "Id", "Name", classId);
            ViewBag.Subjects = new SelectList(await _context.Subjects.ToListAsync(), "Id", "Name", subjectId);
            ViewBag.Date = attendanceDate;

            if (classId.HasValue && subjectId.HasValue)
            {
                var students = await _context.Students
                    .Where(s => s.ClassId == classId.Value)
                    .OrderBy(s => s.FirstName)
                    .ToListAsync();

                ViewBag.ExistingAttendance = await _context.SubjectWiseAttendances
                    .Where(a => a.Date.Date == attendanceDate.Date && a.SubjectId == subjectId.Value)
                    .ToDictionaryAsync(a => a.StudentId);

                return View(students);
            }

            return View(new List<Student>());
        }

        [HttpPost]
        public async Task<IActionResult> SaveSubjectAttendance(int classId, int subjectId, DateTime date, Dictionary<int, string> attendanceData)
        {
            foreach (var item in attendanceData)
            {
                var existing = await _context.SubjectWiseAttendances
                    .FirstOrDefaultAsync(a => a.StudentId == item.Key && a.SubjectId == subjectId && a.Date.Date == date.Date);

                if (existing != null)
                {
                    existing.Status = item.Value;
                }
                else
                {
                    _context.SubjectWiseAttendances.Add(new SubjectWiseAttendance
                    {
                        StudentId = item.Key,
                        SubjectId = subjectId,
                        Date = date,
                        Status = item.Value,
                        MarkedBy = User.Identity?.Name
                    });
                }
            }
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(SubjectWiseAttendance), new { classId, subjectId, date });
        }
    }

    public class QRDataModel
    {
        public string Token { get; set; } = string.Empty;
        public string? GeoLocation { get; set; }
    }
}

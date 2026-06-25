using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;
using System.Security.Claims;

namespace EasyEdu.Controllers
{
    [Authorize(Roles = "SuperAdmin,Admin")]
    public class ReportsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ReportsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // 1. Student Report
        public async Task<IActionResult> StudentReport(int? classId, int? sectionId, string? gender)
        {
            ViewBag.Classes = new SelectList(await _context.Classes.ToListAsync(), "Id", "Name");
            ViewBag.Sections = new SelectList(await _context.Sections.ToListAsync(), "Id", "Name");

            var query = _context.Students
                .Include(s => s.Class)
                .Include(s => s.Section)
                .Include(s => s.User)
                .Include(s => s.StudentCategory)
                .AsQueryable();

            if (classId.HasValue) query = query.Where(s => s.ClassId == classId.Value);
            if (sectionId.HasValue) query = query.Where(s => s.SectionId == sectionId.Value);
            if (!string.IsNullOrEmpty(gender)) query = query.Where(s => s.Gender == gender);

            return View(await query.ToListAsync());
        }

        // 2. Guardian Report
        public async Task<IActionResult> GuardianReport(string? search)
        {
            var query = _context.Parents
                .Include(p => p.Student)
                    .ThenInclude(s => s.Class)
                .AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(p => (p.FirstName + " " + p.LastName).Contains(search) || 
                                         p.Phone.Contains(search) || 
                                         (p.Student.FirstName + " " + p.Student.LastName).Contains(search));
            }

            var guardians = await query.OrderBy(p => p.FirstName).ToListAsync();
            return View(guardians);
        }

        // 3. Exam Report (Summary/Redirect)
        public async Task<IActionResult> ExamReport()
        {
            var exams = await _context.Examinations
                .Include(e => e.Marks)
                .ToListAsync();
            return View(exams);
        }

        // 4. Payment Report
        public async Task<IActionResult> FeesReport(DateTime? fromDate, DateTime? toDate, int? studentId, int? classId)
        {
            ViewBag.Students = new SelectList(await _context.Students.ToListAsync(), "Id", "FullName");
            ViewBag.Classes = new SelectList(await _context.Classes.ToListAsync(), "Id", "Name");
            
            var query = _context.FeeCollections
                .Include(f => f.Student)
                    .ThenInclude(s => s.Class)
                .Include(f => f.FeeStructure)
                .AsQueryable();

            if (fromDate.HasValue) query = query.Where(f => f.PaidDate >= fromDate.Value);
            if (toDate.HasValue) query = query.Where(f => f.PaidDate <= toDate.Value);
            if (studentId.HasValue) query = query.Where(f => f.StudentId == studentId.Value);
            if (classId.HasValue) query = query.Where(f => f.Student.ClassId == classId.Value);

            return View(await query.OrderByDescending(f => f.PaidDate).ToListAsync());
        }

        // 20. Fees Due Report
        public async Task<IActionResult> FeesDueReport(int? classId, DateTime? dueDate)
        {
            ViewBag.Classes = new SelectList(await _context.Classes.ToListAsync(), "Id", "Name");
            
            var query = _context.FeesInvoices
                .Include(i => i.Student)
                    .ThenInclude(s => s.Class)
                .Where(i => i.Status != "Paid")
                .AsQueryable();

            if (classId.HasValue) query = query.Where(i => i.Student.ClassId == classId.Value);
            if (dueDate.HasValue) query = query.Where(i => i.DueDate <= dueDate.Value);

            return View(await query.ToListAsync());
        }

        // 21. Fine Report
        public async Task<IActionResult> FineReport(DateTime? fromDate, DateTime? toDate)
        {
            var query = _context.FeesInvoiceDetails
                .Include(d => d.FeesInvoice)
                    .ThenInclude(i => i.Student)
                .Where(d => d.Fine > 0)
                .AsQueryable();

            if (fromDate.HasValue) query = query.Where(d => d.FeesInvoice.Date >= fromDate.Value);
            if (toDate.HasValue) query = query.Where(d => d.FeesInvoice.Date <= toDate.Value);

            return View(await query.ToListAsync());
        }

        // 22. Balance Report
        public async Task<IActionResult> BalanceReport(int? classId)
        {
            ViewBag.Classes = new SelectList(await _context.Classes.ToListAsync(), "Id", "Name");
            
            var studentsQuery = _context.Students
                .Include(s => s.Class)
                .Include(s => s.FeesInvoices)
                .AsQueryable();

            if (classId.HasValue) studentsQuery = studentsQuery.Where(s => s.ClassId == classId.Value);

            var model = await studentsQuery.ToListAsync();
            return View(model);
        }

        // 23. Waiver Report
        public async Task<IActionResult> WaiverReport(int? classId)
        {
            ViewBag.Classes = new SelectList(await _context.Classes.ToListAsync(), "Id", "Name");
            
            var query = _context.FeesInvoiceDetails
                .Include(d => d.FeesInvoice)
                    .ThenInclude(i => i.Student)
                .Where(d => d.Waiver > 0)
                .AsQueryable();

            if (classId.HasValue) query = query.Where(d => d.FeesInvoice.Student.ClassId == classId.Value);

            return View(await query.ToListAsync());
        }

        // 24. Wallet Report
        public async Task<IActionResult> WalletReport(int? studentId, string? type)
        {
            ViewBag.Students = new SelectList(await _context.Students.ToListAsync(), "Id", "FullName");
            
            var query = _context.WalletTransactions
                .Include(w => w.Student)
                .AsQueryable();

            if (studentId.HasValue) query = query.Where(w => w.StudentId == studentId.Value);
            if (!string.IsNullOrEmpty(type)) query = query.Where(w => w.TransactionType == type);

            return View(await query.OrderByDescending(w => w.Date).ToListAsync());
        }

        // 5. Payroll Report
        public async Task<IActionResult> PayrollReport(int? month, int? year, int? departmentId)
        {
            ViewBag.Departments = new SelectList(await _context.Departments.ToListAsync(), "Id", "Name", departmentId);
            
            var query = _context.Payrolls
                .Include(p => p.Teacher)
                    .ThenInclude(t => t.Department)
                .AsQueryable();

            if (month.HasValue) query = query.Where(p => p.Month == month.Value);
            if (year.HasValue) query = query.Where(p => p.Year == year.Value);
            if (departmentId.HasValue) query = query.Where(p => p.Teacher.DepartmentId == departmentId.Value);

            var model = await query.OrderByDescending(p => p.Year).ThenByDescending(p => p.Month).ToListAsync();
            return View(model);
        }

        // 6. Transaction Report
        public async Task<IActionResult> TransactionReport(DateTime? fromDate, DateTime? toDate)
        {
            var incomesQuery = _context.Incomes.AsQueryable();
            var expensesQuery = _context.Expenses.AsQueryable();

            if (fromDate.HasValue)
            {
                incomesQuery = incomesQuery.Where(i => i.Date >= fromDate.Value);
                expensesQuery = expensesQuery.Where(e => e.Date >= fromDate.Value);
            }
            if (toDate.HasValue)
            {
                incomesQuery = incomesQuery.Where(i => i.Date <= toDate.Value);
                expensesQuery = expensesQuery.Where(e => e.Date <= toDate.Value);
            }

            var incomes = await incomesQuery.OrderByDescending(i => i.Date).ToListAsync();
            var expenses = await expensesQuery.OrderByDescending(e => e.Date).ToListAsync();
            
            ViewBag.Incomes = incomes;
            ViewBag.Expenses = expenses;
            ViewBag.FromDate = fromDate;
            ViewBag.ToDate = toDate;
            
            return View();
        }

        // 25. Payslip Report
        public async Task<IActionResult> Payslip(int id)
        {
            var payroll = await _context.Payrolls
                .Include(p => p.Teacher)
                    .ThenInclude(t => t.Department)
                .Include(p => p.Teacher)
                    .ThenInclude(t => t.Designation)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (payroll == null) return NotFound();

            return View("~/Views/HumanResource/Payslip.cshtml", payroll);
        }

        // 7. User Log
        public async Task<IActionResult> UserLog(string? search, string? module)
        {
            var companyId = int.TryParse(User.FindFirstValue("CompanyId"), out var id) ? id : 0;
            var query = _context.UserAuditLogs
                .Include(l => l.User)
                .Where(l => l.CompanyId == companyId)
                .AsQueryable();

            if (!string.IsNullOrEmpty(search))
                query = query.Where(l => l.User.FullName.Contains(search) || l.Description.Contains(search));
            
            if (!string.IsNullOrEmpty(module))
                query = query.Where(l => l.Module == module);

            var logs = await query.OrderByDescending(l => l.Timestamp).Take(200).ToListAsync();
            return View(logs);
        }

        // 8. Student Attendance Report
        public async Task<IActionResult> StudentAttendanceReport(int? classId, int? sectionId, DateTime? date)
        {
            ViewBag.Classes = new SelectList(await _context.Classes.ToListAsync(), "Id", "Name");
            ViewBag.Sections = new SelectList(await _context.Sections.ToListAsync(), "Id", "Name");
            
            var query = _context.Attendances
                .Include(a => a.Student)
                    .ThenInclude(s => s.Class)
                .Include(a => a.Student)
                    .ThenInclude(s => s.Section)
                .AsQueryable();

            if (classId.HasValue) query = query.Where(a => a.Student.ClassId == classId.Value);
            if (sectionId.HasValue) query = query.Where(a => a.Student.SectionId == sectionId.Value);
            if (date.HasValue) query = query.Where(a => a.Date.Date == date.Value.Date);

            return View(await query.ToListAsync());
        }

        // 9. Subject Attendance Report
        public async Task<IActionResult> SubjectAttendanceReport(int? classId, int? sectionId, int? subjectId, DateTime? date)
        {
            ViewBag.Classes = new SelectList(await _context.Classes.ToListAsync(), "Id", "Name");
            ViewBag.Sections = new SelectList(await _context.Sections.ToListAsync(), "Id", "Name");
            ViewBag.Subjects = new SelectList(await _context.Subjects.ToListAsync(), "Id", "Name");

            var query = _context.SubjectWiseAttendances
                .Include(a => a.Student)
                    .ThenInclude(s => s.Class)
                .Include(a => a.Student)
                    .ThenInclude(s => s.Section)
                .Include(a => a.Subject)
                .AsQueryable();

            if (classId.HasValue) query = query.Where(a => a.Student.ClassId == classId.Value);
            if (sectionId.HasValue) query = query.Where(a => a.Student.SectionId == sectionId.Value);
            if (subjectId.HasValue) query = query.Where(a => a.SubjectId == subjectId.Value);
            if (date.HasValue) query = query.Where(a => a.Date.Date == date.Value.Date);

            return View(await query.ToListAsync());
        }

        // 10. Homework Evaluation Report
        public async Task<IActionResult> HomeworkEvaluationReport(int? classId, int? subjectId)
        {
            ViewBag.Classes = new SelectList(await _context.Classes.ToListAsync(), "Id", "Name");
            ViewBag.Subjects = new SelectList(await _context.Subjects.ToListAsync(), "Id", "Name");

            var query = _context.HomeworkSubmissions
                .Include(s => s.Homework)
                    .ThenInclude(h => h.Subject)
                .Include(s => s.Homework)
                    .ThenInclude(h => h.Class)
                .Include(s => s.Student)
                .AsQueryable();

            if (classId.HasValue) query = query.Where(s => s.Homework.ClassId == classId.Value);
            if (subjectId.HasValue) query = query.Where(s => s.Homework.SubjectId == subjectId.Value);

            return View(await query.OrderByDescending(s => s.SubmittedAt).ToListAsync());
        }

        // 11. Student History
        public async Task<IActionResult> StudentHistory(string? search)
        {
            var query = _context.Students
                .Include(s => s.Class)
                .AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(s => (s.FirstName + " " + s.LastName).Contains(search) || s.AdmissionNumber.Contains(search));
            }

            var students = await query.OrderByDescending(s => s.AdmissionDate).ToListAsync();
            return View(students);
        }

        // 12. Student Login Report
        public async Task<IActionResult> StudentLoginReport(string? search)
        {
            var companyId = int.TryParse(User.FindFirstValue("CompanyId"), out var id) ? id : 0;
            var query = _context.UserAuditLogs
                .Include(l => l.User)
                .ThenInclude(u => u.Student)
                .Where(l => l.CompanyId == companyId && l.Action == "Login")
                .AsQueryable();

            // Filter only logs where the user is a student
            query = query.Where(l => l.User.Student != null);

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(l => l.User.FullName.Contains(search) || l.IpAddress.Contains(search));
            }

            var logs = await query.OrderByDescending(l => l.Timestamp).ToListAsync();
            return View(logs);
        }

        // 13. Class Report
        public async Task<IActionResult> ClassReport()
        {
            var classes = await _context.Classes
                .Include(c => c.AcademicYear)
                .Include(c => c.Students)
                .ToListAsync();
            return View(classes);
        }

        // 14. Class Routine (Report)
        public async Task<IActionResult> ClassRoutineReport(int? classId, int? sectionId)
        {
            ViewBag.Classes = new SelectList(await _context.Classes.ToListAsync(), "Id", "Name");
            var query = _context.TimeTables
                .Include(t => t.Class)
                .Include(t => t.Section)
                .Include(t => t.Subject)
                .Include(t => t.Teacher)
                .AsQueryable();

            if (classId.HasValue) query = query.Where(t => t.ClassId == classId.Value);
            if (sectionId.HasValue) query = query.Where(t => t.SectionId == sectionId.Value);

            return View(await query.OrderBy(t => t.DayOfWeek).ThenBy(t => t.StartTime).ToListAsync());
        }

        // 15. Previous Record
        public async Task<IActionResult> PreviousRecord(int? classId)
        {
            ViewBag.Classes = new SelectList(await _context.Classes.ToListAsync(), "Id", "Name");

            var query = _context.Students
                .Include(s => s.Class)
                .Where(s => !string.IsNullOrEmpty(s.PreviousSchoolDetails))
                .AsQueryable();

            if (classId.HasValue) query = query.Where(s => s.ClassId == classId.Value);

            return View(await query.ToListAsync());
        }

        // 16. Student Transport Report
        public async Task<IActionResult> StudentTransportReport(int? routeId)
        {
            ViewBag.Routes = new SelectList(await _context.Routes.ToListAsync(), "Id", "Name");

            var query = _context.Students
                .Include(s => s.Route)
                .Where(s => s.RouteId != null)
                .AsQueryable();

            if (routeId.HasValue) query = query.Where(s => s.RouteId == routeId.Value);

            return View(await query.ToListAsync());
        }

        // 17. Student Dormitory Report
        public async Task<IActionResult> StudentDormitoryReport(int? dormitoryId)
        {
            ViewBag.Dormitories = new SelectList(await _context.Dormitories.ToListAsync(), "Id", "Name");

            var query = _context.Students
                .Include(s => s.Class)
                .Include(s => s.Dormitory)
                .Include(s => s.DormitoryRoom)
                .AsQueryable();

            if (dormitoryId.HasValue) query = query.Where(s => s.DormitoryId == dormitoryId.Value);
            else query = query.Where(s => s.DormitoryId != null);

            return View(await query.ToListAsync());
        }

        // 18. Staff Report
        public async Task<IActionResult> StaffReport(int? departmentId, int? designationId)
        {
            ViewBag.Departments = new SelectList(await _context.Departments.ToListAsync(), "Id", "Name", departmentId);
            ViewBag.Designations = new SelectList(await _context.Designations.ToListAsync(), "Id", "Title", designationId);

            var query = _context.Teachers
                .Include(t => t.Department)
                .Include(t => t.Designation)
                .AsQueryable();

            if (departmentId.HasValue) query = query.Where(t => t.DepartmentId == departmentId.Value);
            if (designationId.HasValue) query = query.Where(t => t.DesignationId == designationId.Value);

            return View(await query.ToListAsync());
        }

        // 19. Staff Attendance Report
        public async Task<IActionResult> StaffAttendanceReport(DateTime? date, int? departmentId)
        {
            var reportsDate = date ?? DateTime.Today;
            ViewBag.Date = reportsDate;
            ViewBag.Departments = new SelectList(await _context.Departments.ToListAsync(), "Id", "Name", departmentId);

            var query = _context.TeacherAttendances
                .Include(a => a.Teacher)
                    .ThenInclude(t => t.Department)
                .Where(a => a.Date.Date == reportsDate.Date)
                .AsQueryable();

            if (departmentId.HasValue) query = query.Where(a => a.Teacher.DepartmentId == departmentId.Value);

            return View(await query.ToListAsync());
        }
    }
}

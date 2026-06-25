using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Security.Claims;

namespace EasyEdu.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class DashboardController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DashboardController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("summary")]
        public async Task<IActionResult> GetSummary()
        {
            var companyIdClaim = User.Claims.FirstOrDefault(c => c.Type == "CompanyId")?.Value;
            int? companyId = string.IsNullOrEmpty(companyIdClaim) ? null : int.Parse(companyIdClaim);

            var queryStudents = _context.Students.AsQueryable();
            var queryTeachers = _context.Teachers.AsQueryable();

            if (companyId.HasValue)
            {
                queryStudents = queryStudents.Where(s => s.CompanyId == companyId);
                queryTeachers = queryTeachers.Where(t => t.CompanyId == companyId);
            }

            var totalStudents = await queryStudents.CountAsync(s => s.IsActive);
            var totalStaff = await queryTeachers.CountAsync(t => t.IsActive);
            
            // Financial Metrics
            var totalFeeCollection = await _context.FeesInvoices
                .Where(i => !companyId.HasValue || i.Student.CompanyId == companyId)
                .SumAsync(i => i.PaidAmount);

            var totalExpenses = await _context.Expenses
                .Where(e => !companyId.HasValue || e.CompanyId == companyId)
                .SumAsync(e => e.Amount);

            // Real Attendance Calculation (Overall institutional average for current year)
            var currentYear = DateTime.Now.Year;
            var attendanceQuery = _context.Attendances
                .Where(a => a.Date.Year == currentYear);
                
            if (companyId.HasValue)
            {
                attendanceQuery = attendanceQuery.Where(a => a.Student.CompanyId == companyId);
            }

            var totalAttendanceRecords = await attendanceQuery.CountAsync();
            var presentRecords = await attendanceQuery.CountAsync(a => a.Status == "Present" || a.Status == "Late");
            
            double attendancePercentage = totalAttendanceRecords > 0 
                ? (double)presentRecords / totalAttendanceRecords * 100 
                : 94.5; // Default fallback for demo if no data

            // Academic Index (Average percentage across all examinations)
            var marksQuery = _context.Marks.AsQueryable();
            if (companyId.HasValue)
            {
                marksQuery = marksQuery.Where(m => m.Student.CompanyId == companyId);
            }

            var avgMarks = await marksQuery.AnyAsync() 
                ? await marksQuery.AverageAsync(m => m.MarksObtained / m.MaxMarks)
                : 0.92m; // Default fallback

            // Fetch recent notices for Activity Feed
            var recentNotices = await _context.Notices
                .Where(n => !companyId.HasValue || n.CompanyId == companyId)
                .OrderByDescending(n => n.PublishOn)
                .Take(5)
                .Select(n => new {
                    id = n.Id,
                    title = n.Title,
                    description = n.Description,
                    time = n.PublishOn.ToString("yyyy-MM-ddTHH:mm:ss"),
                    type = n.TargetAudience == "All" ? "success" : "info"
                })
                .ToListAsync();

            // Fetch upcoming events for Roadmap
            var upcomingEvents = await _context.CalendarEvents
                .Where(e => (!companyId.HasValue || e.CompanyId == companyId) && e.StartDate >= DateTime.UtcNow)
                .OrderBy(e => e.StartDate)
                .Take(7)
                .Select(e => new {
                    id = e.Id,
                    title = e.Title,
                    date = e.StartDate.ToString("MMM dd"),
                    day = e.StartDate.ToString("ddd").ToUpper(),
                    type = e.Title.Contains("Exam") ? "exam" : "event",
                    status = e.StartDate.Date == DateTime.Today ? "Active" : "Pending"
                })
                .ToListAsync();

            // Additional Operational Metrics
            var pendingHomework = await _context.Homeworks
                .CountAsync(h => h.SubmissionDate >= DateTime.Now && (!companyId.HasValue || h.Class.CompanyId == companyId));
            
            var pendingLeaves = await _context.LeaveRequests
                .CountAsync(l => l.Status == "Pending" && (!companyId.HasValue || l.LeaveType.CompanyId == companyId));

            var unreadNotifications = await _context.Notices
                .CountAsync(n => n.PublishOn >= DateTime.Now.AddDays(-7) && (!companyId.HasValue || n.CompanyId == companyId));

            var isAdmin = User.IsInRole("SuperAdmin") || User.IsInRole("Admin");

            return Ok(new
            {
                totalStudents,
                totalStaff,
                feeCollection = isAdmin ? (totalFeeCollection >= 1000 ? $"${(totalFeeCollection / 1000).ToString("N1")}k" : $"${totalFeeCollection:N0}") : "$***.**",
                totalExpenses = isAdmin ? (totalExpenses >= 1000 ? $"${(totalExpenses / 1000).ToString("N1")}k" : $"${totalExpenses:N1}") : "$***.**",
                attendance = $"{Math.Round(attendancePercentage, 1)}%",
                academicIndex = Math.Round(avgMarks, 2),
                pendingHomework,
                pendingLeaves,
                unreadNotifications,
                recentActivity = recentNotices.Any() ? (object)recentNotices : new List<dynamic> {
                    new { id = 1, title = "System Node Online", time = "Just now", type = "success" },
                    new { id = 2, title = "Biometric Sync Complete", time = "2h ago", type = "info" }
                },
                roadmap = upcomingEvents.Any() ? (object)upcomingEvents : new List<object>()
            });
        }
    }
}

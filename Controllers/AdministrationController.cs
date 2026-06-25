using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;

namespace EasyEdu.Controllers
{
    [Authorize(Roles = "SuperAdmin,Admin")]
    public class AdministrationController : Controller
    {
        private readonly ApplicationDbContext _context;

        public AdministrationController(ApplicationDbContext context)
        {
            _context = context;
        }

        private async Task<int?> GetCompanyId()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _context.Users.FindAsync(userId);
            return user?.CompanyId;
        }

        public async Task<IActionResult> Index(string todoFilter = "incomplete")
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var stats = new DashboardViewModel
            {
                TotalStudents = await _context.Students.CountAsync(),
                TotalTeachers = await _context.Teachers.CountAsync(),
                TotalParents = await _context.Parents.CountAsync(),
                TotalStaff = await _context.Teachers.CountAsync(),
                TotalClasses = await _context.Classes.CountAsync(),
                TotalRevenue = await _context.FeeCollections.SumAsync(f => f.AmountPaid),
                RecentStudents = await _context.Students
                    .OrderByDescending(s => s.CreatedAt)
                    .Take(5)
                    .Include(s => s.Class)
                    .ToListAsync(),
                RecentEnrollments = await _context.FeeCollections
                    .OrderByDescending(f => f.CreatedAt)
                    .Take(5)
                    .Include(f => f.Student)
                    .ToListAsync(),
                Notices = await _context.Notices
                    .OrderByDescending(n => n.NoticeDate)
                    .ToListAsync(),
                ToDos = await _context.ToDos
                    .Where(t => t.UserId == userId && (todoFilter == "completed" ? t.IsCompleted : !t.IsCompleted))
                    .OrderByDescending(t => t.CreatedAt)
                    .ToListAsync(),
                ToDoFilter = todoFilter,
                CalendarEvents = await _context.CalendarEvents
                    .OrderBy(e => e.StartDate)
                    .ToListAsync(),
                TotalExpenses = await _context.Expenses.SumAsync(e => e.Amount)
            };

            return View(stats);
        }

        // Company/Institution Management
        public async Task<IActionResult> Institutions()
        {
            var institutions = await _context.Companies.ToListAsync();
            return View(institutions);
        }

        // Academic Year Management
        public async Task<IActionResult> AcademicYears()
        {
            var years = await _context.AcademicYears.ToListAsync();
            return View(years);
        }

        // Class Management
        public async Task<IActionResult> Classes()
        {
            var classes = await _context.Classes.Include(c => c.AcademicYear).ToListAsync();
            ViewBag.AcademicYears = await _context.AcademicYears.Where(a => a.IsActive).ToListAsync();
            return View(classes);
        }

        [HttpPost]
        public async Task<IActionResult> CreateClass(Class classObj)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _context.Users.FindAsync(userId);
            
            if (user != null && user.CompanyId.HasValue)
            {
                classObj.CompanyId = user.CompanyId.Value;
                classObj.IsActive = true;
                _context.Add(classObj);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(Classes));
        }

        public async Task<IActionResult> DeleteClass(int id)
        {
            var classObj = await _context.Classes.FindAsync(id);
            if (classObj != null)
            {
                _context.Classes.Remove(classObj);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(Classes));
        }

        // User Management
        public async Task<IActionResult> Users()
        {
            var companyId = await GetCompanyId();
            var isSuperAdmin = User.IsInRole("SuperAdmin");

            var usersQuery = _context.Users
                .Include(u => u.Company)
                .AsQueryable();

            if (!isSuperAdmin && companyId.HasValue)
            {
                usersQuery = usersQuery.Where(u => u.CompanyId == companyId);
            }

            var users = await usersQuery
                .OrderBy(u => u.FullName)
                .Select(u => new UserManagementViewModel
                {
                    UserId = u.Id,
                    FullName = u.FullName,
                    Email = u.Email,
                    IsActive = u.IsActive,
                    InstitutionName = u.Company != null ? u.Company.Name : "System",
                    Role = "N/A"
                })
                .ToListAsync();

            foreach (var user in users)
            {
                var roles = await _context.UserRoles
                    .Where(ur => ur.UserId == user.UserId)
                    .Join(_context.Roles, ur => ur.RoleId, r => r.Id, (ur, r) => r.Name)
                    .ToListAsync();
                user.Role = string.Join(", ", roles);
            }

            ViewBag.Roles = await _context.Roles.ToListAsync();
            return View(users);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser(string email, string fullName, string password, List<string> roles)
        {
            var companyId = await GetCompanyId();
            var user = new ApplicationUser
            {
                UserName = email,
                Email = email,
                FullName = fullName,
                CompanyId = companyId ?? 1,
                EmailConfirmed = true,
                IsActive = true
            };

            var userManager = HttpContext.RequestServices.GetRequiredService<UserManager<ApplicationUser>>();
            var result = await userManager.CreateAsync(user, password);

            if (result.Succeeded)
            {
                if (roles != null && roles.Any())
                {
                    await userManager.AddToRolesAsync(user, roles);
                }
                TempData["Success"] = "User created successfully.";
            }
            else
            {
                TempData["Error"] = string.Join(", ", result.Errors.Select(e => e.Description));
            }

            return RedirectToAction(nameof(Users));
        }

        [HttpPost]
        public async Task<IActionResult> UpdateUser(string userId, string fullName, List<string> roles, bool isActive)
        {
            var userManager = HttpContext.RequestServices.GetRequiredService<UserManager<ApplicationUser>>();
            var user = await userManager.FindByIdAsync(userId);
            if (user == null) return NotFound();

            user.FullName = fullName;
            user.IsActive = isActive;
            user.LockoutEnd = isActive ? null : DateTimeOffset.MaxValue;

            var result = await userManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                var currentRoles = await userManager.GetRolesAsync(user);
                await userManager.RemoveFromRolesAsync(user, currentRoles);
                if (roles != null && roles.Any())
                {
                    await userManager.AddToRolesAsync(user, roles);
                }
                TempData["Success"] = "User updated successfully.";
            }
            else
            {
                TempData["Error"] = string.Join(", ", result.Errors.Select(e => e.Description));
            }

            return RedirectToAction(nameof(Users));
        }

        [HttpPost]
        public async Task<IActionResult> DeleteUser(string userId)
        {
            var userManager = HttpContext.RequestServices.GetRequiredService<UserManager<ApplicationUser>>();
            var user = await userManager.FindByIdAsync(userId);
            if (user == null) return NotFound();

            if (user.Id == User.FindFirstValue(ClaimTypes.NameIdentifier))
            {
                TempData["Error"] = "You cannot delete your own account.";
                return RedirectToAction(nameof(Users));
            }

            var result = await userManager.DeleteAsync(user);
            if (result.Succeeded)
                TempData["Success"] = "User deleted successfully.";
            else
                TempData["Error"] = string.Join(", ", result.Errors.Select(e => e.Description));

            return RedirectToAction(nameof(Users));
        }

        public IActionResult Settings()
        {
            return RedirectToAction("Index", "GeneralSettings");
        }

        public IActionResult Updates()
        {
            return View();
        }

        public IActionResult CalendarSettings()
        {
            return View();
        }

        [HttpPost]
        public IActionResult SaveCalendarSettings()
        {
            // TODO: Save calendar settings to database
            return RedirectToAction(nameof(Index));
        }

        // Notice Management
        public IActionResult CreateNotice()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateNotice(Notice notice)
        {
            if (ModelState.IsValid)
            {
                notice.CompanyId = int.TryParse(User.FindFirstValue("CompanyId"), out var id) ? id : 0;
                _context.Add(notice);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(notice);
        }

        public async Task<IActionResult> ViewNotice(int id)
        {
            var notice = await _context.Notices.FindAsync(id);
            if (notice == null) return NotFound();
            return View(notice);
        }

        // ToDo Management
        [HttpPost]
        public async Task<IActionResult> AddToDo(string title)
        {
            if (!string.IsNullOrEmpty(title))
            {
                var todo = new ToDo
                {
                    Title = title,
                    CreatedAt = DateTime.UtcNow,
                    IsCompleted = false,
                    UserId = User.FindFirstValue(ClaimTypes.NameIdentifier)
                };
                _context.Add(todo);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        public async Task<IActionResult> ToggleToDo(int id)
        {
            var todo = await _context.ToDos.FindAsync(id);
            if (todo != null && todo.UserId == User.FindFirstValue(ClaimTypes.NameIdentifier))
            {
                todo.IsCompleted = !todo.IsCompleted;
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(Index));
        }

        // Calendar Event Management
        [HttpPost]
        public async Task<IActionResult> AddCalendarEvent(CalendarEvent calendarEvent)
        {
            if (ModelState.IsValid)
            {
                calendarEvent.CompanyId = int.TryParse(User.FindFirstValue("CompanyId"), out var id) ? id : 0;
                _context.Add(calendarEvent);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(Index));
        }

        // Admission Query
        public async Task<IActionResult> AdmissionQuery()
        {
            var companyId = await GetCompanyId() ?? 1;
            var settings = await _context.AdmissionQuerySettings.FirstOrDefaultAsync(s => s.CompanyId == companyId);
            if (settings == null)
            {
                settings = new AdmissionQuerySetting
                {
                    CompanyId = companyId,
                    FormTitle = "School Admission Query Form",
                    FormDescription = "Please fill out the form below to enquire about student admissions.",
                    ShowPhone = true,
                    RequirePhone = true,
                    ShowEmail = true,
                    RequireEmail = false,
                    ShowAddress = true,
                    RequireAddress = false,
                    ShowClass = true,
                    RequireClass = false,
                    ShowNumberOfChildren = false,
                    RequireNumberOfChildren = false,
                    ShowDescription = true,
                    RequireDescription = false,
                    AccentColor = "#4f46e5"
                };
                _context.AdmissionQuerySettings.Add(settings);
                await _context.SaveChangesAsync();
            }
            ViewBag.Settings = settings;

            var queries = await _context.AdmissionQueries.Include(q => q.Class).ToListAsync();
            ViewBag.Classes = await _context.Classes.ToListAsync();
            ViewBag.Sources = await _context.AdminSetupItems.Where(i => i.Category == "Source").ToListAsync();
            ViewBag.References = await _context.AdminSetupItems.Where(i => i.Category == "Reference").ToListAsync();
            return View(queries);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAdmissionQuery(AdmissionQuery query)
        {
            ModelState.Remove("Class");
            ModelState.Remove("Company");

            if (ModelState.IsValid)
            {
                query.CompanyId = await GetCompanyId();
                query.Date = DateTime.Now;
                query.Status = "Pending";
                query.Description = query.Description ?? "";
                query.Email = query.Email ?? "";
                query.Address = query.Address ?? "";
                query.Reference = query.Reference ?? "";
                query.Source = query.Source ?? "";
                query.AssignedTo = query.AssignedTo ?? "";
                _context.Add(query);
                await _context.SaveChangesAsync();
                TempData["Success"] = "Enquiry logged successfully.";
            }
            else
            {
                TempData["Error"] = "Failed to log enquiry: " + string.Join(", ", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage));
            }
            return RedirectToAction(nameof(AdmissionQuery));
        }

        [HttpPost]
        public async Task<IActionResult> SaveAdmissionQuerySettings(AdmissionQuerySetting settings)
        {
            ModelState.Remove("Company");

            if (ModelState.IsValid)
            {
                var existing = await _context.AdmissionQuerySettings.FirstOrDefaultAsync(s => s.Id == settings.Id);
                if (existing != null)
                {
                    existing.FormTitle = settings.FormTitle;
                    existing.FormDescription = settings.FormDescription ?? "";
                    existing.ShowEmail = settings.ShowEmail;
                    existing.RequireEmail = settings.RequireEmail;
                    existing.ShowPhone = settings.ShowPhone;
                    existing.RequirePhone = settings.RequirePhone;
                    existing.ShowAddress = settings.ShowAddress;
                    existing.RequireAddress = settings.RequireAddress;
                    existing.ShowDescription = settings.ShowDescription;
                    existing.RequireDescription = settings.RequireDescription;
                    existing.ShowClass = settings.ShowClass;
                    existing.RequireClass = settings.RequireClass;
                    existing.ShowNumberOfChildren = settings.ShowNumberOfChildren;
                    existing.RequireNumberOfChildren = settings.RequireNumberOfChildren;
                    existing.AccentColor = settings.AccentColor;

                    _context.Update(existing);
                    await _context.SaveChangesAsync();
                    TempData["Success"] = "Public form settings saved successfully.";
                }
                else
                {
                    TempData["Error"] = "Settings profile not found.";
                }
            }
            else
            {
                TempData["Error"] = "Failed to save settings: " + string.Join(", ", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage));
            }
            return RedirectToAction(nameof(AdmissionQuery));
        }

        public async Task<IActionResult> DeleteAdmissionQuery(int id)
        {
            var query = await _context.AdmissionQueries.FindAsync(id);
            if (query != null)
            {
                _context.AdmissionQueries.Remove(query);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(AdmissionQuery));
        }

        // Visitor Book
        public async Task<IActionResult> VisitorBook()
        {
            var visitors = await _context.VisitorBooks.ToListAsync();
            ViewBag.Purposes = await _context.AdminSetupItems.Where(i => i.Category == "Purpose").ToListAsync();
            return View(visitors);
        }

        [HttpPost]
        public async Task<IActionResult> CreateVisitorRecord(VisitorBook visitor)
        {
            if (ModelState.IsValid)
            {
                visitor.CompanyId = await GetCompanyId();
                visitor.Date = DateTime.Now;
                visitor.Purpose = visitor.Purpose ?? "";
                visitor.VisitorId = visitor.VisitorId ?? "";
                visitor.InTime = visitor.InTime ?? "";
                visitor.OutTime = visitor.OutTime ?? "";
                visitor.Note = visitor.Note ?? "";
                visitor.AttachmentFilePath = visitor.AttachmentFilePath ?? "";
                _context.Add(visitor);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(VisitorBook));
        }

public async Task<IActionResult> DeleteVisitorRecord(int id)
{
    var visitor = await _context.VisitorBooks.FindAsync(id);
    if (visitor != null)
    {
        _context.VisitorBooks.Remove(visitor);
        await _context.SaveChangesAsync();
    }
    return RedirectToAction(nameof(VisitorBook));
}
        // Complaint
        public async Task<IActionResult> Complaint()
        {
            var complaints = await _context.Complaints.ToListAsync();
            ViewBag.ComplaintTypes = await _context.AdminSetupItems.Where(i => i.Category == "ComplaintType").ToListAsync();
            ViewBag.Sources = await _context.AdminSetupItems.Where(i => i.Category == "Source").ToListAsync();
            return View(complaints);
        }

        [HttpPost]
        public async Task<IActionResult> CreateComplaint(Complaint complaint)
        {
            if (ModelState.IsValid)
            {
                complaint.CompanyId = await GetCompanyId();
                complaint.Date = DateTime.Now;
                complaint.ComplaintType = complaint.ComplaintType ?? "";
                complaint.Source = complaint.Source ?? "";
                complaint.Description = complaint.Description ?? "";
                complaint.ActionTaken = complaint.ActionTaken ?? "";
                complaint.AssignedTo = complaint.AssignedTo ?? "";
                complaint.Note = complaint.Note ?? "";
                complaint.AttachmentFilePath = complaint.AttachmentFilePath ?? "";
                _context.Add(complaint);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(Complaint));
        }

public async Task<IActionResult> DeleteComplaint(int id)
{
    var complaint = await _context.Complaints.FindAsync(id);
    if (complaint != null)
    {
        _context.Complaints.Remove(complaint);
        await _context.SaveChangesAsync();
    }
    return RedirectToAction(nameof(Complaint));
}
        // Postal Receive/Dispatch
        public async Task<IActionResult> PostalLog(string type = "Receive")
        {
            var logs = await _context.PostalLogs.Where(l => l.Type == type).ToListAsync();
            ViewBag.LogType = type;
            return View(logs);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePostalLog(PostalLog log)
        {
            if (ModelState.IsValid)
            {
                log.CompanyId = await GetCompanyId();
                log.Date = DateTime.Now;
                log.ReferenceNumber = log.ReferenceNumber ?? "";
                log.Address = log.Address ?? "";
                log.Note = log.Note ?? "";
                log.AttachmentFilePath = log.AttachmentFilePath ?? "";
                log.ConfirmedBy = log.ConfirmedBy ?? "";
                _context.Add(log);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(PostalLog), new { type = log.Type });
        }

public async Task<IActionResult> DeletePostalLog(int id)
{
    var log = await _context.PostalLogs.FindAsync(id);
    string type = "Receive";
    if (log != null)
    {
        type = log.Type;
        _context.PostalLogs.Remove(log);
        await _context.SaveChangesAsync();
    }
    return RedirectToAction(nameof(PostalLog), new { type = type });
}
        // Phone Call Log
        public async Task<IActionResult> PhoneCallLog()
        {
            var calls = await _context.PhoneCallLogs.ToListAsync();
            return View(calls);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePhoneCallLog(PhoneCallLog log)
        {
            if (ModelState.IsValid)
            {
                log.CompanyId = await GetCompanyId();
                log.Date = DateTime.Now;
                log.CallDuration = log.CallDuration ?? "";
                log.Description = log.Description ?? "";
                log.CallType = log.CallType ?? "Incoming";
                _context.Add(log);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(PhoneCallLog));
        }

public async Task<IActionResult> DeletePhoneCallLog(int id)
{
    var log = await _context.PhoneCallLogs.FindAsync(id);
    if (log != null)
    {
        _context.PhoneCallLogs.Remove(log);
        await _context.SaveChangesAsync();
    }
    return RedirectToAction(nameof(PhoneCallLog));
}
        // Admin Setup
        public async Task<IActionResult> AdminSetup()
        {
            var items = await _context.AdminSetupItems.ToListAsync();
            return View(items);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAdminSetupItem(AdminSetupItem item)
        {
            if (ModelState.IsValid)
            {
                item.CompanyId = await GetCompanyId();
                item.Description = item.Description ?? "";
                _context.Add(item);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(AdminSetup));
        }

public async Task<IActionResult> DeleteAdminSetupItem(int id)
{
    var item = await _context.AdminSetupItems.FindAsync(id);
    if (item != null)
    {
        _context.AdminSetupItems.Remove(item);
        await _context.SaveChangesAsync();
    }
    return RedirectToAction(nameof(AdminSetup));
}
        // ID Card & Certificate - Link to CertificatesController or add here
        public IActionResult IdCard()
        {
            return RedirectToAction("IdCards", "Certificates");
        }

        public IActionResult Certificate()
        {
            return RedirectToAction("Index", "Certificates");
        }

        public IActionResult GenerateCertificate()
        {
            return RedirectToAction("Index", "Certificates");
        }

        public IActionResult GenerateIdCard()
        {
            return RedirectToAction("IdCards", "Certificates");
        }
    }

    public class UserManagementViewModel
    {
        public string UserId { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public bool IsActive { get; set; }
        public string InstitutionName { get; set; }
    }

    public class DashboardViewModel
    {
        public int TotalStudents { get; set; }
        public int TotalTeachers { get; set; }
        public int TotalParents { get; set; }
        public int TotalStaff { get; set; }
        public int TotalClasses { get; set; }
        public decimal TotalRevenue { get; set; }
        public List<Student> RecentStudents { get; set; } = new List<Student>();
        public List<FeeCollection> RecentEnrollments { get; set; } = new List<FeeCollection>();
        public List<Notice> Notices { get; set; } = new List<Notice>();
        public List<CalendarEvent> CalendarEvents { get; set; } = new List<CalendarEvent>();
        public decimal TotalExpenses { get; set; }
        public List<ToDo> ToDos { get; set; } = new List<ToDo>();
        public string ToDoFilter { get; set; }
    }
}

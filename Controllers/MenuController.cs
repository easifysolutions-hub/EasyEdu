using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;

namespace EasyEdu.Controllers
{
    [Authorize]
    public class MenuController : Controller
    {
        private readonly ApplicationDbContext _context;

        public MenuController(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Manage(string role = "Staff")
        {
            ViewBag.SelectedRole = role;
            ViewBag.Roles = new List<string> { "SuperAdmin", "Admin", "Teacher", "Student", "Parent", "Staff" };
            
            var menuItems = await _context.MenuItems
                .Where(m => m.Role == role || m.Role == null)
                .OrderBy(m => m.Order)
                .ToListAsync();
            
            // If no menu items exist for this role, seed default data
            if (!menuItems.Any())
            {
                await SeedDefaultMenuItems(role);
                menuItems = await _context.MenuItems
                    .Where(m => m.Role == role || m.Role == null)
                    .OrderBy(m => m.Order)
                    .ToListAsync();
            }
            
            return View(menuItems);
        }

        [HttpPost]
        public async Task<IActionResult> ResetToDefault(string role)
        {
            await SeedDefaultMenuItems(role);
            return RedirectToAction(nameof(Manage), new { role });
        }

        private async Task SeedDefaultMenuItems(string role)
        {
            // Remove existing menu items for this role
            var existing = await _context.MenuItems.Where(m => m.Role == role).ToListAsync();
            _context.MenuItems.RemoveRange(existing);

            var defaultMenus = GetDefaultMenuStructure(role);
            await _context.MenuItems.AddRangeAsync(defaultMenus);
            await _context.SaveChangesAsync();
        }

        private List<MenuItem> GetDefaultMenuStructure(string role)
        {
            var menus = new List<MenuItem>();
            int order = 1;

            // Dashboard Section
            menus.AddRange(new[]
            {
                new MenuItem { Name = "Dashboard", Section = "DASHBOARD", Icon = "fas fa-th", Url = "/Administration", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Sidebar Manager", Section = "DASHBOARD", Icon = "fas fa-bars", Url = "/Menu/Manage", Order = order++, Role = role, IsActive = true }
            });

            // Administration Section
            menus.AddRange(new[]
            {
                new MenuItem { Name = "Academics", Section = "ADMINISTRATION", Icon = "fas fa-graduation-cap", Url = "#", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Admin Section", Section = "ADMINISTRATION", Icon = "fas fa-user-shield", Url = "#", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Study Material", Section = "ADMINISTRATION", Icon = "fas fa-book", Url = "#", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Lesson Plan", Section = "ADMINISTRATION", Icon = "fas fa-clipboard-list", Url = "/LessonPlan", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Bulk Print", Section = "ADMINISTRATION", Icon = "fas fa-print", Url = "#", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Download Center", Section = "ADMINISTRATION", Icon = "fas fa-download", Url = "#", Order = order++, Role = role, IsActive = true }
            });

            // Student Section
            menus.AddRange(new[]
            {
                new MenuItem { Name = "Student Info", Section = "STUDENT", Icon = "fas fa-user-graduate", Url = "/Students", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Behaviour Records", Section = "STUDENT", Icon = "fas fa-chart-line", Url = "#", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Fees", Section = "STUDENT", Icon = "fas fa-money-bill", Url = "/FeeCollections", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Homework", Section = "STUDENT", Icon = "fas fa-book-reader", Url = "/Homework", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Library", Section = "STUDENT", Icon = "fas fa-book-open", Url = "/Library", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Transport", Section = "STUDENT", Icon = "fas fa-bus", Url = "#", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Dormitory", Section = "STUDENT", Icon = "fas fa-bed", Url = "/Dormitory", Order = order++, Role = role, IsActive = true }
            });

            // Exam Section
            menus.AddRange(new[]
            {
                new MenuItem { Name = "Examination", Section = "EXAM", Icon = "fas fa-file-alt", Url = "/Examinations", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Exam Plan", Section = "EXAM", Icon = "fas fa-calendar-check", Url = "#", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Online Exam", Section = "EXAM", Icon = "fas fa-laptop", Url = "#", Order = order++, Role = role, IsActive = true }
            });

            // HR Section
            menus.AddRange(new[]
            {
                new MenuItem { Name = "Human Resource", Section = "HR", Icon = "fas fa-users", Url = "/Teachers", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Teacher Evaluation", Section = "HR", Icon = "fas fa-star", Url = "#", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Leave", Section = "HR", Icon = "fas fa-calendar-times", Url = "#", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Role & Permission", Section = "HR", Icon = "fas fa-key", Url = "/RolePermission/Role", Order = order++, Role = role, IsActive = true }
            });

            // Utilities Section
            menus.AddRange(new[]
            {
                new MenuItem { Name = "User Log", Section = "UTILITIES", Icon = "fas fa-history", Url = "/Reports/UserLog", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Module manager", Section = "UTILITIES", Icon = "fas fa-cubes", Url = "/System/ModuleManager", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Chat", Section = "UTILITIES", Icon = "fas fa-comments", Url = "/Chat/Directory", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Chat Box", Section = "UTILITIES", Icon = "fas fa-inbox", Url = "/Chat/Index", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Invitation", Section = "UTILITIES", Icon = "fas fa-user-plus", Url = "/Chat/Invitations", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Blocked User", Section = "UTILITIES", Icon = "fas fa-user-slash", Url = "/Chat/BlockedUsers", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Chat Settings", Section = "UTILITIES", Icon = "fas fa-user-cog", Url = "/Chat/Settings", Order = order++, Role = role, IsActive = true }
            });

            // Inventory Section
            menus.AddRange(new[]
            {
                new MenuItem { Name = "Inventory", Section = "INVENTORY", Icon = "fas fa-boxes", Url = "/Inventory", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Item Category", Section = "INVENTORY", Icon = "fas fa-tags", Url = "/Inventory/ItemCategory", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Item List", Section = "INVENTORY", Icon = "fas fa-list", Url = "/Inventory", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Item Store", Section = "INVENTORY", Icon = "fas fa-warehouse", Url = "/Inventory/ItemStore", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Supplier", Section = "INVENTORY", Icon = "fas fa-handshake", Url = "/Inventory/Supplier", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Item Receive", Section = "INVENTORY", Icon = "fas fa-truck-loading", Url = "/Inventory/ItemReceive", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Item Sell", Section = "INVENTORY", Icon = "fas fa-cart-shopping", Url = "/Inventory/ItemSell", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Item Issue", Section = "INVENTORY", Icon = "fas fa-hand-holding-box", Url = "/Inventory/IssueItem", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Item Receive List", Section = "INVENTORY", Icon = "fas fa-history", Url = "/Inventory/Transactions", Order = order++, Role = role, IsActive = true }
            });

            // Accounts Section
            menus.AddRange(new[]
            {
                new MenuItem { Name = "Wallet", Section = "ACCOUNTS", Icon = "fas fa-wallet", Url = "#", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Accounts", Section = "ACCOUNTS", Icon = "fas fa-file-invoice-dollar", Url = "#", Order = order++, Role = role, IsActive = true }
            });

            // Communicate Section
            menus.AddRange(new[]
            {
                new MenuItem { Name = "Notice Board", Section = "COMMUNICATE", Icon = "fas fa-bullhorn", Url = "/Communicate/NoticeBoard", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Send Email / Sms", Section = "COMMUNICATE", Icon = "fas fa-paper-plane", Url = "/Communicate/SendEmail", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Email / Sms Log", Section = "COMMUNICATE", Icon = "fas fa-history", Url = "/Communicate/MessageLog", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Event", Section = "COMMUNICATE", Icon = "fas fa-calendar-check", Url = "/Communicate/EventList", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Calendar", Section = "COMMUNICATE", Icon = "fas fa-calendar-alt", Url = "/Communicate/Calendar", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Email Template", Section = "COMMUNICATE", Icon = "fas fa-file-code", Url = "/Communicate/EmailTemplates", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Sms Template", Section = "COMMUNICATE", Icon = "fas fa-comment-code", Url = "/Communicate/SmsTemplates", Order = order++, Role = role, IsActive = true }
            });

            // Style Section
            menus.AddRange(new[]
            {
                new MenuItem { Name = "BackGround Settings", Section = "STYLE", Icon = "fas fa-image", Url = "/Style/BackgroundSettings", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Color Theme", Section = "STYLE", Icon = "fas fa-palette", Url = "/Style/ColorTheme", Order = order++, Role = role, IsActive = true }
            });

            // Report Section
            menus.AddRange(new[]
            {
                new MenuItem { Name = "Students Report", Section = "REPORT SECTION", Icon = "fas fa-user-graduate", Url = "/Reports/StudentReport", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Student Attendance Report", Section = "REPORT SECTION", Icon = "fas fa-user-check", Url = "/Reports/StudentAttendanceReport", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Subject Attendance Report", Section = "REPORT SECTION", Icon = "fas fa-book-reader", Url = "/Reports/SubjectAttendanceReport", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Homework Evaluation Report", Section = "REPORT SECTION", Icon = "fas fa-tasks", Url = "/Reports/HomeworkEvaluationReport", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Guardian Reports", Section = "REPORT SECTION", Icon = "fas fa-users-viewfinder", Url = "/Reports/GuardianReport", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Student History", Section = "REPORT SECTION", Icon = "fas fa-landmark", Url = "/Reports/StudentHistory", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Student Login Report", Section = "REPORT SECTION", Icon = "fas fa-shield-alt", Url = "/Reports/StudentLoginReport", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Class Report", Section = "REPORT SECTION", Icon = "fas fa-university", Url = "/Reports/ClassReport", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Class Routine", Section = "REPORT SECTION", Icon = "fas fa-calendar-alt", Url = "/Reports/ClassRoutineReport", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Previous Record", Section = "REPORT SECTION", Icon = "fas fa-history", Url = "/Reports/PreviousRecord", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Student Transport Report", Section = "REPORT SECTION", Icon = "fas fa-bus", Url = "/Reports/StudentTransportReport", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Student Dormitory Report", Section = "REPORT SECTION", Icon = "fas fa-bed", Url = "/Reports/StudentDormitoryReport", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Fees Report", Section = "REPORT SECTION", Icon = "fas fa-receipt", Url = "/Reports/FeesReport", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Payroll Report", Section = "REPORT SECTION", Icon = "fas fa-file-invoice-dollar", Url = "/Reports/PayrollReport", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Transaction Report", Section = "REPORT SECTION", Icon = "fas fa-exchange-alt", Url = "/Reports/TransactionReport", Order = order++, Role = role, IsActive = true }
            });

            // Settings Section
            menus.AddRange(new[]
            {
                new MenuItem { Name = "Custom Field", Section = "SETTINGS SECTION", Icon = "fas fa-sliders-h", Url = "#", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "General Settings", Section = "SETTINGS SECTION", Icon = "fas fa-cog", Url = "/Administration/Settings", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Frontend CMS", Section = "SETTINGS SECTION", Icon = "fas fa-edit", Url = "#", Order = order++, Role = role, IsActive = true },
                new MenuItem { Name = "Fees Settings", Section = "SETTINGS SECTION", Icon = "fas fa-money-check-alt", Url = "/Finance/BulkInvoicePrintSettings", Order = order++, Role = role, IsActive = true }
            });

            return menus;
        }

        [HttpPost]
        public async Task<IActionResult> UpdateMenuOrder([FromBody] List<MenuOrderDto> items)
        {
            if (items == null || !items.Any()) return BadRequest();

            foreach (var item in items)
            {
                var menuItem = await _context.MenuItems.FindAsync(item.Id);
                if (menuItem != null)
                {
                    menuItem.Order = item.Order;
                    menuItem.Section = item.Section;
                    _context.Entry(menuItem).State = EntityState.Modified;
                }
            }

            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> DeleteMenuItem(int id)
        {
            var item = await _context.MenuItems.FindAsync(id);
            if (item != null)
            {
                _context.MenuItems.Remove(item);
                await _context.SaveChangesAsync();
                return Ok();
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> AddMenuItem([FromBody] MenuItemDto item)
        {
            if (item == null) return BadRequest();

            var menuItem = new MenuItem
            {
                Name = item.Name,
                Section = item.Section,
                Role = item.Role,
                Url = item.Url ?? "#",
                Icon = item.Icon ?? "fas fa-circle",
                IsActive = true,
                Order = 999 
            };

            _context.MenuItems.Add(menuItem);
            await _context.SaveChangesAsync();
            return Json(new { id = menuItem.Id });
        }

        [HttpPost]
        public async Task<IActionResult> UpdateMenuItem([FromBody] UpdateMenuItemDto item)
        {
            if (item == null) return BadRequest();

            var menuItem = await _context.MenuItems.FindAsync(item.Id);
            if (menuItem != null)
            {
                menuItem.Name = item.Name;
                menuItem.Url = item.Url;
                menuItem.Icon = item.Icon;
                menuItem.IsActive = item.IsActive;
                
                _context.Entry(menuItem).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return Ok();
            }
            return NotFound();
        }
    }

    public class MenuOrderDto
    {
        public int Id { get; set; }
        public int Order { get; set; }
        public string Section { get; set; }
    }

    public class MenuItemDto
    {
        public string Name { get; set; }
        public string Section { get; set; }
        public string Role { get; set; }
        public string Url { get; set; }
        public string Icon { get; set; }
    }

    public class UpdateMenuItemDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public string Icon { get; set; }
        public bool IsActive { get; set; }
    }
}

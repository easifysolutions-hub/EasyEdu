using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Models;
using EasyEdu.Data;

namespace EasyEdu.Controllers
{
    [Authorize(Roles = "SuperAdmin,Admin")]
    public class RolePermissionController : Controller
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;

        public RolePermissionController(
            RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager,
            ApplicationDbContext context)
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _context = context;
        }

        // --- Role List ---
        public async Task<IActionResult> Role()
        {
            var roles = await _roleManager.Roles.ToListAsync();
            return View(roles);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateRole(string roleName)
        {
            if (!string.IsNullOrWhiteSpace(roleName))
            {
                if (await _roleManager.RoleExistsAsync(roleName))
                {
                    TempData["Error"] = $"Role '{roleName}' already exists.";
                }
                else
                {
                    var result = await _roleManager.CreateAsync(new IdentityRole(roleName.Trim()));
                    if (result.Succeeded)
                        TempData["Success"] = $"Role '{roleName}' created successfully.";
                    else
                        TempData["Error"] = string.Join(", ", result.Errors.Select(e => e.Description));
                }
            }
            return RedirectToAction(nameof(Role));
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteRole(string roleId)
        {
            var role = await _roleManager.FindByIdAsync(roleId);
            if (role == null)
            {
                TempData["Error"] = "Role not found.";
                return RedirectToAction(nameof(Role));
            }

            if (role.Name == "SuperAdmin")
            {
                TempData["Error"] = "The SuperAdmin role cannot be deleted.";
                return RedirectToAction(nameof(Role));
            }

            var usersInRole = await _userManager.GetUsersInRoleAsync(role.Name!);
            if (usersInRole.Any())
            {
                TempData["Error"] = $"Cannot delete '{role.Name}': {usersInRole.Count} user(s) are still assigned to this role. Reassign them first.";
                return RedirectToAction(nameof(Role));
            }

            var result = await _roleManager.DeleteAsync(role);
            if (result.Succeeded)
                TempData["Success"] = $"Role '{role.Name}' deleted successfully.";
            else
                TempData["Error"] = string.Join(", ", result.Errors.Select(e => e.Description));

            return RedirectToAction(nameof(Role));
        }

        // --- Login Permission ---
        public async Task<IActionResult> LoginPermission(string? roleId)
        {
            var users = await _userManager.Users
                .Include(u => u.Company)
                .ToListAsync();

            if (!string.IsNullOrEmpty(roleId))
            {
                var role = await _roleManager.FindByIdAsync(roleId);
                if (role != null)
                {
                    var usersInRole = await _userManager.GetUsersInRoleAsync(role.Name!);
                    users = users.Where(u => usersInRole.Contains(u)).ToList();
                }
            }

            ViewBag.Roles = new SelectList(await _roleManager.Roles.ToListAsync(), "Id", "Name", roleId);
            return View(users);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateLoginPermission(string userId, bool isEnabled)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user != null)
            {
                user.LockoutEnabled = true;
                user.LockoutEnd = isEnabled ? null : DateTimeOffset.MaxValue;
                await _userManager.UpdateAsync(user);
                return Json(new { success = true });
            }
            return Json(new { success = false, message = "User not found." });
        }

        // --- Due Fees Login Permission ---
        public async Task<IActionResult> DueFeesLoginPermission()
        {
            // Get all users in Student role
            var studentsInRole = await _userManager.GetUsersInRoleAsync("Student");
            var studentUserIds = studentsInRole.Select(s => s.Id).ToList();

            // Get students who have pending/overdue fee collections
            var studentsWithDues = await _context.Students
                .Where(s => s.UserId != null && studentUserIds.Contains(s.UserId))
                .Include(s => s.User)
                    .ThenInclude(u => u!.Company)
                .Include(s => s.FeeCollections)
                .Include(s => s.Class)
                .Where(s => s.FeeCollections.Any(f => f.AmountPending > 0 || f.Status == "Pending" || f.Status == "Overdue"))
                .ToListAsync();

            // Build a ViewModel with fee data
            var viewModel = studentsWithDues.Select(s => new DueFeesStudentViewModel
            {
                User = s.User!,
                StudentName = $"{s.FirstName} {s.LastName}",
                ClassName = s.Class?.Name ?? "N/A",
                AdmissionNumber = s.AdmissionNumber,
                TotalDue = s.FeeCollections.Sum(f => f.AmountPending),
                DueCount = s.FeeCollections.Count(f => f.AmountPending > 0 || f.Status == "Pending" || f.Status == "Overdue")
            }).ToList();

            return View(viewModel);
        }

        // --- API Permission ---
        public IActionResult ApiPermission()
        {
            return View();
        }
    }

    public class DueFeesStudentViewModel
    {
        public ApplicationUser User { get; set; } = null!;
        public string StudentName { get; set; } = "";
        public string ClassName { get; set; } = "";
        public string AdmissionNumber { get; set; } = "";
        public decimal TotalDue { get; set; }
        public int DueCount { get; set; }
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;
using System.Security.Claims;

namespace EasyEdu.Controllers
{
    [Authorize]
    public class TaskController : Controller
    {
        private readonly ApplicationDbContext _context;

        public TaskController(ApplicationDbContext context)
        {
            _context = context;
        }

        private string CurrentUserId => User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "";
        private int CurrentCompanyId => int.TryParse(User.FindFirstValue("CompanyId"), out var id) ? id : 0;

        public async Task<IActionResult> Index()
        {
            var userId = CurrentUserId;
            var companyId = CurrentCompanyId;

            var tasks = await _context.TodoTasks
                .Where(t => t.UserId == userId && t.CompanyId == companyId)
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();

            return View(tasks);
        }

        [HttpPost]
        public async Task<IActionResult> Create(string title, string? description, DateTime? dueDate, string priority)
        {
            if (string.IsNullOrEmpty(title)) return BadRequest();

            var task = new TodoTask
            {
                Title = title,
                Description = description,
                DueDate = dueDate,
                Priority = priority,
                UserId = CurrentUserId,
                CompanyId = CurrentCompanyId,
                CreatedAt = DateTime.UtcNow
            };

            _context.TodoTasks.Add(task);
            await _context.SaveChangesAsync();

            return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        public async Task<IActionResult> ToggleComplete(int id)
        {
            var task = await _context.TodoTasks.FindAsync(id);
            if (task == null || task.UserId != CurrentUserId) return NotFound();

            task.IsCompleted = !task.IsCompleted;
            await _context.SaveChangesAsync();

            return Json(new { success = true, isCompleted = task.IsCompleted });
        }

        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            var task = await _context.TodoTasks.FindAsync(id);
            if (task == null || task.UserId != CurrentUserId) return NotFound();

            _context.TodoTasks.Remove(task);
            await _context.SaveChangesAsync();

            return RedirectToAction(nameof(Index));
        }
    }
}

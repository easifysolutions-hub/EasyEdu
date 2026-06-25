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
    public class NotificationsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public NotificationsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetNotifications()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            // In a real app, you would filter by RecipientIds containing userId, 
            // or by RecipientType (e.g., 'All', 'Student', 'Teacher')
            
            var notifications = await _context.Notifications
                .OrderByDescending(n => n.CreatedAt)
                .Take(30)
                .Select(n => new
                {
                    id = n.Id,
                    title = n.Title,
                    message = n.Message,
                    type = n.NotificationType,
                    priority = n.Priority ?? "Normal",
                    date = n.CreatedAt.ToString("MMM dd, yyyy"),
                    time = n.CreatedAt.ToString("hh:mm tt"),
                    isRead = false // This could be tied to a distinct UserNotification tracking table
                })
                .ToListAsync();

            // Fallback for demo if no notifications exist
            if (!notifications.Any())
            {
                var demoData = new List<dynamic>
                {
                    new { id = 1, title = "System Update", message = "The student portal will be down for maintenance at 12:00 AM.", type = "System", priority = "High", date = "Today", time = "10:00 AM", isRead = false },
                    new { id = 2, title = "Welcome to EasyVidya", message = "Welcome to the new digital management portal. Explore the features!", type = "Welcome", priority = "Normal", date = "Yesterday", time = "09:00 AM", isRead = true },
                    new { id = 3, title = "Fee Reminder", message = "Please note that the final installent for the academic term is due soon.", type = "Finance", priority = "Medium", date = "Mar 05, 2026", time = "03:30 PM", isRead = true }
                };
                return Ok(demoData);
            }

            return Ok(notifications);
        }
    }
}

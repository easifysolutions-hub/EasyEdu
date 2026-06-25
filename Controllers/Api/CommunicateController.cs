using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;
using System.Security.Claims;

namespace EasyEdu.Controllers.Api
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route("api/[controller]")]
    [ApiController]
    public class CommunicateController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CommunicateController(ApplicationDbContext context)
        {
            _context = context;
        }

        private int CurrentCompanyId => int.TryParse(User.FindFirstValue("CompanyId"), out var id) ? id : 0;

        [HttpGet("notices")]
        public async Task<IActionResult> GetNotices()
        {
            var notices = await _context.Notices
                .Where(n => n.CompanyId == CurrentCompanyId || n.CompanyId == 1) // 1 is default
                .OrderByDescending(n => n.PublishOn)
                .ToListAsync();
            return Ok(notices);
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendMessage([FromBody] MessageRequest request)
        {
            // Simulate sending and log it
            var log = new MessageLog
            {
                Type = request.Type,
                Recipient = request.Recipient,
                Subject = request.Subject,
                Body = request.Body,
                Status = "Sent",
                SentAt = DateTime.UtcNow,
                CompanyId = CurrentCompanyId == 0 ? 1 : CurrentCompanyId
            };

            _context.MessageLogs.Add(log);
            await _context.SaveChangesAsync();

            return Ok(new { success = true, message = $"{request.Type} dispatched successfully." });
        }

        [HttpGet("logs")]
        public async Task<IActionResult> GetMessageLogs()
        {
            var logs = await _context.MessageLogs
                .Where(l => l.CompanyId == CurrentCompanyId || l.CompanyId == 1)
                .OrderByDescending(l => l.SentAt)
                .ToListAsync();
            return Ok(logs);
        }

        public class MessageRequest
        {
            public string Type { get; set; } = "SMS";
            public string Recipient { get; set; } = "";
            public string Subject { get; set; } = "";
            public string Body { get; set; } = "";
        }
    }
}

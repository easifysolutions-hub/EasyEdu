using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;
using System.Security.Claims;

namespace EasyEdu.Controllers
{
    [Authorize(Roles = "SuperAdmin,Admin,Teacher")]
    public class CommunicateController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CommunicateController(ApplicationDbContext context)
        {
            _context = context;
        }

        private async Task<int> GetCompanyId()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _context.Users.FindAsync(userId);
            return user?.CompanyId ?? 1;
        }

        // --- Notice Board ---
        public async Task<IActionResult> NoticeBoard()
        {
            var companyId = await GetCompanyId();
            var notices = await _context.Notices
                .Where(n => n.CompanyId == companyId)
                .OrderByDescending(n => n.PublishOn)
                .ToListAsync();
            return View(notices);
        }

        [HttpPost]
        public async Task<IActionResult> CreateNotice(Notice notice)
        {
            notice.CompanyId = await GetCompanyId();
            notice.NoticeDate = DateTime.UtcNow;
            _context.Notices.Add(notice);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(NoticeBoard));
        }

        // --- Email / SMS Messaging ---
        public async Task<IActionResult> SendEmail()
        {
            var companyId = await GetCompanyId();
            ViewBag.Templates = await _context.MessageTemplates
                .Where(t => t.Type == "Email" && t.CompanyId == companyId)
                .ToListAsync();
            return View();
        }

        public async Task<IActionResult> SendSms()
        {
            var companyId = await GetCompanyId();
            ViewBag.Templates = await _context.MessageTemplates
                .Where(t => t.Type == "SMS" && t.CompanyId == companyId)
                .ToListAsync();
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> ExecuteSendMessage(string type, string recipient, string subject, string body)
        {
            // Simulate sending and log it
            var log = new MessageLog
            {
                Type = type,
                Recipient = recipient,
                Subject = subject,
                Body = body,
                Status = "Sent",
                SentAt = DateTime.UtcNow,
                CompanyId = await GetCompanyId()
            };

            _context.MessageLogs.Add(log);
            await _context.SaveChangesAsync();

            return Json(new { success = true, message = $"{type} dispatched to {recipient}" });
        }

        public async Task<IActionResult> MessageLog()
        {
            var companyId = await GetCompanyId();
            var logs = await _context.MessageLogs
                .Where(l => l.CompanyId == companyId)
                .OrderByDescending(l => l.SentAt)
                .ToListAsync();
            return View(logs);
        }

        // --- Templates ---
        public async Task<IActionResult> EmailTemplates()
        {
            var companyId = await GetCompanyId();
            var templates = await _context.MessageTemplates
                .Where(t => t.Type == "Email" && t.CompanyId == companyId)
                .ToListAsync();
            return View(templates);
        }

        public async Task<IActionResult> SmsTemplates()
        {
            var companyId = await GetCompanyId();
            var templates = await _context.MessageTemplates
                .Where(t => t.Type == "SMS" && t.CompanyId == companyId)
                .ToListAsync();
            return View(templates);
        }

        [HttpPost]
        public async Task<IActionResult> SaveTemplate(MessageTemplate template)
        {
            template.CompanyId = await GetCompanyId();
            if (template.Id == 0) _context.MessageTemplates.Add(template);
            else _context.Entry(template).State = EntityState.Modified;

            await _context.SaveChangesAsync();
            return RedirectToAction(template.Type == "Email" ? nameof(EmailTemplates) : nameof(SmsTemplates));
        }

        // --- Calendar & Events ---
        public async Task<IActionResult> EventList()
        {
            var companyId = await GetCompanyId();
            var events = await _context.CalendarEvents
                .Where(e => e.CompanyId == companyId)
                .OrderBy(e => e.StartDate)
                .ToListAsync();
            return View(events);
        }

        public IActionResult Calendar()
        {
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> GetCalendarData()
        {
            var companyId = await GetCompanyId();
            var dbEvents = await _context.CalendarEvents
                .Where(e => e.CompanyId == companyId)
                .Select(e => new { e.Id, e.Title, e.StartDate, e.EndDate, e.IsAllDay, e.Color })
                .ToListAsync();

            var events = dbEvents.Select(e => new {
                id = e.Id,
                title = e.Title,
                start = e.StartDate.ToString("yyyy-MM-ddTHH:mm:ss"),
                end = e.EndDate.ToString("yyyy-MM-ddTHH:mm:ss"),
                allDay = e.IsAllDay,
                backgroundColor = e.Color
            });
            return Json(events);
        }

        [HttpPost]
        public async Task<IActionResult> SaveEvent(CalendarEvent ev)
        {
            ev.CompanyId = await GetCompanyId();
            if (ev.Id == 0) _context.CalendarEvents.Add(ev);
            else _context.Entry(ev).State = EntityState.Modified;

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Calendar));
        }
    }
}

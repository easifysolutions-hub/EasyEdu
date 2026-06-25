using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;
using System.Security.Claims;

namespace EasyEdu.Controllers
{
    [Authorize]
    public class ChatController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ChatController(ApplicationDbContext context)
        {
            _context = context;
        }

        private string CurrentUserId => User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "";
        private async Task<int> GetCompanyId()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _context.Users.FindAsync(userId);
            return user?.CompanyId ?? 1;
        }

        public async Task<IActionResult> Index()
        {
            var userId = CurrentUserId;
            var companyId = await GetCompanyId();

            // Get blocked users
            var blockedUserIds = await _context.ChatBlockedUsers
                .Where(b => b.BlockerId == userId && b.CompanyId == companyId)
                .Select(b => b.BlockedId)
                .ToListAsync();

            // Get users with whom we have message history
            var messagedUserIds = await _context.ChatMessages
                .Where(m => (m.SenderId == userId || m.ReceiverId == userId) && m.CompanyId == companyId)
                .Select(m => m.SenderId == userId ? m.ReceiverId : m.SenderId)
                .Distinct()
                .ToListAsync();

            // Filter out blocked users
            messagedUserIds = messagedUserIds.Where(id => !blockedUserIds.Contains(id)).ToList();

            var recentContacts = await _context.Users
                .Where(u => messagedUserIds.Contains(u.Id))
                .ToListAsync();

            ViewBag.CurrentUserId = userId;
            return View(recentContacts);
        }

        public async Task<IActionResult> Directory()
        {
            var userId = CurrentUserId;
            var companyId = await GetCompanyId();

            // Get blocked users
            var blockedUserIds = await _context.ChatBlockedUsers
                .Where(b => b.BlockerId == userId && b.CompanyId == companyId)
                .Select(b => b.BlockedId)
                .ToListAsync();

            // Get established connections
            var connections = await _context.ChatInvitations
                .Where(i => (i.SenderId == userId || i.ReceiverId == userId) && i.Status == "Accepted" && i.CompanyId == companyId)
                .Select(i => i.SenderId == userId ? i.ReceiverId : i.SenderId)
                .ToListAsync();

            // Get users who have chat enabled and aren't blocked, aren't self, and aren't already connected
            // We search for users where settings either don't exist (default to on) or IsChatActive is true
            var others = await _context.Users
                .Where(u => u.Id != userId && u.CompanyId == companyId && !connections.Contains(u.Id) && !blockedUserIds.Contains(u.Id))
                .Where(u => !_context.ChatUserSettings.Any(s => s.UserId == u.Id && s.CompanyId == companyId && !s.IsChatActive))
                .ToListAsync();

            ViewBag.PendingSentIds = await _context.ChatInvitations
                .Where(i => i.SenderId == userId && i.Status == "Pending" && i.CompanyId == companyId)
                .Select(i => i.ReceiverId)
                .ToListAsync();

            ViewBag.CurrentUserId = userId;
            return View(others);
        }

        public async Task<IActionResult> ChatBox(string id)
        {
            if (string.IsNullOrEmpty(id)) return RedirectToAction(nameof(Index));

            var userId = CurrentUserId;
            var companyId = await GetCompanyId();

            var otherUser = await _context.Users.FindAsync(id);
            if (otherUser == null) return NotFound();

            // Load messages
            var messages = await _context.ChatMessages
                .Where(m => ((m.SenderId == userId && m.ReceiverId == id) || (m.SenderId == id && m.ReceiverId == userId)) && m.CompanyId == companyId)
                .OrderBy(m => m.SentAt)
                .ToListAsync();

            // Mark as read
            var unread = messages.Where(m => m.ReceiverId == userId && !m.IsRead).ToList();
            if (unread.Any())
            {
                unread.ForEach(m => m.IsRead = true);
                await _context.SaveChangesAsync();
            }

            ViewBag.OtherUser = otherUser;
            ViewBag.CurrentUserId = userId;
            return View(messages);
        }

        [HttpPost]
        public async Task<IActionResult> SendInvitation(string receiverId)
        {
            if (string.IsNullOrEmpty(receiverId)) return BadRequest();

            var userId = CurrentUserId;
            var companyId = await GetCompanyId();

            // Check if already invited
            if (await _context.ChatInvitations.AnyAsync(i => i.SenderId == userId && i.ReceiverId == receiverId && i.CompanyId == companyId))
                return Json(new { success = false, message = "Invitation already sent." });

            var invite = new ChatInvitation
            {
                SenderId = userId,
                ReceiverId = receiverId,
                Status = "Pending",
                SentAt = DateTime.UtcNow,
                CompanyId = companyId
            };

            _context.ChatInvitations.Add(invite);
            await _context.SaveChangesAsync();

            return Json(new { success = true });
        }

        [HttpPost]
        public async Task<IActionResult> SendMessage(string receiverId, string message)
        {
            if (string.IsNullOrEmpty(receiverId) || string.IsNullOrEmpty(message)) return BadRequest();

            var companyId = await GetCompanyId();
            var chatMsg = new ChatMessage
            {
                SenderId = CurrentUserId,
                ReceiverId = receiverId,
                Message = message,
                SentAt = DateTime.UtcNow,
                CompanyId = companyId
            };

            _context.ChatMessages.Add(chatMsg);
            await _context.SaveChangesAsync();

            return Json(new { success = true, sentAt = chatMsg.SentAt.ToString("HH:mm") });
        }

        public async Task<IActionResult> Invitations()
        {
            var userId = CurrentUserId;
            var companyId = await GetCompanyId();

            var invitations = await _context.ChatInvitations
                .Include(i => i.Sender)
                .Where(i => i.ReceiverId == userId && i.Status == "Pending" && i.CompanyId == companyId)
                .ToListAsync();

            return View(invitations);
        }

        [HttpPost]
        public async Task<IActionResult> RespondToInvitation(int id, string response)
        {
            var invitation = await _context.ChatInvitations.FindAsync(id);
            if (invitation == null || invitation.ReceiverId != CurrentUserId) return NotFound();

            invitation.Status = response; // Accepted or Rejected
            await _context.SaveChangesAsync();

            return RedirectToAction(nameof(Invitations));
        }

        public async Task<IActionResult> BlockedUsers()
        {
            var userId = CurrentUserId;
            var companyId = await GetCompanyId();

            var blockedLineItems = await _context.ChatBlockedUsers
                .Include(b => b.Blocked)
                .Where(b => b.BlockerId == userId && b.CompanyId == companyId)
                .ToListAsync();

            return View(blockedLineItems);
        }

        [HttpPost]
        public async Task<IActionResult> BlockUser(string id)
        {
            if (string.IsNullOrEmpty(id)) return BadRequest();

            var userId = CurrentUserId;
            var companyId = await GetCompanyId();

            if (!await _context.ChatBlockedUsers.AnyAsync(b => b.BlockerId == userId && b.BlockedId == id && b.CompanyId == companyId))
            {
                _context.ChatBlockedUsers.Add(new ChatBlockedUser
                {
                    BlockerId = userId,
                    BlockedId = id,
                    BlockedAt = DateTime.UtcNow,
                    CompanyId = companyId
                });
                await _context.SaveChangesAsync();
            }

            return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        public async Task<IActionResult> UnblockUser(int id)
        {
            var blocked = await _context.ChatBlockedUsers.FindAsync(id);
            if (blocked == null || blocked.BlockerId != CurrentUserId) return NotFound();

            _context.ChatBlockedUsers.Remove(blocked);
            await _context.SaveChangesAsync();

            return RedirectToAction(nameof(BlockedUsers));
        }

        public async Task<IActionResult> Settings()
        {
            var userId = CurrentUserId;
            var companyId = await GetCompanyId();

            var settings = await _context.ChatUserSettings
                .FirstOrDefaultAsync(s => s.UserId == userId && s.CompanyId == companyId);

            if (settings == null)
            {
                settings = new ChatSettings { UserId = userId, CompanyId = companyId };
                _context.ChatUserSettings.Add(settings);
                await _context.SaveChangesAsync();
            }

            return View(settings);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateSettings(ChatSettings settings)
        {
            var userId = CurrentUserId;
            var companyId = await GetCompanyId();

            var existing = await _context.ChatUserSettings
                .FirstOrDefaultAsync(s => s.UserId == userId && s.CompanyId == companyId);

            if (existing != null)
            {
                existing.IsChatActive = settings.IsChatActive;
                existing.ShowOnlineStatus = settings.ShowOnlineStatus;
                existing.AllowInvitationsFromEveryone = settings.AllowInvitationsFromEveryone;
                await _context.SaveChangesAsync();
            }

            return RedirectToAction(nameof(Settings));
        }
    }
}

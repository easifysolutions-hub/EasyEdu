using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EasyEdu.Models
{
    public class ChatMessage
    {
        public int Id { get; set; }
        
        [Required]
        public string SenderId { get; set; } = string.Empty;
        public virtual ApplicationUser? Sender { get; set; }
        
        [Required]
        public string ReceiverId { get; set; } = string.Empty;
        public virtual ApplicationUser? Receiver { get; set; }
        
        [Required, StringLength(2000)]
        public string Message { get; set; } = string.Empty;
        
        public bool IsRead { get; set; } = false;
        public DateTime SentAt { get; set; } = DateTime.UtcNow;
        
        public int CompanyId { get; set; }
        public virtual Company? Company { get; set; }
    }

    public class ChatInvitation
    {
        public int Id { get; set; }
        
        [Required]
        public string SenderId { get; set; } = string.Empty;
        public virtual ApplicationUser? Sender { get; set; }
        
        [Required]
        public string ReceiverId { get; set; } = string.Empty;
        public virtual ApplicationUser? Receiver { get; set; }
        
        public string Status { get; set; } = "Pending"; // Pending, Accepted, Rejected
        public DateTime SentAt { get; set; } = DateTime.UtcNow;
        
        public int CompanyId { get; set; }
        public virtual Company? Company { get; set; }
    }

    public class ChatBlockedUser
    {
        public int Id { get; set; }
        
        [Required]
        public string BlockerId { get; set; } = string.Empty;
        public virtual ApplicationUser? Blocker { get; set; }
        
        [Required]
        public string BlockedId { get; set; } = string.Empty;
        public virtual ApplicationUser? Blocked { get; set; }
        
        public DateTime BlockedAt { get; set; } = DateTime.UtcNow;
        
        public int CompanyId { get; set; }
        public virtual Company? Company { get; set; }
    }

    public class ChatSettings
    {
        public int Id { get; set; }
        
        [Required]
        public string UserId { get; set; } = string.Empty;
        public virtual ApplicationUser? User { get; set; }
        
        public bool IsChatActive { get; set; } = true;
        public bool ShowOnlineStatus { get; set; } = true;
        public bool AllowInvitationsFromEveryone { get; set; } = true;
        
        public int CompanyId { get; set; }
        public virtual Company? Company { get; set; }
    }
}

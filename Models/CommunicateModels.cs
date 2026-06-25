using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EasyEdu.Models
{
    public class Notice
    {
        public int Id { get; set; }
        
        [Required, StringLength(200)]
        public string Title { get; set; } = string.Empty;
        
        [Required]
        public string Description { get; set; } = string.Empty;
        
        public DateTime NoticeDate { get; set; } = DateTime.UtcNow;
        public DateTime PublishOn { get; set; } = DateTime.UtcNow;
        
        public string? TargetAudience { get; set; } // "All", "Student", "Teacher", "Parent"
        
        public bool IsActive { get; set; } = true;
        
        public int? CompanyId { get; set; }
        public virtual Company? Company { get; set; }
    }

    public class MessageLog
    {
        public int Id { get; set; }
        
        public string? Recipient { get; set; }
        public string? Subject { get; set; }
        public string? Body { get; set; }
        
        public string Type { get; set; } = "Email"; // Email, SMS
        public string Status { get; set; } = "Sent"; // Sent, Failed, Pending
        
        public DateTime SentAt { get; set; } = DateTime.UtcNow;
        
        public int? CompanyId { get; set; }
        public virtual Company? Company { get; set; }
    }

    public class MessageTemplate
    {
        public int Id { get; set; }
        
        [Required, StringLength(100)]
        public string Name { get; set; } = string.Empty;
        
        public string? Subject { get; set; }
        
        [Required]
        public string Body { get; set; } = string.Empty;
        
        public string Type { get; set; } = "Email"; // Email, SMS
        
        public bool IsActive { get; set; } = true;
        
        public int? CompanyId { get; set; }
        public virtual Company? Company { get; set; }
    }

    public class CalendarEvent
    {
        public int Id { get; set; }
        
        [Required, StringLength(200)]
        public string Title { get; set; } = string.Empty;
        
        public string? Description { get; set; }
        
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        
        public bool IsAllDay { get; set; } = false;
        
        public string? Color { get; set; } = "#6366f1";
        
        public int? CompanyId { get; set; }
        public virtual Company? Company { get; set; }
    }
}

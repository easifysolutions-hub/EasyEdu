using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class Notification
    {
        public int Id { get; set; }

        [Required, StringLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Message { get; set; } = string.Empty;

        [Required, StringLength(50)]
        public string NotificationType { get; set; } = string.Empty; // SMS, Email, Push, InApp

        [Required, StringLength(50)]
        public string RecipientType { get; set; } = string.Empty; // Student, Teacher, Parent, All

        public string? RecipientIds { get; set; } // JSON array of user IDs

        [StringLength(50)]
        public string Status { get; set; } = "Pending"; // Pending, Sent, Failed

        public DateTime? SentAt { get; set; }

        [StringLength(50)]
        public string? Priority { get; set; } // Low, Medium, High

        public string? AdditionalData { get; set; } // JSON for extra info

        public string? SentBy { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

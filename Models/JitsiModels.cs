using System;
using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class JitsiSetting
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;

        [Required, StringLength(100)]
        public string ServerDomain { get; set; } = "meet.jit.si";
        
        public bool AllowScreenShare { get; set; } = true;
        public bool MuteOnStart { get; set; } = true;
        
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }

    public class JitsiVirtualClass
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;

        [Required, StringLength(150)]
        public string Topic { get; set; } = string.Empty;
        
        public int ClassId { get; set; }
        public virtual Class Class { get; set; } = null!;
        public int SectionId { get; set; }
        public virtual Section Section { get; set; } = null!;
        public int SubjectId { get; set; }
        public virtual Subject Subject { get; set; } = null!;

        public DateTime Date { get; set; }
        public string StartTime { get; set; } = string.Empty;
        public int DurationMinutes { get; set; }

        public string Description { get; set; } = string.Empty;
        [Required, StringLength(100)]
        public string MeetingId { get; set; } = string.Empty; // Unique Jitsi room name
        public string? Password { get; set; }

        [Required, StringLength(50)]
        public string Status { get; set; } = "Pending"; // Pending, Live, Closed
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class JitsiVirtualMeeting
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;

        [Required, StringLength(150)]
        public string Topic { get; set; } = string.Empty;
        
        public string? ParticipationType { get; set; } // Staff, Parent, All
        public DateTime Date { get; set; }
        public string StartTime { get; set; } = string.Empty;
        public int DurationMinutes { get; set; }

        public string Description { get; set; } = string.Empty;
        [Required, StringLength(100)]
        public string MeetingId { get; set; } = string.Empty; // Unique Jitsi room name
        public string? Password { get; set; }

        [Required, StringLength(50)]
        public string Status { get; set; } = "Pending"; // Pending, Live, Closed
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

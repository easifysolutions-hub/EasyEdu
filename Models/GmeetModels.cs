using System;
using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class GmeetSetting
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;

        public bool IsEnabled { get; set; } = true;
        
        [Required] public string ClientId { get; set; } = string.Empty;
        [Required] public string ClientSecret { get; set; } = string.Empty;
        public string? RedirectUri { get; set; } // Institutional Return Path
        
        public string? ApiKey { get; set; }
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }

    public class GmeetVirtualClass
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;

        [Required] public string Topic { get; set; } = string.Empty;
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
        public string? MeetUrl { get; set; } // The actual Google Meet link
        public string? MeetingId { get; set; }
        
        public string Status { get; set; } = "Pending"; // Pending, Live, Finished
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class GmeetVirtualMeeting
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;

        [Required] public string Topic { get; set; } = string.Empty;
        public string? ParticipationType { get; set; } // Staff, Parent, All
        public DateTime Date { get; set; }
        public string StartTime { get; set; } = string.Empty;
        public int DurationMinutes { get; set; }

        public string Description { get; set; } = string.Empty;
        public string? MeetUrl { get; set; }
        public string? MeetingId { get; set; }

        public string Status { get; set; } = "Pending";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

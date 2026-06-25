using System;
using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class ZoomSetting
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;

        [Required] public string ApiKey { get; set; } = string.Empty;
        [Required] public string ApiSecret { get; set; } = string.Empty;
        public string? AccountId { get; set; }
        public bool UseJwt { get; set; } = true;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }

    public class ZoomVirtualClass
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
        public string? MeetingId { get; set; }
        public string? Password { get; set; }
        public string? StartUrl { get; set; }
        public string? JoinUrl { get; set; }

        public string Status { get; set; } = "Pending"; // Pending, Live, Closed
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class ZoomVirtualMeeting
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
        public string? MeetingId { get; set; }
        public string? Password { get; set; }
        public string? StartUrl { get; set; }
        public string? JoinUrl { get; set; }

        public string Status { get; set; } = "Pending"; // Pending, Live, Closed
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

using System;
using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class BBBSetting
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;

        [Required] public string BaseUrl { get; set; } = string.Empty; // e.g. https://bbb.example.com/bigbluebutton/
        [Required] public string SecretKey { get; set; } = string.Empty;
        public bool IsEnabled { get; set; } = true;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }

    public class BBBVirtualClass
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
        public string? ModeratorPassword { get; set; }
        public string? AttendeePassword { get; set; }
        
        public bool Record { get; set; } = true;
        public string Status { get; set; } = "Pending"; // Pending, Live, Closed, Archived
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class BBBVirtualMeeting
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;

        [Required] public string Topic { get; set; } = string.Empty;
        public string? ParticipationType { get; set; }
        public DateTime Date { get; set; }
        public string StartTime { get; set; } = string.Empty;
        public int DurationMinutes { get; set; }

        public string Description { get; set; } = string.Empty;
        public string? MeetingId { get; set; }
        public string? ModeratorPassword { get; set; }
        public string? AttendeePassword { get; set; }

        public bool Record { get; set; } = true;
        public string Status { get; set; } = "Pending";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class BBBRecording
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;

        public string Topic { get; set; } = string.Empty;
        public string? RecordingId { get; set; }
        public string? PlaybackUrl { get; set; }
        public string? Type { get; set; } // Class, Meeting
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

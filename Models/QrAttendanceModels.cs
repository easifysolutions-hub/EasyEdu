using System;
using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class QrAttendanceSetting
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;

        public bool IsEnabled { get; set; } = true;
        
        // --- Auto Submission Paradigm ---
        public bool AutoSubmission { get; set; } = false;
        public string? AutoSubmissionTime { get; set; } // e.g. "10:00:00"
        public string? DefaultStatus { get; set; } = "Present"; // Status if auto-marked
        
        // --- QR Validation Logic ---
        public string? QrSecret { get; set; } = Guid.NewGuid().ToString("N");
        public int ExpiryDurationSeconds { get; set; } = 60; // How long a QR code remains valid after generation
        
        public bool RequireSelfie { get; set; } = false;
        public bool RequireGeolocation { get; set; } = false;
        
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}

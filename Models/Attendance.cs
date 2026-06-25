using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class Attendance
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public virtual Student Student { get; set; } = null!;
        public DateTime Date { get; set; }

        [Required, StringLength(20)]
        public string Status { get; set; } = string.Empty; // Present, Absent, Late, HalfDay

        [StringLength(200)]
        public string? Remarks { get; set; }

        [StringLength(50)]
        public string? AttendanceMethod { get; set; } // Manual, QR, Biometric, Selfie, Geolocation

        public string? GeolocationData { get; set; } // JSON for lat/long if geolocation used
        public string? SelfieImage { get; set; } // Path to selfie image if selfie attendance
        public string? MarkedBy { get; set; } // User ID who marked attendance
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

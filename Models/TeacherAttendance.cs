using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class TeacherAttendance
    {
        public int Id { get; set; }
        public int TeacherId { get; set; }
        public virtual Teacher Teacher { get; set; } = null!;
        public DateTime Date { get; set; }

        [Required, StringLength(20)]
        public string Status { get; set; } = string.Empty; // Present, Absent, Leave, HalfDay

        [StringLength(200)]
        public string? Remarks { get; set; }

        [StringLength(50)]
        public string? AttendanceMethod { get; set; }
        public string? GeolocationData { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

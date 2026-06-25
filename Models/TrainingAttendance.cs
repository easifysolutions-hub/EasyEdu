using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class TrainingAttendance
    {
        public int Id { get; set; }
        public int TrainingId { get; set; }
        public virtual Training Training { get; set; } = null!;
        public int TeacherId { get; set; }
        public virtual Teacher Teacher { get; set; } = null!;

        public DateTime AttendanceDate { get; set; }

        [StringLength(20)]
        public string Status { get; set; } = "Present"; // Present, Absent

        [Range(1, 5)]
        public int? FeedbackRating { get; set; }

        [StringLength(1000)]
        public string? FeedbackComments { get; set; }

        public bool CertificateIssued { get; set; }
        public string? CertificatePath { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

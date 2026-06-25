using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class Training
    {
        public int Id { get; set; }

        [Required, StringLength(200)]
        public string Title { get; set; } = string.Empty;

        [StringLength(1000)]
        public string? Description { get; set; }

        [StringLength(100)]
        public string? Trainer { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        [StringLength(200)]
        public string? Venue { get; set; }

        public int? MaxParticipants { get; set; }

        [StringLength(50)]
        public string Status { get; set; } = "Scheduled"; // Scheduled, Ongoing, Completed, Cancelled

        public int CompanyId { get; set; }
        public virtual Company? Company { get; set; }

        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public virtual ICollection<TrainingAttendance> Attendances { get; set; } = new List<TrainingAttendance>();
    }
}

using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class TimeTable
    {
        public int Id { get; set; }

        public int ClassId { get; set; }
        public virtual Class Class { get; set; } = null!;

        public int SectionId { get; set; }
        public virtual Section Section { get; set; } = null!;

        public int SubjectId { get; set; }
        public virtual Subject Subject { get; set; } = null!;

        public int TeacherId { get; set; }
        public virtual Teacher Teacher { get; set; } = null!;

        public int ClassRoomId { get; set; }
        public virtual ClassRoom ClassRoom { get; set; } = null!;

        [Required, StringLength(20)]
        public string DayOfWeek { get; set; } = string.Empty; // e.g. Monday, Tuesday

        [Required]
        public TimeSpan StartTime { get; set; }

        [Required]
        public TimeSpan EndTime { get; set; }

        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

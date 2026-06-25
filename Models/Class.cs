using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class Class
    {
        public int Id { get; set; }

        [Required, StringLength(100)]
        public string Name { get; set; } = string.Empty; // e.g., "Grade 10", "Class XII"

        [StringLength(50)]
        public string? Section { get; set; } // e.g., "A", "B", "Science"

        public int? Capacity { get; set; }
        public int AcademicYearId { get; set; }
        public virtual AcademicYear AcademicYear { get; set; } = null!;
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public virtual ICollection<Student> Students { get; set; } = new List<Student>();
        public virtual ICollection<Subject> Subjects { get; set; } = new List<Subject>();
        public virtual ICollection<TimeTable> TimeTables { get; set; } = new List<TimeTable>();
    }
}

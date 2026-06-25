using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class AcademicYear
    {
        public int Id { get; set; }

        [Required, StringLength(100)]
        public string Name { get; set; } = string.Empty; // e.g., "2025-2026"

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsCurrent { get; set; }
        public bool IsActive { get; set; } = true;
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public virtual ICollection<Class> Classes { get; set; } = new List<Class>();
        public virtual ICollection<Examination> Examinations { get; set; } = new List<Examination>();
    }
}

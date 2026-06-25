using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class Examination
    {
        public int Id { get; set; }

        [Required, StringLength(100)]
        public string Name { get; set; } = string.Empty; // Unit Test 1, Mid-term, Final

        [StringLength(500)]
        public string? Description { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int AcademicYearId { get; set; }
        public virtual AcademicYear AcademicYear { get; set; } = null!;
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public virtual ICollection<Mark> Marks { get; set; } = new List<Mark>();
    }
}

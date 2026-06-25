using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class Subject
    {
        public int Id { get; set; }

        [Required, StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [StringLength(20)]
        public string? Code { get; set; }

        [StringLength(500)]
        public string? Description { get; set; }

        public int? Credits { get; set; }
        public int ClassId { get; set; }
        public virtual Class Class { get; set; } = null!;
        public int? TeacherId { get; set; }
        public virtual Teacher? Teacher { get; set; }
        public bool IsActive { get; set; } = true;
        
        public bool IsOptional { get; set; } = false; // Add this
        public string Type { get; set; } = "Theory"; // Theory, Practical

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public virtual ICollection<Mark> Marks { get; set; } = new List<Mark>();
    }
}

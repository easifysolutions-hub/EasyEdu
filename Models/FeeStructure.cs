using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class FeeStructure
    {
        public int Id { get; set; }

        [Required, StringLength(100)]
        public string Name { get; set; } = string.Empty; // Tuition Fee, Lab Fee, etc.

        [StringLength(500)]
        public string? Description { get; set; }

        public decimal Amount { get; set; }
        public int ClassId { get; set; }
        public virtual Class? Class { get; set; }

        [StringLength(50)]
        public string? Frequency { get; set; } // Monthly, Quarterly, Yearly, One-time

        public bool IsMandatory { get; set; } = true;
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

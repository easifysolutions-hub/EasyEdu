using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class Mark
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public virtual Student Student { get; set; } = null!;
        public int SubjectId { get; set; }
        public virtual Subject Subject { get; set; } = null!;
        public int ExaminationId { get; set; }
        public virtual Examination Examination { get; set; } = null!;

        public decimal MarksObtained { get; set; }
        public decimal MaxMarks { get; set; }

        [StringLength(10)]
        public string? Grade { get; set; } // A+, A, B+, etc.

        [StringLength(200)]
        public string? Remarks { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string? EnteredBy { get; set; } // Teacher User ID
    }
}

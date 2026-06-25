using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EasyEdu.Models
{
    public class StudentOptionalSubject
    {
        public int Id { get; set; }

        public int StudentId { get; set; }
        public virtual Student Student { get; set; } = null!;

        public int SubjectId { get; set; }
        public virtual Subject Subject { get; set; } = null!;

        public int AcademicYearId { get; set; }
        public virtual AcademicYear? AcademicYear { get; set; }

        public DateTime AssignedDate { get; set; } = DateTime.UtcNow;
    }
}

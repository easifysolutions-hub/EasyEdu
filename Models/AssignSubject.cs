using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EasyEdu.Models
{
    public class AssignSubject
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

        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

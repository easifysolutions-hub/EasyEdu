using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EasyEdu.Models
{
    public class ClassSection
    {
        public int Id { get; set; }

        public int ClassId { get; set; }
        public virtual Class Class { get; set; } = null!;

        public int SectionId { get; set; }
        public virtual Section Section { get; set; } = null!;

        public bool IsActive { get; set; } = true;
    }
}

using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class StudentDocument
    {
        public int Id { get; set; }
        
        [Required, StringLength(200)]
        public string Title { get; set; } = string.Empty;
        
        [Required]
        public string FilePath { get; set; } = string.Empty;
        
        public int StudentId { get; set; }
        public virtual Student Student { get; set; } = null!;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

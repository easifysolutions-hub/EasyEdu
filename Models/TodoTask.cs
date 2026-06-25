using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EasyEdu.Models
{
    public class TodoTask
    {
        public int Id { get; set; }
        
        [Required, StringLength(200)]
        public string Title { get; set; } = string.Empty;
        
        [StringLength(1000)]
        public string? Description { get; set; }
        
        public bool IsCompleted { get; set; } = false;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? DueDate { get; set; }
        
        [Required]
        public string UserId { get; set; } = string.Empty;
        public virtual ApplicationUser? User { get; set; }
        
        public string Priority { get; set; } = "Medium"; // Low, Medium, High
        
        public int? CompanyId { get; set; }
        public virtual Company? Company { get; set; }
    }
}

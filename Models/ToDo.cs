using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class ToDo
    {
        public int Id { get; set; }

        [Required, StringLength(200)]
        public string Title { get; set; } = string.Empty;

        public bool IsCompleted { get; set; } = false;

        public string? UserId { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

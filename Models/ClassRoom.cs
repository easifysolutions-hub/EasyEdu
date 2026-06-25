using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class ClassRoom
    {
        public int Id { get; set; }

        [Required, StringLength(50)]
        public string RoomNo { get; set; } = string.Empty;

        public int? Capacity { get; set; }

        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

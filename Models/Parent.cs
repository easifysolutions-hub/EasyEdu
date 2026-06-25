using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class Parent
    {
        public int Id { get; set; }

        [Required, StringLength(100)]
        public string FirstName { get; set; } = string.Empty;

        [Required, StringLength(100)]
        public string LastName { get; set; } = string.Empty;

        [Required, StringLength(20)]
        public string Relationship { get; set; } = string.Empty; // Father, Mother, Guardian

        [Phone, StringLength(20)]
        public string? Phone { get; set; }

        [EmailAddress, StringLength(100)]
        public string? Email { get; set; }

        [StringLength(500)]
        public string? Address { get; set; }

        [StringLength(100)]
        public string? Occupation { get; set; }

        public string? ProfilePicture { get; set; }

        public int StudentId { get; set; }
        public virtual Student Student { get; set; } = null!;

        public string? UserId { get; set; }
        public virtual ApplicationUser? User { get; set; }

        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

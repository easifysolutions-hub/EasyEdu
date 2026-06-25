using Microsoft.AspNetCore.Identity;

namespace EasyEdu.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string? FullName { get; set; }
        public string? ProfilePicture { get; set; }
        public int? CompanyId { get; set; }
        public virtual Company? Company { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? LastLoginAt { get; set; }
        public bool IsActive { get; set; } = true;

        // Navigation properties based on user type
        public virtual Student? Student { get; set; }
        public virtual Teacher? Teacher { get; set; }
    }
}

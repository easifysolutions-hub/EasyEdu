using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class Driver
    {
        public int Id { get; set; }

        [Required, StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [Phone, StringLength(20)]
        public string? Phone { get; set; }

        [StringLength(500)]
        public string? Address { get; set; }

        [Required, StringLength(50)]
        public string LicenseNumber { get; set; } = string.Empty;

        public DateTime LicenseExpiry { get; set; }

        [StringLength(200)]
        public string? Experience { get; set; }

        public string? Photo { get; set; }
        public bool IsActive { get; set; } = true;
        public int CompanyId { get; set; }
        public virtual Company? Company { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public virtual ICollection<Vehicle> Vehicles { get; set; } = new List<Vehicle>();
    }
}

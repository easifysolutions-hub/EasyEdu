using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class Route
    {
        public int Id { get; set; }

        [Required, StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [StringLength(500)]
        public string? Description { get; set; }

        public string? RouteStops { get; set; } // JSON array of stops with GPS coordinates

        public decimal? RouteFee { get; set; }
        public int CompanyId { get; set; }
        public virtual Company? Company { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public virtual ICollection<Vehicle> Vehicles { get; set; } = new List<Vehicle>();
        public virtual ICollection<Student> Students { get; set; } = new List<Student>();
    }
}

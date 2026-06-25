using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class Vehicle
    {
        public int Id { get; set; }

        [Required, StringLength(50)]
        public string VehicleNumber { get; set; } = string.Empty;

        [StringLength(50)]
        public string? VehicleType { get; set; } // Bus, Van, Car

        [StringLength(100)]
        public string? Model { get; set; }

        public int? Capacity { get; set; }

        [StringLength(50)]
        public string? RegistrationNumber { get; set; }

        public DateTime? InsuranceExpiry { get; set; }
        public DateTime? FitnessExpiry { get; set; }

        public int? RouteId { get; set; }
        public virtual Route? Route { get; set; }

        public int? DriverId { get; set; }
        public virtual Driver? Driver { get; set; }

        public string? GPSDeviceId { get; set; }
        public string? CurrentLocation { get; set; } // JSON for lat/long

        public bool IsActive { get; set; } = true;
        public int CompanyId { get; set; }
        public virtual Company? Company { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public virtual ICollection<VehicleMaintenance> Maintenances { get; set; } = new List<VehicleMaintenance>();
    }
}

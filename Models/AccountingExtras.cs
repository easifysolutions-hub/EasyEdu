using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class Expense
    {
        public int Id { get; set; }

        [Required, StringLength(100)]
        public string Title { get; set; } = string.Empty;

        [StringLength(500)]
        public string? Description { get; set; }

        public decimal Amount { get; set; }

        [Required, StringLength(50)]
        public string Category { get; set; } = "General"; // Electricity, Rent, Supplies, Maintenance

        public DateTime Date { get; set; } = DateTime.UtcNow;

        [StringLength(50)]
        public string PaymentMethod { get; set; } = "Cash";

        public string? ReferenceNumber { get; set; }
        
        public string? CreatedBy { get; set; }

        public int CompanyId { get; set; }
        public virtual Company? Company { get; set; }
    }

    public class VehicleMaintenance
    {
        public int Id { get; set; }
        
        public int VehicleId { get; set; }
        public virtual Vehicle Vehicle { get; set; } = null!;

        [Required, StringLength(100)]
        public string MaintenanceType { get; set; } = string.Empty; // Oil Change, Engine Repair, Tire Change

        public decimal Cost { get; set; }

        public DateTime ServiceDate { get; set; }

        [StringLength(500)]
        public string? ServiceCenter { get; set; }

        [StringLength(1000)]
        public string? Details { get; set; }

        public DateTime NextServiceDate { get; set; }
    }
}

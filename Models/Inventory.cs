using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class Inventory
    {
        public int Id { get; set; }

        [Required, StringLength(100)]
        public string ItemName { get; set; } = string.Empty;

        public int? CategoryId { get; set; }
        public virtual ItemCategory? Category { get; set; }

        [StringLength(500)]
        public string? Description { get; set; }

        [StringLength(50)]
        public string? SKU { get; set; }

        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal TotalValue { get; set; }

        [StringLength(50)]
        public string? Unit { get; set; } // Piece, Kg, Liter, etc.

        public int? ReorderLevel { get; set; }

        public int CompanyId { get; set; }
        public virtual Company? Company { get; set; }

        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public virtual ICollection<InventoryTransaction> Transactions { get; set; } = new List<InventoryTransaction>();
    }
}

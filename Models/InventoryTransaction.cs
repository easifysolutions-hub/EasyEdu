using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class InventoryTransaction
    {
        public int Id { get; set; }
        public int InventoryId { get; set; }
        public virtual Inventory Inventory { get; set; } = null!;

        [Required, StringLength(50)]
        public string TransactionType { get; set; } = string.Empty; // Purchase, Sale, Issue, Return

        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal TotalAmount { get; set; }

        public int? StudentId { get; set; }
        public virtual Student? Student { get; set; }

        [StringLength(200)]
        public string? InvoiceNumber { get; set; }

        [StringLength(500)]
        public string? Remarks { get; set; }

        public string? TransactedBy { get; set; }
        public DateTime TransactionDate { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

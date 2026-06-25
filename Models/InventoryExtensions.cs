using System;
using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class ItemCategory
    {
        public int Id { get; set; }
        [Required] public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int CompanyId { get; set; }
        public virtual ICollection<Inventory> Inventories { get; set; } = new List<Inventory>();
    }

    public class ItemStore
    {
        public int Id { get; set; }
        [Required] public string StoreName { get; set; } = string.Empty;
        public string? StoreNumber { get; set; }
        public int CompanyId { get; set; }
    }

    public class Supplier
    {
        public int Id { get; set; }
        [Required] public string Name { get; set; } = string.Empty;
        public string? ContactPerson { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public int CompanyId { get; set; }
    }

    public class ItemReceive
    {
        public int Id { get; set; }
        public int InventoryId { get; set; }
        public virtual Inventory Inventory { get; set; } = null!;
        public int SupplierId { get; set; }
        public virtual Supplier Supplier { get; set; } = null!;
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal TotalPrice { get; set; }
        public DateTime ReceiveDate { get; set; } = DateTime.Now;
        public string? ReferenceNumber { get; set; }
        public int CompanyId { get; set; }
    }
}

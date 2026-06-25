using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EasyEdu.Models
{
    public enum AccountNature
    {
        Assets = 1,
        Liabilities = 2,
        Income = 3,
        Expenses = 4
    }

    public enum VoucherType
    {
        Payment = 1,   // Cash/Bank Payment
        Receipt = 2,   // Cash/Bank Receipt
        Contra = 3,    // Cash Deposit/Withdrawal/Transfer
        Journal = 4,   // Non-cash adjustments
        Sales = 5,     // Sales Voucher (debit cash/bank, credit sales, decrement stock)
        Purchase = 6   // Purchase Voucher (debit purchases, credit cash/bank, increment stock)
    }

    public class AccountGroup
    {
        public int Id { get; set; }
        
        [Required, StringLength(100)]
        public string Name { get; set; } = string.Empty;
        
        public int? ParentGroupId { get; set; }
        public virtual AccountGroup? ParentGroup { get; set; }
        public virtual ICollection<AccountGroup> SubGroups { get; set; } = new List<AccountGroup>();

        public AccountNature Nature { get; set; } // Derived from root parent usually, but explicit here for simplicity
        
        public bool IsPrimary { get; set; } = false; // Primary groups: Capital, Loans, Current Assets, etc.
        public int CompanyId { get; set; }

        public virtual ICollection<Ledger> Ledgers { get; set; } = new List<Ledger>();
    }

    public class Ledger
    {
        public int Id { get; set; }
        
        [Required, StringLength(100)]
        public string Name { get; set; } = string.Empty;
        
        public int AccountGroupId { get; set; }
        public virtual AccountGroup AccountGroup { get; set; } = null!;

        [Column(TypeName = "decimal(18,2)")]
        public decimal OpeningBalance { get; set; } = 0;
        
        public bool IsDebitOpening { get; set; } = true; // true = Debit, false = Credit

        public int CompanyId { get; set; }
        public bool IsSystem { get; set; } = false; // System ledgers like Cash, Profit & Loss cannot be deleted
        
        // Link to Student for Personal Ledger
        public int? StudentId { get; set; }
    }

    public class Voucher
    {
        public int Id { get; set; }
        
        [Required, StringLength(50)]
        public string VoucherNumber { get; set; } = string.Empty;
        
        public DateTime Date { get; set; } = DateTime.Now;
        
        public VoucherType Type { get; set; }
        
        [StringLength(500)]
        public string? Narration { get; set; }
        
        public int CompanyId { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string? CreatedBy { get; set; }

        public virtual ICollection<VoucherDetail> Details { get; set; } = new List<VoucherDetail>();
    }

    public class VoucherDetail
    {
        public int Id { get; set; }
        
        public int VoucherId { get; set; }
        public virtual Voucher Voucher { get; set; } = null!;
        
        public int LedgerId { get; set; }
        public virtual Ledger Ledger { get; set; } = null!;
        
        [Column(TypeName = "decimal(18,2)")]
        public decimal DebitAmount { get; set; } = 0;
        
        [Column(TypeName = "decimal(18,2)")]
        public decimal CreditAmount { get; set; } = 0;

        [StringLength(200)]
        public string? Note { get; set; } // Line-level narration

        public int? InventoryId { get; set; }
        public virtual Inventory? Inventory { get; set; }
        public int? Quantity { get; set; }
    }
}

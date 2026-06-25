using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EasyEdu.Models
{
    public class FeesGroup
    {
        public int Id { get; set; }
        
        [Required, StringLength(100)]
        public string Name { get; set; } = string.Empty;
        
        [StringLength(500)]
        public string? Description { get; set; }
        
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public int CompanyId { get; set; }
        public virtual Company? Company { get; set; }

        public virtual ICollection<FeesType> FeesTypes { get; set; } = new List<FeesType>();
    }

    public class FeesType
    {
        public int Id { get; set; }
        
        [Required, StringLength(100), Display(Name = "Fees Head")]
        public string Name { get; set; } = string.Empty;
        
        [StringLength(50)]
        public string? FeesCode { get; set; }
        
        [StringLength(500)]
        public string? Description { get; set; }
        
        public int FeesGroupId { get; set; }
        public virtual FeesGroup? FeesGroup { get; set; }
        
        public decimal Amount { get; set; }
        
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Accounting Map
        public int? LedgerId { get; set; } // The Income Ledger this fee maps to
    }

    public class FeesInvoice
    {
        public int Id { get; set; }
        
        [Required, StringLength(100)]
        public string InvoiceNumber { get; set; } = string.Empty;
        
        public int StudentId { get; set; }
        public virtual Student? Student { get; set; }
        
        public int AcademicYearId { get; set; }
        public virtual AcademicYear? AcademicYear { get; set; }
        
        public DateTime Date { get; set; } = DateTime.UtcNow;
        public DateTime DueDate { get; set; }
        
        public decimal TotalAmount { get; set; }
        public decimal PaidAmount { get; set; }
        public decimal TotalWaiver { get; set; }
        public decimal TotalFine { get; set; }

        [Required, StringLength(50)]
        public string Status { get; set; } = "Unpaid"; // Unpaid, Paid, Partial, Overdue

        public virtual ICollection<FeesInvoiceDetail> Details { get; set; } = new List<FeesInvoiceDetail>();
        public virtual ICollection<FeeCollection> Payments { get; set; } = new List<FeeCollection>();
    }

    public class FeesInvoiceDetail
    {
        public int Id { get; set; }
        public int FeesInvoiceId { get; set; }
        public virtual FeesInvoice? FeesInvoice { get; set; }
        
        public int FeesTypeId { get; set; }
        public virtual FeesType? FeesType { get; set; }
        
        public decimal Amount { get; set; }
        public decimal Waiver { get; set; }
        public decimal Fine { get; set; }
        public decimal PaidAmount { get; set; }
    }

    public class BankPayment
    {
        public int Id { get; set; }
        
        public int StudentId { get; set; }
        public virtual Student Student { get; set; } = null!;
        
        public int FeesInvoiceId { get; set; }
        public virtual FeesInvoice FeesInvoice { get; set; } = null!;
        
        public decimal Amount { get; set; }
        
        [Required, StringLength(100)]
        public string BankName { get; set; } = string.Empty;
        
        [Required, StringLength(100)]
        public string AccountNumber { get; set; } = string.Empty;
        
        public DateTime Date { get; set; }
        
        public string? SlipPath { get; set; }
        
        [Required, StringLength(50)]
        public string Status { get; set; } = "Pending"; // Pending, Approved, Rejected
        
        public string? Remarks { get; set; }
        public string? ApprovedBy { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class FeesCarryForward
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public virtual Student Student { get; set; } = null!;
        
        public int FromAcademicYearId { get; set; }
        public int ToAcademicYearId { get; set; }
        
        public decimal DueAmount { get; set; }
        public DateTime TransferDate { get; set; } = DateTime.UtcNow;
        public string? Remarks { get; set; }
    }

    public class BulkInvoiceSettings
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        
        [StringLength(20)]
        public string? InvoicePrefix { get; set; } = "INV-";
        
        public int NextInvoiceNumber { get; set; } = 1001;
        
        [StringLength(500)]
        public string? TermsAndConditions { get; set; }
        
        public bool ShowInstitutionalLogo { get; set; } = true;
        public bool ShowAuthorizedSignature { get; set; } = true;
        
        [StringLength(200)]
        public string? FooterNote { get; set; } = "Thank you for your timely payment.";
        
        public string? SignaturePath { get; set; }
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}

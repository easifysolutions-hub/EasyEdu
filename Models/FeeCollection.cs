using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class FeeCollection
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public virtual Student Student { get; set; } = null!;
        public int? FeeStructureId { get; set; }
        public virtual FeeStructure? FeeStructure { get; set; }

        public int? FeesInvoiceId { get; set; }
        public virtual FeesInvoice? FeesInvoice { get; set; }

        public decimal AmountDue { get; set; }
        public decimal AmountPaid { get; set; }
        public decimal AmountPending { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime? PaidDate { get; set; }

        [Required, StringLength(50)]
        public string Status { get; set; } = "Pending"; // Pending, Paid, Partial, Overdue

        [StringLength(50)]
        public string? PaymentMethod { get; set; } // Cash, Card, UPI, Bank Transfer, Online

        [StringLength(100)]
        public string? TransactionId { get; set; }

        [StringLength(100)]
        public string? PaymentGateway { get; set; } // Razorpay, Stripe, PayPal, etc.

        public string? PaymentGatewayResponse { get; set; } // JSON response

        [StringLength(200)]
        public string? ReceiptNumber { get; set; }

        [StringLength(500)]
        public string? Remarks { get; set; }

        public string? CollectedBy { get; set; } // User ID
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

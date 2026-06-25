using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EasyEdu.Models
{
    public class WalletTransaction
    {
        public int Id { get; set; }

        public int? StudentId { get; set; }
        public virtual Student? Student { get; set; }

        public string TransactionType { get; set; } = "Deposit"; // Deposit, Expense, Refund
        
        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }

        [StringLength(50)]
        public string PaymentMethod { get; set; } = "Bank Transfer"; // Bank, Cash, Card, etc.

        public string? ReferenceNumber { get; set; } 
        public string? ProofOfPayment { get; set; } // File path

        public string Status { get; set; } = "Pending"; // Pending, Approved, Rejected

        public DateTime Date { get; set; } = DateTime.Now;
        public string? Note { get; set; }
    }
}

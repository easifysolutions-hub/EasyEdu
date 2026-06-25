using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class Payroll
    {
        public int Id { get; set; }
        public int TeacherId { get; set; }
        public virtual Teacher Teacher { get; set; } = null!;

        public int Month { get; set; }
        public int Year { get; set; }

        public decimal BasicSalary { get; set; }
        public decimal? HRA { get; set; }
        public decimal? DA { get; set; }
        public decimal? TA { get; set; }
        public decimal? OtherAllowances { get; set; }

        public decimal GrossSalary { get; set; }

        public decimal? PF { get; set; }
        public decimal? TDS { get; set; }
        public decimal? ESI { get; set; }
        public decimal? LoanDeduction { get; set; }
        public decimal? OtherDeductions { get; set; }

        public decimal TotalDeductions { get; set; }
        public decimal NetSalary { get; set; }

        [Required, StringLength(50)]
        public string Status { get; set; } = "Pending"; // Pending, Processed, Paid

        public DateTime? PaymentDate { get; set; }

        [StringLength(50)]
        public string? PaymentMethod { get; set; }

        [StringLength(100)]
        public string? TransactionId { get; set; }

        [StringLength(500)]
        public string? Remarks { get; set; }

        public string? GeneratedBy { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

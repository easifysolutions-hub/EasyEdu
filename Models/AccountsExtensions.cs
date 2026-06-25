using System;
using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class Income
    {
        public int Id { get; set; }
        [Required] public string Title { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
        public string Category { get; set; } = "General";
        public string PaymentMethod { get; set; } = "Cash";
    }

    public class ChartOfAccount
    {
        public int Id { get; set; }
        [Required] public string Head { get; set; } = string.Empty;
        public string Type { get; set; } = "Income"; // Income, Expense
        public bool IsActive { get; set; } = true;
    }

    public class BankAccount
    {
        public int Id { get; set; }
        [Required] public string BankName { get; set; } = string.Empty;
        [Required] public string AccountName { get; set; } = string.Empty;
        [Required] public string AccountNumber { get; set; } = string.Empty;
        public decimal OpeningBalance { get; set; }
        public decimal CurrentBalance { get; set; }
    }

    public class FundTransfer
    {
        public int Id { get; set; }
        public int FromBankAccountId { get; set; }
        public int ToBankAccountId { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
        public string? Note { get; set; }
    }
}

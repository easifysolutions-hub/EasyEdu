using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class BookIssue
    {
        public int Id { get; set; }
        public int BookId { get; set; }
        public virtual Book Book { get; set; } = null!;
        public int StudentId { get; set; }
        public virtual Student Student { get; set; } = null!;

        public DateTime IssueDate { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime? ReturnDate { get; set; }

        [StringLength(50)]
        public string Status { get; set; } = "Issued"; // Issued, Returned, Overdue

        public decimal? LateFee { get; set; }
        public bool LateFeeCollected { get; set; }

        [StringLength(500)]
        public string? Remarks { get; set; }

        public string? IssuedBy { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

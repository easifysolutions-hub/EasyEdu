using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class Certificate
    {
        public int Id { get; set; }

        [Required, StringLength(100)]
        public string CertificateType { get; set; } = string.Empty; // TC, Bonafide, Leaving, Character, Course Completion

        [Required, StringLength(100)]
        public string CertificateNumber { get; set; } = string.Empty;

        public int StudentId { get; set; }
        public virtual Student Student { get; set; } = null!;

        public DateTime IssueDate { get; set; }

        [StringLength(1000)]
        public string? Purpose { get; set; }

        public string? CertificateData { get; set; } // JSON data specific to certificate type

        public string? PDFPath { get; set; } // Generated PDF file path

        [StringLength(500)]
        public string? Remarks { get; set; }

        public string? IssuedBy { get; set; }
        public string? ApprovedBy { get; set; }

        [StringLength(50)]
        public string Status { get; set; } = "Issued"; // Draft, Issued, Cancelled

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

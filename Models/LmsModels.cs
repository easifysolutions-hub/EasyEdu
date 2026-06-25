using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EasyEdu.Models
{
    public class LmsCategory
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;

        [Required] public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Icon { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class LmsCourseLevel
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;

        [Required] public string Title { get; set; } = string.Empty; // Beginner, Intermediate, Advanced
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class LmsCourse
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;

        [Required] public string Title { get; set; } = string.Empty;
        public string? ShortDescription { get; set; }
        public string? Description { get; set; }
        
        public int CategoryId { get; set; }
        public virtual LmsCategory Category { get; set; } = null!;

        public int LevelId { get; set; }
        public virtual LmsCourseLevel Level { get; set; } = null!;

        public string? Thumbnail { get; set; }
        public string? TrailerUrl { get; set; } // YouTube/Vimeo/Internal
        
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; } = 0;
        public bool IsFree { get; set; } = false;
        
        public string Status { get; set; } = "Pending"; // Pending, Published, Draft, Retired
        public int InstructorId { get; set; } // TeacherId
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public virtual ICollection<LmsEnrollment> Enrollments { get; set; } = new List<LmsEnrollment>();
    }

    public class LmsEnrollment
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public virtual Student Student { get; set; } = null!;

        public int CourseId { get; set; }
        public virtual LmsCourse Course { get; set; } = null!;

        public DateTime EnrollmentDate { get; set; } = DateTime.UtcNow;
        public int ProgressPercent { get; set; } = 0;
        public string Status { get; set; } = "Active"; // Active, Completed, Dropped
    }

    public class LmsPurchaseLog
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;

        public int StudentId { get; set; }
        public virtual Student Student { get; set; } = null!;

        public int CourseId { get; set; }
        public virtual LmsCourse Course { get; set; } = null!;

        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }
        public string PaymentMethod { get; set; } = "Online";
        public string TransactionId { get; set; } = string.Empty;
        public DateTime PurchaseDate { get; set; } = DateTime.UtcNow;
    }

    public class LmsFeesInvoice
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;

        public int StudentId { get; set; }
        public virtual Student Student { get; set; } = null!;

        public string InvoiceNumber { get; set; } = string.Empty;
        
        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalAmount { get; set; }
        
        [Column(TypeName = "decimal(18,2)")]
        public decimal PaidAmount { get; set; }
        
        public DateTime DueDate { get; set; }
        public string Status { get; set; } = "Unpaid"; // Paid, Partial, Unpaid
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class LmsSettings
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;

        public bool EnableRegistration { get; set; } = true;
        public bool ShowCoursePrice { get; set; } = true;
        public string? TermsAndConditions { get; set; }
        
        // Vimeo Settings
        public string? VimeoClientId { get; set; }
        public string? VimeoClientSecret { get; set; }
        public string? VimeoAccessToken { get; set; }

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}

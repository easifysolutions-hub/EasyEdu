using System;
using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class OnlineRegistrationSetting
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;

        public bool IsEnabled { get; set; } = true;
        public decimal RegistrationFee { get; set; } = 0;
        
        // JSON field list Configuration: {"FirstName": true, "Address": false, ...}
        public string? ActiveFieldsJson { get; set; } 
        
        public string? HeaderContent { get; set; }
        public string? FooterContent { get; set; }
        public string? SuccessMessage { get; set; } = "Your online registration has been submitted successfully.";
        
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }

    public class RegistrationSubmission
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;

        [Required, StringLength(100)]
        public string FirstName { get; set; } = string.Empty;
        [Required, StringLength(100)]
        public string LastName { get; set; } = string.Empty;
        
        public DateTime DateOfBirth { get; set; }
        public string? Gender { get; set; }
        
        [EmailAddress, StringLength(100)]
        public string? Email { get; set; }
        
        [Phone, StringLength(20)]
        public string? Phone { get; set; }
        
        public string? Address { get; set; }

        public int ClassId { get; set; }
        public virtual Class Class { get; set; } = null!;
        
        public int? AcademicYearId { get; set; }
        public virtual AcademicYear? AcademicYear { get; set; }

        // Parent Info
        public string? ParentName { get; set; }
        public string? ParentPhone { get; set; }

        // Status
        public string Status { get; set; } = "Pending"; // Pending, Approved, Rejected
        public bool IsPaid { get; set; } = false;
        public string? PaymentTransactionId { get; set; }
        
        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
    }
}

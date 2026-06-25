using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class Student
    {
        public int Id { get; set; }

        [Required, StringLength(50)]
        public string AdmissionNumber { get; set; } = string.Empty;

        [Required, StringLength(100)]
        public string FirstName { get; set; } = string.Empty;

        [Required, StringLength(100)]
        public string LastName { get; set; } = string.Empty;

        public string FullName => $"{FirstName} {LastName}";

        public DateTime DateOfBirth { get; set; }

        [Required, StringLength(10)]
        public string Gender { get; set; } = string.Empty; // Male, Female, Other

        [StringLength(20)]
        public string? BloodGroup { get; set; }
        
        [StringLength(100)]
        public string? Religion { get; set; }
        
        [StringLength(100)]
        public string? Caste { get; set; }
        
        [StringLength(20)]
        public string? Height { get; set; }
        
        [StringLength(20)]
        public string? Weight { get; set; }

        [StringLength(500)]
        public string? Address { get; set; }

        [Phone, StringLength(20)]
        public string? Phone { get; set; }

        [EmailAddress, StringLength(100)]
        public string? Email { get; set; }

        public string? ProfilePicture { get; set; }

        // Parent/Guardian Information
        [StringLength(100)]
        public string? FatherName { get; set; }
        [StringLength(100)]
        public string? FatherOccupation { get; set; }
        [Phone, StringLength(20)]
        public string? FatherPhone { get; set; }
        public string? FatherPhoto { get; set; }

        [StringLength(100)]
        public string? MotherName { get; set; }
        [StringLength(100)]
        public string? MotherOccupation { get; set; }
        [Phone, StringLength(20)]
        public string? MotherPhone { get; set; }
        public string? MotherPhoto { get; set; }

        [StringLength(100)]
        public string? GuardianName { get; set; }
        [StringLength(100)]
        public string? GuardianRelation { get; set; }
        [EmailAddress, StringLength(100)]
        public string? GuardianEmail { get; set; }
        [Phone, StringLength(20)]
        public string? GuardianPhone { get; set; }
        [StringLength(100)]
        public string? GuardianOccupation { get; set; }
        public string? GuardianPhoto { get; set; }
        [StringLength(500)]
        public string? GuardianAddress { get; set; }

        public DateTime AdmissionDate { get; set; }
        public int? RollNumber { get; set; }
        public int ClassId { get; set; }
        public virtual Class Class { get; set; } = null!;
        public int SectionId { get; set; }
        public virtual Section Section { get; set; } = null!;
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;

        public string? UserId { get; set; }
        public virtual ApplicationUser? User { get; set; }

        public int? RouteId { get; set; }
        public virtual Route? Route { get; set; }

        public int? StudentCategoryId { get; set; }
        public virtual StudentCategory? StudentCategory { get; set; }

        // Bank & ID Info
        [StringLength(100)]
        public string? NationalIdNumber { get; set; }
        [StringLength(100)]
        public string? BirthCertificateNumber { get; set; }
        [StringLength(200)]
        public string? BankName { get; set; }
        [StringLength(100)]
        public string? BankAccountNumber { get; set; }
        [StringLength(50)]
        public string? BankIfscCode { get; set; }

        // Previous School & Others
        public string? PreviousSchoolDetails { get; set; }
        public string? AdditionalNotes { get; set; }

        public int? DormitoryId { get; set; }
        public virtual Dormitory? Dormitory { get; set; }
        public int? DormitoryRoomId { get; set; }
        public virtual DormitoryRoom? DormitoryRoom { get; set; }

        [StringLength(200)]
        public string? BoardingPoint { get; set; }
        [StringLength(200)]
        public string? DropPoint { get; set; }

        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public virtual ICollection<Attendance> Attendances { get; set; } = new List<Attendance>();
        public virtual ICollection<Mark> Marks { get; set; } = new List<Mark>();
        public virtual ICollection<FeeCollection> FeeCollections { get; set; } = new List<FeeCollection>();
        public virtual ICollection<FeesInvoice> FeesInvoices { get; set; } = new List<FeesInvoice>();
        public virtual ICollection<WalletTransaction> WalletTransactions { get; set; } = new List<WalletTransaction>();
        public virtual ICollection<StudentDocument> StudentDocuments { get; set; } = new List<StudentDocument>();
    }
}

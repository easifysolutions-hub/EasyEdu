using System.ComponentModel.DataAnnotations;
using EasyEdu.Models;
using Microsoft.AspNetCore.Http;

namespace EasyEdu.Models.ViewModels
{
    public class StudentAdmissionViewModel
    {
        // Basic Info
        [Required]
        public string AdmissionNumber { get; set; } = string.Empty;
        public int? RollNumber { get; set; }
        [Required]
        public DateTime AdmissionDate { get; set; } = DateTime.Today;
        [Required]
        public int ClassId { get; set; }
        [Required]
        public int SectionId { get; set; }
        public int? StudentCategoryId { get; set; }

        // Personal Info
        [Required]
        public string FirstName { get; set; } = string.Empty;
        [Required]
        public string LastName { get; set; } = string.Empty;
        [Required]
        public string Gender { get; set; } = string.Empty;
        [Required]
        public DateTime DateOfBirth { get; set; } = DateTime.Today.AddYears(-5);
        public string? BloodGroup { get; set; }
        public string? Religion { get; set; }
        public string? Caste { get; set; }
        public string? Height { get; set; }
        public string? Weight { get; set; }
        public string? Mobile { get; set; }
        public string? EmailAddress { get; set; }
        public string? CurrentAddress { get; set; }
        public IFormFile? StudentPhoto { get; set; }

        // Parent Info
        public string? FatherName { get; set; }
        public string? FatherOccupation { get; set; }
        public string? FatherPhone { get; set; }
        public IFormFile? FatherPhotoFile { get; set; }

        public string? MotherName { get; set; }
        public string? MotherOccupation { get; set; }
        public string? MotherPhone { get; set; }
        public IFormFile? MotherPhotoFile { get; set; }

        // Guardian Info
        public string GuardianIs { get; set; } = "Father"; // Father, Mother, Other
        public string? GuardianName { get; set; }
        public string? GuardianRelation { get; set; }
        public string? GuardianEmail { get; set; }
        public string? GuardianPhone { get; set; }
        public string? GuardianOccupation { get; set; }
        public string? GuardianAddress { get; set; }
        public IFormFile? GuardianPhotoFile { get; set; }

        // Bank & ID Info
        public string? NationalIdNumber { get; set; }
        public string? BirthCertificateNumber { get; set; }
        public string? BankName { get; set; }
        public string? BankAccountNumber { get; set; }
        public string? BankIfscCode { get; set; }

        // Siblings
        public List<int>? SiblingIds { get; set; }

        // Transport & Dormitory
        public int? RouteId { get; set; }
        public int? VehicleId { get; set; }
        public int? DormitoryId { get; set; }
        public int? RoomId { get; set; }

        // Previous School
        public string? PreviousSchoolDetails { get; set; }
        public string? AdditionalNotes { get; set; }

        // Documents
        public List<DocumentUploadViewModel> Documents { get; set; } = new List<DocumentUploadViewModel>();
    }

    public class DocumentUploadViewModel
    {
        public string Title { get; set; } = string.Empty;
        public IFormFile? File { get; set; }
    }
}

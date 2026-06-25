using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class Teacher
    {
        public int Id { get; set; }

        [Required, StringLength(50)]
        public string EmployeeNumber { get; set; } = string.Empty;

        [Required, StringLength(100)]
        public string FirstName { get; set; } = string.Empty;

        [Required, StringLength(100)]
        public string LastName { get; set; } = string.Empty;

        public DateTime DateOfBirth { get; set; }

        [Required, StringLength(10)]
        public string Gender { get; set; } = string.Empty;

        [StringLength(20)]
        public string? BloodGroup { get; set; }

        [StringLength(500)]
        public string? Address { get; set; }

        [Phone, StringLength(20)]
        public string? Phone { get; set; }

        [EmailAddress, StringLength(100)]
        public string? Email { get; set; }

        public string? ProfilePicture { get; set; }

        [StringLength(200)]
        public string? Qualification { get; set; }

        [StringLength(200)]
        public string? Experience { get; set; }

        [StringLength(200)]
        public string? Specialization { get; set; }

        public DateTime JoiningDate { get; set; }
        public decimal? Salary { get; set; }

        [StringLength(100)]
        public string? FatherName { get; set; }

        [StringLength(100)]
        public string? MotherName { get; set; }

        [StringLength(100)]
        public string? EmergencyContact { get; set; }

        [StringLength(500)]
        public string? BankDetails { get; set; }

        public int? DesignationId { get; set; }
        public virtual Designation? Designation { get; set; }

        public int? DepartmentId { get; set; }
        public virtual Department? Department { get; set; }

        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;

        public string? UserId { get; set; }
        public virtual ApplicationUser? User { get; set; }

        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public string FullName => $"{FirstName} {LastName}";

        // Navigation properties
        public virtual ICollection<Subject> Subjects { get; set; } = new List<Subject>();
        public virtual ICollection<TeacherAttendance> Attendances { get; set; } = new List<TeacherAttendance>();
        public virtual ICollection<Payroll> Payrolls { get; set; } = new List<Payroll>();
    }
}

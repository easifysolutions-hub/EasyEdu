using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class StudentGroup
    {
        public int Id { get; set; }
        
        [Required, StringLength(100)]
        public string Name { get; set; } = string.Empty;
        
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;
    }

    public class StudentPromotion
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public virtual Student Student { get; set; } = null!;
        
        public int FromClassId { get; set; }
        public int ToClassId { get; set; }
        public int FromAcademicYearId { get; set; }
        public int ToAcademicYearId { get; set; }
        
        public string Result { get; set; } = "Pass"; // Pass, Fail
        public string Status { get; set; } = "Promoted"; // Promoted, Retained
        
        public DateTime PromotionDate { get; set; } = DateTime.UtcNow;
        public string? Remarks { get; set; }
    }

    public class SubjectWiseAttendance
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public virtual Student Student { get; set; } = null!;
        
        public int SubjectId { get; set; }
        public virtual Subject Subject { get; set; } = null!;
        
        public DateTime Date { get; set; }
        
        [Required, StringLength(20)]
        public string Status { get; set; } = "Present";
        
        public string? Remarks { get; set; }
        public string? MarkedBy { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class StudentSettings
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;
        
        // Settings flags
        public bool RegistrationNumberAutoGenerate { get; set; } = true;
        public string? RegistrationNumberPrefix { get; set; } = "ADM";
        public bool AdmissionDateMandatory { get; set; } = true;
        public bool ShowSiblingInfo { get; set; } = true;
        public bool MultipleClassStudent { get; set; } = false;
        public bool RollNoAutoGenerate { get; set; } = false;
        
        // Attendance Settings
        public bool EnableBiometricAttendance { get; set; } = false;
        public bool SubjectWiseAttendance { get; set; } = false;
        
        // Notification Settings
        public bool EnableSmsNotification { get; set; } = true;
        public bool EnableEmailNotification { get; set; } = true;
        
        // SMS Time Settings
        public string MorningSmsTime { get; set; } = "09:30";
        public string EveningSmsTime { get; set; } = "16:00";
        
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}

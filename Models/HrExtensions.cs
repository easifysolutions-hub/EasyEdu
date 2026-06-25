using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class Designation
    {
        public int Id { get; set; }
        
        [Required, StringLength(100)]
        public string Title { get; set; } = string.Empty;
        
        public bool IsActive { get; set; } = true;
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;
    }

    public class Department
    {
        public int Id { get; set; }
        
        [Required, StringLength(100)]
        public string Name { get; set; } = string.Empty;
        
        public bool IsActive { get; set; } = true;
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;
    }

    public class StaffSettings
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;
        
        public bool AutoEmployeeNumber { get; set; } = true;
        public string? EmployeeNumberPrefix { get; set; } = "STF-";
        
        public bool EnableBiometricAttendance { get; set; } = false;
        public string? PayrollCycle { get; set; } = "Monthly"; // Weekly, Monthly
    }
}

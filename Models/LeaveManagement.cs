using System;
using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class LeaveType
    {
        public int Id { get; set; }
        
        [Required, StringLength(100)]
        public string Name { get; set; } = string.Empty; // Casual, Sick, Earned
        
        public int DaysPerYear { get; set; }
        public bool IsActive { get; set; } = true;
        
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;
    }

    public class LeaveDefine
    {
        public int Id { get; set; }
        public string RoleId { get; set; } = string.Empty;
        public int LeaveTypeId { get; set; }
        public virtual LeaveType LeaveType { get; set; } = null!;
        public int TotalDays { get; set; }
    }

    public class LeaveRequest
    {
        public int Id { get; set; }
        
        public string UserId { get; set; } = string.Empty;
        public virtual ApplicationUser User { get; set; } = null!;
        
        public int LeaveTypeId { get; set; }
        public virtual LeaveType LeaveType { get; set; } = null!;
        
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public DateTime ApplyDate { get; set; } = DateTime.Now;
        
        public string Reason { get; set; } = string.Empty;
        public string Status { get; set; } = "Pending"; // Pending, Approved, Rejected
        
        public string? ApprovedBy { get; set; }
        public DateTime? ApprovedDate { get; set; }
        public string? Note { get; set; }
        
        public string? AttachmentPath { get; set; }
    }
}

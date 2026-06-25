using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EasyEdu.Models
{
    public class AdmissionQuery
    {
        public int Id { get; set; }
        
        [Required]
        public string Name { get; set; }
        
        [Required]
        public string Phone { get; set; }
        
        [EmailAddress]
        public string Email { get; set; }
        
        public string Address { get; set; }
        
        public string Description { get; set; }
        
        public DateTime Date { get; set; } = DateTime.Now;
        
        public DateTime? NextFollowUpDate { get; set; }
        
        public string AssignedTo { get; set; }
        
        public string Reference { get; set; }
        
        public string Source { get; set; }
        
        public int? ClassId { get; set; }
        public virtual Class Class { get; set; }
        
        public int NumberOfChildren { get; set; }
        
        public string Status { get; set; } // Pending, Won, Lost
        
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        
        public int? CompanyId { get; set; }
        public virtual Company Company { get; set; }
    }

    public class VisitorBook
    {
        public int Id { get; set; }
        
        public string Purpose { get; set; }
        
        [Required]
        public string Name { get; set; }
        
        [Required]
        public string Phone { get; set; }
        
        public string VisitorId { get; set; }
        
        public int NumberOfPersons { get; set; }
        
        public DateTime Date { get; set; } = DateTime.Now;
        
        public string InTime { get; set; }
        public string OutTime { get; set; }
        
        public string Note { get; set; }
        
        public string AttachmentFilePath { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        
        public int? CompanyId { get; set; }
        public virtual Company Company { get; set; }
    }

    public class Complaint
    {
        public int Id { get; set; }
        
        public string ComplaintType { get; set; }
        public string Source { get; set; }
        
        [Required]
        public string ComplaintBy { get; set; }
        
        [Required]
        public string Phone { get; set; }
        
        public DateTime Date { get; set; } = DateTime.Now;
        
        public string Description { get; set; }
        
        public string ActionTaken { get; set; }
        
        public string AssignedTo { get; set; }
        
        public string Note { get; set; }
        
        public string AttachmentFilePath { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        
        public int? CompanyId { get; set; }
        public virtual Company Company { get; set; }
    }

    public class PostalLog
    {
        public int Id { get; set; }
        
        [Required]
        public string Type { get; set; } // Receive, Dispatch
        
        [Required]
        public string FromTitle { get; set; }
        
        [Required]
        public string ToTitle { get; set; }
        
        public string ReferenceNumber { get; set; }
        
        public DateTime Date { get; set; } = DateTime.Now;
        
        public string Address { get; set; }
        
        public string Note { get; set; }
        
        public string AttachmentFilePath { get; set; }
        
        public string ConfirmedBy { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        
        public int? CompanyId { get; set; }
        public virtual Company Company { get; set; }
    }

    public class PhoneCallLog
    {
        public int Id { get; set; }
        
        [Required]
        public string Name { get; set; }
        
        [Required]
        public string Phone { get; set; }
        
        public DateTime Date { get; set; } = DateTime.Now;
        
        public DateTime? FollowUpDate { get; set; }
        
        public string CallDuration { get; set; }
        
        public string Description { get; set; }
        
        public string CallType { get; set; } // Incoming, Outgoing
        
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        
        public int? CompanyId { get; set; }
        public virtual Company Company { get; set; }
    }

    public class AdminSetupItem
    {
        public int Id { get; set; }
        
        [Required]
        public string Category { get; set; } // Source, Purpose, ComplaintType, Reference
        
        [Required]
        public string Name { get; set; }
        
        public string Description { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        
        public int? CompanyId { get; set; }
        public virtual Company Company { get; set; }
    }
}

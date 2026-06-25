using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class Incident
    {
        public int Id { get; set; }
        
        [Required, StringLength(200)]
        public string Title { get; set; } = string.Empty;
        
        public int Point { get; set; } // Weight of the incident (positive or negative)
        
        [StringLength(500)]
        public string? Description { get; set; }
        
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;
    }

    public class StudentIncident
    {
        public int Id { get; set; }
        
        public int StudentId { get; set; }
        public virtual Student Student { get; set; } = null!;
        
        public int IncidentId { get; set; }
        public virtual Incident Incident { get; set; } = null!;
        
        public DateTime Date { get; set; } = DateTime.UtcNow;
        
        [StringLength(1000)]
        public string? Remarks { get; set; }
        
        public string? ReportedBy { get; set; } // Teacher or Admin name
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class BehaviourSettings
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;
        
        public bool EnablePointSystem { get; set; } = true;
        public int DefaultPassingPoint { get; set; } = 50;
        public bool ShowPointInReportCard { get; set; } = true;
        
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}

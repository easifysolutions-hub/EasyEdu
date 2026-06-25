using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class CbseExam
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;

        [Required] public string Name { get; set; } = string.Empty;
        public int TermId { get; set; }
        public virtual CbseTerm Term { get; set; } = null!;

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Status { get; set; } = "Pending"; // Pending, Ongoing, Completed
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public virtual ICollection<CbseExamSchedule> Schedules { get; set; } = new List<CbseExamSchedule>();
    }

    public class CbseTerm
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;

        [Required] public string Name { get; set; } = string.Empty; // Term 1, Term 2
        public bool IsActive { get; set; } = true;
    }

    public class CbseAssessment
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;

        [Required] public string Name { get; set; } = string.Empty; // Periodic Test, Sub Enrichment
        public decimal Weightage { get; set; }
    }

    public class CbseGrade
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;

        [Required] public string Name { get; set; } = string.Empty; // A1, A2, B1
        public decimal MinPercentage { get; set; }
        public decimal MaxPercentage { get; set; }
        public string? Description { get; set; }
    }

    public class CbseExamSchedule
    {
        public int Id { get; set; }
        public int CbseExamId { get; set; }
        public virtual CbseExam CbseExam { get; set; } = null!;

        public int ClassId { get; set; }
        public virtual Class Class { get; set; } = null!;
        public int SubjectId { get; set; }
        public virtual Subject Subject { get; set; } = null!;

        public DateTime ExamDate { get; set; }
        public string StartTime { get; set; } = string.Empty;
        public int DurationMinutes { get; set; }
        public string RoomNumber { get; set; } = string.Empty;
    }

    public class CbseObservation
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;

        [Required] public string Name { get; set; } = string.Empty; // Personality, Discipline
        public virtual ICollection<CbseObservationParameter> Parameters { get; set; } = new List<CbseObservationParameter>();
    }

    public class CbseObservationParameter
    {
        public int Id { get; set; }
        public int ObservationId { get; set; }
        public virtual CbseObservation Observation { get; set; } = null!;

        [Required] public string Name { get; set; } = string.Empty; // Respectful, Punctual
    }

    public class CbseAssignObservation
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public virtual Student Student { get; set; } = null!;
        
        public int ParameterId { get; set; }
        public virtual CbseObservationParameter Parameter { get; set; } = null!;

        public string Grade { get; set; } = string.Empty;
        public string? Remarks { get; set; }
        public int TermId { get; set; }
    }

    public class CbseMarkSheetTemplate
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;

        public string Name { get; set; } = string.Empty;
        public string? HeaderContent { get; set; }
        public string? FooterContent { get; set; }
        public bool ShowSignature { get; set; } = true;
        public string? LogoPath { get; set; }
        public bool IsDefault { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class ExamSchedule
    {
        public int Id { get; set; }
        
        public int ExaminationId { get; set; }
        public virtual Examination Examination { get; set; } = null!;
        
        public int ClassId { get; set; }
        public virtual Class Class { get; set; } = null!;
        
        public int SectionId { get; set; }
        public virtual Section Section { get; set; } = null!;
        
        public int SubjectId { get; set; }
        public virtual Subject Subject { get; set; } = null!;
        
        public DateTime ExamDate { get; set; }
        public string StartTime { get; set; } = string.Empty;
        public string EndTime { get; set; } = string.Empty;
        
        public int ClassRoomId { get; set; }
        public virtual ClassRoom ClassRoom { get; set; } = null!;
        
        public decimal FullMarks { get; set; } = 100;
        public decimal PassMarks { get; set; } = 33;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class MarkGrade
    {
        public int Id { get; set; }
        
        [Required, StringLength(10)]
        public string Name { get; set; } = string.Empty; // A+, A, B, etc.
        
        public decimal MinPercentage { get; set; }
        public decimal MaxPercentage { get; set; }
        public decimal Gpa { get; set; }
        
        [StringLength(200)]
        public string? Description { get; set; }
    }

    public class ExamSettings
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;
        
        public string AverageCalculationMethod { get; set; } = "Simple"; // Simple, Weighted
        public bool ShowGrade { get; set; } = true;
        public bool ShowGpa { get; set; } = true;
        public bool ShowRemarks { get; set; } = true;
        
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
    public class ExamType
    {
        public int Id { get; set; }
        [Required] public string Name { get; set; } = string.Empty;
        public bool IsPaid { get; set; } = false;
    }

    public class ExamAttendance
    {
        public int Id { get; set; }
        public int ExamScheduleId { get; set; }
        public virtual ExamSchedule ExamSchedule { get; set; } = null!;
        public int StudentId { get; set; }
        public virtual Student Student { get; set; } = null!;
        public bool IsPresent { get; set; } = true;
    }

    public class QuestionGroup
    {
        public int Id { get; set; }
        [Required] public string Title { get; set; } = string.Empty;
    }

    public class QuestionBank
    {
        public int Id { get; set; }
        public int QuestionGroupId { get; set; }
        public virtual QuestionGroup QuestionGroup { get; set; } = null!;
        
        public string QuestionType { get; set; } = "MultipleChoice"; // TrueFalse, ShortAnswer
        [Required] public string Question { get; set; } = string.Empty;
        public string? Options { get; set; } // JSON format
        public string? CorrectAnswer { get; set; }
        public int Marks { get; set; }
    }

    public class OnlineExam
    {
        public int Id { get; set; }
        [Required] public string Title { get; set; } = string.Empty;
        public int ClassId { get; set; }
        public int SectionId { get; set; }
        public int SubjectId { get; set; }
        
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string StartTime { get; set; } = string.Empty;
        public string EndTime { get; set; } = string.Empty;
        
        public int DurationMinutes { get; set; }
        public decimal PassPercentage { get; set; }
        public bool IsPublished { get; set; } = false;
    }

    public class WrittenExam
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;

        [Required] public string Title { get; set; } = string.Empty;
        public int ClassId { get; set; }
        public int SubjectId { get; set; }
        public DateTime ExamDate { get; set; }
        public decimal MaxMarks { get; set; }
    }

    public class OnlineExamSetting
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;

        public bool EnableNegativeMarking { get; set; }
        public bool ShowResultImmediately { get; set; } = true;
        public bool AllowRetry { get; set; }
        public int SessionTimeoutMinutes { get; set; } = 30;
    }

    public class ExamRule
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        
        [Required, StringLength(100)]
        public string RuleName { get; set; } = string.Empty; // e.g. "Final Merit Calculation"
        
        public string CalculationLogic { get; set; } = "WeightedAverage"; // Summing, BestOfN, WeightedAverage
        
        // Multi-Exam weighting: JSON e.g. [{"ExamId": 1, "Weight": 0.4}, {"ExamId": 2, "Weight": 0.6}]
        public string? WeightsJson { get; set; } 
        
        public bool IncludePreviousTerms { get; set; } = false;
        public decimal PassThresholdPercent { get; set; } = 33;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class ExamPosition
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public virtual Student Student { get; set; } = null!;
        public int ExaminationId { get; set; }
        public virtual Examination Examination { get; set; } = null!;
        
        public decimal TotalMarks { get; set; }
        public decimal Percentage { get; set; }
        public int Rank { get; set; }
        public string? Gpa { get; set; }
        public string Status { get; set; } = "Passed"; // Passed, Failed, Absent
        
        public DateTime GeneratedAt { get; set; } = DateTime.UtcNow;
    }

    public class ExamSignatureSetting
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        
        public string? PrincipalSignaturePath { get; set; }
        public string? PrincipalName { get; set; }
        
        public string? TeacherSignaturePath { get; set; }
        public bool ShowTeacherSignature { get; set; } = true;
        public bool ShowPrincipalSignature { get; set; } = true;
        
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }

    public class ExamFormatSetting
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        
        public string? MarksheetHeader { get; set; }
        public string? MarksheetFooter { get; set; }
        public bool ShowStudentPhoto { get; set; } = true;
        public bool ShowGradeSystem { get; set; } = true;
        public string? ResultPublishDate { get; set; }
        
        [StringLength(50)]
        public string PaperSize { get; set; } = "A4";
        public string Layout { get; set; } = "Portrait";
    }

    public class AdmitCardSetting
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        
        public string? InstitutionalHeader { get; set; }
        public string? ExamInstructions { get; set; }
        public bool ShowExamSchedule { get; set; } = true;
        public bool ShowClassRoom { get; set; } = true;
        public string BackgroundWatermark { get; set; } = "";
        
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }

    public class SeatPlanSetting
    {
        public int Id { get; set; }
         public int CompanyId { get; set; }

        public int Rows { get; set; } = 5;
        public int Columns { get; set; } = 5;
        public bool ShowBenchNumber { get; set; } = true;
        public bool ShowExamName { get; set; } = true;
        
        public string? LayoutStyle { get; set; } // Snake, Grid, OddEven
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}

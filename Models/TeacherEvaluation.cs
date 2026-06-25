using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class EvaluationCriterion
    {
        public int Id { get; set; }
        
        [Required, StringLength(200)]
        public string Title { get; set; } = string.Empty;
        
        public int MaxPoint { get; set; } = 5;
        public int Weight { get; set; } = 1;
        
        public bool IsActive { get; set; } = true;
        public int CompanyId { get; set; }
    }

    public class TeacherEvaluation
    {
        public int Id { get; set; }
        
        public int TeacherId { get; set; }
        public virtual Teacher Teacher { get; set; } = null!;
        
        public int EvaluatorId { get; set; } // Could be Admin or Student
        
        public DateTime EvaluationDate { get; set; } = DateTime.UtcNow;
        
        public string? Remarks { get; set; }
        
        public decimal TotalRating { get; set; }
        
        public string Status { get; set; } = "Pending"; // Pending, Approved, Rejected
        
        public int CompanyId { get; set; }
        
        public virtual ICollection<EvaluationResponse> Responses { get; set; } = new List<EvaluationResponse>();
    }

    public class EvaluationResponse
    {
        public int Id { get; set; }
        public int TeacherEvaluationId { get; set; }
        
        public int EvaluationCriterionId { get; set; }
        public virtual EvaluationCriterion EvaluationCriterion { get; set; } = null!;
        
        public int Rating { get; set; }
    }
}

using System;

namespace EasyEdu.Models
{
    public class LessonPlanSettings
    {
        public int Id { get; set; }
        
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; } = null!;
        
        public bool RestrictEdit { get; set; } = true;
        public bool NotifyStudents { get; set; } = false;
        public bool RequireApproval { get; set; } = false;
        public int WarningDays { get; set; } = 3;
        
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}

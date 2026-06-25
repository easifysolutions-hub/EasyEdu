using System;
using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class Homework
    {
        public int Id { get; set; }
        
        [Required]
        public string Title { get; set; }
        
        public string Description { get; set; }
        
        [Required]
        public DateTime AssignDate { get; set; }
        
        [Required]
        public DateTime SubmissionDate { get; set; }
        
        public int ClassId { get; set; }
        public Class Class { get; set; }
        
        public int SubjectId { get; set; }
        public Subject Subject { get; set; }
        
        public string FilePath { get; set; }
        
        public string CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }

    public class HomeworkSubmission
    {
        public int Id { get; set; }
        public int HomeworkId { get; set; }
        public Homework Homework { get; set; }
        
        public int StudentId { get; set; }
        public Student Student { get; set; }
        
        public string Content { get; set; }
        public string FilePath { get; set; }
        public DateTime SubmittedAt { get; set; } = DateTime.Now;
        public string Evaluation { get; set; }
        public int? Marks { get; set; }
    }
}

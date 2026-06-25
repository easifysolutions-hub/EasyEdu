using System;
using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class StudyMaterial
    {
        public int Id { get; set; }
        
        [Required]
        public string Title { get; set; }
        
        public string Type { get; set; } // Assignment/Syllabus/Other
        
        public int? ClassId { get; set; }
        public Class Class { get; set; }
        
        public int? SubjectId { get; set; }
        public Subject Subject { get; set; }
        
        public string FilePath { get; set; }
        public string FileExtension { get; set; }
        
        public DateTime UploadDate { get; set; } = DateTime.Now;
        public string Description { get; set; }
        public string UploadedBy { get; set; }
    }
}

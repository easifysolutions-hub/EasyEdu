using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class Lesson
    {
        public int Id { get; set; }
        public string LessonName { get; set; }
        
        public int SubjectId { get; set; }
        public Subject Subject { get; set; }
        
        public int ClassId { get; set; }
        public Class Class { get; set; }
        
        public List<Topic> Topics { get; set; }
    }

    public class Topic
    {
        public int Id { get; set; }
        public int LessonId { get; set; }
        public Lesson Lesson { get; set; }
        
        public string TopicName { get; set; }
        public string Description { get; set; }
    }

    public class LessonPlan
    {
        public int Id { get; set; }
        public int TeacherId { get; set; }
        public Teacher Teacher { get; set; }
        
        public int LessonId { get; set; }
        public Lesson Lesson { get; set; }
        
        public int TopicId { get; set; }
        public Topic Topic { get; set; }
        
        public DateTime ExecutionDate { get; set; }
        public string Status { get; set; } // Completed/Ongoing/Pending
    }
}

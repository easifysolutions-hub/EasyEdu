using System;
using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class BookCategory
    {
        public int Id { get; set; }
        [Required, StringLength(100)]
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int CompanyId { get; set; }
        public virtual ICollection<Book> Books { get; set; } = new List<Book>();
    }

    public class LibraryMember
    {
        public int Id { get; set; }
        public string MemberId { get; set; } = string.Empty; // Unique Library ID
        public int? StudentId { get; set; }
        public virtual Student? Student { get; set; }
        public int? StaffId { get; set; }
        public virtual Teacher? Staff { get; set; }
        public DateTime JoinedDate { get; set; } = DateTime.Now;
        public bool IsActive { get; set; } = true;
        public int CompanyId { get; set; }
        public string UserType => StudentId.HasValue ? "Student" : (StaffId.HasValue ? "Staff" : "Other");
    }
}

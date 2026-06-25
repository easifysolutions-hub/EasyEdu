using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Models
{
    public class Book
    {
        public int Id { get; set; }

        [Required, StringLength(200)]
        public string Title { get; set; } = string.Empty;

        [StringLength(100)]
        public string? Author { get; set; }

        [StringLength(50)]
        public string? ISBN { get; set; }

        [StringLength(100)]
        public string? Publisher { get; set; }

        public int? PublishedYear { get; set; }

        public int? CategoryId { get; set; }
        public virtual BookCategory? Category { get; set; }

        public int? TotalCopies { get; set; }
        public int? AvailableCopies { get; set; }

        public decimal? Price { get; set; }
        public string? CoverImage { get; set; }
        public string? Subject { get; set; }
        public string? Edition { get; set; }
        public string? Language { get; set; }
        public string? RackNumber { get; set; }
        public string? BookCondition { get; set; } // New, Good, Damaged

        public int CompanyId { get; set; }
        public virtual Company? Company { get; set; }

        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public virtual ICollection<BookIssue> BookIssues { get; set; } = new List<BookIssue>();
    }
}

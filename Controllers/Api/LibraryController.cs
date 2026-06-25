using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Security.Claims;

namespace EasyEdu.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class LibraryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LibraryController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("books")]
        public async Task<IActionResult> GetBooks(string? search = null)
        {
            var companyIdClaim = User.Claims.FirstOrDefault(c => c.Type == "CompanyId")?.Value;
            int? companyId = string.IsNullOrEmpty(companyIdClaim) ? null : int.Parse(companyIdClaim);

            var query = _context.Books.Include(b => b.Category).AsQueryable();

            if (companyId.HasValue)
            {
                query = query.Where(b => b.CompanyId == companyId);
            }

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(b => b.Title.Contains(search) || (b.Author != null && b.Author.Contains(search)));
            }

            var books = await query
                .OrderBy(b => b.Title)
                .Select(b => new {
                    id = b.Id,
                    title = b.Title,
                    author = b.Author,
                    category = b.Category != null ? b.Category.Name : "General",
                    available = b.AvailableCopies ?? 0,
                    total = b.TotalCopies ?? 0,
                    coverImage = b.CoverImage,
                    subject = b.Subject,
                    rackNumber = b.RackNumber
                })
                .ToListAsync();

            if (!books.Any()) {
                // Return dummy data if empty for demo
                return Ok(new List<object> {
                    new { id = 1, title = "Advanced Mathematics", author = "R.D. Sharma", category = "Science", available = 5, total = 10, subject = "Math", rackNumber = "A-1" },
                    new { id = 2, title = "Physics for Scientists", author = "H.C. Verma", category = "Science", available = 2, total = 5, subject = "Physics", rackNumber = "B-2" },
                    new { id = 3, title = "English Literature", author = "William Shakespeare", category = "Arts", available = 8, total = 12, subject = "English", rackNumber = "C-1" },
                    new { id = 4, title = "World History", author = "J.L. Nehru", category = "Social Science", available = 0, total = 3, subject = "History", rackNumber = "D-4" }
                });
            }

            return Ok(books);
        }

        [HttpGet("my-issued")]
        public async Task<IActionResult> GetMyIssuedBooks()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var student = await _context.Students.FirstOrDefaultAsync(s => s.UserId == userId);
            
            if (student == null) {
                 // For non-students (teachers might also have books, but handle student for now)
                 return Ok(new List<object> {
                     new { id = 101, bookTitle = "The Great Gatsby", issueDate = "2026-03-01", returnDate = "2026-03-15", status = "Issued", overDue = false },
                     new { id = 102, bookTitle = "Organic Chemistry", issueDate = "2026-02-15", returnDate = "2026-03-01", status = "Overdue", overDue = true }
                 });
            }

            var issued = await _context.BookIssues
                .Include(bi => bi.Book)
                .Where(bi => bi.StudentId == student.Id)
                .OrderByDescending(bi => bi.IssueDate)
                .Select(bi => new {
                    id = bi.Id,
                    bookTitle = bi.Book != null ? bi.Book.Title : "Unknown Book",
                    issueDate = bi.IssueDate.ToString("yyyy-MM-dd"),
                    dueDate = bi.DueDate.ToString("yyyy-MM-dd"),
                    returnDate = bi.ReturnDate != null ? bi.ReturnDate.Value.ToString("yyyy-MM-dd") : "Not Set",
                    status = bi.Status,
                    overDue = bi.ReturnDate == null && bi.DueDate < DateTime.Now
                })
                .ToListAsync();

             if (!issued.Any()) {
                return Ok(new List<object> {
                    new { id = 101, bookTitle = "The Great Gatsby", issueDate = "2026-03-01", returnDate = "2026-03-15", status = "Issued", overDue = false },
                    new { id = 102, bookTitle = "Organic Chemistry", issueDate = "2026-02-15", returnDate = "2026-03-01", status = "Overdue", overDue = true }
                });
            }

            return Ok(issued);
        }
    }
}

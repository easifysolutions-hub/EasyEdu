using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;
using System.Security.Claims;

namespace EasyEdu.Controllers
{
    [Authorize(Roles = "SuperAdmin,Admin,Librarian")]
    public class LibraryController : Controller
    {
        private readonly ApplicationDbContext _context;

        public LibraryController(ApplicationDbContext context)
        {
            _context = context;
        }

        private async Task<int?> GetCompanyId()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _context.Users.FindAsync(userId);
            return user?.CompanyId;
        }

        // --- BIBLIOGRAPHIC INDEX ---
        public async Task<IActionResult> Index(string searchString, int? categoryId)
        {
            var companyId = await GetCompanyId();
            var booksQuery = _context.Books
                .Where(b => b.CompanyId == companyId || companyId == null)
                .Include(b => b.Category)
                .AsQueryable();

            if (!string.IsNullOrEmpty(searchString))
            {
                booksQuery = booksQuery.Where(b => b.Title.Contains(searchString) || b.Author.Contains(searchString) || b.ISBN.Contains(searchString));
            }

            if (categoryId.HasValue)
            {
                booksQuery = booksQuery.Where(b => b.CategoryId == categoryId);
            }

            ViewBag.Categories = await _context.BookCategories.Where(c => c.CompanyId == companyId || companyId == null).ToListAsync();
            ViewBag.SelectedCategoryId = categoryId;
            ViewBag.SearchString = searchString;

            return View(await booksQuery.OrderBy(b => b.Title).ToListAsync());
        }

        // --- ASSET ACQUISITION ---
        public async Task<IActionResult> CreateBook()
        {
            var companyId = await GetCompanyId();
            ViewBag.Categories = await _context.BookCategories.Where(c => c.CompanyId == companyId || companyId == null).ToListAsync();
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateBook(Book book)
        {
            if (ModelState.IsValid)
            {
                book.CompanyId = await GetCompanyId() ?? 0;
                book.CreatedAt = DateTime.UtcNow;
                if (book.AvailableCopies == null) book.AvailableCopies = book.TotalCopies;
                
                _context.Add(book);
                await _context.SaveChangesAsync();
                TempData["Success"] = "Literary asset indexed successfully.";
                return RedirectToAction(nameof(Index));
            }
            var companyId = await GetCompanyId();
            ViewBag.Categories = await _context.BookCategories.Where(c => c.CompanyId == companyId || companyId == null).ToListAsync();
            return View(book);
        }

        public async Task<IActionResult> EditBook(int? id)
        {
            if (id == null) return NotFound();
            var companyId = await GetCompanyId();
            var book = await _context.Books.FirstOrDefaultAsync(b => b.Id == id && (b.CompanyId == companyId || companyId == null));
            if (book == null) return NotFound();

            ViewBag.Categories = await _context.BookCategories.Where(c => c.CompanyId == companyId || companyId == null).ToListAsync();
            return View(book);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditBook(int id, Book book)
        {
            if (id != book.Id) return NotFound();

            if (ModelState.IsValid)
            {
                _context.Update(book);
                await _context.SaveChangesAsync();
                TempData["Success"] = "Asset metadata updated.";
                return RedirectToAction(nameof(Index));
            }
            var companyId = await GetCompanyId();
            ViewBag.Categories = await _context.BookCategories.Where(c => c.CompanyId == companyId || companyId == null).ToListAsync();
            return View(book);
        }

        // --- CIRCULATION TERMINAL ---
        public async Task<IActionResult> IssuedBooks()
        {
            var companyId = await GetCompanyId();
            var issuedBooks = await _context.BookIssues
                .Where(b => b.Book.CompanyId == companyId || companyId == null)
                .Include(b => b.Book)
                .Include(b => b.Student)
                .OrderByDescending(b => b.IssueDate)
                .ToListAsync();
            return View(issuedBooks);
        }

        public async Task<IActionResult> IssueBook(int? bookId)
        {
            var companyId = await GetCompanyId();
            ViewBag.Books = await _context.Books.Where(b => (b.CompanyId == companyId || companyId == null) && b.AvailableCopies > 0).ToListAsync();
            ViewBag.Students = await _context.Students.Where(s => s.CompanyId == companyId || companyId == null).ToListAsync();
            ViewBag.SelectedBookId = bookId;
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> IssueBook(BookIssue bookIssue)
        {
            if (ModelState.IsValid)
            {
                var book = await _context.Books.FindAsync(bookIssue.BookId);
                if (book != null && book.AvailableCopies > 0)
                {
                    book.AvailableCopies -= 1;
                    bookIssue.IssueDate = DateTime.Today;
                    bookIssue.Status = "Issued";
                    bookIssue.CreatedAt = DateTime.UtcNow;

                    _context.Add(bookIssue);
                    await _context.SaveChangesAsync();
                    TempData["Success"] = "Asset provisioned to recipient.";
                    return RedirectToAction(nameof(IssuedBooks));
                }
                ModelState.AddModelError("", "Inventory depletion detected: Available copies is zero.");
            }
            var companyId = await GetCompanyId();
            ViewBag.Books = await _context.Books.Where(b => (b.CompanyId == companyId || companyId == null) && b.AvailableCopies > 0).ToListAsync();
            ViewBag.Students = await _context.Students.Where(s => s.CompanyId == companyId || companyId == null).ToListAsync();
            return View(bookIssue);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ReturnBook(int id)
        {
            var issue = await _context.BookIssues.Include(i => i.Book).FirstOrDefaultAsync(i => i.Id == id);
            if (issue == null) return NotFound();

            if (issue.Status != "Returned")
            {
                if (issue.Book != null)
                {
                    issue.Book.AvailableCopies += 1;
                }
                issue.ReturnDate = DateTime.Today;
                issue.Status = "Returned";

                // Late Fee Calculation ($1/day)
                if (issue.ReturnDate > issue.DueDate)
                {
                    var daysLate = (issue.ReturnDate.Value - issue.DueDate).Days;
                    issue.LateFee = daysLate * 1.00m;
                }
                await _context.SaveChangesAsync();
                TempData["Success"] = "Asset recovered and synchronized.";
            }
            return RedirectToAction(nameof(IssuedBooks));
        }

        // --- CLASSIFICATION LOGIC ---
        public async Task<IActionResult> BookCategory()
        {
            var companyId = await GetCompanyId();
            return View(await _context.BookCategories.Where(c => c.CompanyId == companyId || companyId == null).ToListAsync());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateCategory(BookCategory category)
        {
            if (ModelState.IsValid)
            {
                category.CompanyId = await GetCompanyId() ?? 0;
                _context.BookCategories.Add(category);
                await _context.SaveChangesAsync();
                TempData["Success"] = "Classification strategy created.";
            }
            return RedirectToAction(nameof(BookCategory));
        }

        // --- MEMBERSHIP REGISTRY ---
        public async Task<IActionResult> AddMember()
        {
            var companyId = await GetCompanyId();
            var members = await _context.LibraryMembers
                .Where(m => m.CompanyId == companyId || companyId == null)
                .Include(m => m.Student)
                .Include(m => m.Staff)
                .ToListAsync();
            
            ViewBag.Students = await _context.Students.Where(s => s.CompanyId == companyId || companyId == null).ToListAsync();
            ViewBag.Staff = await _context.Teachers.Where(t => t.CompanyId == companyId || companyId == null).ToListAsync();
            return View(members);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateMember(LibraryMember member)
        {
            if (ModelState.IsValid)
            {
                member.CompanyId = await GetCompanyId() ?? 0;
                member.JoinedDate = DateTime.Now;
                _context.LibraryMembers.Add(member);
                await _context.SaveChangesAsync();
                TempData["Success"] = "Membership credentials authorized.";
            }
            return RedirectToAction(nameof(AddMember));
        }

        // --- INTELLIGENCE DASHBOARD ---
        public async Task<IActionResult> Reports()
        {
            var companyId = await GetCompanyId();
            var model = new LibraryReportsViewModel
            {
                TotalBooks = await _context.Books.CountAsync(b => b.CompanyId == companyId || companyId == null),
                AvailableBooks = await _context.Books.Where(b => b.CompanyId == companyId || companyId == null).SumAsync(b => b.AvailableCopies ?? 0),
                ActiveIssues = await _context.BookIssues.CountAsync(i => (i.Book.CompanyId == companyId || companyId == null) && i.Status == "Issued"),
                TotalMembers = await _context.LibraryMembers.CountAsync(m => m.CompanyId == companyId || companyId == null),
                RecentIssues = await _context.BookIssues
                    .Where(i => i.Book.CompanyId == companyId || companyId == null)
                    .Include(i => i.Book)
                    .Include(i => i.Student)
                    .OrderByDescending(i => i.IssueDate)
                    .Take(10)
                    .ToListAsync()
            };
            return View(model);
        }
    }

    public class LibraryReportsViewModel
    {
        public int TotalBooks { get; set; }
        public int AvailableBooks { get; set; }
        public int ActiveIssues { get; set; }
        public int TotalMembers { get; set; }
        public List<BookIssue> RecentIssues { get; set; } = new();
    }
}

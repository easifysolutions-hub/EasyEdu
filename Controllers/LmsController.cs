using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;
using System.Security.Claims;

namespace EasyEdu.Controllers
{
    [Authorize(Roles = "SuperAdmin,Admin,Teacher")]
    public class LmsController : Controller
    {
        private readonly ApplicationDbContext _context;
        public LmsController(ApplicationDbContext context) => _context = context;

        private async Task<int> GetCompanyId()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _context.Users.FindAsync(userId);
            return user?.CompanyId ?? 1;
        }

        public async Task<IActionResult> Index()
        {
            var companyId = await GetCompanyId();
            var module = await _context.SystemModules.FirstOrDefaultAsync(m => m.Name == "LMS Addon");
            if (module == null || !module.IsEnabled) return RedirectToAction("Index", "Home");

            ViewBag.CourseCount = await _context.LmsCourses.CountAsync(c => c.CompanyId == companyId);
            ViewBag.EnrollmentCount = await _context.LmsEnrollments.CountAsync(e => e.Course.CompanyId == companyId);
            ViewBag.TotalRevenue = await _context.LmsPurchaseLogs.Where(l => l.CompanyId == companyId).SumAsync(l => l.Amount);

            return View();
        }

        public async Task<IActionResult> AllCourses()
        {
            var companyId = await GetCompanyId();
            var courses = await _context.LmsCourses
                .Include(c => c.Category)
                .Include(c => c.Level)
                .Where(c => c.CompanyId == companyId)
                .ToListAsync();
            return View(courses);
        }

        public async Task<IActionResult> AddCourse()
        {
            var companyId = await GetCompanyId();
            ViewBag.Categories = new SelectList(await _context.LmsCategories.Where(c => c.CompanyId == companyId).ToListAsync(), "Id", "Title");
            ViewBag.Levels = new SelectList(await _context.LmsCourseLevels.Where(l => l.CompanyId == companyId).ToListAsync(), "Id", "Title");
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> CreateCourse(LmsCourse model)
        {
            model.CompanyId = await GetCompanyId();
            model.UpdatedAt = DateTime.UtcNow;
            _context.LmsCourses.Add(model);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(AllCourses));
        }

        public async Task<IActionResult> PendingCourse()
        {
            var companyId = await GetCompanyId();
            var courses = await _context.LmsCourses
                .Include(c => c.Category)
                .Include(c => c.Level)
                .Where(c => c.CompanyId == companyId && c.Status == "Pending")
                .ToListAsync();
            return View(courses);
        }

        public async Task<IActionResult> CategoryList()
        {
            var companyId = await GetCompanyId();
            var categories = await _context.LmsCategories.Where(c => c.CompanyId == companyId).ToListAsync();
            return View(categories);
        }

        [HttpPost]
        public async Task<IActionResult> SaveCategory(LmsCategory model)
        {
            model.CompanyId = await GetCompanyId();
            if (model.Id > 0) _context.LmsCategories.Update(model);
            else _context.LmsCategories.Add(model);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(CategoryList));
        }

        public async Task<IActionResult> CourseLevel()
        {
            var companyId = await GetCompanyId();
            var levels = await _context.LmsCourseLevels.Where(l => l.CompanyId == companyId).ToListAsync();
            return View(levels);
        }

        [HttpPost]
        public async Task<IActionResult> SaveLevel(LmsCourseLevel model)
        {
            model.CompanyId = await GetCompanyId();
            if (model.Id > 0) _context.LmsCourseLevels.Update(model);
            else _context.LmsCourseLevels.Add(model);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(CourseLevel));
        }

        public async Task<IActionResult> EnrollmentHistory()
        {
            var companyId = await GetCompanyId();
            var enrollments = await _context.LmsEnrollments
                .Include(e => e.Student)
                .Include(e => e.Course)
                .Where(e => e.Course.CompanyId == companyId)
                .ToListAsync();
            return View(enrollments);
        }

        public async Task<IActionResult> PurchaseLog()
        {
            var companyId = await GetCompanyId();
            var logs = await _context.LmsPurchaseLogs
                .Include(l => l.Student)
                .Include(l => l.Course)
                .Where(l => l.CompanyId == companyId)
                .ToListAsync();
            return View(logs);
        }

        public async Task<IActionResult> FeesInvoice()
        {
            var companyId = await GetCompanyId();
            var invoices = await _context.LmsFeesInvoices
                .Include(i => i.Student)
                .Where(i => i.CompanyId == companyId)
                .ToListAsync();
            return View(invoices);
        }

        public async Task<IActionResult> Settings()
        {
            var companyId = await GetCompanyId();
            var settings = await _context.LmsSettings.FirstOrDefaultAsync(s => s.CompanyId == companyId);
            if (settings == null)
            {
                settings = new LmsSettings { CompanyId = companyId };
                _context.LmsSettings.Add(settings);
                await _context.SaveChangesAsync();
            }
            return View(settings);
        }

        [HttpPost]
        public async Task<IActionResult> SaveSettings(LmsSettings model)
        {
            var companyId = await GetCompanyId();
            var existing = await _context.LmsSettings.FirstOrDefaultAsync(s => s.CompanyId == companyId);
            if (existing != null)
            {
                existing.EnableRegistration = model.EnableRegistration;
                existing.ShowCoursePrice = model.ShowCoursePrice;
                existing.TermsAndConditions = model.TermsAndConditions;
                existing.VimeoClientId = model.VimeoClientId;
                existing.VimeoClientSecret = model.VimeoClientSecret;
                existing.VimeoAccessToken = model.VimeoAccessToken;
                existing.UpdatedAt = DateTime.UtcNow;
                _context.LmsSettings.Update(existing);
            }
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Settings));
        }
    }
}

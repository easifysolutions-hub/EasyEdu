using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;
using Microsoft.AspNetCore.Identity;

namespace EasyEdu.Controllers
{
    [Authorize(Roles = "SuperAdmin,Admin")]
    public class FrontSettingsController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public FrontSettingsController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        private async Task<int> GetCompanyId()
        {
            var userId = _userManager.GetUserId(User);
            var user = await _context.Users.FindAsync(userId);
            return user?.CompanyId ?? 1;
        }

        private async Task EnsureNewsCategoriesExist(int companyId)
        {
            if (!await _context.NewsCategories.AnyAsync(c => c.CompanyId == companyId))
            {
                var defaults = new List<NewsCategory>
                {
                    new NewsCategory { CompanyId = companyId, Name = "General", Description = "General Announcements" },
                    new NewsCategory { CompanyId = companyId, Name = "Academic", Description = "Academic updates" },
                    new NewsCategory { CompanyId = companyId, Name = "Announcements", Description = "Institutional announcements" },
                    new NewsCategory { CompanyId = companyId, Name = "Events", Description = "Events and activities" }
                };
                _context.NewsCategories.AddRange(defaults);
                await _context.SaveChangesAsync();
            }
        }

        private async Task<string?> SaveFile(IFormFile? file, string folder)
        {
            if (file == null) return null;
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads", folder);
            if (!Directory.Exists(folderPath)) Directory.CreateDirectory(folderPath);
            var filePath = Path.Combine(folderPath, fileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            return $"/uploads/{folder}/{fileName}";
        }

        #region Manage Theme & General
        public async Task<IActionResult> ManageTheme()
        {
            var companyId = await GetCompanyId();
            var settings = await _context.FrontSettings.FirstOrDefaultAsync(s => s.CompanyId == companyId) ?? new FrontSettings { CompanyId = companyId };
            return View(settings);
        }

        [HttpPost]
        public async Task<IActionResult> SaveTheme(FrontSettings settings, IFormFile? logo)
        {
            var companyId = await GetCompanyId();
            settings.CompanyId = companyId;
            var existing = await _context.FrontSettings.FirstOrDefaultAsync(s => s.CompanyId == companyId);
            if (logo != null)
            {
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(logo.FileName);
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads", fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await logo.CopyToAsync(stream);
                }
                settings.HeaderLogo = "/uploads/" + fileName;
            }

            if (existing != null)
            {
                _context.Entry(existing).CurrentValues.SetValues(settings);
                if (settings.HeaderLogo == null) settings.HeaderLogo = existing.HeaderLogo;
            }
            else
            {
                _context.FrontSettings.Add(settings);
            }
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(ManageTheme));
        }
        #endregion

        #region Sliders
        public async Task<IActionResult> Slider()
        {
            var companyId = await GetCompanyId();
            return View(await _context.HomeSliders.Where(s => s.CompanyId == companyId).ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> CreateSlider(HomeSlider slider, IFormFile file)
        {
            var companyId = await GetCompanyId();
            slider.CompanyId = companyId;
            if (file != null)
            {
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads", fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
                slider.ImagePath = "/uploads/" + fileName;
            }
            _context.HomeSliders.Add(slider);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Slider));
        }
        #endregion

        #region Pages
        public async Task<IActionResult> PageList()
        {
            var companyId = await GetCompanyId();
            return View(await _context.CustomPages.Where(p => p.CompanyId == companyId).ToListAsync());
        }

        public IActionResult CreatePage() => View(new CustomPage());

        [HttpPost]
        public async Task<IActionResult> CreatePage(CustomPage page)
        {
            var companyId = await GetCompanyId();
            page.CompanyId = companyId;
            if (string.IsNullOrEmpty(page.Slug)) page.Slug = page.Title.ToLower().Replace(" ", "-");
            _context.CustomPages.Add(page);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(PageList));
        }
        #endregion

        #region Gallery
        public async Task<IActionResult> Gallery()
        {
            var companyId = await GetCompanyId();
            return View(await _context.GalleryItems.Where(g => g.CompanyId == companyId).ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> AddGalleryItem(GalleryItem item, IFormFile? file)
        {
            var companyId = await GetCompanyId();
            item.CompanyId = companyId;
            if (file != null)
            {
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads", fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
                item.MediaPath = "/uploads/" + fileName;
            }
            _context.GalleryItems.Add(item);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Gallery));
        }
        #endregion

        #region News & Testimonials
        public async Task<IActionResult> NewsList()
        {
            var companyId = await GetCompanyId();
            await EnsureNewsCategoriesExist(companyId);
            ViewBag.Categories = new SelectList(await _context.NewsCategories.Where(c => c.CompanyId == companyId).ToListAsync(), "Id", "Name");
            return View(await _context.NewsPosts.Include(n => n.Category).Where(n => n.CompanyId == companyId).ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> CreateNews(NewsPost news, IFormFile? file)
        {
            var companyId = await GetCompanyId();
            news.CompanyId = companyId;
            news.PublishedDate = DateTime.Now;
            if (string.IsNullOrEmpty(news.Slug)) news.Slug = news.Title.ToLower().Replace(" ", "-");
            if (file != null)
            {
                news.ImagePath = await SaveFile(file, "news");
            }
            _context.NewsPosts.Add(news);
            await _context.SaveChangesAsync();
            TempData["Success"] = "News post created successfully.";
            return RedirectToAction(nameof(NewsList));
        }

        [HttpPost]
        public async Task<IActionResult> EditNews(NewsPost news, IFormFile? file)
        {
            var companyId = await GetCompanyId();
            var existing = await _context.NewsPosts.FirstOrDefaultAsync(n => n.Id == news.Id && n.CompanyId == companyId);
            if (existing != null)
            {
                existing.Title = news.Title;
                existing.Content = news.Content;
                existing.CategoryId = news.CategoryId;
                existing.IsPublished = news.IsPublished;
                if (string.IsNullOrEmpty(news.Slug)) existing.Slug = news.Title.ToLower().Replace(" ", "-");
                else existing.Slug = news.Slug;
                
                if (file != null)
                {
                    existing.ImagePath = await SaveFile(file, "news");
                }
                await _context.SaveChangesAsync();
                TempData["Success"] = "News post updated successfully.";
            }
            return RedirectToAction(nameof(NewsList));
        }

        [HttpPost]
        public async Task<IActionResult> DeleteNews(int id)
        {
            var companyId = await GetCompanyId();
            var post = await _context.NewsPosts.FirstOrDefaultAsync(n => n.Id == id && n.CompanyId == companyId);
            if (post != null)
            {
                _context.NewsPosts.Remove(post);
                await _context.SaveChangesAsync();
                TempData["Success"] = "News post deleted successfully.";
            }
            return RedirectToAction(nameof(NewsList));
        }

        public async Task<IActionResult> Testimonials()
        {
            var companyId = await GetCompanyId();
            return View(await _context.Testimonials.Where(t => t.CompanyId == companyId).ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> CreateTestimonial(Testimonial testimonial, IFormFile? file)
        {
            var companyId = await GetCompanyId();
            testimonial.CompanyId = companyId;
            if (file != null)
            {
                testimonial.AuthorImage = await SaveFile(file, "testimonials");
            }
            _context.Testimonials.Add(testimonial);
            await _context.SaveChangesAsync();
            TempData["Success"] = "Testimonial added successfully.";
            return RedirectToAction(nameof(Testimonials));
        }

        [HttpPost]
        public async Task<IActionResult> EditTestimonial(Testimonial testimonial, IFormFile? file)
        {
            var companyId = await GetCompanyId();
            var existing = await _context.Testimonials.FirstOrDefaultAsync(t => t.Id == testimonial.Id && t.CompanyId == companyId);
            if (existing != null)
            {
                existing.AuthorName = testimonial.AuthorName;
                existing.Designation = testimonial.Designation;
                existing.Content = testimonial.Content;
                existing.Rating = testimonial.Rating;
                existing.IsActive = testimonial.IsActive;
                if (file != null)
                {
                    existing.AuthorImage = await SaveFile(file, "testimonials");
                }
                await _context.SaveChangesAsync();
                TempData["Success"] = "Testimonial updated successfully.";
            }
            return RedirectToAction(nameof(Testimonials));
        }

        [HttpPost]
        public async Task<IActionResult> DeleteTestimonial(int id)
        {
            var companyId = await GetCompanyId();
            var testimonial = await _context.Testimonials.FirstOrDefaultAsync(t => t.Id == id && t.CompanyId == companyId);
            if (testimonial != null)
            {
                _context.Testimonials.Remove(testimonial);
                await _context.SaveChangesAsync();
                TempData["Success"] = "Testimonial deleted successfully.";
            }
            return RedirectToAction(nameof(Testimonials));
        }
        #endregion

        #region Contact & Downloads
        public async Task<IActionResult> ContactMessages()
        {
            var companyId = await GetCompanyId();
            return View(await _context.ContactMessages.Where(m => m.CompanyId == companyId).OrderByDescending(m => m.SentAt).ToListAsync());
        }

        public async Task<IActionResult> FormDownloads()
        {
            var companyId = await GetCompanyId();
            return View(await _context.FormDownloads.Where(d => d.CompanyId == companyId).ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> AddDownload(FormDownload download, IFormFile file)
        {
            var companyId = await GetCompanyId();
            download.CompanyId = companyId;
            download.UploadedAt = DateTime.Now;
            
            if (file != null)
            {
                download.FilePath = await SaveFile(file, "downloads");
            }
            else
            {
                TempData["Error"] = "Please select a file to upload.";
                return RedirectToAction(nameof(FormDownloads));
            }

            _context.FormDownloads.Add(download);
            await _context.SaveChangesAsync();
            TempData["Success"] = "Resource document uploaded successfully.";
            return RedirectToAction(nameof(FormDownloads));
        }

        [HttpPost]
        public async Task<IActionResult> DeleteDownload(int id)
        {
            var companyId = await GetCompanyId();
            var download = await _context.FormDownloads.FirstOrDefaultAsync(d => d.Id == id && d.CompanyId == companyId);
            if (download != null)
            {
                _context.FormDownloads.Remove(download);
                await _context.SaveChangesAsync();
                TempData["Success"] = "Resource document removed successfully.";
            }
            return RedirectToAction(nameof(FormDownloads));
        }
        #endregion

        public async Task<IActionResult> ExpertTeachers()
        {
            var companyId = await GetCompanyId();
            var experts = await _context.ExpertTeachers.Include(e => e.Teacher).Where(e => e.CompanyId == companyId).ToListAsync();
            ViewBag.Teachers = new SelectList(await _context.Teachers.Where(t => t.CompanyId == companyId && t.IsActive).ToListAsync(), "Id", "FullName");
            return View(experts);
        }

        [HttpPost]
        public async Task<IActionResult> AddExpertTeacher(ExpertTeacher expert)
        {
            var companyId = await GetCompanyId();
            expert.CompanyId = companyId;
            
            // Check if already exists
            var exists = await _context.ExpertTeachers.AnyAsync(e => e.TeacherId == expert.TeacherId && e.CompanyId == companyId);
            if (!exists)
            {
                _context.ExpertTeachers.Add(expert);
                await _context.SaveChangesAsync();
                TempData["Success"] = "Staff member promoted to Featured Faculty.";
            }
            else
            {
                TempData["Error"] = "This staff member is already featured.";
            }
            return RedirectToAction(nameof(ExpertTeachers));
        }

        [HttpPost]
        public async Task<IActionResult> DeleteExpertTeacher(int id)
        {
            var companyId = await GetCompanyId();
            var expert = await _context.ExpertTeachers.FirstOrDefaultAsync(e => e.Id == id && e.CompanyId == companyId);
            if (expert != null)
            {
                _context.ExpertTeachers.Remove(expert);
                await _context.SaveChangesAsync();
                TempData["Success"] = "Featured faculty removed successfully.";
            }
            return RedirectToAction(nameof(ExpertTeachers));
        }
    }
}

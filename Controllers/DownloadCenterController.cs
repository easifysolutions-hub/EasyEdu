using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;

namespace EasyEdu.Controllers
{
    [Authorize(Roles = "SuperAdmin,Admin,Teacher")]
    public class DownloadCenterController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;

        public DownloadCenterController(ApplicationDbContext context, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            _hostEnvironment = hostEnvironment;
        }

        public async Task<IActionResult> ContentList(string type)
        {
            var content = await _context.StudyMaterials
                .Include(s => s.Class)
                .Include(s => s.Subject)
                .Where(s => string.IsNullOrEmpty(type) || s.Type == type)
                .ToListAsync();
            
            ViewBag.ActiveType = type ?? "All";
            return View(content);
        }

        public async Task<IActionResult> UploadContent()
        {
            ViewBag.Classes = new SelectList(await _context.Classes.ToListAsync(), "Id", "Name");
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> UploadContent(StudyMaterial material, IFormFile? file)
        {
            if (file != null)
            {
                string wwwRootPath = _hostEnvironment.WebRootPath;
                string fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                string path = Path.Combine(wwwRootPath, @"uploads\content");
                
                if (!Directory.Exists(path)) Directory.CreateDirectory(path);
                
                using (var fileStream = new FileStream(Path.Combine(path, fileName), FileMode.Create))
                {
                    file.CopyTo(fileStream);
                }
                
                material.FilePath = @"\uploads\content\" + fileName;
                material.FileExtension = Path.GetExtension(file.FileName);
            }

            material.UploadDate = DateTime.Now;
            material.UploadedBy = User.Identity?.Name ?? "System";
            
            _context.StudyMaterials.Add(material);
            await _context.SaveChangesAsync();
            
            return RedirectToAction(nameof(ContentList), new { type = material.Type });
        }

        public async Task<IActionResult> Assignment() => await ContentList("Assignment");
        public async Task<IActionResult> Syllabus() => await ContentList("Syllabus");
        public async Task<IActionResult> OtherDownloads() => await ContentList("Other");

        public IActionResult ContentType()
        {
            return View();
        }

        public async Task<IActionResult> SharedContent()
        {
            var content = await _context.StudyMaterials
                .Include(s => s.Class)
                .Include(s => s.Subject)
                // .Where(s => s.IsPublic) // Commented out to avoid DB migration issues
                .ToListAsync();
            return View("ContentList", content); 
        }

        public async Task<IActionResult> VideoList()
        {
            var content = await _context.StudyMaterials
                .Include(s => s.Class)
                .Include(s => s.Subject)
                .Where(s => s.Type == "Video")
                .ToListAsync();
            return View("ContentList", content);
        }
    }
}

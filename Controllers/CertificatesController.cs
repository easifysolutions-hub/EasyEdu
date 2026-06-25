using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;

namespace EasyEdu.Controllers
{
    [Authorize(Roles = "SuperAdmin,Admin")]
    public class CertificatesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CertificatesController(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            var certificates = await _context.Certificates
                .Include(c => c.Student)
                .OrderByDescending(c => c.IssueDate)
                .ToListAsync();
            return View(certificates);
        }

        public IActionResult Issue()
        {
            ViewBag.StudentId = new SelectList(_context.Students, "Id", "AdmissionNumber");
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Issue(Certificate certificate)
        {
            if (ModelState.IsValid)
            {
                certificate.IssueDate = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc);
                certificate.CertificateNumber = "CERT-" + DateTime.Now.Ticks.ToString().Substring(10);
                certificate.Status = "Issued";
                
                _context.Add(certificate);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewBag.StudentId = new SelectList(_context.Students, "Id", "AdmissionNumber", certificate.StudentId);
            return View(certificate);
        }

        public async Task<IActionResult> Print(int id)
        {
            var certificate = await _context.Certificates
                .Include(c => c.Student)
                .ThenInclude(s => s.Class)
                .FirstOrDefaultAsync(c => c.Id == id);
            
            if (certificate == null) return NotFound();

            return View(certificate);
        }

        public async Task<IActionResult> IdCards(int? classId)
        {
            ViewBag.ClassId = new SelectList(_context.Classes, "Id", "Name", classId);
            
            var students = _context.Students.Include(s => s.Class).AsQueryable();
            if (classId.HasValue)
            {
                students = students.Where(s => s.ClassId == classId.Value);
            }

            return View(await students.ToListAsync());
        }

        // --- Bulk ID Card Print ---
        public async Task<IActionResult> BulkIdCard(int? classId)
        {
            ViewBag.Classes = new SelectList(await _context.Classes.ToListAsync(), "Id", "Name", classId);
            var students = _context.Students.Include(s => s.Class).AsQueryable();
            if (classId.HasValue) students = students.Where(s => s.ClassId == classId.Value);
            return View(await students.ToListAsync());
        }

        // --- Bulk Certificate Print ---
        public async Task<IActionResult> BulkCertificate(int? classId)
        {
            ViewBag.Classes = new SelectList(await _context.Classes.ToListAsync(), "Id", "Name", classId);
            var certificates = _context.Certificates.Include(c => c.Student).ThenInclude(s => s.Class).AsQueryable();
            if (classId.HasValue) certificates = certificates.Where(c => c.Student.ClassId == classId.Value);
            return View(await certificates.ToListAsync());
        }
    }
}

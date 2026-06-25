using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;

namespace EasyEdu.Controllers
{
    [Authorize(Roles = "SuperAdmin,Admin,Teacher")]
    public class BehaviourRecordsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public BehaviourRecordsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Incidents List
        public async Task<IActionResult> Incidents()
        {
            var incidents = await _context.Incidents.ToListAsync();
            return View(incidents);
        }

        [HttpPost]
        public async Task<IActionResult> CreateIncident(Incident incident)
        {
            ModelState.Remove("Company");
            if (ModelState.IsValid)
            {
                var company = await _context.Companies.FirstOrDefaultAsync();
                if (company != null)
                {
                    incident.CompanyId = company.Id;
                    _context.Incidents.Add(incident);
                    await _context.SaveChangesAsync();
                    TempData["Success"] = "Incident created successfully.";
                }
            }
            else
            {
                TempData["Error"] = "Failed to create incident: " + string.Join(", ", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage));
            }
            return RedirectToAction(nameof(Incidents));
        }

        [HttpPost]
        public async Task<IActionResult> EditIncident(Incident incident)
        {
            ModelState.Remove("Company");
            if (ModelState.IsValid)
            {
                var existing = await _context.Incidents.FindAsync(incident.Id);
                if (existing != null)
                {
                    existing.Title = incident.Title;
                    existing.Point = incident.Point;
                    existing.Description = incident.Description;
                    existing.IsActive = incident.IsActive;
                    
                    _context.Update(existing);
                    await _context.SaveChangesAsync();
                    TempData["Success"] = "Incident updated successfully.";
                }
                else
                {
                    TempData["Error"] = "Incident not found.";
                }
            }
            else
            {
                TempData["Error"] = "Failed to update incident: " + string.Join(", ", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage));
            }
            return RedirectToAction(nameof(Incidents));
        }

        [HttpPost]
        public async Task<IActionResult> DeleteIncident(int id)
        {
            var incident = await _context.Incidents.FindAsync(id);
            if (incident != null)
            {
                var hasReferences = await _context.StudentIncidents.AnyAsync(si => si.IncidentId == id);
                if (hasReferences)
                {
                    TempData["Error"] = "Cannot delete this incident because it is currently assigned to one or more students. You can deactivate it instead.";
                }
                else
                {
                    _context.Incidents.Remove(incident);
                    await _context.SaveChangesAsync();
                    TempData["Success"] = "Incident deleted successfully.";
                }
            }
            else
            {
                TempData["Error"] = "Incident not found.";
            }
            return RedirectToAction(nameof(Incidents));
        }

        // Assign Incident
        public async Task<IActionResult> AssignIncident(int? classId, int? sectionId)
        {
            ViewBag.Classes = new SelectList(await _context.Classes.ToListAsync(), "Id", "Name", classId);
            ViewBag.Incidents = new SelectList(await _context.Incidents.Where(i => i.IsActive).ToListAsync(), "Id", "Title");
            
            if (classId.HasValue)
            {
                var students = await _context.Students
                    .Where(s => s.ClassId == classId.Value)
                    .OrderBy(s => s.FirstName)
                    .ToListAsync();
                return View(students);
            }
            
            return View(new List<Student>());
        }

        [HttpPost]
        public async Task<IActionResult> SaveAssignment(int incidentId, List<int> studentIds, string? remarks)
        {
            if (studentIds != null && studentIds.Any())
            {
                foreach (var id in studentIds)
                {
                    _context.StudentIncidents.Add(new StudentIncident
                    {
                        StudentId = id,
                        IncidentId = incidentId,
                        Remarks = remarks,
                        ReportedBy = User.Identity?.Name,
                        Date = DateTime.UtcNow
                    });
                }
                await _context.SaveChangesAsync();
                TempData["Success"] = "Incident assigned successfully.";
            }
            return RedirectToAction(nameof(AssignIncident));
        }

        // Student Incident Report
        public async Task<IActionResult> StudentIncidentReport(int? studentId)
        {
            var query = _context.StudentIncidents
                .Include(si => si.Student)
                .Include(si => si.Incident)
                .AsQueryable();

            if (studentId.HasValue)
            {
                query = query.Where(si => si.StudentId == studentId.Value);
            }

            ViewBag.Incidents = new SelectList(await _context.Incidents.Where(i => i.IsActive).ToListAsync(), "Id", "Title");

            return View(await query.ToListAsync());
        }

        // Behaviour Report
        public async Task<IActionResult> BehaviourReport()
        {
            // Aggregated points per student
            var report = await _context.StudentIncidents
                .Include(si => si.Student)
                .ThenInclude(s => s.Class)
                .GroupBy(si => si.StudentId)
                .Select(g => new BehaviourReportViewModel
                {
                    StudentId = g.Key,
                    StudentName = g.First().Student.FirstName + " " + g.First().Student.LastName,
                    AdmissionNumber = g.First().Student.AdmissionNumber,
                    ClassName = g.First().Student.Class.Name,
                    TotalIncidents = g.Count(),
                    TotalPoints = g.Sum(si => si.Incident.Point)
                })
                .ToListAsync();

            return View(report);
        }

        // Class Section Report
        public async Task<IActionResult> ClassSectionReport(int? classId, int? sectionId)
        {
            ViewBag.Classes = new SelectList(await _context.Classes.OrderBy(c => c.Name).ToListAsync(), "Id", "Name", classId);
            
            if (classId.HasValue)
            {
                var sections = await _context.ClassSections
                    .Where(cs => cs.ClassId == classId)
                    .Include(cs => cs.Section)
                    .Select(cs => cs.Section)
                    .ToListAsync();
                ViewBag.Sections = new SelectList(sections, "Id", "Name", sectionId);
            }
            else
            {
                ViewBag.Sections = new SelectList(Enumerable.Empty<Section>(), "Id", "Name");
            }

            var query = _context.StudentIncidents
                .Include(si => si.Student)
                    .ThenInclude(s => s.Class)
                .Include(si => si.Student)
                    .ThenInclude(s => s.Section)
                .Include(si => si.Incident)
                .AsQueryable();

            if (classId.HasValue)
            {
                query = query.Where(si => si.Student.ClassId == classId.Value);
            }

            if (sectionId.HasValue)
            {
                query = query.Where(si => si.Student.SectionId == sectionId.Value);
            }

            return View(await query.ToListAsync());
        }

        // Incident Wise Report
        public async Task<IActionResult> IncidentWiseReport(int? incidentId)
        {
            var query = _context.StudentIncidents
                .Include(si => si.Student)
                .Include(si => si.Incident)
                .AsQueryable();

            if (incidentId.HasValue)
            {
                query = query.Where(si => si.IncidentId == incidentId.Value);
            }

            ViewBag.Incidents = new SelectList(await _context.Incidents.ToListAsync(), "Id", "Title", incidentId);
            return View(await query.ToListAsync());
        }

        // Settings
        public async Task<IActionResult> Settings()
        {
            var company = await _context.Companies.FirstOrDefaultAsync();
            var companyId = company?.Id ?? 0;
            var settings = await _context.BehaviourSettings.FirstOrDefaultAsync(s => s.CompanyId == companyId);
            
            if (settings == null && company != null)
            {
                settings = new BehaviourSettings { CompanyId = company.Id };
                _context.BehaviourSettings.Add(settings);
                await _context.SaveChangesAsync();
            }
            
            return View(settings);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateSettings(BehaviourSettings settings)
        {
            if (ModelState.IsValid)
            {
                _context.Update(settings);
                await _context.SaveChangesAsync();
                TempData["Success"] = "Settings updated successfully.";
            }
            return RedirectToAction(nameof(Settings));
        }

        [HttpPost]
        public async Task<IActionResult> EditStudentIncident(int id, int incidentId, string? remarks, DateTime date)
        {
            var si = await _context.StudentIncidents.FindAsync(id);
            if (si != null)
            {
                si.IncidentId = incidentId;
                si.Remarks = remarks;
                si.Date = date;
                _context.Update(si);
                await _context.SaveChangesAsync();
                TempData["Success"] = "Student incident updated successfully.";
            }
            else
            {
                TempData["Error"] = "Record not found.";
            }
            return RedirectToAction(nameof(StudentIncidentReport));
        }

        [HttpPost]
        public async Task<IActionResult> DeleteStudentIncident(int id)
        {
            var si = await _context.StudentIncidents.FindAsync(id);
            if (si != null)
            {
                _context.StudentIncidents.Remove(si);
                await _context.SaveChangesAsync();
                TempData["Success"] = "Student incident deleted successfully.";
            }
            else
            {
                TempData["Error"] = "Record not found.";
            }
            return RedirectToAction(nameof(StudentIncidentReport));
        }
    }

    public class BehaviourReportViewModel
    {
        public int StudentId { get; set; }
        public string StudentName { get; set; } = string.Empty;
        public string AdmissionNumber { get; set; } = string.Empty;
        public string ClassName { get; set; } = string.Empty;
        public int TotalIncidents { get; set; }
        public int TotalPoints { get; set; }
    }
}

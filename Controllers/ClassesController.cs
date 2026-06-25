using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;
using System.ComponentModel.DataAnnotations;

namespace EasyEdu.Controllers
{
    [Authorize(Roles = "SuperAdmin,Admin")]
    public class ClassesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ClassesController(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            var viewModel = await GetClassListViewModel();
            return View(viewModel);
        }

        private async Task<ClassListViewModel> GetClassListViewModel()
        {
            var classes = await _context.Classes
                .Include(c => c.AcademicYear)
                .OrderBy(c => c.Name)
                .ToListAsync();

            var viewModel = new ClassListViewModel
            {
                Classes = classes,
                ActiveSections = await _context.Sections.Where(s => s.IsActive).ToListAsync()
            };

            foreach (var cls in classes)
            {
                var assignedSections = await _context.ClassSections
                    .Where(cs => cs.ClassId == cls.Id)
                    .Include(cs => cs.Section)
                    .Select(cs => cs.Section)
                    .ToListAsync();

                viewModel.ClassSections[cls.Id] = assignedSections;
            }

            return viewModel;
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(ClassCreateViewModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var academicYear = await _context.AcademicYears.FirstOrDefaultAsync(ay => ay.IsCurrent);
                    if (academicYear == null) academicYear = await _context.AcademicYears.FirstOrDefaultAsync();
                    
                    var company = await _context.Companies.FirstOrDefaultAsync();

                    if (academicYear == null || company == null)
                    {
                        ModelState.AddModelError("", "System error: Academic Year or Company record not found. Please ensure the system is properly initialized.");
                        return View("Index", await GetClassListViewModel());
                    }

                    var newClass = new Class
                    {
                        Name = model.Name,
                        AcademicYearId = academicYear.Id,
                        CompanyId = company.Id,
                        CreatedAt = DateTime.UtcNow,
                        IsActive = true
                    };

                    _context.Classes.Add(newClass);
                    await _context.SaveChangesAsync();

                    if (model.SelectedSectionIds != null && model.SelectedSectionIds.Any())
                    {
                        foreach (var sectionId in model.SelectedSectionIds)
                        {
                            _context.ClassSections.Add(new ClassSection
                            {
                                ClassId = newClass.Id,
                                SectionId = sectionId
                            });
                        }
                        await _context.SaveChangesAsync();
                    }

                    TempData["Success"] = "Class created successfully.";
                    return RedirectToAction(nameof(Index));
                }
                catch (Exception ex)
                {
                    ModelState.AddModelError("", "An error occurred while saving: " + ex.Message);
                }
            }

            var failModel = await GetClassListViewModel();
            return View("Index", failModel);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, string name, List<int> sectionIds)
        {
            try
            {
                var cls = await _context.Classes.FindAsync(id);
                if (cls == null) return NotFound();

                cls.Name = name;
                _context.Update(cls);

                // Update Sections
                var existingSections = _context.ClassSections.Where(cs => cs.ClassId == id);
                _context.ClassSections.RemoveRange(existingSections);

                if (sectionIds != null)
                {
                    foreach (var sId in sectionIds)
                    {
                        _context.ClassSections.Add(new ClassSection { ClassId = id, SectionId = sId });
                    }
                }

                await _context.SaveChangesAsync();
                TempData["Success"] = "Class updated successfully.";
            }
            catch (Exception ex)
            {
                TempData["Error"] = "Error updating class: " + ex.Message;
            }
            return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var cls = await _context.Classes.FindAsync(id);
                if (cls != null)
                {
                    var sections = _context.ClassSections.Where(cs => cs.ClassId == id);
                    _context.ClassSections.RemoveRange(sections);

                    _context.Classes.Remove(cls);
                    await _context.SaveChangesAsync();
                    TempData["Success"] = "Class deleted successfully.";
                }
            }
            catch (Exception ex)
            {
                TempData["Error"] = "Error deleting class: " + ex.Message;
            }
            return RedirectToAction(nameof(Index));
        }
    }

    public class ClassListViewModel
    {
        public List<Class> Classes { get; set; } = new List<Class>();
        public List<Section> ActiveSections { get; set; } = new List<Section>();
        public Dictionary<int, List<Section>> ClassSections { get; set; } = new Dictionary<int, List<Section>>();
        public ClassCreateViewModel NewClass { get; set; } = new ClassCreateViewModel();
    }

    public class ClassCreateViewModel
    {
        [Required(ErrorMessage = "Class Name is required")]
        public string Name { get; set; } = string.Empty;
        public List<int> SelectedSectionIds { get; set; } = new List<int>();
    }
}

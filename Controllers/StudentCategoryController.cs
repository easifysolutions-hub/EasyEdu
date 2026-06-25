using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;

namespace EasyEdu.Controllers
{
    [Authorize(Roles = "SuperAdmin,Admin")]
    public class StudentCategoryController : Controller
    {
        private readonly ApplicationDbContext _context;

        public StudentCategoryController(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            return View(await _context.StudentCategories.OrderBy(c => c.Name).ToListAsync());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(StudentCategory category)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    if (await _context.StudentCategories.AnyAsync(c => c.Name == category.Name))
                    {
                        ModelState.AddModelError("Name", "Category Name already exists.");
                    }
                    else
                    {
                        _context.Add(category);
                        await _context.SaveChangesAsync();
                        TempData["Success"] = "Student Category created successfully.";
                        return RedirectToAction(nameof(Index));
                    }
                }
                catch (Exception ex)
                {
                    ModelState.AddModelError("", "Error: " + ex.Message);
                }
            }
            return View("Index", await _context.StudentCategories.OrderBy(c => c.Name).ToListAsync());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, string name, bool isActive)
        {
            try
            {
                var category = await _context.StudentCategories.FindAsync(id);
                if (category != null)
                {
                    category.Name = name;
                    category.IsActive = isActive;
                    _context.Update(category);
                    await _context.SaveChangesAsync();
                    TempData["Success"] = "Student Category updated successfully.";
                }
            }
            catch (Exception ex)
            {
                TempData["Error"] = "Error updating category: " + ex.Message;
            }
            return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var category = await _context.StudentCategories.FindAsync(id);
                if (category != null)
                {
                    // Check if students are using this category
                    var hasStudents = await _context.Students.AnyAsync(s => s.StudentCategoryId == id);
                    if (hasStudents)
                    {
                        TempData["Error"] = "Cannot delete category while it is assigned to students.";
                    }
                    else
                    {
                        _context.StudentCategories.Remove(category);
                        await _context.SaveChangesAsync();
                        TempData["Success"] = "Student Category deleted successfully.";
                    }
                }
            }
            catch (Exception ex)
            {
                TempData["Error"] = "Error deleting category: " + ex.Message;
            }
            return RedirectToAction(nameof(Index));
        }
    }
}

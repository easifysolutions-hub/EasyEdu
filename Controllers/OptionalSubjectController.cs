using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;

namespace EasyEdu.Controllers
{
    [Authorize(Roles = "SuperAdmin,Admin,Teacher")]
    public class OptionalSubjectController : Controller
    {
        private readonly ApplicationDbContext _context;

        public OptionalSubjectController(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Assign(int? classId)
        {
            ViewBag.Classes = new SelectList(await _context.Classes.OrderBy(c => c.Name).ToListAsync(), "Id", "Name", classId);

            if (!classId.HasValue)
            {
                return View(new List<StudentOptionalSubjectViewModel>());
            }

            var students = await _context.Students
                .Where(s => s.ClassId == classId)
                .OrderBy(s => s.FirstName)
                .ToListAsync();

            var optionalSubjects = await _context.Subjects
                .Where(s => s.ClassId == classId && s.IsOptional)
                .ToListAsync();

            ViewBag.OptionalSubjects = optionalSubjects;
            ViewBag.SelectedClassId = classId;

            var viewModel = new List<StudentOptionalSubjectViewModel>();

            foreach (var student in students)
            {
                var assignedSubject = await _context.StudentOptionalSubjects
                    .FirstOrDefaultAsync(s => s.StudentId == student.Id);

                viewModel.Add(new StudentOptionalSubjectViewModel
                {
                    StudentId = student.Id,
                    StudentName = $"{student.FirstName} {student.LastName}",
                    AdmissionNumber = student.AdmissionNumber,
                    ProfilePicture = student.ProfilePicture,
                    AssignedSubjectId = assignedSubject?.SubjectId
                });
            }

            return View(viewModel);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SaveAssignment(int classId, List<StudentOptionalSubjectViewModel> assignments)
        {
            if (assignments == null || !assignments.Any())
            {
                return RedirectToAction(nameof(Assign), new { classId });
            }

            try
            {
                var cls = await _context.Classes.FindAsync(classId);
                int academicYearId = cls?.AcademicYearId ?? 1;

                foreach (var item in assignments)
                {
                    var existing = await _context.StudentOptionalSubjects
                        .FirstOrDefaultAsync(s => s.StudentId == item.StudentId);

                    if (item.AssignedSubjectId.HasValue && item.AssignedSubjectId > 0)
                    {
                        if (existing != null)
                        {
                            existing.SubjectId = item.AssignedSubjectId.Value;
                            _context.Update(existing);
                        }
                        else
                        {
                            _context.Add(new StudentOptionalSubject
                            {
                                StudentId = item.StudentId,
                                SubjectId = item.AssignedSubjectId.Value,
                                AcademicYearId = academicYearId
                            });
                        }
                    }
                    else if (existing != null)
                    {
                        _context.Remove(existing);
                    }
                }

                await _context.SaveChangesAsync();
                TempData["Success"] = "Optional subjects assigned successfully.";
            }
            catch (Exception ex)
            {
                TempData["Error"] = "Error saving assignments: " + ex.Message;
            }

            return RedirectToAction(nameof(Assign), new { classId });
        }
    }

    public class StudentOptionalSubjectViewModel
    {
        public int StudentId { get; set; }
        public string StudentName { get; set; } = string.Empty;
        public string AdmissionNumber { get; set; } = string.Empty;
        public string? ProfilePicture { get; set; }
        public int? AssignedSubjectId { get; set; }
    }
}

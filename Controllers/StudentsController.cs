using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;
using EasyEdu.Models.ViewModels;
using MiniExcelLibs;

namespace EasyEdu.Controllers
{
    [Authorize(Roles = "SuperAdmin,Admin,Accountant")]
    public class StudentsController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;

        public StudentsController(ApplicationDbContext context, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            _hostEnvironment = hostEnvironment;
        }

        public async Task<IActionResult> Index(string searchString, int? classId, int? sectionId, string rollNo)
        {
            var studentsQuery = _context.Students
                .Include(s => s.Class)
                .Include(s => s.Section)
                .Include(s => s.StudentCategory)
                .AsQueryable();

            if (!string.IsNullOrEmpty(searchString))
            {
                studentsQuery = studentsQuery.Where(s => s.FirstName.Contains(searchString) 
                                            || s.LastName.Contains(searchString) 
                                            || s.AdmissionNumber.Contains(searchString)
                                            || s.Email.Contains(searchString));
            }

            if (classId.HasValue)
            {
                studentsQuery = studentsQuery.Where(s => s.ClassId == classId.Value);
            }

            if (sectionId.HasValue)
            {
                studentsQuery = studentsQuery.Where(s => s.SectionId == sectionId.Value);
            }

            if (!string.IsNullOrEmpty(rollNo))
            {
                studentsQuery = studentsQuery.Where(s => s.RollNumber.ToString() == rollNo);
            }

            ViewBag.Classes = new SelectList(await _context.Classes.OrderBy(c => c.Name).ToListAsync(), "Id", "Name", classId);
            
            if (classId.HasValue)
            {
                var sections = await _context.ClassSections
                    .Where(cs => cs.ClassId == classId.Value)
                    .Include(cs => cs.Section)
                    .Select(cs => cs.Section)
                    .ToListAsync();
                ViewBag.Sections = new SelectList(sections, "Id", "Name", sectionId);
            }
            else
            {
                ViewBag.Sections = new SelectList(Enumerable.Empty<Section>(), "Id", "Name");
            }
            
            return View(await studentsQuery.ToListAsync());
        }

        public async Task<IActionResult> Create()
        {
            await PrepareDropdowns();
            var model = new StudentAdmissionViewModel
            {
                AdmissionNumber = await GenerateAdmissionNumber(),
                AdmissionDate = DateTime.Today
            };

            // Fetch Custom Fields
            ViewBag.CustomFields = await _context.CustomFields
                .Where(f => f.FormType == "Student" && f.IsActive)
                .ToListAsync();

            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(StudentAdmissionViewModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var company = await _context.Companies.FirstOrDefaultAsync();
                    if (company == null)
                    {
                        ModelState.AddModelError("", "Internal Error: Company not found. Please setup institution details.");
                        await PrepareDropdowns(model.ClassId);
                        return View(model);
                    }

                    var student = new Student
                    {
                        AdmissionNumber = model.AdmissionNumber,
                        RollNumber = model.RollNumber,
                        AdmissionDate = model.AdmissionDate,
                        ClassId = model.ClassId,
                        SectionId = model.SectionId,
                        StudentCategoryId = model.StudentCategoryId,
                        FirstName = model.FirstName,
                        LastName = model.LastName,
                        Gender = model.Gender,
                        DateOfBirth = model.DateOfBirth,
                        BloodGroup = model.BloodGroup,
                        Religion = model.Religion,
                        Caste = model.Caste,
                        Height = model.Height,
                        Weight = model.Weight,
                        Phone = model.Mobile,
                        Email = model.EmailAddress,
                        Address = model.CurrentAddress,
                        FatherName = model.FatherName,
                        FatherOccupation = model.FatherOccupation,
                        FatherPhone = model.FatherPhone,
                        MotherName = model.MotherName,
                        MotherOccupation = model.MotherOccupation,
                        MotherPhone = model.MotherPhone,
                        GuardianName = model.GuardianName,
                        GuardianRelation = model.GuardianRelation,
                        GuardianEmail = model.GuardianEmail,
                        GuardianPhone = model.GuardianPhone,
                        GuardianOccupation = model.GuardianOccupation,
                        GuardianAddress = model.GuardianAddress,
                        NationalIdNumber = model.NationalIdNumber,
                        BirthCertificateNumber = model.BirthCertificateNumber,
                        BankName = model.BankName,
                        BankAccountNumber = model.BankAccountNumber,
                        BankIfscCode = model.BankIfscCode,
                        PreviousSchoolDetails = model.PreviousSchoolDetails,
                        AdditionalNotes = model.AdditionalNotes,
                        RouteId = model.RouteId,
                        CompanyId = company.Id,
                        CreatedAt = DateTime.UtcNow,
                        IsActive = true
                    };

                    // Handle Photo Uploads
                    student.ProfilePicture = await SaveFile(model.StudentPhoto, "students");
                    student.FatherPhoto = await SaveFile(model.FatherPhotoFile, "parents");
                    student.MotherPhoto = await SaveFile(model.MotherPhotoFile, "parents");
                    student.GuardianPhoto = await SaveFile(model.GuardianPhotoFile, "guardians");

                    _context.Students.Add(student);
                    await _context.SaveChangesAsync();

                    // Handle Custom Fields
                    foreach (var key in Request.Form.Keys.Where(k => k.StartsWith("CustomField_")))
                    {
                        if (int.TryParse(key.Replace("CustomField_", ""), out int fieldId))
                        {
                            var value = Request.Form[key].ToString();
                            if (!string.IsNullOrEmpty(value))
                            {
                                _context.CustomFieldValues.Add(new CustomFieldValue
                                {
                                    CustomFieldId = fieldId,
                                    RecordId = student.Id,
                                    Value = value,
                                    UpdatedAt = DateTime.UtcNow
                                });
                            }
                        }
                    }
                    await _context.SaveChangesAsync();

                    // Handle Documents
                    if (model.Documents != null && model.Documents.Any())
                    {
                        foreach (var doc in model.Documents)
                        {
                            if (doc.File != null)
                            {
                                var docPath = await SaveFile(doc.File, "documents");
                                _context.StudentDocuments.Add(new StudentDocument
                                {
                                    StudentId = student.Id,
                                    Title = doc.Title ?? "Untitled Document",
                                    FilePath = docPath!
                                });
                            }
                        }
                        await _context.SaveChangesAsync();
                    }

                    TempData["Success"] = "Student admitted successfully! Admission Number: " + student.AdmissionNumber;
                    return RedirectToAction(nameof(Index));
                }
                catch (Exception ex)
                {
                    ModelState.AddModelError("", "Error during admission: " + ex.Message);
                }
            }

            await PrepareDropdowns(model.ClassId);
            return View(model);
        }

        private async Task PrepareDropdowns(int? selectedClassId = null)
        {
            ViewBag.Classes = new SelectList(await _context.Classes.OrderBy(c => c.Name).ToListAsync(), "Id", "Name", selectedClassId);
            
            if (selectedClassId.HasValue)
            {
                var sections = await _context.ClassSections
                    .Where(cs => cs.ClassId == selectedClassId.Value)
                    .Include(cs => cs.Section)
                    .Select(cs => cs.Section)
                    .ToListAsync();
                ViewBag.Sections = new SelectList(sections, "Id", "Name");
            }
            else
            {
                ViewBag.Sections = new SelectList(Enumerable.Empty<Section>(), "Id", "Name");
            }

            ViewBag.Categories = new SelectList(await _context.StudentCategories.Where(c => c.IsActive).ToListAsync(), "Id", "Name");
            ViewBag.Routes = new SelectList(await _context.Routes.ToListAsync(), "Id", "Name");
        }

        private async Task<string> GenerateAdmissionNumber()
        {
            var lastStudent = await _context.Students.OrderByDescending(s => s.Id).FirstOrDefaultAsync();
            int nextId = (lastStudent?.Id ?? 0) + 1;
            return "ADM-" + nextId.ToString("D4");
        }

        private async Task<string?> SaveFile(IFormFile? file, string folder)
        {
            if (file == null) return null;

            string wwwRootPath = _hostEnvironment.WebRootPath;
            string fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            string path = Path.Combine(wwwRootPath, "uploads", folder);
            
            if (!Directory.Exists(path)) Directory.CreateDirectory(path);
            
            using (var fileStream = new FileStream(Path.Combine(path, fileName), FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }
            return $"/uploads/{folder}/{fileName}";
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetSections(int classId)
        {
            var sections = await _context.ClassSections
                .Where(cs => cs.ClassId == classId)
                .Include(cs => cs.Section)
                .Select(cs => new { id = cs.Section.Id, name = cs.Section.Name })
                .ToListAsync();
            return Json(sections);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetStudentsByClass(int classId)
        {
            var students = await _context.Students
                .Where(s => s.ClassId == classId && s.IsActive)
                .Select(s => new {
                    s.Id,
                    s.FirstName,
                    s.LastName,
                    s.AdmissionNumber
                })
                .OrderBy(s => s.FirstName)
                .ToListAsync();
            return Json(students);
        }

        // Student Category
        public async Task<IActionResult> StudentCategory()
        {
            var categories = await _context.StudentCategories.ToListAsync();
            return View(categories);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCategory(StudentCategory category)
        {
            if (ModelState.IsValid)
            {
                _context.StudentCategories.Add(category);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(StudentCategory));
        }

        // Student Group
        public async Task<IActionResult> StudentGroup()
        {
            var groups = await _context.StudentGroups.ToListAsync();
            return View(groups);
        }

        [HttpPost]
        public async Task<IActionResult> CreateGroup(StudentGroup group)
        {
            var company = await _context.Companies.FirstOrDefaultAsync();
            if (company != null)
            {
                group.CompanyId = company.Id;
                _context.StudentGroups.Add(group);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(StudentGroup));
        }

        // Student Promote
        public async Task<IActionResult> StudentPromote(int? currentClassId, int? currentYearId)
        {
            ViewBag.Classes = new SelectList(await _context.Classes.ToListAsync(), "Id", "Name", currentClassId);
            ViewBag.AcademicYears = new SelectList(await _context.AcademicYears.ToListAsync(), "Id", "Name", currentYearId);

            List<Student> students = new List<Student>();

            if (currentClassId.HasValue && currentClassId > 0)
            {
                var query = _context.Students
                    .Include(s => s.Class)
                    .Include(s => s.Section)
                    .Where(s => s.ClassId == currentClassId.Value && s.IsActive);

                if (currentYearId.HasValue && currentYearId > 0)
                {
                    query = query.Where(s => s.Class.AcademicYearId == currentYearId.Value);
                }

                students = await query.ToListAsync();
            }

            return View(students);
        }

        [HttpPost]
        public async Task<IActionResult> StudentPromote(int currentClassId, int promoteClassId, int currentYearId, int promoteYearId, List<int> studentIds)
        {
            if (studentIds != null && studentIds.Any())
            {
                foreach (var id in studentIds)
                {
                    var student = await _context.Students.FindAsync(id);
                    if (student != null)
                    {
                        var result = Request.Form[$"result_{id}"].ToString() ?? "Pass";
                        var status = result == "Pass" ? "Promoted" : "Retained";
                        var targetClassId = result == "Pass" ? promoteClassId : currentClassId;

                        // Log promotion
                        _context.StudentPromotions.Add(new StudentPromotion
                        {
                            StudentId = id,
                            FromClassId = currentClassId,
                            ToClassId = targetClassId,
                            FromAcademicYearId = currentYearId,
                            ToAcademicYearId = promoteYearId,
                            Result = result,
                            Status = status,
                            PromotionDate = DateTime.UtcNow
                        });

                        // Update student
                        student.ClassId = targetClassId;
                    }
                }
                await _context.SaveChangesAsync();
                TempData["Success"] = "Students promoted successfully.";
            }
            return RedirectToAction(nameof(StudentPromote));
        }

        // Disabled Students
        public async Task<IActionResult> DisabledStudents()
        {
            var students = await _context.Students
                .Include(s => s.Class)
                .Include(s => s.Section)
                .Where(s => !s.IsActive)
                .ToListAsync();
            return View(students);
        }

        // Student Export
        [HttpGet]
        public async Task<IActionResult> StudentExport(int? classId, int? sectionId)
        {
            var query = _context.Students
                .Include(s => s.Class)
                .Include(s => s.Section)
                .AsQueryable();

            if (classId.HasValue && classId.Value > 0)
            {
                query = query.Where(s => s.ClassId == classId.Value);
            }

            if (sectionId.HasValue && sectionId.Value > 0)
            {
                query = query.Where(s => s.SectionId == sectionId.Value);
            }

            ViewBag.Classes = new SelectList(await _context.Classes.OrderBy(c => c.Name).ToListAsync(), "Id", "Name", classId);

            if (classId.HasValue)
            {
                var sections = await _context.ClassSections
                    .Where(cs => cs.ClassId == classId.Value)
                    .Include(cs => cs.Section)
                    .Select(cs => cs.Section)
                    .ToListAsync();
                ViewBag.Sections = new SelectList(sections, "Id", "Name", sectionId);
            }
            else
            {
                ViewBag.Sections = new SelectList(Enumerable.Empty<Section>(), "Id", "Name");
            }

            var students = await query.ToListAsync();
            return View(students);
        }

        [HttpGet]
        public async Task<IActionResult> ExportData(int? classId, int? sectionId, string format)
        {
            var query = _context.Students
                .Include(s => s.Class)
                .Include(s => s.Section)
                .AsQueryable();

            if (classId.HasValue && classId.Value > 0)
            {
                query = query.Where(s => s.ClassId == classId.Value);
            }

            if (sectionId.HasValue && sectionId.Value > 0)
            {
                query = query.Where(s => s.SectionId == sectionId.Value);
            }

            var students = await query.Select(s => new
            {
                AdmissionNumber = s.AdmissionNumber,
                RollNumber = s.RollNumber,
                FirstName = s.FirstName,
                LastName = s.LastName,
                Class = s.Class != null ? s.Class.Name : "N/A",
                Section = s.Section != null ? s.Section.Name : "N/A",
                Gender = s.Gender,
                DateOfBirth = s.DateOfBirth.ToString("yyyy-MM-dd"),
                Phone = s.Phone,
                Email = s.Email,
                FatherName = s.FatherName,
                MotherName = s.MotherName,
                Address = s.Address
            })
            .ToListAsync();

            var stream = new MemoryStream();
            if (format == "xlsx")
            {
                stream.SaveAs(students);
                var content = stream.ToArray();
                return File(content, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", $"Students_Export_{DateTime.Now:yyyyMMdd}.xlsx");
            }
            else
            {
                stream.SaveAs(students, excelType: MiniExcelLibs.ExcelType.CSV);
                var content = stream.ToArray();
                return File(content, "text/csv", $"Students_Export_{DateTime.Now:yyyyMMdd}.csv");
            }
        }

        // Student Settings
        public async Task<IActionResult> StudentSettings()
        {
            var company = await _context.Companies.FirstOrDefaultAsync();
            var settings = await _context.StudentSettings.FirstOrDefaultAsync(s => s.CompanyId == company!.Id);
            
            if (settings == null && company != null)
            {
                settings = new StudentSettings { CompanyId = company.Id };
                _context.StudentSettings.Add(settings);
                await _context.SaveChangesAsync();
            }
            
            return View(settings);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateSettings(StudentSettings settings)
        {
            if (ModelState.IsValid)
            {
                _context.Update(settings);
                await _context.SaveChangesAsync();
                TempData["Success"] = "Settings updated successfully.";
            }
            return RedirectToAction(nameof(StudentSettings));
        }

        // Unassigned Students
        public async Task<IActionResult> UnassignedStudent()
        {
            var students = await _context.Students
                .Where(s => s.ClassId == 0 || s.SectionId == 0)
                .ToListAsync();
            return View(students);
        }

        // Multi Class Student
        public IActionResult MultiClassStudent()
        {
            // Implementation for multi-class enrollment logic
            return View();
        }

        // Student Attendance (Link to Attendance Controller)
        public IActionResult StudentAttendance()
        {
            return RedirectToAction("Index", "Attendance");
        }

        // Subject Wise Attendance (Link to Attendance Controller)
        public IActionResult SubjectWiseAttendance()
        {
            return RedirectToAction("SubjectWiseAttendance", "Attendance");
        }

        // SMS Sending Time
        public IActionResult SmsSendingTime()
        {
            return View();
        }

        [HttpPost]
        public IActionResult SmsSendingTime(string morningTime, string eveningTime)
        {
            TempData["Success"] = "SMS Sending Time updated successfully.";
            return View();
        }
    }
}

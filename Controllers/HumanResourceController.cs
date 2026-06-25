using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;
using System.Security.Claims;

namespace EasyEdu.Controllers
{
    [Authorize(Roles = "SuperAdmin,Admin")]
    public class HumanResourceController : Controller
    {
        private readonly ApplicationDbContext _context;

        public HumanResourceController(ApplicationDbContext context)
        {
            _context = context;
        }

        // --- Designation ---
        public async Task<IActionResult> Designation()
        {
            var company = await _context.Companies.FirstOrDefaultAsync();
            var companyId = company?.Id ?? 0;
            var designations = await _context.Designations
                .Where(d => d.CompanyId == companyId)
                .ToListAsync();
            return View(designations);
        }

        [HttpPost]
        public async Task<IActionResult> CreateDesignation(Designation designation)
        {
            var company = await _context.Companies.FirstOrDefaultAsync();
            if (company != null)
            {
                designation.CompanyId = company.Id;
                _context.Designations.Add(designation);
                await _context.SaveChangesAsync();
                TempData["Success"] = "Designation created successfully.";
            }
            return RedirectToAction(nameof(Designation));
        }

        // --- Department ---
        public async Task<IActionResult> Department()
        {
            var company = await _context.Companies.FirstOrDefaultAsync();
            var companyId = company?.Id ?? 0;
            var departments = await _context.Departments
                .Where(d => d.CompanyId == companyId)
                .ToListAsync();
            return View(departments);
        }

        [HttpPost]
        public async Task<IActionResult> CreateDepartment(Department department)
        {
            var company = await _context.Companies.FirstOrDefaultAsync();
            if (company != null)
            {
                department.CompanyId = company.Id;
                _context.Departments.Add(department);
                await _context.SaveChangesAsync();
                TempData["Success"] = "Department created successfully.";
            }
            return RedirectToAction(nameof(Department));
        }

        // --- Staff Directory ---
        public async Task<IActionResult> StaffDirectory(int? departmentId, int? designationId)
        {
            var staff = _context.Teachers
                .Include(t => t.Department)
                .Include(t => t.Designation)
                .AsQueryable();

            if (departmentId.HasValue) staff = staff.Where(t => t.DepartmentId == departmentId.Value);
            if (designationId.HasValue) staff = staff.Where(t => t.DesignationId == designationId.Value);

            ViewBag.Departments = new SelectList(await _context.Departments.ToListAsync(), "Id", "Name", departmentId);
            ViewBag.Designations = new SelectList(await _context.Designations.ToListAsync(), "Id", "Title", designationId);
            
            return View(await staff.ToListAsync());
        }

        // --- Staff Attendance ---
        public async Task<IActionResult> StaffAttendance(DateTime? date, int? departmentId)
        {
            var attendanceDate = date ?? DateTime.Today;
            var staff = await _context.Teachers
                .Include(t => t.Department)
                .Where(t => !departmentId.HasValue || t.DepartmentId == departmentId.Value)
                .ToListAsync();

            var attendances = await _context.TeacherAttendances
                .Where(a => a.Date.Date == attendanceDate.Date)
                .ToListAsync();

            ViewBag.Date = attendanceDate;
            ViewBag.Departments = new SelectList(await _context.Departments.ToListAsync(), "Id", "Name", departmentId);
            ViewBag.Attendances = attendances;

            return View(staff);
        }

        [HttpPost]
        public async Task<IActionResult> SaveAttendance(DateTime date, List<AttendanceEntry> entries)
        {
            foreach (var entry in entries)
            {
                var existing = await _context.TeacherAttendances
                    .FirstOrDefaultAsync(a => a.TeacherId == entry.StaffId && a.Date.Date == date.Date);

                if (existing != null)
                {
                    existing.Status = entry.Status;
                    existing.Remarks = entry.Note;
                }
                else
                {
                    _context.TeacherAttendances.Add(new TeacherAttendance
                    {
                        TeacherId = entry.StaffId,
                        Date = date,
                        Status = entry.Status,
                        Remarks = entry.Note
                    });
                }
            }
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(StaffAttendance), new { date = date });
        }

        // --- Payroll ---
        public async Task<IActionResult> Payroll(int? month, int? year)
        {
            var companyId = await GetCompanyId();
            var payrollsTotal = _context.Payrolls
                .Include(p => p.Teacher)
                .Where(p => p.Teacher.CompanyId == companyId);

            if (month.HasValue) payrollsTotal = payrollsTotal.Where(p => p.Month == month.Value);
            if (year.HasValue) payrollsTotal = payrollsTotal.Where(p => p.Year == year.Value);

            ViewBag.Month = month;
            ViewBag.Year = year;

            return View(await payrollsTotal.OrderByDescending(p => p.Year).ThenByDescending(p => p.Month).ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> GeneratePayroll(int staffId, int month, int year)
        {
            var companyId = await GetCompanyId();
            var staff = await _context.Teachers.FirstOrDefaultAsync(t => t.Id == staffId && t.CompanyId == companyId);
            if (staff == null) return NotFound();

            var existing = await _context.Payrolls
                .FirstOrDefaultAsync(p => p.TeacherId == staffId && p.Month == month && p.Year == year);
            
            if (existing != null)
            {
                TempData["Error"] = "Payroll already generated for this period.";
                return RedirectToAction(nameof(Payroll));
            }

            var payroll = new Payroll
            {
                TeacherId = staffId,
                Month = month,
                Year = year,
                BasicSalary = staff.Salary ?? 0,
                GrossSalary = staff.Salary ?? 0,
                NetSalary = staff.Salary ?? 0,
                Status = "Generated",
                GeneratedBy = User.Identity?.Name,
                CreatedAt = DateTime.UtcNow
            };

            _context.Payrolls.Add(payroll);
            await _context.SaveChangesAsync();

            // Post to Accounting: Debit Salary Expense, Credit Salary Payable
            await PostPayrollToLedger(payroll, companyId);

            TempData["Success"] = $"Payroll generated for {staff.FullName}.";
            return RedirectToAction(nameof(Payroll));
        }

        private async Task PostPayrollToLedger(Payroll payroll, int companyId)
        {
            // 1. Get or Create SALARY EXPENSE LEDGER
            var salaryLedger = await GetOrCreateLedger("Staff Salaries", "Direct Expense", companyId);

            // 2. Get or Create SALARY PAYABLE LEDGER (Liability)
            var payableLedger = await GetOrCreateLedger("Salary Payable", "Current Liabilities", companyId);

            var voucher = new Voucher
            {
                VoucherNumber = "PAY-" + payroll.Id + "-" + DateTime.Now.Ticks.ToString().Substring(14),
                Date = DateTime.Today,
                Type = VoucherType.Journal,
                Narration = $"Payroll Generation: {payroll.Teacher.FullName} ({payroll.Month}/{payroll.Year})",
                CompanyId = companyId,
                CreatedAt = DateTime.UtcNow,
                CreatedBy = User.Identity?.Name ?? "HR"
            };

            voucher.Details.Add(new VoucherDetail { LedgerId = salaryLedger.Id, DebitAmount = payroll.NetSalary, Note = "Salary Accrual" });
            salaryLedger.OpeningBalance += payroll.NetSalary;

            voucher.Details.Add(new VoucherDetail { LedgerId = payableLedger.Id, CreditAmount = payroll.NetSalary, Note = "Payable for " + payroll.Month + "/" + payroll.Year });
            payableLedger.OpeningBalance -= payroll.NetSalary;

            _context.Vouchers.Add(voucher);
            await _context.SaveChangesAsync();
        }

        private async Task<Ledger> GetOrCreateLedger(string name, string groupName, int companyId)
        {
            var ledger = await _context.Ledgers.FirstOrDefaultAsync(l => l.Name == name && l.CompanyId == companyId);
            if (ledger == null)
            {
                var group = await _context.AccountGroups.FirstOrDefaultAsync(g => g.Name == groupName && g.CompanyId == companyId);
                if (group == null)
                {
                    var nature = AccountNature.Expenses;
                    if (groupName.Contains("Liabilities")) nature = AccountNature.Liabilities;
                    if (groupName.Contains("Asset") || groupName.Contains("Cash")) nature = AccountNature.Assets;
                    
                    group = new AccountGroup { Name = groupName, CompanyId = companyId, Nature = nature };
                    _context.AccountGroups.Add(group);
                    await _context.SaveChangesAsync();
                }

                ledger = new Ledger { Name = name, AccountGroupId = group.Id, CompanyId = companyId, IsSystem = true };
                _context.Ledgers.Add(ledger);
                await _context.SaveChangesAsync();
            }
            return ledger;
        }

        private async Task<int> GetCompanyId()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _context.Users.FindAsync(userId);
            return user?.CompanyId ?? 1;
        }

        public async Task<IActionResult> AddStaff()
        {
            ViewBag.Departments = new SelectList(await _context.Departments.ToListAsync(), "Id", "Name");
            ViewBag.Designations = new SelectList(await _context.Designations.ToListAsync(), "Id", "Title");
            
            // Fetch Custom Fields
            ViewBag.CustomFields = await _context.CustomFields
                .Where(f => f.FormType == "Staff" && f.IsActive)
                .ToListAsync();

            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateStaff(Teacher staff)
        {
            var company = await _context.Companies.FirstOrDefaultAsync();
            if (company != null)
            {
                staff.CompanyId = company.Id;
                staff.CreatedAt = DateTime.UtcNow;
                _context.Teachers.Add(staff);
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
                                RecordId = staff.Id,
                                Value = value,
                                UpdatedAt = DateTime.UtcNow
                            });
                        }
                    }
                }
                await _context.SaveChangesAsync();
                TempData["Success"] = "Staff member successfully onboarded.";
                return RedirectToAction(nameof(StaffDirectory));
            }
            return View(staff);
        }

        public IActionResult StaffSettings()
        {
            return View();
        }

        // --- Bulk Payroll Print ---
        public async Task<IActionResult> BulkPayrollPrint(int? month, int? year)
        {
            var payrolls = _context.Payrolls.Include(p => p.Teacher).AsQueryable();
            if (month.HasValue) payrolls = payrolls.Where(p => p.Month == month.Value);
            if (year.HasValue) payrolls = payrolls.Where(p => p.Year == year.Value);
            return View(await payrolls.ToListAsync());
        }

        // --- Staff Details / Profile ---
        public async Task<IActionResult> StaffDetails(int id)
        {
            var staff = await _context.Teachers
                .Include(t => t.Department)
                .Include(t => t.Designation)
                .Include(t => t.Attendances)
                .Include(t => t.Payrolls)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (staff == null) return NotFound();
            return View(staff);
        }

        // --- Individual Payslip ---
        public async Task<IActionResult> Payslip(int id)
        {
            var companyId = await GetCompanyId();
            var payroll = await _context.Payrolls
                .Include(p => p.Teacher)
                .ThenInclude(t => t.Designation)
                .Include(p => p.Teacher)
                .ThenInclude(t => t.Department)
                .FirstOrDefaultAsync(p => p.Id == id && p.Teacher.CompanyId == companyId);

            if (payroll == null) return NotFound();
            return View(payroll);
        }
    }

    public class AttendanceEntry
    {
        public int StaffId { get; set; }
        public string Status { get; set; } = string.Empty;
        public string? Note { get; set; }
    }
}

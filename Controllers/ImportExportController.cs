using EasyEdu.Data;
using EasyEdu.Models;
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MiniExcelLibs;
using System.Security.Claims;
using System.Text;

namespace EasyEdu.Controllers
{
    [Authorize]
    public class ImportExportController : Controller
    {
        private readonly ApplicationDbContext _db;

        public ImportExportController(ApplicationDbContext db)
        {
            _db = db;
        }

        private int GetCompanyId() =>
            int.Parse(User.FindFirstValue("CompanyId") ?? "0");

        // ─────────────────────────────────────────────────────────────────────
        // DASHBOARD
        // ─────────────────────────────────────────────────────────────────────
        public IActionResult Index()
        {
            return View();
        }

        // ─────────────────────────────────────────────────────────────────────
        // DOWNLOAD BLANK TEMPLATES
        // ─────────────────────────────────────────────────────────────────────
        [HttpGet]
        public IActionResult DownloadTemplate(string type)
        {
            var stream = new MemoryStream();

            switch (type.ToLower())
            {
                case "students":
                    var studentTemplate = new[]
                    {
                        new
                        {
                            AdmissionNumber = "ADM001",
                            FirstName       = "John",
                            LastName        = "Doe",
                            DateOfBirth     = "2010-06-15",
                            Gender          = "Male",
                            BloodGroup      = "O+",
                            Phone           = "9876543210",
                            Email           = "john@example.com",
                            Address         = "123 Main St",
                            FatherName      = "James Doe",
                            FatherPhone     = "9876543211",
                            MotherName      = "Jane Doe",
                            MotherPhone     = "9876543212",
                            AdmissionDate   = "2023-04-01",
                            RollNumber      = 1,
                            ClassName       = "Class 1",
                            SectionName     = "A"
                        }
                    };
                    stream.SaveAs(studentTemplate);
                    return File(stream.ToArray(),
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                        "Students_Template.xlsx");

                case "staff":
                    var staffTemplate = new[]
                    {
                        new
                        {
                            EmployeeNumber  = "EMP001",
                            FirstName       = "Alice",
                            LastName        = "Smith",
                            DateOfBirth     = "1990-03-20",
                            Gender          = "Female",
                            BloodGroup      = "A+",
                            Phone           = "9876543220",
                            Email           = "alice@school.com",
                            Address         = "456 Park Ave",
                            Qualification   = "B.Ed",
                            Specialization  = "Mathematics",
                            JoiningDate     = "2020-06-01",
                            Salary          = 30000,
                            Designation     = "Teacher",
                            Department      = "Science"
                        }
                    };
                    stream.SaveAs(staffTemplate);
                    return File(stream.ToArray(),
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                        "Staff_Template.xlsx");

                case "fees":
                    var feeTemplate = new[]
                    {
                        new
                        {
                            AdmissionNumber = "ADM001",
                            StudentName     = "John Doe",
                            AmountDue       = 5000,
                            AmountPaid      = 5000,
                            AmountPending   = 0,
                            DueDate         = "2024-04-01",
                            PaidDate        = "2024-04-01",
                            PaymentMethod   = "Cash",
                            TransactionId   = "TXN001",
                            ReceiptNumber   = "RCP001",
                            Status          = "Paid",
                            Remarks         = ""
                        }
                    };
                    stream.SaveAs(feeTemplate);
                    return File(stream.ToArray(),
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                        "FeePayments_Template.xlsx");

                case "vouchers":
                    var voucherTemplate = new[]
                    {
                        new
                        {
                            VoucherNumber   = "PAY-001",
                            Date            = "2024-04-01",
                            VoucherType     = "Payment",
                            DebitLedger     = "Salary Expense",
                            CreditLedger    = "Cash",
                            Amount          = 30000,
                            Narration       = "Salary for April 2024"
                        }
                    };
                    stream.SaveAs(voucherTemplate);
                    return File(stream.ToArray(),
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                        "Vouchers_Template.xlsx");

                case "ledgers":
                    var ledgerTemplate = new[]
                    {
                        new
                        {
                            LedgerName      = "Salary Expense",
                            AccountGroup    = "Direct Expenses",
                            Nature          = "Expenses",
                            OpeningBalance  = 0,
                            IsDebitOpening  = "Yes"
                        }
                    };
                    stream.SaveAs(ledgerTemplate);
                    return File(stream.ToArray(),
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                        "Ledgers_Template.xlsx");

                default:
                    return BadRequest("Unknown template type.");
            }
        }

        // ─────────────────────────────────────────────────────────────────────
        // IMPORT STUDENTS
        // ─────────────────────────────────────────────────────────────────────
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ImportStudents(IFormFile file)
        {
            var companyId = GetCompanyId();
            var result = new ImportResult { EntityName = "Students" };

            if (file == null || file.Length == 0)
            {
                result.Errors.Add("No file selected.");
                return Json(result);
            }

            // Load Classes & Sections for name-lookup
            var classes   = await _db.Classes.Where(c => c.CompanyId == companyId).ToListAsync();
            var sections  = await _db.Sections.ToListAsync();

            using var stream = new MemoryStream();
            await file.CopyToAsync(stream);
            stream.Position = 0;

            var rows = stream.Query(useHeaderRow: true).ToList();
            int rowNum = 1;

            foreach (IDictionary<string, object?> row in rows)
            {
                rowNum++;
                try
                {
                    var admNo = row.GetStr("AdmissionNumber");
                    if (string.IsNullOrWhiteSpace(admNo))
                    {
                        result.Errors.Add($"Row {rowNum}: AdmissionNumber is required.");
                        continue;
                    }

                    if (await _db.Students.AnyAsync(s => s.AdmissionNumber == admNo && s.CompanyId == companyId))
                    {
                        result.Errors.Add($"Row {rowNum}: Admission {admNo} already exists.");
                        continue;
                    }

                    var className   = row.GetStr("ClassName");
                    var sectionName = row.GetStr("SectionName");
                    var cls = classes.FirstOrDefault(c =>
                        c.Name.Equals(className, StringComparison.OrdinalIgnoreCase));
                    var sec = sections.FirstOrDefault(s =>
                        s.Name.Equals(sectionName, StringComparison.OrdinalIgnoreCase));

                    if (cls == null)
                    {
                        result.Errors.Add($"Row {rowNum}: Class '{className}' not found.");
                        continue;
                    }
                    if (sec == null)
                    {
                        result.Errors.Add($"Row {rowNum}: Section '{sectionName}' not found.");
                        continue;
                    }

                    var student = new Student
                    {
                        CompanyId       = companyId,
                        AdmissionNumber = admNo,
                        FirstName       = row.GetStr("FirstName"),
                        LastName        = row.GetStr("LastName"),
                        Gender          = row.GetStr("Gender").IfEmpty("Male"),
                        DateOfBirth     = row.GetDate("DateOfBirth"),
                        BloodGroup      = row.GetStr("BloodGroup"),
                        Phone           = row.GetStr("Phone"),
                        Email           = row.GetStr("Email"),
                        Address         = row.GetStr("Address"),
                        FatherName      = row.GetStr("FatherName"),
                        FatherPhone     = row.GetStr("FatherPhone"),
                        MotherName      = row.GetStr("MotherName"),
                        MotherPhone     = row.GetStr("MotherPhone"),
                        AdmissionDate   = row.GetDate("AdmissionDate", DateTime.Today),
                        RollNumber      = row.GetInt("RollNumber"),
                        ClassId         = cls.Id,
                        SectionId       = sec.Id,
                        IsActive        = true,
                        CreatedAt       = DateTime.UtcNow
                    };

                    _db.Students.Add(student);
                    result.SuccessCount++;
                }
                catch (Exception ex)
                {
                    result.Errors.Add($"Row {rowNum}: {ex.Message}");
                }
            }

            if (result.SuccessCount > 0)
                await _db.SaveChangesAsync();

            result.TotalRows = rowNum - 1;
            return Json(result);
        }

        // ─────────────────────────────────────────────────────────────────────
        // IMPORT STAFF
        // ─────────────────────────────────────────────────────────────────────
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ImportStaff(IFormFile file)
        {
            var companyId = GetCompanyId();
            var result = new ImportResult { EntityName = "Staff" };

            if (file == null || file.Length == 0)
            {
                result.Errors.Add("No file selected.");
                return Json(result);
            }

            var designations = await _db.Designations.Where(d => d.CompanyId == companyId).ToListAsync();
            var departments  = await _db.Departments.Where(d => d.CompanyId == companyId).ToListAsync();

            using var stream = new MemoryStream();
            await file.CopyToAsync(stream);
            stream.Position = 0;

            var rows = stream.Query(useHeaderRow: true).ToList();
            int rowNum = 1;

            foreach (IDictionary<string, object?> row in rows)
            {
                rowNum++;
                try
                {
                    var empNo = row.GetStr("EmployeeNumber");
                    if (string.IsNullOrWhiteSpace(empNo))
                    {
                        result.Errors.Add($"Row {rowNum}: EmployeeNumber is required.");
                        continue;
                    }

                    if (await _db.Teachers.AnyAsync(t => t.EmployeeNumber == empNo && t.CompanyId == companyId))
                    {
                        result.Errors.Add($"Row {rowNum}: Employee {empNo} already exists.");
                        continue;
                    }

                    var designationName = row.GetStr("Designation");
                    var departmentName  = row.GetStr("Department");

                    var teacher = new Teacher
                    {
                        CompanyId      = companyId,
                        EmployeeNumber = empNo,
                        FirstName      = row.GetStr("FirstName"),
                        LastName       = row.GetStr("LastName"),
                        Gender         = row.GetStr("Gender").IfEmpty("Male"),
                        DateOfBirth    = row.GetDate("DateOfBirth"),
                        BloodGroup     = row.GetStr("BloodGroup"),
                        Phone          = row.GetStr("Phone"),
                        Email          = row.GetStr("Email"),
                        Address        = row.GetStr("Address"),
                        Qualification  = row.GetStr("Qualification"),
                        Specialization = row.GetStr("Specialization"),
                        JoiningDate    = row.GetDate("JoiningDate", DateTime.Today),
                        Salary         = row.GetDecimal("Salary"),
                        DesignationId  = designations.FirstOrDefault(d =>
                            d.Title.Equals(designationName, StringComparison.OrdinalIgnoreCase))?.Id,
                        DepartmentId   = departments.FirstOrDefault(d =>
                            d.Name.Equals(departmentName, StringComparison.OrdinalIgnoreCase))?.Id,
                        IsActive       = true,
                        CreatedAt      = DateTime.UtcNow
                    };

                    _db.Teachers.Add(teacher);
                    result.SuccessCount++;
                }
                catch (Exception ex)
                {
                    result.Errors.Add($"Row {rowNum}: {ex.Message}");
                }
            }

            if (result.SuccessCount > 0)
                await _db.SaveChangesAsync();

            result.TotalRows = rowNum - 1;
            return Json(result);
        }

        // ─────────────────────────────────────────────────────────────────────
        // EXPORT STUDENTS
        // ─────────────────────────────────────────────────────────────────────
        [HttpGet]
        public async Task<IActionResult> ExportStudents(string format = "excel")
        {
            var companyId = GetCompanyId();
            var students  = await _db.Students
                .Include(s => s.Class)
                .Include(s => s.Section)
                .Where(s => s.CompanyId == companyId && s.IsActive)
                .OrderBy(s => s.Class.Name).ThenBy(s => s.LastName)
                .ToListAsync();

            var data = students.Select(s => new
            {
                s.AdmissionNumber,
                s.FirstName,
                s.LastName,
                DOB             = s.DateOfBirth.ToString("yyyy-MM-dd"),
                s.Gender,
                s.BloodGroup,
                s.Phone,
                s.Email,
                s.Address,
                s.FatherName,
                s.FatherPhone,
                s.MotherName,
                MotherPhone     = s.MotherPhone,
                Class           = s.Class?.Name,
                Section         = s.Section?.Name,
                AdmissionDate   = s.AdmissionDate.ToString("yyyy-MM-dd"),
                s.RollNumber,
                Status          = s.IsActive ? "Active" : "Inactive"
            }).ToList();

            if (format == "csv")
                return CsvFile(data, "Students_Export.csv");

            var stream = new MemoryStream();
            stream.SaveAs(data);
            return File(stream.ToArray(),
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                $"Students_Export_{DateTime.Now:yyyyMMdd}.xlsx");
        }

        // ─────────────────────────────────────────────────────────────────────
        // EXPORT STAFF
        // ─────────────────────────────────────────────────────────────────────
        [HttpGet]
        public async Task<IActionResult> ExportStaff(string format = "excel")
        {
            var companyId = GetCompanyId();
            var staff = await _db.Teachers
                .Include(t => t.Designation)
                .Include(t => t.Department)
                .Where(t => t.CompanyId == companyId && t.IsActive)
                .OrderBy(t => t.LastName)
                .ToListAsync();

            var data = staff.Select(t => new
            {
                t.EmployeeNumber,
                t.FirstName,
                t.LastName,
                DOB          = t.DateOfBirth.ToString("yyyy-MM-dd"),
                t.Gender,
                t.BloodGroup,
                t.Phone,
                t.Email,
                t.Address,
                t.Qualification,
                t.Specialization,
                JoiningDate  = t.JoiningDate.ToString("yyyy-MM-dd"),
                t.Salary,
                Designation  = t.Designation?.Title,
                Department   = t.Department?.Name,
                Status       = t.IsActive ? "Active" : "Inactive"
            }).ToList();

            if (format == "csv")
                return CsvFile(data, "Staff_Export.csv");

            var stream = new MemoryStream();
            stream.SaveAs(data);
            return File(stream.ToArray(),
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                $"Staff_Export_{DateTime.Now:yyyyMMdd}.xlsx");
        }

        // ─────────────────────────────────────────────────────────────────────
        // EXPORT FEE PAYMENTS
        // ─────────────────────────────────────────────────────────────────────
        [HttpGet]
        public async Task<IActionResult> ExportFeePayments(string format = "excel",
            DateTime? from = null, DateTime? to = null)
        {
            var companyId = GetCompanyId();
            var fromDate  = from ?? DateTime.Today.AddMonths(-1);
            var toDate    = to   ?? DateTime.Today;

            var fees = await _db.FeeCollections
                .Include(f => f.Student).ThenInclude(s => s.Class)
                .Include(f => f.Student).ThenInclude(s => s.Section)
                .Where(f => f.Student.CompanyId == companyId
                         && f.CreatedAt.Date >= fromDate.Date
                         && f.CreatedAt.Date <= toDate.Date)
                .OrderByDescending(f => f.PaidDate)
                .ToListAsync();

            var data = fees.Select(f => new
            {
                ReceiptNumber   = f.ReceiptNumber,
                AdmissionNo     = f.Student.AdmissionNumber,
                StudentName     = f.Student.FullName,
                Class           = f.Student.Class?.Name,
                Section         = f.Student.Section?.Name,
                AmountDue       = f.AmountDue,
                AmountPaid      = f.AmountPaid,
                AmountPending   = f.AmountPending,
                DueDate         = f.DueDate.ToString("yyyy-MM-dd"),
                PaidDate        = f.PaidDate?.ToString("yyyy-MM-dd"),
                PaymentMethod   = f.PaymentMethod,
                TransactionId   = f.TransactionId,
                Status          = f.Status,
                Remarks         = f.Remarks
            }).ToList();

            if (format == "csv")
                return CsvFile(data, "FeePayments_Export.csv");

            var stream = new MemoryStream();
            stream.SaveAs(data);
            return File(stream.ToArray(),
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                $"FeePayments_{fromDate:yyyyMMdd}_{toDate:yyyyMMdd}.xlsx");
        }

        // ─────────────────────────────────────────────────────────────────────
        // EXPORT VOUCHERS / TRANSACTIONS
        // ─────────────────────────────────────────────────────────────────────
        [HttpGet]
        public async Task<IActionResult> ExportVouchers(string format = "excel",
            DateTime? from = null, DateTime? to = null)
        {
            var companyId = GetCompanyId();
            var fromDate  = from ?? DateTime.Today.AddMonths(-1);
            var toDate    = to   ?? DateTime.Today;

            var vouchers = await _db.Vouchers
                .Include(v => v.Details).ThenInclude(d => d.Ledger)
                .Where(v => v.CompanyId == companyId
                         && v.Date.Date >= fromDate.Date
                         && v.Date.Date <= toDate.Date)
                .OrderByDescending(v => v.Date)
                .ToListAsync();

            var data = new List<object>();
            foreach (var v in vouchers)
            {
                foreach (var d in v.Details)
                {
                    data.Add(new
                    {
                        v.VoucherNumber,
                        Date       = v.Date.ToString("yyyy-MM-dd"),
                        Type       = v.Type.ToString(),
                        Ledger     = d.Ledger?.Name,
                        Debit      = d.DebitAmount,
                        Credit     = d.CreditAmount,
                        Narration  = v.Narration,
                        Note       = d.Note
                    });
                }
            }

            if (format == "csv")
                return CsvFile(data, "Vouchers_Export.csv");

            var stream = new MemoryStream();
            stream.SaveAs(data);
            return File(stream.ToArray(),
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                $"Vouchers_{fromDate:yyyyMMdd}_{toDate:yyyyMMdd}.xlsx");
        }

        // ─────────────────────────────────────────────────────────────────────
        // EXPORT LEDGERS (Chart of Accounts)
        // ─────────────────────────────────────────────────────────────────────
        [HttpGet]
        public async Task<IActionResult> ExportLedgers(string format = "excel")
        {
            var companyId = GetCompanyId();
            var ledgers   = await _db.Ledgers
                .Include(l => l.AccountGroup)
                .Where(l => l.CompanyId == companyId)
                .OrderBy(l => l.AccountGroup.Nature)
                .ThenBy(l => l.AccountGroup.Name)
                .ThenBy(l => l.Name)
                .ToListAsync();

            var data = ledgers.Select(l => new
            {
                LedgerName      = l.Name,
                AccountGroup    = l.AccountGroup?.Name,
                Nature          = l.AccountGroup?.Nature.ToString(),
                OpeningBalance  = l.OpeningBalance,
                IsDebitOpening  = l.IsDebitOpening ? "Debit" : "Credit",
                IsSystem        = l.IsSystem ? "Yes" : "No"
            }).ToList();

            if (format == "csv")
                return CsvFile(data, "Ledgers_Export.csv");

            var stream = new MemoryStream();
            stream.SaveAs(data);
            return File(stream.ToArray(),
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                $"Ledgers_Export_{DateTime.Now:yyyyMMdd}.xlsx");
        }

        // ─────────────────────────────────────────────────────────────────────
        // HELPERS
        // ─────────────────────────────────────────────────────────────────────
        private FileContentResult CsvFile<T>(IEnumerable<T> data, string filename)
        {
            var sb    = new StringBuilder();
            var props = typeof(T).GetProperties();
            sb.AppendLine(string.Join(",", props.Select(p => $"\"{p.Name}\"")));
            foreach (var item in data)
                sb.AppendLine(string.Join(",", props.Select(p =>
                    $"\"{p.GetValue(item)?.ToString()?.Replace("\"", "\"\"")}\"" )));
            return File(Encoding.UTF8.GetBytes(sb.ToString()), "text/csv", filename);
        }

        private FileContentResult CsvFile(IEnumerable<object> data, string filename)
        {
            var list  = data.ToList();
            if (!list.Any())
                return File(Encoding.UTF8.GetBytes("No data"), "text/csv", filename);

            var props = list[0].GetType().GetProperties();
            var sb    = new StringBuilder();
            sb.AppendLine(string.Join(",", props.Select(p => $"\"{p.Name}\"")));
            foreach (var item in list)
                sb.AppendLine(string.Join(",", props.Select(p =>
                    $"\"{p.GetValue(item)?.ToString()?.Replace("\"", "\"\"")}\"" )));
            return File(Encoding.UTF8.GetBytes(sb.ToString()), "text/csv", filename);
        }

        // ─────────────────────────────────────────────────────────────────────
        // IMPORT FEE PAYMENTS
        // ─────────────────────────────────────────────────────────────────────
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ImportFeePayments(IFormFile file)
        {
            var companyId = GetCompanyId();
            var result = new ImportResult { EntityName = "Fee Payments" };

            if (file == null || file.Length == 0)
            {
                result.Errors.Add("No file selected.");
                return Json(result);
            }

            var students = await _db.Students.Where(s => s.CompanyId == companyId).ToListAsync();

            using var stream = new MemoryStream();
            await file.CopyToAsync(stream);
            stream.Position = 0;

            var rows = stream.Query(useHeaderRow: true).ToList();
            int rowNum = 1;

            foreach (IDictionary<string, object?> row in rows)
            {
                rowNum++;
                try
                {
                    var admNo = row.GetStr("AdmissionNumber");
                    if (string.IsNullOrWhiteSpace(admNo))
                    {
                        result.Errors.Add($"Row {rowNum}: AdmissionNumber is required.");
                        continue;
                    }

                    var student = students.FirstOrDefault(s => s.AdmissionNumber.Equals(admNo, StringComparison.OrdinalIgnoreCase));
                    if (student == null)
                    {
                        result.Errors.Add($"Row {rowNum}: Student with Admission Number '{admNo}' not found.");
                        continue;
                    }

                    var amountDue = row.GetDecimal("AmountDue") ?? 0;
                    var amountPaid = row.GetDecimal("AmountPaid") ?? 0;
                    var amountPending = row.GetDecimal("AmountPending") ?? (amountDue - amountPaid);
                    var dueDate = row.GetDate("DueDate", DateTime.Today);
                    var paidDate = row.GetDate("PaidDate");
                    var payMethod = row.GetStr("PaymentMethod").IfEmpty("Cash");
                    var txnId = row.GetStr("TransactionId");
                    var receiptNo = row.GetStr("ReceiptNumber");
                    var status = row.GetStr("Status").IfEmpty("Paid");
                    var remarks = row.GetStr("Remarks");

                    var fee = new FeeCollection
                    {
                        StudentId = student.Id,
                        AmountDue = amountDue,
                        AmountPaid = amountPaid,
                        AmountPending = amountPending,
                        DueDate = dueDate,
                        PaidDate = paidDate == DateTime.MinValue ? (DateTime?)null : paidDate,
                        PaymentMethod = payMethod,
                        TransactionId = txnId,
                        ReceiptNumber = receiptNo,
                        Status = status,
                        Remarks = remarks,
                        CreatedAt = DateTime.UtcNow
                    };

                    _db.FeeCollections.Add(fee);
                    result.SuccessCount++;
                }
                catch (Exception ex)
                {
                    result.Errors.Add($"Row {rowNum}: {ex.Message}");
                }
            }

            if (result.SuccessCount > 0)
                await _db.SaveChangesAsync();

            result.TotalRows = rowNum - 1;
            return Json(result);
        }

        // ─────────────────────────────────────────────────────────────────────
        // IMPORT VOUCHERS / TRANSACTIONS
        // ─────────────────────────────────────────────────────────────────────
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ImportVouchers(IFormFile file)
        {
            var companyId = GetCompanyId();
            var result = new ImportResult { EntityName = "Vouchers" };

            if (file == null || file.Length == 0)
            {
                result.Errors.Add("No file selected.");
                return Json(result);
            }

            var ledgers = await _db.Ledgers.Where(l => l.CompanyId == companyId).ToListAsync();

            using var stream = new MemoryStream();
            await file.CopyToAsync(stream);
            stream.Position = 0;

            var rows = stream.Query(useHeaderRow: true).ToList();
            int rowNum = 1;

            foreach (IDictionary<string, object?> row in rows)
            {
                rowNum++;
                try
                {
                    var voucherNo = row.GetStr("VoucherNumber");
                    if (string.IsNullOrWhiteSpace(voucherNo))
                    {
                        voucherNo = $"VCH-{DateTime.Now:yyyyMMdd}-{rowNum}";
                    }

                    var date = row.GetDate("Date", DateTime.Today);
                    var typeStr = row.GetStr("VoucherType").IfEmpty("Journal");
                    if (!Enum.TryParse<VoucherType>(typeStr, true, out var vType))
                    {
                        vType = VoucherType.Journal;
                    }

                    var debitLedgerName = row.GetStr("DebitLedger");
                    var creditLedgerName = row.GetStr("CreditLedger");
                    var amount = row.GetDecimal("Amount") ?? 0;
                    var narration = row.GetStr("Narration");

                    if (amount <= 0)
                    {
                        result.Errors.Add($"Row {rowNum}: Amount must be greater than zero.");
                        continue;
                    }

                    var drLedger = ledgers.FirstOrDefault(l => l.Name.Equals(debitLedgerName, StringComparison.OrdinalIgnoreCase));
                    if (drLedger == null)
                    {
                        result.Errors.Add($"Row {rowNum}: Debit Ledger '{debitLedgerName}' not found.");
                        continue;
                    }

                    var crLedger = ledgers.FirstOrDefault(l => l.Name.Equals(creditLedgerName, StringComparison.OrdinalIgnoreCase));
                    if (crLedger == null)
                    {
                        result.Errors.Add($"Row {rowNum}: Credit Ledger '{creditLedgerName}' not found.");
                        continue;
                    }

                    var voucher = new Voucher
                    {
                        CompanyId = companyId,
                        VoucherNumber = voucherNo,
                        Date = date,
                        Type = vType,
                        Narration = narration,
                        CreatedAt = DateTime.UtcNow,
                        CreatedBy = User.Identity?.Name ?? "System"
                    };

                    voucher.Details.Add(new VoucherDetail
                    {
                        LedgerId = drLedger.Id,
                        DebitAmount = amount,
                        CreditAmount = 0
                    });

                    voucher.Details.Add(new VoucherDetail
                    {
                        LedgerId = crLedger.Id,
                        DebitAmount = 0,
                        CreditAmount = amount
                    });

                    _db.Vouchers.Add(voucher);
                    result.SuccessCount++;
                }
                catch (Exception ex)
                {
                    result.Errors.Add($"Row {rowNum}: {ex.Message}");
                }
            }

            if (result.SuccessCount > 0)
                await _db.SaveChangesAsync();

            result.TotalRows = rowNum - 1;
            return Json(result);
        }

        // ─────────────────────────────────────────────────────────────────────
        // IMPORT LEDGERS / CHART OF ACCOUNTS
        // ─────────────────────────────────────────────────────────────────────
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ImportLedgers(IFormFile file)
        {
            var companyId = GetCompanyId();
            var result = new ImportResult { EntityName = "Ledgers" };

            if (file == null || file.Length == 0)
            {
                result.Errors.Add("No file selected.");
                return Json(result);
            }

            var groups = await _db.AccountGroups.Where(g => g.CompanyId == companyId).ToListAsync();
            var ledgers = await _db.Ledgers.Where(l => l.CompanyId == companyId).ToListAsync();

            using var stream = new MemoryStream();
            await file.CopyToAsync(stream);
            stream.Position = 0;

            var rows = stream.Query(useHeaderRow: true).ToList();
            int rowNum = 1;

            foreach (IDictionary<string, object?> row in rows)
            {
                rowNum++;
                try
                {
                    var ledgerName = row.GetStr("LedgerName");
                    if (string.IsNullOrWhiteSpace(ledgerName))
                    {
                        result.Errors.Add($"Row {rowNum}: LedgerName is required.");
                        continue;
                    }

                    if (ledgers.Any(l => l.Name.Equals(ledgerName, StringComparison.OrdinalIgnoreCase)))
                    {
                        result.Errors.Add($"Row {rowNum}: Ledger '{ledgerName}' already exists.");
                        continue;
                    }

                    var groupName = row.GetStr("AccountGroup");
                    var natureStr = row.GetStr("Nature").IfEmpty("Expenses");
                    if (!Enum.TryParse<AccountNature>(natureStr, true, out var nature))
                    {
                        nature = AccountNature.Expenses;
                    }

                    if (string.IsNullOrWhiteSpace(groupName))
                    {
                        groupName = "General " + nature.ToString();
                    }

                    var group = groups.FirstOrDefault(g => g.Name.Equals(groupName, StringComparison.OrdinalIgnoreCase));
                    if (group == null)
                    {
                        group = new AccountGroup
                        {
                            Name = groupName,
                            Nature = nature,
                            IsPrimary = true,
                            CompanyId = companyId
                        };
                        _db.AccountGroups.Add(group);
                        await _db.SaveChangesAsync();
                        groups.Add(group);
                    }

                    var opBal = row.GetDecimal("OpeningBalance") ?? 0;
                    var isDrStr = row.GetStr("IsDebitOpening").ToLower();
                    var isDr = isDrStr == "yes" || isDrStr == "debit" || isDrStr == "true" || isDrStr == "y" || isDrStr == "dr";

                    var ledger = new Ledger
                    {
                        Name = ledgerName,
                        AccountGroupId = group.Id,
                        OpeningBalance = opBal,
                        IsDebitOpening = isDr,
                        CompanyId = companyId,
                        IsSystem = false
                    };

                    _db.Ledgers.Add(ledger);
                    result.SuccessCount++;
                    ledgers.Add(ledger);
                }
                catch (Exception ex)
                {
                    result.Errors.Add($"Row {rowNum}: {ex.Message}");
                }
            }

            if (result.SuccessCount > 0)
                await _db.SaveChangesAsync();

            result.TotalRows = rowNum - 1;
            return Json(result);
        }

        // ─────────────────────────────────────────────────────────────────────
        // DOWNLOAD CONFIGURATION MASTER TEMPLATE
        // ─────────────────────────────────────────────────────────────────────
        [HttpGet]
        public IActionResult DownloadMasterTemplate(string type)
        {
            var data = new List<Dictionary<string, object>>();
            var columns = new List<string>();

            switch (type)
            {
                case "Classes": columns = new List<string> { "Name" }; break;
                case "Sections": columns = new List<string> { "Name" }; break;
                case "Subjects": columns = new List<string> { "Name", "Type", "ClassName", "Code", "Description" }; break;
                case "ClassRooms": columns = new List<string> { "RoomNo", "Capacity" }; break;
                case "Departments": columns = new List<string> { "Name" }; break;
                case "Designations": columns = new List<string> { "Title" }; break;
                case "FeesGroups": columns = new List<string> { "Name", "Description" }; break;
                case "FeesTypes": columns = new List<string> { "Name", "Amount", "GroupName", "FeesCode", "Description" }; break;
                case "StudentCategories": columns = new List<string> { "Name" }; break;
                case "StudentGroups": columns = new List<string> { "Name" }; break;
                case "BookCategories": columns = new List<string> { "Name" }; break;
                case "ItemCategories": columns = new List<string> { "Name" }; break;
                case "LeaveTypes": columns = new List<string> { "Name", "DaysPerYear" }; break;
                case "Routes": columns = new List<string> { "Name" }; break;
                case "Vehicles": columns = new List<string> { "VehicleNumber", "VehicleType", "Model", "Capacity" }; break;
                case "Dormitories": columns = new List<string> { "Name", "Type", "Address", "Capacity" }; break;
                default: return BadRequest("Unsupported template type.");
            }

            var dict = new Dictionary<string, object>();
            foreach (var col in columns) dict[col] = $"Sample {col}";
            data.Add(dict);

            var stream = new MemoryStream();
            stream.SaveAs(data);
            stream.Seek(0, SeekOrigin.Begin);
            return File(stream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", $"{type}_Template.xlsx");
        }

        // ─────────────────────────────────────────────────────────────────────
        // IMPORT CONFIGURATION MASTER TABLE
        // ─────────────────────────────────────────────────────────────────────
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ImportMaster(IFormFile file, string type)
        {
            var companyId = GetCompanyId();
            if (companyId == 0)
            {
                var company = await _db.Companies.FirstOrDefaultAsync();
                companyId = company?.Id ?? 0;
            }

            var result = new ImportResult { EntityName = type };

            if (file == null || file.Length == 0)
            {
                result.Errors.Add("No file selected.");
                return Json(result);
            }

            using var stream = new MemoryStream();
            await file.CopyToAsync(stream);
            stream.Position = 0;

            var rows = stream.Query(useHeaderRow: true).ToList();
            int rowNum = 1;

            foreach (IDictionary<string, object?> row in rows)
            {
                rowNum++;
                try
                {
                    if (type == "Classes")
                    {
                        var name = row.GetStr("Name");
                        if (string.IsNullOrWhiteSpace(name))
                        {
                            result.Errors.Add($"Row {rowNum}: Name is required.");
                            continue;
                        }
                        if (await _db.Classes.AnyAsync(c => c.Name.Equals(name) && c.CompanyId == companyId))
                        {
                            result.Errors.Add($"Row {rowNum}: Class '{name}' already exists.");
                            continue;
                        }
                        _db.Classes.Add(new Class { Name = name, CompanyId = companyId });
                        result.SuccessCount++;
                    }
                    else if (type == "Sections")
                    {
                        var name = row.GetStr("Name");
                        if (string.IsNullOrWhiteSpace(name))
                        {
                            result.Errors.Add($"Row {rowNum}: Name is required.");
                            continue;
                        }
                        if (await _db.Sections.AnyAsync(s => s.Name.Equals(name)))
                        {
                            result.Errors.Add($"Row {rowNum}: Section '{name}' already exists.");
                            continue;
                        }
                        _db.Sections.Add(new Section { Name = name });
                        result.SuccessCount++;
                    }
                    else if (type == "ClassRooms")
                    {
                        var roomNo = row.GetStr("RoomNo");
                        if (string.IsNullOrWhiteSpace(roomNo))
                        {
                            result.Errors.Add($"Row {rowNum}: RoomNo is required.");
                            continue;
                        }
                        if (await _db.ClassRooms.AnyAsync(r => r.RoomNo.Equals(roomNo)))
                        {
                            result.Errors.Add($"Row {rowNum}: ClassRoom '{roomNo}' already exists.");
                            continue;
                        }
                        int cap = row.GetInt("Capacity") ?? 40;
                        _db.ClassRooms.Add(new ClassRoom { RoomNo = roomNo, Capacity = cap });
                        result.SuccessCount++;
                    }
                    else if (type == "Subjects")
                    {
                        var name = row.GetStr("Name");
                        if (string.IsNullOrWhiteSpace(name))
                        {
                            result.Errors.Add($"Row {rowNum}: Name is required.");
                            continue;
                        }
                        string subClassName = row.GetStr("ClassName");
                        var cls = await _db.Classes.FirstOrDefaultAsync(c => c.Name.Equals(subClassName) && c.CompanyId == companyId);
                        if (cls == null)
                        {
                            result.Errors.Add($"Row {rowNum}: Class '{subClassName}' not found.");
                            continue;
                        }
                        _db.Subjects.Add(new Subject
                        {
                            Name = name,
                            Type = row.GetStr("Type").IfEmpty("Theory"),
                            ClassId = cls.Id,
                            Code = row.GetStr("Code"),
                            Description = row.GetStr("Description")
                        });
                        result.SuccessCount++;
                    }
                    else if (type == "Departments")
                    {
                        var name = row.GetStr("Name");
                        if (string.IsNullOrWhiteSpace(name))
                        {
                            result.Errors.Add($"Row {rowNum}: Name is required.");
                            continue;
                        }
                        if (await _db.Departments.AnyAsync(d => d.Name.Equals(name) && d.CompanyId == companyId))
                        {
                            result.Errors.Add($"Row {rowNum}: Department '{name}' already exists.");
                            continue;
                        }
                        _db.Departments.Add(new Department { Name = name, CompanyId = companyId });
                        result.SuccessCount++;
                    }
                    else if (type == "Designations")
                    {
                        var title = row.GetStr("Title");
                        if (string.IsNullOrWhiteSpace(title))
                        {
                            result.Errors.Add($"Row {rowNum}: Title is required.");
                            continue;
                        }
                        if (await _db.Designations.AnyAsync(d => d.Title.Equals(title) && d.CompanyId == companyId))
                        {
                            result.Errors.Add($"Row {rowNum}: Designation '{title}' already exists.");
                            continue;
                        }
                        _db.Designations.Add(new Designation { Title = title, CompanyId = companyId });
                        result.SuccessCount++;
                    }
                    else if (type == "FeesGroups")
                    {
                        var name = row.GetStr("Name");
                        if (string.IsNullOrWhiteSpace(name))
                        {
                            result.Errors.Add($"Row {rowNum}: Name is required.");
                            continue;
                        }
                        if (await _db.FeesGroups.AnyAsync(g => g.Name.Equals(name) && g.CompanyId == companyId))
                        {
                            result.Errors.Add($"Row {rowNum}: FeesGroup '{name}' already exists.");
                            continue;
                        }
                        _db.FeesGroups.Add(new FeesGroup
                        {
                            Name = name,
                            Description = row.GetStr("Description"),
                            CompanyId = companyId
                        });
                        result.SuccessCount++;
                    }
                    else if (type == "FeesTypes")
                    {
                        var name = row.GetStr("Name");
                        if (string.IsNullOrWhiteSpace(name))
                        {
                            result.Errors.Add($"Row {rowNum}: Name is required.");
                            continue;
                        }
                        string fGroupName = row.GetStr("GroupName");
                        var group = await _db.FeesGroups.FirstOrDefaultAsync(g => g.Name.Equals(fGroupName) && g.CompanyId == companyId);
                        if (group == null)
                        {
                            result.Errors.Add($"Row {rowNum}: FeesGroup '{fGroupName}' not found.");
                            continue;
                        }
                        decimal amt = row.GetDecimal("Amount") ?? 0;
                        _db.FeesTypes.Add(new FeesType
                        {
                            Name = name,
                            Amount = amt,
                            FeesGroupId = group.Id,
                            FeesCode = row.GetStr("FeesCode"),
                            Description = row.GetStr("Description")
                        });
                        result.SuccessCount++;
                    }
                    else if (type == "StudentCategories")
                    {
                        var name = row.GetStr("Name");
                        if (string.IsNullOrWhiteSpace(name))
                        {
                            result.Errors.Add($"Row {rowNum}: Name is required.");
                            continue;
                        }
                        if (await _db.StudentCategories.AnyAsync(c => c.Name.Equals(name)))
                        {
                            result.Errors.Add($"Row {rowNum}: StudentCategory '{name}' already exists.");
                            continue;
                        }
                        _db.StudentCategories.Add(new StudentCategory { Name = name });
                        result.SuccessCount++;
                    }
                    else if (type == "StudentGroups")
                    {
                        var name = row.GetStr("Name");
                        if (string.IsNullOrWhiteSpace(name))
                        {
                            result.Errors.Add($"Row {rowNum}: Name is required.");
                            continue;
                        }
                        if (await _db.StudentGroups.AnyAsync(g => g.Name.Equals(name) && g.CompanyId == companyId))
                        {
                            result.Errors.Add($"Row {rowNum}: StudentGroup '{name}' already exists.");
                            continue;
                        }
                        _db.StudentGroups.Add(new StudentGroup { Name = name, CompanyId = companyId });
                        result.SuccessCount++;
                    }
                    else if (type == "BookCategories")
                    {
                        var name = row.GetStr("Name");
                        if (string.IsNullOrWhiteSpace(name))
                        {
                            result.Errors.Add($"Row {rowNum}: Name is required.");
                            continue;
                        }
                        if (await _db.BookCategories.AnyAsync(c => c.Name.Equals(name)))
                        {
                            result.Errors.Add($"Row {rowNum}: BookCategory '{name}' already exists.");
                            continue;
                        }
                        _db.BookCategories.Add(new BookCategory { Name = name });
                        result.SuccessCount++;
                    }
                    else if (type == "ItemCategories")
                    {
                        var name = row.GetStr("Name");
                        if (string.IsNullOrWhiteSpace(name))
                        {
                            result.Errors.Add($"Row {rowNum}: Name is required.");
                            continue;
                        }
                        if (await _db.ItemCategories.AnyAsync(c => c.Name.Equals(name)))
                        {
                            result.Errors.Add($"Row {rowNum}: ItemCategory '{name}' already exists.");
                            continue;
                        }
                        _db.ItemCategories.Add(new ItemCategory { Name = name });
                        result.SuccessCount++;
                    }
                    else if (type == "LeaveTypes")
                    {
                        var name = row.GetStr("Name");
                        if (string.IsNullOrWhiteSpace(name))
                        {
                            result.Errors.Add($"Row {rowNum}: Name is required.");
                            continue;
                        }
                        if (await _db.LeaveTypes.AnyAsync(t => t.Name.Equals(name) && t.CompanyId == companyId))
                        {
                            result.Errors.Add($"Row {rowNum}: LeaveType '{name}' already exists.");
                            continue;
                        }
                        int days = row.GetInt("DaysPerYear") ?? 15;
                        _db.LeaveTypes.Add(new LeaveType
                        {
                            Name = name,
                            DaysPerYear = days,
                            CompanyId = companyId
                        });
                        result.SuccessCount++;
                    }
                    else if (type == "Routes")
                    {
                        var name = row.GetStr("Name");
                        if (string.IsNullOrWhiteSpace(name))
                        {
                            result.Errors.Add($"Row {rowNum}: Name is required.");
                            continue;
                        }
                        if (await _db.Routes.AnyAsync(r => r.Name.Equals(name) && r.CompanyId == companyId))
                        {
                            result.Errors.Add($"Row {rowNum}: Route '{name}' already exists.");
                            continue;
                        }
                        _db.Routes.Add(new EasyEdu.Models.Route { Name = name, CompanyId = companyId });
                        result.SuccessCount++;
                    }
                    else if (type == "Vehicles")
                    {
                        var vNum = row.GetStr("VehicleNumber");
                        if (string.IsNullOrWhiteSpace(vNum))
                        {
                            result.Errors.Add($"Row {rowNum}: VehicleNumber is required.");
                            continue;
                        }
                        if (await _db.Vehicles.AnyAsync(v => v.VehicleNumber.Equals(vNum) && v.CompanyId == companyId))
                        {
                            result.Errors.Add($"Row {rowNum}: Vehicle '{vNum}' already exists.");
                            continue;
                        }
                        int cap = row.GetInt("Capacity") ?? 40;
                        _db.Vehicles.Add(new Vehicle
                        {
                            VehicleNumber = vNum,
                            VehicleType = row.GetStr("VehicleType").IfEmpty("Bus"),
                            Model = row.GetStr("Model"),
                            Capacity = cap,
                            CompanyId = companyId
                        });
                        result.SuccessCount++;
                    }
                    else if (type == "Dormitories")
                    {
                        var name = row.GetStr("Name");
                        if (string.IsNullOrWhiteSpace(name))
                        {
                            result.Errors.Add($"Row {rowNum}: Name is required.");
                            continue;
                        }
                        if (await _db.Dormitories.AnyAsync(d => d.Name.Equals(name)))
                        {
                            result.Errors.Add($"Row {rowNum}: Dormitory '{name}' already exists.");
                            continue;
                        }
                        int cap = row.GetInt("Capacity") ?? 100;
                        _db.Dormitories.Add(new Dormitory
                        {
                            Name = name,
                            Type = row.GetStr("Type").IfEmpty("Mixed"),
                            Address = row.GetStr("Address").IfEmpty("N/A"),
                            Capacity = cap
                        });
                        result.SuccessCount++;
                    }
                }
                catch (Exception ex)
                {
                    result.Errors.Add($"Row {rowNum}: {ex.Message}");
                }
            }

            if (result.SuccessCount > 0)
                await _db.SaveChangesAsync();

            result.TotalRows = rowNum - 1;
            return Json(result);
        }

        // ─────────────────────────────────────────────────────────────────────
        // EXPORT CONFIGURATION MASTER TABLE
        // ─────────────────────────────────────────────────────────────────────
        [HttpGet]
        public async Task<IActionResult> ExportMaster(string table, string format = "excel")
        {
            var companyId = GetCompanyId();
            if (companyId == 0)
            {
                var company = await _db.Companies.FirstOrDefaultAsync();
                companyId = company?.Id ?? 0;
            }

            object data;
            switch (table)
            {
                case "Classes": data = await _db.Classes.Where(x => x.CompanyId == companyId).Select(x => new { x.Id, x.Name }).ToListAsync(); break;
                case "Sections": data = await _db.Sections.Select(x => new { x.Id, x.Name }).ToListAsync(); break;
                case "Subjects": data = await _db.Subjects.Select(x => new { x.Id, x.Name, x.Type }).ToListAsync(); break;
                case "ClassRooms": data = await _db.ClassRooms.Select(x => new { x.Id, x.RoomNo, x.Capacity }).ToListAsync(); break;
                case "Departments": data = await _db.Departments.Where(x => x.CompanyId == companyId).Select(x => new { x.Id, x.Name }).ToListAsync(); break;
                case "Designations": data = await _db.Designations.Where(x => x.CompanyId == companyId).Select(x => new { x.Id, x.Title }).ToListAsync(); break;
                case "FeesGroups": data = await _db.FeesGroups.Where(x => x.CompanyId == companyId).Select(x => new { x.Id, x.Name }).ToListAsync(); break;
                case "FeesTypes": data = await _db.FeesTypes.Select(x => new { x.Id, x.Name, x.Amount }).ToListAsync(); break;
                case "StudentCategories": data = await _db.StudentCategories.Select(x => new { x.Id, x.Name }).ToListAsync(); break;
                case "StudentGroups": data = await _db.StudentGroups.Where(x => x.CompanyId == companyId).Select(x => new { x.Id, x.Name }).ToListAsync(); break;
                case "BookCategories": data = await _db.BookCategories.Select(x => new { x.Id, x.Name }).ToListAsync(); break;
                case "ItemCategories": data = await _db.ItemCategories.Select(x => new { x.Id, x.Name }).ToListAsync(); break;
                case "LeaveTypes": data = await _db.LeaveTypes.Where(x => x.CompanyId == companyId).Select(x => new { x.Id, x.Name, x.DaysPerYear }).ToListAsync(); break;
                case "Routes": data = await _db.Routes.Where(x => x.CompanyId == companyId).Select(x => new { x.Id, x.Name }).ToListAsync(); break;
                case "Vehicles": data = await _db.Vehicles.Where(x => x.CompanyId == companyId).Select(x => new { x.Id, x.VehicleNumber }).ToListAsync(); break;
                case "Dormitories": data = await _db.Dormitories.Select(x => new { x.Id, x.Name, x.Type }).ToListAsync(); break;
                default: return BadRequest("Table not supported.");
            }

            if (format == "csv")
            {
                var sb = new StringBuilder();
                var list = ((System.Collections.IEnumerable)data).Cast<object>().ToList();
                if (!list.Any())
                    return File(Encoding.UTF8.GetBytes("No data"), "text/csv", $"{table}_Export.csv");

                var props = list[0].GetType().GetProperties();
                sb.AppendLine(string.Join(",", props.Select(p => $"\"{p.Name}\"")));
                foreach (var item in list)
                    sb.AppendLine(string.Join(",", props.Select(p => $"\"{p.GetValue(item)?.ToString()?.Replace("\"", "\"\"")}\"")));
                return File(Encoding.UTF8.GetBytes(sb.ToString()), "text/csv", $"{table}_Export.csv");
            }

            var stream = new MemoryStream();
            stream.SaveAs(data);
            return File(stream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", $"{table}_Export.xlsx");
        }

        // ─────────────────────────────────────────────────────────────────────
        // EXPORT ALL CONFIGURATION MASTER TABLES (ALL SHEETS)
        // ─────────────────────────────────────────────────────────────────────
        [HttpGet]
        public async Task<IActionResult> ExportAllMasters()
        {
            var companyId = GetCompanyId();
            if (companyId == 0)
            {
                var company = await _db.Companies.FirstOrDefaultAsync();
                companyId = company?.Id ?? 0;
            }

            var sheets = new Dictionary<string, object>
            {
                ["Classes"] = await _db.Classes.Where(x => x.CompanyId == companyId).Select(x => new { x.Id, x.Name }).ToListAsync(),
                ["Sections"] = await _db.Sections.Select(x => new { x.Id, x.Name }).ToListAsync(),
                ["Subjects"] = await _db.Subjects.Select(x => new { x.Id, x.Name, x.Type }).ToListAsync(),
                ["ClassRooms"] = await _db.ClassRooms.Select(x => new { x.Id, x.RoomNo, x.Capacity }).ToListAsync(),
                ["Departments"] = await _db.Departments.Where(x => x.CompanyId == companyId).Select(x => new { x.Id, x.Name }).ToListAsync(),
                ["Designations"] = await _db.Designations.Where(x => x.CompanyId == companyId).Select(x => new { x.Id, x.Title }).ToListAsync(),
                ["FeesGroups"] = await _db.FeesGroups.Where(x => x.CompanyId == companyId).Select(x => new { x.Id, x.Name }).ToListAsync(),
                ["FeesTypes"] = await _db.FeesTypes.Select(x => new { x.Id, x.Name, x.Amount }).ToListAsync(),
                ["StudentCategories"] = await _db.StudentCategories.Select(x => new { x.Id, x.Name }).ToListAsync(),
                ["StudentGroups"] = await _db.StudentGroups.Where(x => x.CompanyId == companyId).Select(x => new { x.Id, x.Name }).ToListAsync(),
                ["BookCategories"] = await _db.BookCategories.Select(x => new { x.Id, x.Name }).ToListAsync(),
                ["ItemCategories"] = await _db.ItemCategories.Select(x => new { x.Id, x.Name }).ToListAsync(),
                ["LeaveTypes"] = await _db.LeaveTypes.Where(x => x.CompanyId == companyId).Select(x => new { x.Id, x.Name, x.DaysPerYear }).ToListAsync(),
                ["Routes"] = await _db.Routes.Where(x => x.CompanyId == companyId).Select(x => new { x.Id, x.Name }).ToListAsync(),
                ["Vehicles"] = await _db.Vehicles.Where(x => x.CompanyId == companyId).Select(x => new { x.Id, x.VehicleNumber }).ToListAsync(),
                ["Dormitories"] = await _db.Dormitories.Select(x => new { x.Id, x.Name, x.Type, x.Capacity }).ToListAsync()
            };

            var stream = new MemoryStream();
            stream.SaveAs(sheets);
            stream.Seek(0, SeekOrigin.Begin);
            return File(stream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", $"EasyEdu_Master_Bulk_Export_{DateTime.Now:yyyyMMdd}.xlsx");
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // IMPORT RESULT DTO
    // ─────────────────────────────────────────────────────────────────────────
    public class ImportResult
    {
        public string EntityName  { get; set; } = "";
        public int TotalRows      { get; set; }
        public int SuccessCount   { get; set; }
        public List<string> Errors{ get; set; } = new();
        public int ErrorCount     => Errors.Count;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // EXTENSION HELPERS FOR ROW PARSING
    // ─────────────────────────────────────────────────────────────────────────
    public static class RowExtensions
    {
        public static string GetStr(this IDictionary<string, object?> row, string key) =>
            row.TryGetValue(key, out var v) ? v?.ToString()?.Trim() ?? "" : "";

        public static string IfEmpty(this string s, string fallback) =>
            string.IsNullOrWhiteSpace(s) ? fallback : s;

        public static DateTime GetDate(this IDictionary<string, object?> row,
            string key, DateTime? fallback = null)
        {
            var s = row.GetStr(key);
            return DateTime.TryParse(s, out var d) ? d : fallback ?? DateTime.MinValue;
        }

        public static int? GetInt(this IDictionary<string, object?> row, string key)
        {
            var s = row.GetStr(key);
            return int.TryParse(s, out var n) ? n : null;
        }

        public static decimal? GetDecimal(this IDictionary<string, object?> row, string key)
        {
            var s = row.GetStr(key);
            return decimal.TryParse(s, out var d) ? d : null;
        }
    }
}

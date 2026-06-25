using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;
using System.Security.Claims;

namespace EasyEdu.Controllers
{
    [Authorize(Roles = "SuperAdmin,Admin,Accountant")]
    public class FinanceController : Controller
    {
        private readonly ApplicationDbContext _context;

        public FinanceController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Finance
        public IActionResult Index()
        {
            return RedirectToAction(nameof(Dashboard));
        }

        // GET: Finance/Dashboard
        public async Task<IActionResult> Dashboard()
        {
            var feeCollections = await _context.FeeCollections.ToListAsync();
            var payrolls = await _context.Payrolls.ToListAsync();
            var inventory = await _context.Inventories.ToListAsync();
            var expenses = await _context.Expenses.ToListAsync();
            var invoices = await _context.FeesInvoices.ToListAsync();

            var model = new FinancialReportsViewModel
            {
                TotalIncome = invoices.Sum(i => i.TotalAmount), // In Accrual, invoiced = income. Or use collections? User wants "Invoiced".
                // Actually user dashboard image shows "Total Invoiced".
                // But for "Realized" we use collections.
                
                // Let's stick to the view model usage:
                TotalExpenses = payrolls.Sum(p => p.NetSalary) + inventory.Sum(i => i.Quantity * i.UnitPrice) + expenses.Sum(e => e.Amount),
                PendingFees = invoices.Sum(i => i.TotalAmount) - invoices.Sum(i => i.PaidAmount), // Accurate pending
                RecentTransactions = feeCollections.Select(c => new TransactionItem 
                { 
                    Date = c.PaidDate ?? DateTime.Today, 
                    Description = "Fee Collection - " + c.ReceiptNumber, 
                    Amount = c.AmountPaid, 
                    Type = "Income" 
                }).Concat(payrolls.Select(p => new TransactionItem 
                { 
                    Date = p.PaymentDate ?? DateTime.Today, 
                    Description = "Salary Payment - " + p.Month + "/" + p.Year, 
                    Amount = p.NetSalary, 
                    Type = "Expense" 
                })).OrderByDescending(t => t.Date).Take(10).ToList()
            };
            // Override total income to mean "Invoiced" for the dashboard card as implemented in view
            model.TotalIncome = invoices.Sum(i => i.TotalAmount);

            return View(model);
        }

        public async Task<IActionResult> FeeList()
        {
            var collections = await _context.FeeCollections
                .Include(f => f.Student)
                .Include(f => f.FeeStructure)
                .OrderByDescending(f => f.CreatedAt)
                .ToListAsync();
            return View("Index", collections); // Reuse old index view as list if needed
        }

        // GET: Finance/FeeStructure
        public async Task<IActionResult> FeeStructure()
        {
            var structures = await _context.FeeStructures
                .Include(f => f.Class)
                .ToListAsync();
            return View(structures);
        }

        // GET: Finance/CreateFeeStructure
        public IActionResult CreateFeeStructure()
        {
            ViewBag.ClassId = new SelectList(_context.Classes, "Id", "Name");
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateFeeStructure(FeeStructure structure)
        {
            if (ModelState.IsValid)
            {
                _context.Add(structure);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(FeeStructure));
            }
            ViewBag.ClassId = new SelectList(_context.Classes, "Id", "Name", structure.ClassId);
            return View(structure);
        }

        // GET: Finance/CollectFee
        public async Task<IActionResult> CollectFee(int? studentId, int? invoiceId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _context.Users.FindAsync(userId);
            var companyId = user?.CompanyId ?? (await _context.Companies.Select(c => c.Id).FirstOrDefaultAsync());

            var collection = new FeeCollection { PaidDate = DateTime.Today };

            if (invoiceId.HasValue && invoiceId.Value > 0)
            {
                var invoice = await _context.FeesInvoices.Include(i => i.Student).FirstOrDefaultAsync(i => i.Id == invoiceId.Value);
                if (invoice != null)
                {
                    collection.StudentId = invoice.StudentId;
                    collection.FeesInvoiceId = invoice.Id;
                    collection.AmountDue = invoice.TotalAmount - invoice.PaidAmount;
                    collection.AmountPaid = collection.AmountDue;
                    collection.AmountPending = 0;
                    
                    var pendingInvoices = await _context.FeesInvoices
                        .Where(i => i.StudentId == invoice.StudentId && (i.Status != "Paid" || i.Id == invoice.Id))
                        .ToListAsync();
                    ViewBag.Invoices = new SelectList(pendingInvoices, "Id", "InvoiceNumber", invoice.Id);
                    ViewBag.StudentName = $"{invoice.Student?.FirstName} {invoice.Student?.LastName}";
                }
            }
            else if (studentId.HasValue && studentId.Value > 0)
            {
                var student = await _context.Students.FindAsync(studentId.Value);
                if (student != null)
                {
                    collection.StudentId = studentId.Value;
                    ViewBag.StudentName = $"{student.FirstName} {student.LastName}";
                    var pendingInvoices = await _context.FeesInvoices
                        .Where(i => i.StudentId == studentId.Value && i.Status != "Paid")
                        .ToListAsync();
                    ViewBag.Invoices = new SelectList(pendingInvoices, "Id", "InvoiceNumber");
                }
            }
            else
            {
                ViewBag.Invoices = new SelectList(new List<FeesInvoice>(), "Id", "InvoiceNumber");
            }

            ViewBag.Students = new SelectList(await _context.Students.Where(s => s.IsActive).ToListAsync(), "Id", "AdmissionNumber", collection.StudentId);
            return View(collection);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CollectFee(FeeCollection collection)
        {
            // Remove unnecessary validation
            ModelState.Remove(nameof(collection.Student));
            ModelState.Remove(nameof(collection.FeeStructure));
            ModelState.Remove(nameof(collection.FeesInvoice));

            if (ModelState.IsValid)
            {
                collection.CreatedAt = DateTime.UtcNow;
                collection.ReceiptNumber = "RCPT-" + DateTime.Now.Ticks.ToString().Substring(10);
                collection.Status = collection.AmountPending <= 0 ? "Paid" : "Partial";
                
                _context.Add(collection);
                
                // Update Invoice
                if (collection.FeesInvoiceId.HasValue)
                {
                    var invoice = await _context.FeesInvoices.FindAsync(collection.FeesInvoiceId.Value);
                    if (invoice != null)
                    {
                        invoice.PaidAmount += collection.AmountPaid;
                        if (invoice.PaidAmount >= invoice.TotalAmount)
                            invoice.Status = "Paid";
                        else
                            invoice.Status = "Partial";
                    }
                }

                await _context.SaveChangesAsync();

                // Post to Accounting
                await PostPaymentToLedger(collection);

                TempData["Success"] = "Fee collection recorded successfully.";
                return RedirectToAction(nameof(FeesInvoice));
            }
            
            var student = await _context.Students.FindAsync(collection.StudentId);
            if (student != null)
            {
                ViewBag.StudentName = $"{student.FirstName} {student.LastName}";
                var pendingInvoices = await _context.FeesInvoices
                    .Where(i => i.StudentId == collection.StudentId && i.Status != "Paid")
                    .ToListAsync();
                ViewBag.Invoices = new SelectList(pendingInvoices, "Id", "InvoiceNumber", collection.FeesInvoiceId);
            }
            
            ViewBag.Students = new SelectList(await _context.Students.Where(s => s.IsActive).ToListAsync(), "Id", "AdmissionNumber", collection.StudentId);
            return View(collection);
        }

        // GET: Finance/Reports
        public async Task<IActionResult> Reports()
        {
            var feeCollections = await _context.FeeCollections.ToListAsync();
            var payrolls = await _context.Payrolls.ToListAsync();
            var inventory = await _context.Inventories.ToListAsync();
            var expenses = await _context.Expenses.ToListAsync();

            var model = new FinancialReportsViewModel
            {
                TotalIncome = feeCollections.Sum(c => c.AmountPaid),
                TotalExpenses = payrolls.Sum(p => p.NetSalary) + inventory.Sum(i => i.Quantity * i.UnitPrice) + expenses.Sum(e => e.Amount),
                PendingFees = feeCollections.Sum(c => c.AmountPending),
                RecentTransactions = feeCollections.Select(c => new TransactionItem 
                { 
                    Date = c.PaidDate ?? DateTime.Today, 
                    Description = "Fee Collection - " + c.ReceiptNumber, 
                    Amount = c.AmountPaid, 
                    Type = "Income" 
                }).Concat(payrolls.Select(p => new TransactionItem 
                { 
                    Date = p.PaymentDate ?? DateTime.Today, 
                    Description = "Salary Payment - " + p.Month + "/" + p.Year, 
                    Amount = p.NetSalary, 
                    Type = "Expense" 
                })).Concat(expenses.Select(e => new TransactionItem
                {
                    Date = e.Date,
                    Description = "Expense - " + e.Title,
                    Amount = e.Amount,
                    Type = "Expense"
                })).OrderByDescending(t => t.Date).Take(10).ToList()
            };

            return View(model);
        }

        public async Task<IActionResult> TrialBalance()
        {
            var feeCollections = await _context.FeeCollections.ToListAsync();
            var payrolls = await _context.Payrolls.ToListAsync();
            var inventory = await _context.Inventories.ToListAsync();
            var expenses = await _context.Expenses.ToListAsync();
            
            var trialBalance = new List<TrialBalanceItem>
            {
                new TrialBalanceItem { Account = "Cash/Bank", Debit = feeCollections.Sum(c => c.AmountPaid), Credit = payrolls.Sum(p => p.NetSalary) + expenses.Sum(e => e.Amount) },
                new TrialBalanceItem { Account = "Tuition Fees Income", Debit = 0, Credit = feeCollections.Sum(c => c.AmountPaid) },
                new TrialBalanceItem { Account = "Salary Expense", Debit = payrolls.Sum(p => p.NetSalary), Credit = 0 },
                new TrialBalanceItem { Account = "Operation Expenses", Debit = expenses.Sum(e => e.Amount), Credit = 0 },
                new TrialBalanceItem { Account = "Inventory Assets", Debit = inventory.Sum(i => i.Quantity * i.UnitPrice), Credit = 0 },
                new TrialBalanceItem { Account = "Accounts Receivable", Debit = feeCollections.Sum(c => c.AmountPending), Credit = 0 },
                new TrialBalanceItem { Account = "Accumulated Surplus", Debit = 0, Credit = feeCollections.Sum(c => c.AmountPaid) - (payrolls.Sum(p => p.NetSalary) + expenses.Sum(e => e.Amount)) }
            };

            return View(trialBalance);
        }

        public async Task<IActionResult> StudentLedger(int id)
        {
            var student = await _context.Students
                .Include(s => s.Class)
                .FirstOrDefaultAsync(s => s.Id == id);
            
            if (student == null) return NotFound();

            var collections = await _context.FeeCollections
                .Where(c => c.StudentId == id)
                .OrderBy(c => c.PaidDate)
                .ToListAsync();

            ViewBag.Student = student;
            return View(collections);
        }

        public async Task<IActionResult> ClassWiseRevenue()
        {
            var reports = await _context.FeeCollections
                .Include(f => f.Student)
                .ThenInclude(s => s.Class)
                .GroupBy(f => f.Student.Class.Name)
                .Select(g => new ClassRevenueViewModel
                {
                    ClassName = g.Key,
                    AmountCollected = g.Sum(f => f.AmountPaid),
                    AmountPending = g.Sum(f => f.AmountPending),
                    StudentCount = g.Select(f => f.StudentId).Distinct().Count()
                })
                .ToListAsync();

            return View(reports);
        }

        public async Task<IActionResult> FeesGroup()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _context.Users.FindAsync(userId);
            var companyId = user?.CompanyId ?? (await _context.Companies.Select(c => c.Id).FirstOrDefaultAsync());
            
            var groups = await _context.FeesGroups
                .Where(g => g.CompanyId == companyId)
                .Include(g => g.FeesTypes)
                .ToListAsync();
            return View(groups);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateFeesGroup(FeesGroup group)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _context.Users.FindAsync(userId);
            var companyId = user?.CompanyId ?? (await _context.Companies.Select(c => (int?)c.Id).FirstOrDefaultAsync());

            if (companyId.HasValue)
            {
                group.CompanyId = companyId.Value;
                group.CreatedAt = DateTime.UtcNow;
                group.IsActive = true;
                
                // Clear CompanyId from ModelState as we assigned it manually
                ModelState.Remove(nameof(group.CompanyId));
                ModelState.Remove(nameof(group.Company));

                if (ModelState.IsValid)
                {
                    _context.FeesGroups.Add(group);
                    await _context.SaveChangesAsync();
                    TempData["Success"] = "Fees Group created successfully.";
                    return RedirectToAction(nameof(FeesGroup));
                }
            }
            else
            {
                TempData["Error"] = "Company/Institution not found. Please setup company first.";
            }

            var errors = string.Join(" ", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage));
            TempData["Error"] = TempData["Error"] ?? ("Failed to create Fees Group. " + errors);
            return RedirectToAction(nameof(FeesGroup));
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteFeesGroup(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _context.Users.FindAsync(userId);
            var companyId = user?.CompanyId ?? (await _context.Companies.Select(c => c.Id).FirstOrDefaultAsync());

            var group = await _context.FeesGroups
                .Include(g => g.FeesTypes)
                .FirstOrDefaultAsync(g => g.Id == id && g.CompanyId == companyId);

            if (group != null)
            {
                if (group.FeesTypes.Any())
                {
                    TempData["Error"] = "Cannot delete group that has associated Fee Heads. Delete heads first.";
                }
                else
                {
                    _context.FeesGroups.Remove(group);
                    await _context.SaveChangesAsync();
                    TempData["Success"] = "Fees Group deleted successfully.";
                }
            }
            return RedirectToAction(nameof(FeesGroup));
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditFeesGroup(FeesGroup group)
        {
            if (ModelState.IsValid)
            {
                var existingGroup = await _context.FeesGroups.FindAsync(group.Id);
                if (existingGroup != null)
                {
                    existingGroup.Name = group.Name;
                    existingGroup.Description = group.Description;
                    await _context.SaveChangesAsync();
                    TempData["Success"] = "Fees Group updated successfully.";
                    return RedirectToAction(nameof(FeesGroup));
                }
            }
            TempData["Error"] = "Failed to update Fees Group. Please check your input.";
            return RedirectToAction(nameof(FeesGroup));
        }

        public async Task<IActionResult> FeesType()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _context.Users.FindAsync(userId);
            var companyId = user?.CompanyId ?? (await _context.Companies.Select(c => c.Id).FirstOrDefaultAsync());

            var types = await _context.FeesTypes
                .Include(t => t.FeesGroup)
                .Where(t => t.FeesGroup.CompanyId == companyId)
                .ToListAsync();
            
            ViewBag.FeesGroups = new SelectList(await _context.FeesGroups.Where(g => g.CompanyId == companyId).ToListAsync(), "Id", "Name");
            return View(types);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateFeesType(FeesType type)
        {
            // Remove navigation properties from validation
            ModelState.Remove(nameof(type.FeesGroup));

            if (ModelState.IsValid)
            {
                type.CreatedAt = DateTime.UtcNow;
                type.IsActive = true;
                _context.FeesTypes.Add(type);
                await _context.SaveChangesAsync();
                TempData["Success"] = "Fees Head created successfully.";
                return RedirectToAction(nameof(FeesType));
            }

            var errors = string.Join(" ", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage));
            TempData["Error"] = "Failed to create Fees Head. " + errors;
            return RedirectToAction(nameof(FeesType));
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditFeesType(FeesType type)
        {
            ModelState.Remove(nameof(type.FeesGroup));
            if (ModelState.IsValid)
            {
                var existingType = await _context.FeesTypes.FindAsync(type.Id);
                if (existingType != null)
                {
                    existingType.Name = type.Name;
                    existingType.FeesGroupId = type.FeesGroupId;
                    existingType.Amount = type.Amount;
                    existingType.Description = type.Description;
                    await _context.SaveChangesAsync();
                    TempData["Success"] = "Fees Head updated successfully.";
                    return RedirectToAction(nameof(FeesType));
                }
            }
            TempData["Error"] = "Failed to update Fees Head. Please check your input.";
            return RedirectToAction(nameof(FeesType));
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteFeesType(int id)
        {
            var type = await _context.FeesTypes.FindAsync(id);
            if (type != null)
            {
                _context.FeesTypes.Remove(type);
                await _context.SaveChangesAsync();
                TempData["Success"] = "Fees Head deleted successfully.";
            }
            return RedirectToAction(nameof(FeesType));
        }

        // --- Fees Invoice ---
        public async Task<IActionResult> FeesInvoice(int? classId, string? admissionNo)
        {
            var invoices = _context.FeesInvoices
                .Include(i => i.Student)
                .Include(i => i.AcademicYear)
                .OrderByDescending(i => i.Date)
                .AsQueryable();

            if (classId.HasValue)
                invoices = invoices.Where(i => i.Student.ClassId == classId.Value);
            
            if (!string.IsNullOrEmpty(admissionNo))
                invoices = invoices.Where(i => i.Student.AdmissionNumber == admissionNo);

            ViewBag.Classes = new SelectList(await _context.Classes.ToListAsync(), "Id", "Name", classId);
            return View(await invoices.ToListAsync());
        }

        public async Task<IActionResult> InvoicePrint(int id)
        {
            var invoice = await _context.FeesInvoices
                .Include(i => i.Student)
                    .ThenInclude(s => s.Class)
                .Include(i => i.Student)
                    .ThenInclude(s => s.Section)
                .Include(i => i.Student)
                    .ThenInclude(s => s.Route)
                .Include(i => i.Details)
                    .ThenInclude(d => d.FeesType)
                .Include(i => i.AcademicYear)
                .FirstOrDefaultAsync(i => i.Id == id);

            if (invoice == null) return NotFound();
            
            ViewBag.Company = await _context.Companies.FirstOrDefaultAsync() ?? new Company { Name = "EasyEdu", Address = "Main Campus" };

            return View(invoice);
        }

        public async Task<IActionResult> BulkInvoice()
        {
            ViewBag.Classes = new SelectList(await _context.Classes.ToListAsync(), "Id", "Name");
            ViewBag.AcademicYears = new SelectList(await _context.AcademicYears.ToListAsync(), "Id", "Name");
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> BulkInvoice(int classId, int? sectionId, DateTime dueDate, List<int> feeTypeIds, bool includeTransport)
        {
            if (classId == 0 || (feeTypeIds?.Any() != true && !includeTransport))
            {
                TempData["Error"] = "Please select class and at least one fee head.";
                return RedirectToAction(nameof(BulkInvoice));
            }

            var academicYear = await _context.AcademicYears.FirstOrDefaultAsync(y => y.IsCurrent)
                               ?? await _context.AcademicYears.FirstOrDefaultAsync();

            if (academicYear == null)
            {
                TempData["Error"] = "No active academic year found.";
                return RedirectToAction(nameof(BulkInvoice));
            }

            var query = _context.Students.Include(s => s.Route).Where(s => s.ClassId == classId && s.IsActive);
            if (sectionId.HasValue && sectionId > 0)
            {
                query = query.Where(s => s.SectionId == sectionId.Value);
            }

            var students = await query.ToListAsync();
            var feesTypes = await _context.FeesTypes.Where(ft => feeTypeIds.Contains(ft.Id)).ToListAsync();

            if (!students.Any())
            {
                TempData["Error"] = "No active students found for the selected criteria.";
                return RedirectToAction(nameof(BulkInvoice));
            }

            var companyId = academicYear.CompanyId;
            var settings = await _context.BulkInvoiceSettings.FirstOrDefaultAsync(s => s.CompanyId == companyId);
            if (settings == null)
            {
                settings = new BulkInvoiceSettings { CompanyId = companyId, InvoicePrefix = "INV-", NextInvoiceNumber = 1001 };
                _context.BulkInvoiceSettings.Add(settings);
                await _context.SaveChangesAsync();
            }

            int successCount = 0;
            foreach (var student in students)
            {
                try
                {
                    var prefix = settings.InvoicePrefix ?? "INV-";
                    var invNo = $"{prefix}{settings.NextInvoiceNumber++}";

                    var invoice = new FeesInvoice
                    {
                        InvoiceNumber = invNo,
                        StudentId = student.Id,
                        AcademicYearId = academicYear.Id,
                        Date = DateTime.UtcNow,
                        DueDate = dueDate,
                        Status = "Unpaid",
                        Details = new List<FeesInvoiceDetail>()
                    };

                    decimal totalAmount = 0;
                    foreach (var ft in feesTypes)
                    {
                        totalAmount += ft.Amount;
                        invoice.Details.Add(new FeesInvoiceDetail
                        {
                            FeesTypeId = ft.Id,
                            Amount = ft.Amount
                        });
                    }

                    if (includeTransport && student.Route != null)
                    {
                        var transportAmount = student.Route.RouteFee ?? 0;
                        totalAmount += transportAmount;
                        var transportFeeType = await _context.FeesTypes.FirstOrDefaultAsync(t => t.Name == "Transport Fee")
                                              ?? await CreateTransportFeeType(student.CompanyId);

                        invoice.Details.Add(new FeesInvoiceDetail
                        {
                            FeesTypeId = transportFeeType.Id,
                            Amount = transportAmount
                        });
                    }

                    invoice.TotalAmount = totalAmount;
                    _context.FeesInvoices.Add(invoice);
                    await _context.SaveChangesAsync();

                    // Accounting Posting
                    var loadedInvoice = await _context.FeesInvoices
                        .Include(i => i.Student)
                        .Include(i => i.Details).ThenInclude(d => d.FeesType)
                        .FirstOrDefaultAsync(i => i.Id == invoice.Id);
                    
                    if (loadedInvoice != null) await PostInvoiceToLedger(loadedInvoice);
                    
                    successCount++;
                }
                catch { /* Log error for specific student if needed */ }
            }

            TempData["Success"] = $"Bulk generation complete! {successCount} invoices generated.";
            return RedirectToAction(nameof(FeesInvoice));
        }

        private async Task<FeesType> CreateTransportFeeType(int companyId)
        {
            var group = await _context.FeesGroups.FirstOrDefaultAsync(g => g.CompanyId == companyId)
                        ?? new FeesGroup { Name = "General Services", CompanyId = companyId };
            
            if (group.Id == 0) _context.FeesGroups.Add(group);
            
            var transportFeeType = new FeesType { Name = "Transport Fee", Amount = 0, FeesGroupId = group.Id, FeesCode = "TRANS" };
            _context.FeesTypes.Add(transportFeeType);
            await _context.SaveChangesAsync();
            return transportFeeType;
        }

        [HttpGet]
        public async Task<IActionResult> GetSectionsByClass(int classId)
        {
            var sections = await _context.ClassSections
                .Where(cs => cs.ClassId == classId)
                .Include(cs => cs.Section)
                .Select(cs => new { cs.Section.Id, cs.Section.Name })
                .ToListAsync();
            return Json(sections);
        }

        public async Task<IActionResult> ReceiptPrint(int id)
        {
            var collection = await _context.FeeCollections
                .Include(c => c.Student)
                    .ThenInclude(s => s.Class)
                .Include(c => c.Student)
                    .ThenInclude(s => s.Section)
                .Include(c => c.Student)
                    .ThenInclude(s => s.Route)
                .Include(c => c.FeesInvoice)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (collection == null) return NotFound();

            ViewBag.Company = await _context.Companies.FirstOrDefaultAsync() ?? new Company { Name = "EasyEdu", Address = "Main Campus" };
            
            return View(collection);
        }

        public async Task<IActionResult> CreateInvoice()
        {
            ViewBag.Classes = new SelectList(await _context.Classes.ToListAsync(), "Id", "Name");
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateInvoice(int classId, int studentId, DateTime dueDate, List<int> feeTypeIds, bool includeTransport)
        {
            // 1. Validation
            if (studentId == 0 || (feeTypeIds?.Any() != true && !includeTransport)) 
            {
                ModelState.AddModelError("", "Please select a student and at least one fee type.");
                ViewBag.Classes = new SelectList(await _context.Classes.ToListAsync(), "Id", "Name");
                return View();
            }

            var student = await _context.Students.Include(s => s.Route).FirstOrDefaultAsync(s => s.Id == studentId);
            var feesTypes = await _context.FeesTypes.Where(ft => feeTypeIds.Contains(ft.Id)).ToListAsync();
            var academicYear = await _context.AcademicYears.FirstOrDefaultAsync(y => y.IsCurrent) 
                               ?? await _context.AcademicYears.FirstOrDefaultAsync();

            if (student == null || academicYear == null) return NotFound("Student or Academic Year not found.");

            var companyId = student.CompanyId;
            var settings = await _context.BulkInvoiceSettings.FirstOrDefaultAsync(s => s.CompanyId == companyId);
            if (settings == null)
            {
                settings = new BulkInvoiceSettings { CompanyId = companyId, InvoicePrefix = "INV-", NextInvoiceNumber = 1001 };
                _context.BulkInvoiceSettings.Add(settings);
                await _context.SaveChangesAsync();
            }

            var prefix = settings.InvoicePrefix ?? "INV-";
            var invNo = $"{prefix}{settings.NextInvoiceNumber++}";

            // 2. Create Invoice
            var invoice = new FeesInvoice
            {
                InvoiceNumber = invNo,
                StudentId = studentId,
                AcademicYearId = academicYear.Id,
                Date = DateTime.UtcNow,
                DueDate = dueDate,
                Status = "Unpaid",
                Details = new List<FeesInvoiceDetail>()
            };

            decimal totalAmount = 0;
            // Standard Fees
            foreach (var ft in feesTypes)
            {
                totalAmount += ft.Amount;
                invoice.Details.Add(new FeesInvoiceDetail
                {
                    FeesTypeId = ft.Id,
                    Amount = ft.Amount,
                    Waiver = 0,
                    Fine = 0,
                    PaidAmount = 0
                });
            }

            // Transport Fee
            if (includeTransport && student.Route != null)
            {
                var transportAmount = student.Route.RouteFee ?? 0;
                totalAmount += transportAmount;
                // Add as a special FeeType if it exists, or create one on the fly? 
                // Better: Get or Create a 'Transport Fee' FeeType in db.
                var transportFeeType = await _context.FeesTypes.FirstOrDefaultAsync(t => t.Name == "Transport Fee");
                if (transportFeeType == null)
                {
                    var group = await _context.FeesGroups.FirstOrDefaultAsync() ?? new FeesGroup { Name = "General", CompanyId = student.CompanyId };
                    if (group.Id == 0) _context.FeesGroups.Add(group);
                    
                    transportFeeType = new FeesType { Name = "Transport Fee", Amount = 0, FeesGroupId = group.Id, FeesCode = "TRANS" };
                    _context.FeesTypes.Add(transportFeeType);
                    await _context.SaveChangesAsync();
                }

                invoice.Details.Add(new FeesInvoiceDetail
                {
                    FeesTypeId = transportFeeType.Id,
                    Amount = transportAmount,
                    Waiver = 0,
                    Fine = 0,
                    PaidAmount = 0
                });
            }

            invoice.TotalAmount = totalAmount;

            _context.FeesInvoices.Add(invoice);
            await _context.SaveChangesAsync();

            // 3. ACCOUNTING POSTING
            // Reload with includes for accounting logic to have access to Fee Head Names
            var loadedInvoice = await _context.FeesInvoices
                .Include(i => i.Student)
                .Include(i => i.Details)
                    .ThenInclude(d => d.FeesType)
                .FirstOrDefaultAsync(i => i.Id == invoice.Id);

            if (loadedInvoice != null)
                await PostInvoiceToLedger(loadedInvoice);

            TempData["Success"] = "Invoice generated successfully and posted to accounts.";
            return RedirectToAction(nameof(FeesInvoice));
        }

        private async Task PostInvoiceToLedger(FeesInvoice invoice)
        {
            // 1. Get or Create STUDENT LEDGER (Sub-Ledger under Accounts Receivable)
            // e.g. "Sharief Abdulla (ADM-0001)"
            var studentLedgerName = $"{invoice.Student.FirstName} {invoice.Student.LastName} ({invoice.Student.AdmissionNumber})";
            var studentLedger = await GetOrCreateLedger(studentLedgerName, "Accounts Receivable", invoice.StudentId);

            var voucher = new Voucher
            {
                VoucherNumber = "JRN-" + invoice.InvoiceNumber,
                Date = invoice.Date,
                Type = VoucherType.Journal, // Due Entry
                Narration = $"Fees Invoice #{invoice.InvoiceNumber} - {studentLedgerName}",
                CompanyId = invoice.Student.CompanyId,
                CreatedAt = DateTime.UtcNow,
                CreatedBy = User.Identity?.Name ?? "System"
            };

            // 2. Debit Student (Receivable)
            voucher.Details.Add(new VoucherDetail
            {
                LedgerId = studentLedger.Id,
                DebitAmount = invoice.TotalAmount,
                CreditAmount = 0,
                Note = "Invoice Due"
            });
            studentLedger.OpeningBalance += invoice.TotalAmount; // Increase Receivable

            // 3. Credit Income Accounts (Split by Fee Type)
            // We group by Fee Type in case there are duplicates, though unlikely in invoices
            foreach (var detail in invoice.Details)
            {
                // Find target income ledger for this fee type
                // Convention: "Tuition Fees" -> "Tuition Fees Income"
                // If FeeType has a specific LedgerId (future enhancement), use it.
                // For now, create/get ledgers by Fee Name + " Income"
                
                string feeIncomeLedgerName = detail.FeesType.Name + " Income"; // Dynamic Income Head
                var incomeLedger = await GetOrCreateLedger(feeIncomeLedgerName, "Direct Income"); // Assuming Direct Income

                voucher.Details.Add(new VoucherDetail
                {
                    LedgerId = incomeLedger.Id,
                    DebitAmount = 0,
                    CreditAmount = detail.Amount,
                    Note = detail.FeesType.Name
                });
                
                incomeLedger.OpeningBalance += detail.Amount; // Credit increases Income
            }

            _context.Vouchers.Add(voucher);
            await _context.SaveChangesAsync();
        }

        private async Task PostPaymentToLedger(FeeCollection collection)
        {
            // 1. Get Student Ledger
             var student = await _context.Students.FindAsync(collection.StudentId);
             if (student == null) return;

             var studentLedgerName = $"{student.FirstName} {student.LastName} ({student.AdmissionNumber})";
             var studentLedger = await GetOrCreateLedger(studentLedgerName, "Accounts Receivable", student.Id);

             // 2. Get Cash/Bank Ledger
             // For simplicity, defaulting to "Cash In Hand". In production, select based on Payment Mode.
             var cashLedger = await GetOrCreateLedger("Cash In Hand", "Cash-in-hand");

             var voucher = new Voucher
             {
                 VoucherNumber = "RCPT-" + collection.ReceiptNumber,
                 Date = collection.CreatedAt,
                 Type = VoucherType.Receipt,
                 Narration = $"Fee Collection #{collection.ReceiptNumber} from {student.AdmissionNumber}",
                 CompanyId = student.CompanyId,
                 CreatedAt = DateTime.UtcNow,
                 CreatedBy = User.Identity?.Name ?? "System"
             };

             // Debit Cash (Asset Increases)
             voucher.Details.Add(new VoucherDetail
             {
                  LedgerId = cashLedger.Id,
                  DebitAmount = collection.AmountPaid,
                  CreditAmount = 0,
                  Note = "Received Cash/Bank"
             });
             cashLedger.OpeningBalance += collection.AmountPaid;

             // Credit Student (Asset/Receivable Decreases)
             voucher.Details.Add(new VoucherDetail
             {
                 LedgerId = studentLedger.Id,
                 DebitAmount = 0,
                 CreditAmount = collection.AmountPaid,
                 Note = "Payment Received"
             });
             studentLedger.OpeningBalance -= collection.AmountPaid; // Decrease Receivable

             _context.Vouchers.Add(voucher);
             await _context.SaveChangesAsync();
        }

        private async Task<Ledger> GetOrCreateLedger(string name, string groupName, int? studentId = null)
        {
            var ledger = await _context.Ledgers.FirstOrDefaultAsync(l => l.Name == name);
            if (ledger == null)
            {
                var company = await _context.Companies.FirstOrDefaultAsync();
                var group = await _context.AccountGroups.FirstOrDefaultAsync(g => g.Name == groupName);
                
                if (group == null)
                {
                    // Map generic group names to appropriate AccountNature
                    var nature = AccountNature.Assets;
                    if (groupName.Contains("Income")) nature = AccountNature.Income;
                    else if (groupName.Contains("Expense")) nature = AccountNature.Expenses;
                    else if (groupName.Contains("Liability")) nature = AccountNature.Liabilities;

                    group = new AccountGroup { Name = groupName, CompanyId = company?.Id ?? 1, Nature = nature };
                    _context.AccountGroups.Add(group);
                    await _context.SaveChangesAsync();
                }

                ledger = new Ledger
                {
                    Name = name,
                    AccountGroupId = group.Id,
                    CompanyId = company?.Id ?? 1,
                    IsSystem = true, // Auto-created
                    StudentId = studentId
                };
                _context.Ledgers.Add(ledger);
                await _context.SaveChangesAsync();
            }
            return ledger;
        }

        // --- Bank Payment ---
        public async Task<IActionResult> BankPayment()
        {
            var payments = await _context.BankPayments
                .Include(p => p.Student)
                .Include(p => p.FeesInvoice)
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();
            return View(payments);
        }

        [HttpPost]
        public async Task<IActionResult> ApproveBankPayment(int id)
        {
            var payment = await _context.BankPayments.Include(p => p.FeesInvoice).FirstOrDefaultAsync(p => p.Id == id);
            if (payment != null)
            {
                payment.Status = "Approved";
                payment.ApprovedBy = User.Identity?.Name;
                
                // Update Invoice
                payment.FeesInvoice.PaidAmount += payment.Amount;
                if (payment.FeesInvoice.PaidAmount >= payment.FeesInvoice.TotalAmount)
                    payment.FeesInvoice.Status = "Paid";
                else
                    payment.FeesInvoice.Status = "Partial";

                await _context.SaveChangesAsync();
                TempData["Success"] = "Payment approved and invoice updated.";
            }
            return RedirectToAction(nameof(BankPayment));
        }

        // --- Fees Carry Forward ---
        public async Task<IActionResult> FeesCarryForward()
        {
            var carryForwards = await _context.FeesCarryForwards
                .Include(cf => cf.Student)
                .ToListAsync();
            ViewBag.AcademicYears = new SelectList(await _context.AcademicYears.ToListAsync(), "Id", "Name");
            return View(carryForwards);
        }
        [HttpGet]
        public async Task<IActionResult> GetFeesTypesJson()
        {
            var types = await _context.FeesTypes.Where(t => t.IsActive).Select(t => new { t.Id, t.Name, t.Amount }).ToListAsync();
            return Json(types);
        }
        [HttpGet]
        public async Task<IActionResult> GetStudentDetails(int id)
        {
            var student = await _context.Students
                .Include(s => s.Route)
                .Select(s => new {
                    s.Id,
                    s.FirstName,
                    s.LastName,
                    RouteName = s.Route != null ? s.Route.Name : null,
                    RouteFee = s.Route != null ? s.Route.RouteFee : 0
                })
                .FirstOrDefaultAsync(s => s.Id == id);
            return Json(student);
        }

        [HttpGet]
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

        // --- Bulk Invoice Print ---
        public async Task<IActionResult> BulkInvoicePrint(int? classId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _context.Users.FindAsync(userId);
            var companyId = user?.CompanyId ?? (await _context.Companies.Select(c => c.Id).FirstOrDefaultAsync());

            ViewBag.Classes = new SelectList(await _context.Classes.ToListAsync(), "Id", "Name", classId);
            ViewBag.Settings = await _context.BulkInvoiceSettings.FirstOrDefaultAsync(s => s.CompanyId == companyId) 
                              ?? new BulkInvoiceSettings { CompanyId = companyId };

            var invoices = _context.FeesInvoices.Include(i => i.Student).ThenInclude(s => s.Class).AsQueryable();
            if (classId.HasValue) invoices = invoices.Where(i => i.Student.ClassId == classId.Value);
            return View(await invoices.ToListAsync());
        }

        // --- Bulk Invoice Print Settings ---
        public async Task<IActionResult> BulkInvoicePrintSettings()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _context.Users.FindAsync(userId);
            var companyId = user?.CompanyId ?? (await _context.Companies.Select(c => c.Id).FirstOrDefaultAsync());

            var settings = await _context.BulkInvoiceSettings.FirstOrDefaultAsync(s => s.CompanyId == companyId)
                           ?? new BulkInvoiceSettings { CompanyId = companyId };
            
            return View(settings);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SaveBulkInvoiceSettings(BulkInvoiceSettings settings, IFormFile? signature)
        {
            var existing = await _context.BulkInvoiceSettings.FirstOrDefaultAsync(s => s.Id == settings.Id);
            
            if (signature != null)
            {
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(signature.FileName);
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads/signatures", fileName);
                
                Directory.CreateDirectory(Path.GetDirectoryName(filePath)!);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await signature.CopyToAsync(stream);
                }
                settings.SignaturePath = "/uploads/signatures/" + fileName;
            }

            if (existing != null)
            {
                _context.Entry(existing).CurrentValues.SetValues(settings);
                if (settings.SignaturePath == null) settings.SignaturePath = existing.SignaturePath;
                existing.UpdatedAt = DateTime.UtcNow;
            }
            else
            {
                settings.UpdatedAt = DateTime.UtcNow;
                _context.BulkInvoiceSettings.Add(settings);
            }

            await _context.SaveChangesAsync();
            TempData["Success"] = "Bulk Invoice Settings updated successfully.";
            return RedirectToAction(nameof(BulkInvoicePrintSettings));
        }
    }

    /* --- ViewModel Definitions --- */

    public class FinancialReportsViewModel
    {
        public decimal TotalIncome { get; set; }
        public decimal TotalExpenses { get; set; }
        public decimal PendingFees { get; set; }
        public decimal NetProfit => TotalIncome - TotalExpenses;
        public List<TransactionItem> RecentTransactions { get; set; } = new();
    }

    public class TransactionItem
    {
        public DateTime Date { get; set; }
        public string Description { get; set; } = "";
        public decimal Amount { get; set; }
        public string Type { get; set; } = "";
    }

    public class TrialBalanceItem
    {
        public string Account { get; set; } = "";
        public decimal Debit { get; set; }
        public decimal Credit { get; set; }
    }

    public class ClassRevenueViewModel
    {
        public string ClassName { get; set; } = "";
        public decimal AmountCollected { get; set; }
        public decimal AmountPending { get; set; }
        public int StudentCount { get; set; }
    }
}

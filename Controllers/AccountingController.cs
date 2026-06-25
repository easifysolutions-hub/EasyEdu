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
    public class AccountingController : Controller
    {
        private readonly ApplicationDbContext _context;

        public AccountingController(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            var s = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
            var e = DateTime.Now;

            ViewBag.TotalReceipts = await _context.VoucherDetails
                .Where(vd => vd.Voucher.Type == VoucherType.Receipt && vd.Voucher.Date >= s && vd.Voucher.Date <= e && vd.DebitAmount > 0)
                .SumAsync(vd => vd.DebitAmount);

            ViewBag.TotalPayments = await _context.VoucherDetails
                .Where(vd => vd.Voucher.Type == VoucherType.Payment && vd.Voucher.Date >= s && vd.Voucher.Date <= e && vd.CreditAmount > 0)
                .SumAsync(vd => vd.CreditAmount);

            ViewBag.RecentVouchers = await _context.Vouchers
                .OrderByDescending(v => v.Date)
                .Take(10)
                .ToListAsync();

            return View();
        }

        public async Task<IActionResult> SeedDefaults()
        {
            var company = await _context.Companies.FirstOrDefaultAsync();
            int companyId = company?.Id ?? 1;

            if (!await _context.AccountGroups.AnyAsync())
            {
                // Root Groups
                var assets = new AccountGroup { Name = "Assets", Nature = AccountNature.Assets, IsPrimary = true, CompanyId = companyId };
                var liabilities = new AccountGroup { Name = "Liabilities", Nature = AccountNature.Liabilities, IsPrimary = true, CompanyId = companyId };
                var income = new AccountGroup { Name = "Income", Nature = AccountNature.Income, IsPrimary = true, CompanyId = companyId };
                var expenses = new AccountGroup { Name = "Expenses", Nature = AccountNature.Expenses, IsPrimary = true, CompanyId = companyId };
                
                _context.AccountGroups.AddRange(assets, liabilities, income, expenses);
                await _context.SaveChangesAsync();

                // Sub Groups
                var capitalAccount = new AccountGroup { Name = "Capital Account", ParentGroupId = liabilities.Id, Nature = AccountNature.Liabilities, CompanyId = companyId };
                var currentLiabilities = new AccountGroup { Name = "Current Liabilities", ParentGroupId = liabilities.Id, Nature = AccountNature.Liabilities, CompanyId = companyId };
                var loansLiab = new AccountGroup { Name = "Loans (Liabilities)", ParentGroupId = liabilities.Id, Nature = AccountNature.Liabilities, CompanyId = companyId };
                
                var currentAssets = new AccountGroup { Name = "Current Assets", ParentGroupId = assets.Id, Nature = AccountNature.Assets, CompanyId = companyId };
                var fixedAssets = new AccountGroup { Name = "Fixed Assets", ParentGroupId = assets.Id, Nature = AccountNature.Assets, CompanyId = companyId };
                var investments = new AccountGroup { Name = "Investments", ParentGroupId = assets.Id, Nature = AccountNature.Assets, CompanyId = companyId };
                
                var directIncome = new AccountGroup { Name = "Direct Income", ParentGroupId = income.Id, Nature = AccountNature.Income, CompanyId = companyId };
                var indirectIncome = new AccountGroup { Name = "Indirect Income", ParentGroupId = income.Id, Nature = AccountNature.Income, CompanyId = companyId };
                
                var directExpenses = new AccountGroup { Name = "Direct Expenses", ParentGroupId = expenses.Id, Nature = AccountNature.Expenses, CompanyId = companyId };
                var indirectExpenses = new AccountGroup { Name = "Indirect Expenses", ParentGroupId = expenses.Id, Nature = AccountNature.Expenses, CompanyId = companyId };
                
                _context.AccountGroups.AddRange(capitalAccount, currentLiabilities, loansLiab, currentAssets, fixedAssets, investments, directIncome, indirectIncome, directExpenses, indirectExpenses);
                await _context.SaveChangesAsync();

                // Further Sub Groups
                var bankAccounts = new AccountGroup { Name = "Bank Accounts", ParentGroupId = currentAssets.Id, Nature = AccountNature.Assets, CompanyId = companyId };
                var cashInHand = new AccountGroup { Name = "Cash-in-Hand", ParentGroupId = currentAssets.Id, Nature = AccountNature.Assets, CompanyId = companyId };
                var sundryDebtors = new AccountGroup { Name = "Sundry Debtors", ParentGroupId = currentAssets.Id, Nature = AccountNature.Assets, CompanyId = companyId };
                
                var dutiesTaxes = new AccountGroup { Name = "Duties & Taxes", ParentGroupId = currentLiabilities.Id, Nature = AccountNature.Liabilities, CompanyId = companyId };
                var sundryCreditors = new AccountGroup { Name = "Sundry Creditors", ParentGroupId = currentLiabilities.Id, Nature = AccountNature.Liabilities, CompanyId = companyId };
                var provisions = new AccountGroup { Name = "Provisions", ParentGroupId = currentLiabilities.Id, Nature = AccountNature.Liabilities, CompanyId = companyId };

                _context.AccountGroups.AddRange(bankAccounts, cashInHand, sundryDebtors, dutiesTaxes, sundryCreditors, provisions);
                await _context.SaveChangesAsync();
                
                // --- Default Ledgers ---
                var ledgers = new List<Ledger>();

                // Cash/Bank
                ledgers.Add(new Ledger { Name = "Cash Account", AccountGroupId = cashInHand.Id, IsSystem = true, CompanyId = companyId, IsDebitOpening = true });
                ledgers.Add(new Ledger { Name = "Petty Cash", AccountGroupId = cashInHand.Id, CompanyId = companyId, IsDebitOpening = true });
                ledgers.Add(new Ledger { Name = "Standard Chartered Bank", AccountGroupId = bankAccounts.Id, CompanyId = companyId, IsDebitOpening = true });
                ledgers.Add(new Ledger { Name = "State Bank of India", AccountGroupId = bankAccounts.Id, CompanyId = companyId, IsDebitOpening = true });

                // Incomes
                ledgers.Add(new Ledger { Name = "Admission Fees", AccountGroupId = directIncome.Id, CompanyId = companyId });
                ledgers.Add(new Ledger { Name = "Tution Fees", AccountGroupId = directIncome.Id, CompanyId = companyId });
                ledgers.Add(new Ledger { Name = "Transport Fees", AccountGroupId = directIncome.Id, CompanyId = companyId });
                ledgers.Add(new Ledger { Name = "Hostel Fees", AccountGroupId = directIncome.Id, CompanyId = companyId });
                ledgers.Add(new Ledger { Name = "Library Fees", AccountGroupId = directIncome.Id, CompanyId = companyId });
                ledgers.Add(new Ledger { Name = "Examination Fees", AccountGroupId = directIncome.Id, CompanyId = companyId });
                ledgers.Add(new Ledger { Name = "Fine / Penalty Income", AccountGroupId = indirectIncome.Id, CompanyId = companyId });
                ledgers.Add(new Ledger { Name = "Misc. Receipts", AccountGroupId = indirectIncome.Id, CompanyId = companyId });

                // Expenses
                ledgers.Add(new Ledger { Name = "Teaching Staff Salary", AccountGroupId = indirectExpenses.Id, CompanyId = companyId });
                ledgers.Add(new Ledger { Name = "Non-Teaching Staff Salary", AccountGroupId = indirectExpenses.Id, CompanyId = companyId });
                ledgers.Add(new Ledger { Name = "Office Stationery", AccountGroupId = indirectExpenses.Id, CompanyId = companyId });
                ledgers.Add(new Ledger { Name = "Electricity Charges", AccountGroupId = indirectExpenses.Id, CompanyId = companyId });
                ledgers.Add(new Ledger { Name = "Telephone & Internet", AccountGroupId = indirectExpenses.Id, CompanyId = companyId });
                ledgers.Add(new Ledger { Name = "Water Charges", AccountGroupId = indirectExpenses.Id, CompanyId = companyId });
                ledgers.Add(new Ledger { Name = "Marketing & Advertisement", AccountGroupId = indirectExpenses.Id, CompanyId = companyId });
                ledgers.Add(new Ledger { Name = "Computer Maintenance", AccountGroupId = indirectExpenses.Id, CompanyId = companyId });
                ledgers.Add(new Ledger { Name = "Building Maintenance", AccountGroupId = indirectExpenses.Id, CompanyId = companyId });
                ledgers.Add(new Ledger { Name = "Vehicle Fuel & Maintenance", AccountGroupId = indirectExpenses.Id, CompanyId = companyId });

                // Capital & Assets
                ledgers.Add(new Ledger { Name = "School Building", AccountGroupId = fixedAssets.Id, CompanyId = companyId, IsDebitOpening = true });
                ledgers.Add(new Ledger { Name = "Computer Lab Equipment", AccountGroupId = fixedAssets.Id, CompanyId = companyId, IsDebitOpening = true });
                ledgers.Add(new Ledger { Name = "Library Books Asset", AccountGroupId = fixedAssets.Id, CompanyId = companyId, IsDebitOpening = true });
                ledgers.Add(new Ledger { Name = "Furniture & Fixtures", AccountGroupId = fixedAssets.Id, CompanyId = companyId, IsDebitOpening = true });
                ledgers.Add(new Ledger { Name = "Trust Capital Account", AccountGroupId = capitalAccount.Id, CompanyId = companyId });

                // Current Liabilities
                ledgers.Add(new Ledger { Name = "TDS Payable", AccountGroupId = dutiesTaxes.Id, CompanyId = companyId });
                ledgers.Add(new Ledger { Name = "GST Payable", AccountGroupId = dutiesTaxes.Id, CompanyId = companyId });
                ledgers.Add(new Ledger { Name = "Salary Payable", AccountGroupId = provisions.Id, CompanyId = companyId });
                
                _context.Ledgers.AddRange(ledgers);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction("ChartOfAccounts");
        }

        // --- Masters ---
        public async Task<IActionResult> ChartOfAccounts()
        {
            var groups = await _context.AccountGroups
                .Include(g => g.SubGroups)
                .Include(g => g.Ledgers)
                .Where(g => g.ParentGroupId == null) // Root
                .ToListAsync();
            return View(groups);
        }

        public async Task<IActionResult> ItemAccountMaster()
        {
            // Focus on Income and Expense ledgers as they usually represent items
            var groups = await _context.AccountGroups
                .Include(g => g.Ledgers)
                .Where(g => g.Nature == AccountNature.Income || g.Nature == AccountNature.Expenses)
                .ToListAsync();
            return View(groups);
        }

        public async Task<IActionResult> CreateLedger()
        {
            ViewBag.Groups = await _context.AccountGroups.ToListAsync();
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> CreateLedger(Ledger ledger)
        {
            if (ModelState.IsValid)
            {
                ledger.CompanyId = await _context.Companies.Select(c => c.Id).FirstOrDefaultAsync();
                _context.Ledgers.Add(ledger);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(ChartOfAccounts));
            }
            ViewBag.Groups = await _context.AccountGroups.ToListAsync();
            return View(ledger);
        }

        public async Task<IActionResult> AccountLedger(int? ledgerId, DateTime? fromDate, DateTime? toDate)
        {
            ViewBag.Ledgers = new SelectList(await _context.Ledgers.OrderBy(l => l.Name).ToListAsync(), "Id", "Name", ledgerId);
            
            var start = fromDate ?? new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
            var end = toDate ?? DateTime.Now;
            
            ViewBag.FromDate = start;
            ViewBag.ToDate = end;

            if (ledgerId == null) return View(new List<VoucherDetail>());

            ViewBag.SelectedLedger = ledgerId;

            // Fetch transaction details
            var transactions = await _context.VoucherDetails
                .Include(v => v.Voucher)
                .Where(v => v.LedgerId == ledgerId && v.Voucher.Date >= start && v.Voucher.Date <= end)
                .OrderBy(v => v.Voucher.Date)
                .ToListAsync();

            // Calculate Opening Balance (sum of all before start date)
            var openingDr = await _context.VoucherDetails
                .Where(v => v.LedgerId == ledgerId && v.Voucher.Date < start)
                .SumAsync(v => v.DebitAmount);
                
            var openingCr = await _context.VoucherDetails
                .Where(v => v.LedgerId == ledgerId && v.Voucher.Date < start)
                .SumAsync(v => v.CreditAmount);

            var ledgerInfo = await _context.Ledgers.FindAsync(ledgerId);
            decimal initialOp = ledgerInfo?.OpeningBalance ?? 0;
            // Assuming Ledger.OpeningBalance is mostly a Debit for Assets/Exp and Credit for Liab/Inc, but logically it's single column.
            // Simplified logic: If Asset/Exp, Opening is Debit. If Liab/Inc, Opening is Credit.
            // But we stored IsDebitOpening.
            
            if (ledgerInfo != null)
            {
                if (ledgerInfo.IsDebitOpening) openingDr += initialOp;
                else openingCr += initialOp;
            }

            ViewBag.OpeningBalance = openingDr - openingCr; // Net Debit Balance

            return View(transactions);
        }

        // --- Voucher Entry ---
        public async Task<IActionResult> VoucherEntry(VoucherType? type = null)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _context.Users.FindAsync(userId);
            var companyId = user?.CompanyId ?? (await _context.Companies.Select(c => c.Id).FirstOrDefaultAsync());

            ViewBag.Ledgers = await _context.Ledgers
                .Where(l => l.CompanyId == companyId)
                .Include(l => l.AccountGroup)
                .Select(l => new { 
                    Id = l.Id, 
                    Name = l.Name, 
                    Group = l.AccountGroup.Name, 
                    Nature = (int)l.AccountGroup.Nature 
                })
                .ToListAsync();
            
            if (type.HasValue)
            {
                ViewBag.SelectedType = (int)type.Value;
                ViewBag.Title = type.Value.ToString() + " Voucher";
            }
            else
            {
                ViewBag.Title = "Voucher Entry";
            }
            
            return View("VoucherEntry");
        }

        public async Task<IActionResult> PaymentVoucher()
        {
            return await VoucherEntry(VoucherType.Payment);
        }

        public async Task<IActionResult> ReceiptVoucher()
        {
            return await VoucherEntry(VoucherType.Receipt);
        }

        public async Task<IActionResult> ContraVoucher()
        {
            return await VoucherEntry(VoucherType.Contra);
        }

        public async Task<IActionResult> JournalVoucher()
        {
            return await VoucherEntry(VoucherType.Journal);
        }

        [HttpPost]
        public async Task<IActionResult> CreateVoucher([FromBody] VoucherViewModel model)
        {
            if (!ModelState.IsValid)
            {
                var errors = string.Join("; ", ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage));
                return BadRequest("Validation Errors: " + errors);
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _context.Users.FindAsync(userId);
            var companyId = user?.CompanyId ?? (await _context.Companies.Select(c => c.Id).FirstOrDefaultAsync());

            var voucher = new Voucher
            {
                VoucherNumber = model.Type.ToString().Substring(0, 3).ToUpper() + "-" + DateTime.Now.Ticks.ToString().Substring(10),
                Date = model.Date,
                Type = model.Type,
                Narration = model.Narration,
                CompanyId = companyId,
                CreatedBy = User.Identity?.Name,
                CreatedAt = DateTime.UtcNow
            };

            // Calculate totals to ensure balance if Journal
            decimal totalDr = model.Rows.Sum(r => r.Debit);
            decimal totalCr = model.Rows.Sum(r => r.Credit);

            if (totalDr != totalCr)
            {
                return BadRequest("Debit and Credit totals do not match.");
            }

            foreach (var row in model.Rows)
            {
                if (row.Debit > 0 || row.Credit > 0)
                {
                    voucher.Details.Add(new VoucherDetail
                    {
                        LedgerId = row.LedgerId,
                        DebitAmount = row.Debit,
                        CreditAmount = row.Credit,
                        Note = row.Note
                    });
                }
            }

            try
            {
                _context.Vouchers.Add(voucher);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Voucher saved successfully", id = voucher.Id });
            }
            catch (Exception ex)
            {
                var inner = ex.InnerException != null ? " | Inner: " + ex.InnerException.Message : "";
                return BadRequest("Database Error: " + ex.Message + inner);
            }
        }

        // --- Reports ---
        public async Task<IActionResult> TrialBalance()
        {
            var ledgers = await _context.Ledgers
                .Include(l => l.AccountGroup)
                .ToListAsync();

            var ledgerBalances = await _context.VoucherDetails
                .GroupBy(v => v.LedgerId)
                .Select(g => new { 
                    LedgerId = g.Key, 
                    Dr = g.Sum(x => x.DebitAmount),
                    Cr = g.Sum(x => x.CreditAmount)
                })
                .ToListAsync();

            var result = ledgers.Select(l => {
                var trans = ledgerBalances.FirstOrDefault(b => b.LedgerId == l.Id);
                decimal dr = (trans?.Dr ?? 0) + (l.IsDebitOpening ? l.OpeningBalance : 0);
                decimal cr = (trans?.Cr ?? 0) + (!l.IsDebitOpening ? l.OpeningBalance : 0);
                
                return new {
                    l.Name,
                    GroupName = l.AccountGroup.Name,
                    Debit = dr > cr ? dr - cr : 0,
                    Credit = cr > dr ? cr - dr : 0
                };
            }).OrderBy(l => l.Name).ToList();

            ViewBag.TrialBalance = result;
            return View();
        }

        public async Task<IActionResult> BalanceSheet()
        {
            // Load ALL groups and ALL ledgers at once to avoid missing nested data
            var allGroups = await _context.AccountGroups.ToListAsync();
            var allLedgers = await _context.Ledgers.Include(l => l.AccountGroup).ToListAsync();

            // Manually wire up relationships in memory
            var groupDict = allGroups.ToDictionary(g => g.Id);
            foreach (var g in allGroups)
            {
                g.Ledgers = allLedgers.Where(l => l.AccountGroupId == g.Id).ToList();
                g.SubGroups = allGroups.Where(sg => sg.ParentGroupId == g.Id).ToList();
            }

            var groups = allGroups
                .Where(g => g.ParentGroupId == null && (g.Nature == AccountNature.Assets || g.Nature == AccountNature.Liabilities))
                .ToList();

            var ledgerBalances = await _context.VoucherDetails
                .GroupBy(v => v.LedgerId)
                .Select(g => new { 
                    LedgerId = g.Key, 
                    Dr = g.Sum(x => x.DebitAmount),
                    Cr = g.Sum(x => x.CreditAmount)
                })
                .ToListAsync();

            // Store processed balances: Assets/Exp = Dr-Cr, Liab/Inc = Cr-Dr
            var finalBalances = new Dictionary<int, decimal>();
            
            foreach(var l in allLedgers)
            {
                if (l.AccountGroup == null) continue;
                var trans = ledgerBalances.FirstOrDefault(b => b.LedgerId == l.Id);
                decimal dr = (trans?.Dr ?? 0) + (l.IsDebitOpening ? l.OpeningBalance : 0);
                decimal cr = (trans?.Cr ?? 0) + (!l.IsDebitOpening ? l.OpeningBalance : 0);
                
                if (l.AccountGroup.Nature == AccountNature.Assets || l.AccountGroup.Nature == AccountNature.Expenses)
                    finalBalances[l.Id] = dr - cr;
                else
                    finalBalances[l.Id] = cr - dr;
            }

            ViewBag.LedgerBalances = finalBalances;
            return View(groups);
        }

        public async Task<IActionResult> IncomeExpenditure()
        {
            // Load ALL groups and ALL ledgers at once to avoid missing nested data
            var allGroups = await _context.AccountGroups.ToListAsync();
            var allLedgers = await _context.Ledgers.Include(l => l.AccountGroup).ToListAsync();

            // Manually wire up relationships in memory
            foreach (var g in allGroups)
            {
                g.Ledgers = allLedgers.Where(l => l.AccountGroupId == g.Id).ToList();
                g.SubGroups = allGroups.Where(sg => sg.ParentGroupId == g.Id).ToList();
            }

            var groups = allGroups
                .Where(g => g.ParentGroupId == null && (g.Nature == AccountNature.Income || g.Nature == AccountNature.Expenses))
                .ToList();

            var ledgerBalances = await _context.VoucherDetails
                .GroupBy(v => v.LedgerId)
                .Select(g => new { 
                    LedgerId = g.Key, 
                    Dr = g.Sum(x => x.DebitAmount),
                    Cr = g.Sum(x => x.CreditAmount)
                })
                .ToListAsync();

            var finalBalances = new Dictionary<int, decimal>();
            
            foreach(var l in allLedgers)
            {
                if (l.AccountGroup == null) continue;
                var trans = ledgerBalances.FirstOrDefault(b => b.LedgerId == l.Id);
                decimal dr = (trans?.Dr ?? 0);
                decimal cr = (trans?.Cr ?? 0);
                
                if (l.AccountGroup.Nature == AccountNature.Assets || l.AccountGroup.Nature == AccountNature.Expenses)
                    finalBalances[l.Id] = dr - cr;
                else
                    finalBalances[l.Id] = cr - dr;
            }

            ViewBag.LedgerBalances = finalBalances;
            return View(groups);
        }

        public async Task<IActionResult> ReceiptPayment(DateTime? start, DateTime? end)
        {
            var s = start ?? new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
            var e = end ?? DateTime.Now;
            ViewBag.DateRange = $"{s:dd MMM} - {e:dd MMM}";

            // Fetch Cash/Bank Ledgers
            var cashBankGroups = await _context.AccountGroups
                .Where(g => g.Name.Contains("Cash") || g.Name.Contains("Bank"))
                .Select(g => g.Id)
                .ToListAsync();
            
            var cashBankLedgerIds = await _context.Ledgers
                .Where(l => cashBankGroups.Contains(l.AccountGroupId))
                .Select(l => l.Id)
                .ToListAsync();

            // Opening Cash/Bank Balance
            var opDr = await _context.VoucherDetails
                .Where(vd => cashBankLedgerIds.Contains(vd.LedgerId) && vd.Voucher.Date < s)
                .SumAsync(vd => vd.DebitAmount);
            var opCr = await _context.VoucherDetails
                .Where(vd => cashBankLedgerIds.Contains(vd.LedgerId) && vd.Voucher.Date < s)
                .SumAsync(vd => vd.CreditAmount);
            
            // Inclusion of master opening balance (simplified)
            var masterOp = await _context.Ledgers.Where(l => cashBankLedgerIds.Contains(l.Id)).SumAsync(l => l.IsDebitOpening ? l.OpeningBalance : -l.OpeningBalance);
            
            ViewBag.OpeningBalance = opDr - opCr + masterOp;

            // Receipts (Debit side of Cash/Bank)
            // Show the corresponding credit entries in those vouchers
            var voucherIds = await _context.VoucherDetails
                .Where(vd => cashBankLedgerIds.Contains(vd.LedgerId) && vd.Voucher.Date >= s && vd.Voucher.Date <= e && vd.DebitAmount > 0)
                .Select(vd => vd.VoucherId)
                .Distinct()
                .ToListAsync();

            var receipts = await _context.VoucherDetails
                .Include(vd => vd.Ledger)
                .Where(vd => voucherIds.Contains(vd.VoucherId) && !cashBankLedgerIds.Contains(vd.LedgerId) && vd.CreditAmount > 0)
                .GroupBy(vd => vd.Ledger.Name)
                .Select(g => new { Head = g.Key, Amount = g.Sum(x => x.CreditAmount) })
                .ToDictionaryAsync(k => k.Head, v => v.Amount);

            // Payments (Credit side of Cash/Bank)
            var pVoucherIds = await _context.VoucherDetails
                .Where(vd => cashBankLedgerIds.Contains(vd.LedgerId) && vd.Voucher.Date >= s && vd.Voucher.Date <= e && vd.CreditAmount > 0)
                .Select(vd => vd.VoucherId)
                .Distinct()
                .ToListAsync();

            var payments = await _context.VoucherDetails
                .Include(vd => vd.Ledger)
                .Where(vd => pVoucherIds.Contains(vd.VoucherId) && !cashBankLedgerIds.Contains(vd.LedgerId) && vd.DebitAmount > 0)
                .GroupBy(vd => vd.Ledger.Name)
                .Select(g => new { Head = g.Key, Amount = g.Sum(x => x.DebitAmount) })
                .ToDictionaryAsync(k => k.Head, v => v.Amount);

            ViewBag.Receipts = receipts;
            ViewBag.Payments = payments;

            return View();
        }

        [HttpGet]
        public async Task<IActionResult> GetLedgerBalance(int id)
        {
            var dr = await _context.VoucherDetails.Where(vd => vd.LedgerId == id).SumAsync(vd => vd.DebitAmount);
            var cr = await _context.VoucherDetails.Where(vd => vd.LedgerId == id).SumAsync(vd => vd.CreditAmount);
            
            var ledger = await _context.Ledgers.FindAsync(id);
            if (ledger != null)
            {
                if (ledger.IsDebitOpening) dr += ledger.OpeningBalance;
                else cr += ledger.OpeningBalance;
            }

            decimal balance = dr - cr;
            string nature = balance >= 0 ? "DR" : "CR";
            
            return Json(new { balance = Math.Abs(balance).ToString("N2"), nature });
        }

        public async Task<IActionResult> VoucherDetails(int id)
        {
            var voucher = await _context.Vouchers
                .Include(v => v.Details)
                .ThenInclude(d => d.Ledger)
                .FirstOrDefaultAsync(v => v.Id == id);
            if (voucher == null) return NotFound();
            return View(voucher);
        }

        [HttpPost]
        public async Task<IActionResult> DeleteVoucher(int id)
        {
            var voucher = await _context.Vouchers.Include(v => v.Details).FirstOrDefaultAsync(v => v.Id == id);
            if (voucher != null)
            {
                _context.VoucherDetails.RemoveRange(voucher.Details);
                _context.Vouchers.Remove(voucher);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> EditLedger(int id)
        {
            var ledger = await _context.Ledgers.FindAsync(id);
            if (ledger == null) return NotFound();
            ViewBag.Groups = await _context.AccountGroups.ToListAsync();
            return View(ledger);
        }

        [HttpPost]
        public async Task<IActionResult> EditLedger(Ledger ledger)
        {
            if (ModelState.IsValid)
            {
                _context.Update(ledger);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(ChartOfAccounts));
            }
            ViewBag.Groups = await _context.AccountGroups.ToListAsync();
            return View(ledger);
        }

        [HttpPost]
        public async Task<IActionResult> DeleteLedger(int id)
        {
            var ledger = await _context.Ledgers.FindAsync(id);
            if (ledger != null)
            {
                if (ledger.IsSystem)
                {
                    TempData["Error"] = "System ledgers cannot be deleted.";
                    return RedirectToAction(nameof(ChartOfAccounts));
                }

                bool hasTx = await _context.VoucherDetails.AnyAsync(vd => vd.LedgerId == id);
                if (hasTx)
                {
                    TempData["Error"] = "Cannot delete ledger because it contains transactions.";
                    return RedirectToAction(nameof(ChartOfAccounts));
                }

                _context.Ledgers.Remove(ledger);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(ChartOfAccounts));
        }

        // --- Voucher List (All Types) ---
        public async Task<IActionResult> VoucherList(
            string? type = null,
            DateTime? fromDate = null,
            DateTime? toDate = null,
            string? search = null,
            int page = 1)
        {
            var start = fromDate ?? new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
            var end = toDate ?? DateTime.Now;

            ViewBag.FromDate = start.ToString("yyyy-MM-dd");
            ViewBag.ToDate = end.ToString("yyyy-MM-dd");
            ViewBag.SelectedType = type;
            ViewBag.Search = search;
            ViewBag.CurrentPage = page;

            var query = _context.Vouchers
                .Include(v => v.Details)
                .ThenInclude(d => d.Ledger)
                .Where(v => v.Date >= start && v.Date <= end);

            if (!string.IsNullOrEmpty(type) && Enum.TryParse<VoucherType>(type, out var vt))
                query = query.Where(v => v.Type == vt);

            if (!string.IsNullOrEmpty(search))
                query = query.Where(v => v.VoucherNumber.Contains(search) || (v.Narration != null && v.Narration.Contains(search)));

            var totalCount = await query.CountAsync();
            int pageSize = 15;
            ViewBag.TotalCount = totalCount;
            ViewBag.TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

            // Summary stats
            var allInRange = await _context.Vouchers
                .Where(v => v.Date >= start && v.Date <= end)
                .GroupBy(v => v.Type)
                .Select(g => new { Type = g.Key, Count = g.Count() })
                .ToListAsync();

            ViewBag.SummaryStats = allInRange;

            var vouchers = await query
                .OrderByDescending(v => v.Date)
                .ThenByDescending(v => v.Id)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return View(vouchers);
        }

        // --- Sales & Purchase Voucher Entry ---
        public async Task<IActionResult> SalesVoucher()
        {
            return await LoadSalesPurchaseView(VoucherType.Sales);
        }

        public async Task<IActionResult> PurchaseVoucher()
        {
            return await LoadSalesPurchaseView(VoucherType.Purchase);
        }

        private async Task<IActionResult> LoadSalesPurchaseView(VoucherType type)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _context.Users.FindAsync(userId);
            var companyId = user?.CompanyId ?? (await _context.Companies.Select(c => c.Id).FirstOrDefaultAsync());

            ViewBag.Ledgers = await _context.Ledgers
                .Where(l => l.CompanyId == companyId)
                .Include(l => l.AccountGroup)
                .Select(l => new {
                    Id = l.Id,
                    Name = l.Name,
                    Group = l.AccountGroup.Name,
                    Nature = (int)l.AccountGroup.Nature
                })
                .ToListAsync();

            ViewBag.Inventories = await _context.Inventories
                .Where(i => i.CompanyId == companyId && i.IsActive)
                .Select(i => new { i.Id, i.ItemName, i.UnitPrice, i.Quantity, i.Unit })
                .ToListAsync();

            ViewBag.VoucherType = (int)type;
            ViewBag.VoucherTypeName = type.ToString();
            ViewBag.Title = type.ToString() + " Voucher";

            return View("SalesPurchaseVoucher");
        }

        [HttpPost]
        public async Task<IActionResult> CreateSalesPurchaseVoucher([FromBody] SalesPurchaseVoucherViewModel model)
        {
            if (!ModelState.IsValid)
            {
                var errors = string.Join("; ", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage));
                return BadRequest("Validation: " + errors);
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _context.Users.FindAsync(userId);
            var companyId = user?.CompanyId ?? (await _context.Companies.Select(c => c.Id).FirstOrDefaultAsync());

            // Validate stock for Sales
            if (model.Type == VoucherType.Sales)
            {
                foreach (var item in model.Items)
                {
                    var inv = await _context.Inventories.FindAsync(item.InventoryId);
                    if (inv == null) return BadRequest($"Inventory item not found: {item.InventoryId}");
                    if (inv.Quantity < item.Quantity)
                        return BadRequest($"Insufficient stock for '{inv.ItemName}'. Available: {inv.Quantity}, Requested: {item.Quantity}");
                }
            }

            var totalAmount = model.Items.Sum(i => i.Quantity * i.UnitPrice);

            var voucher = new Voucher
            {
                VoucherNumber = model.Type.ToString().Substring(0, 3).ToUpper() + "-" + DateTime.Now.Ticks.ToString().Substring(10),
                Date = model.Date,
                Type = model.Type,
                Narration = model.Narration,
                CompanyId = companyId,
                CreatedBy = User.Identity?.Name,
                CreatedAt = DateTime.UtcNow
            };

            // Build accounting entries
            // For Sales: Dr Cash/Bank, Cr Sales Ledger (per item or combined)
            // For Purchase: Dr Purchase Ledger (per item), Cr Cash/Bank
            foreach (var row in model.AccountRows)
            {
                voucher.Details.Add(new VoucherDetail
                {
                    LedgerId = row.LedgerId,
                    DebitAmount = row.Debit,
                    CreditAmount = row.Credit,
                    Note = row.Note
                });
            }

            // Inventory-linked details
            foreach (var item in model.Items)
            {
                voucher.Details.Add(new VoucherDetail
                {
                    LedgerId = item.LedgerId,
                    DebitAmount = model.Type == VoucherType.Purchase ? item.Quantity * item.UnitPrice : 0,
                    CreditAmount = model.Type == VoucherType.Sales ? item.Quantity * item.UnitPrice : 0,
                    Note = $"Item: {item.ItemName} x{item.Quantity}",
                    InventoryId = item.InventoryId,
                    Quantity = item.Quantity
                });
            }

            // Validate balance
            decimal totalDr = voucher.Details.Sum(d => d.DebitAmount);
            decimal totalCr = voucher.Details.Sum(d => d.CreditAmount);
            if (Math.Abs(totalDr - totalCr) > 0.01m)
                return BadRequest($"Debit ({totalDr:N2}) and Credit ({totalCr:N2}) totals do not match.");

            try
            {
                _context.Vouchers.Add(voucher);
                await _context.SaveChangesAsync();

                // Update Inventory stock
                foreach (var item in model.Items)
                {
                    var inv = await _context.Inventories.FindAsync(item.InventoryId);
                    if (inv != null)
                    {
                        if (model.Type == VoucherType.Sales)
                            inv.Quantity -= item.Quantity;
                        else if (model.Type == VoucherType.Purchase)
                            inv.Quantity += item.Quantity;

                        inv.TotalValue = inv.Quantity * inv.UnitPrice;

                        _context.InventoryTransactions.Add(new InventoryTransaction
                        {
                            InventoryId = inv.Id,
                            TransactionType = model.Type == VoucherType.Sales ? "Issue" : "Receipt",
                            Quantity = item.Quantity,
                            TransactionDate = model.Date,
                            Remarks = $"Via {model.Type} Voucher #{voucher.VoucherNumber}"
                        });
                    }
                }

                await _context.SaveChangesAsync();
                return Ok(new { message = "Voucher saved successfully", id = voucher.Id });
            }
            catch (Exception ex)
            {
                var inner = ex.InnerException != null ? " | Inner: " + ex.InnerException.Message : "";
                return BadRequest("Database Error: " + ex.Message + inner);
            }
        }
    }

    public class VoucherViewModel
    {
        public DateTime Date { get; set; }
        public VoucherType Type { get; set; }
        public string? Narration { get; set; }
        public List<VoucherRow> Rows { get; set; } = new();
    }

    public class VoucherRow
    {
        public int LedgerId { get; set; }
        public decimal Debit { get; set; }
        public decimal Credit { get; set; }
        public string? Note { get; set; }
    }

    public class SalesPurchaseVoucherViewModel
    {
        public DateTime Date { get; set; }
        public VoucherType Type { get; set; }
        public string? Narration { get; set; }
        public List<SalesPurchaseItemRow> Items { get; set; } = new();
        public List<VoucherRow> AccountRows { get; set; } = new();
    }

    public class SalesPurchaseItemRow
    {
        public int InventoryId { get; set; }
        public string ItemName { get; set; } = string.Empty;
        public int LedgerId { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
    }
}

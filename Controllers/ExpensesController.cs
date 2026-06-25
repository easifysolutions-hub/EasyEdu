using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;
using System.Security.Claims;

namespace EasyEdu.Controllers
{
    [Authorize(Roles = "SuperAdmin,Admin,Accountant")]
    public class ExpensesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ExpensesController(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            var companyId = await GetCompanyId();
            var expenses = await _context.Expenses
                .Where(e => e.CompanyId == companyId)
                .OrderByDescending(e => e.Date)
                .ToListAsync();
            return View(expenses);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Expense expense)
        {
            var companyId = await GetCompanyId();
            
            // Remove navigation properties from validation
            ModelState.Remove(nameof(expense.Company));

            if (ModelState.IsValid)
            {
                expense.CompanyId = companyId;
                expense.Date = DateTime.UtcNow;
                expense.CreatedBy = User.Identity?.Name;
                
                _context.Add(expense);
                await _context.SaveChangesAsync();

                // Post to Accounting
                await PostExpenseToLedger(expense);

                return RedirectToAction(nameof(Index));
            }
            return View(expense);
        }

        private async Task PostExpenseToLedger(Expense expense)
        {
            // 1. Get or Create EXPENSE LEDGER (e.g. "Electricity Expense")
            string expenseLedgerName = expense.Category + " Expense";
            var expenseLedger = await GetOrCreateLedger(expenseLedgerName, "Direct Expense");

            // 2. Get Cash/Bank Ledger
            string paymentLedgerName = expense.PaymentMethod == "Bank" ? "Bank Account" : "Cash In Hand";
            string groupName = expense.PaymentMethod == "Bank" ? "Bank Accounts" : "Cash-in-hand";
            var paymentLedger = await GetOrCreateLedger(paymentLedgerName, groupName);

            var voucher = new Voucher
            {
                VoucherNumber = "EXP-" + expense.Id + "-" + DateTime.Now.Ticks.ToString().Substring(14),
                Date = expense.Date,
                Type = VoucherType.Payment,
                Narration = $"Expense: {expense.Title} ({expense.ReferenceNumber ?? "N/A"})",
                CompanyId = expense.CompanyId,
                CreatedAt = DateTime.UtcNow,
                CreatedBy = User.Identity?.Name ?? "System"
            };

            // Debit Expense (Increases Expense)
            voucher.Details.Add(new VoucherDetail
            {
                LedgerId = expenseLedger.Id,
                DebitAmount = expense.Amount,
                CreditAmount = 0,
                Note = expense.Title
            });
            expenseLedger.OpeningBalance += expense.Amount;

            // Credit Cash/Bank (Decreases Asset)
            voucher.Details.Add(new VoucherDetail
            {
                LedgerId = paymentLedger.Id,
                DebitAmount = 0,
                CreditAmount = expense.Amount,
                Note = "Paid via " + expense.PaymentMethod
            });
            paymentLedger.OpeningBalance -= expense.Amount;

            _context.Vouchers.Add(voucher);
            await _context.SaveChangesAsync();
        }

        private async Task<Ledger> GetOrCreateLedger(string name, string groupName)
        {
            var companyId = await GetCompanyId();
            var ledger = await _context.Ledgers.FirstOrDefaultAsync(l => l.Name == name && l.CompanyId == companyId);
            
            if (ledger == null)
            {
                var group = await _context.AccountGroups.FirstOrDefaultAsync(g => g.Name == groupName && g.CompanyId == companyId);
                
                if (group == null)
                {
                    var nature = AccountNature.Expenses;
                    if (groupName.Contains("Bank") || groupName.Contains("Cash") || groupName.Contains("Asset")) 
                        nature = AccountNature.Assets;

                    group = new AccountGroup { Name = groupName, CompanyId = companyId, Nature = nature };
                    _context.AccountGroups.Add(group);
                    await _context.SaveChangesAsync();
                }

                ledger = new Ledger
                {
                    Name = name,
                    AccountGroupId = group.Id,
                    CompanyId = companyId,
                    IsSystem = true
                };
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

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Delete(int id)
        {
            var companyId = await GetCompanyId();
            var expense = await _context.Expenses.FirstOrDefaultAsync(e => e.Id == id && e.CompanyId == companyId);
            if (expense != null)
            {
                _context.Expenses.Remove(expense);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(Index));
        }
    }
}

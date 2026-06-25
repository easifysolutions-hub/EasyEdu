using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;

namespace EasyEdu.Controllers
{
    [Authorize(Roles = "SuperAdmin,Admin,Accountant")]
    public class AccountsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public AccountsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // --- Profit & Loss ---
        public async Task<IActionResult> ProfitLoss(DateTime? start, DateTime? end)
        {
            var from = start ?? new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
            var to = end ?? DateTime.Now;

            var income = await _context.Incomes.Where(i => i.Date >= from && i.Date <= to).SumAsync(i => i.Amount);
            var fees = await _context.FeesInvoices.Where(f => f.Date >= from && f.Date <= to).SumAsync(f => f.PaidAmount);
            var expenses = await _context.Expenses.Where(e => e.Date >= from && e.Date <= to).SumAsync(e => e.Amount);
            var salaries = await _context.Payrolls.Where(p => p.PaymentDate >= from && p.PaymentDate <= to).SumAsync(p => p.NetSalary);

            ViewBag.DateRange = $"{from:dd MMM} - {to:dd MMM}";
            ViewBag.TotalRevenue = income + fees;
            ViewBag.TotalExpense = expenses + salaries;
            
            return View();
        }

        // --- Income ---
        public async Task<IActionResult> Income(string searchTerm)
        {
            var query = _context.Incomes.AsQueryable();
            if (!string.IsNullOrEmpty(searchTerm))
            {
                query = query.Where(i => i.Title.Contains(searchTerm) || i.Category.Contains(searchTerm));
            }
            var incomes = await query.OrderByDescending(i => i.Date).ToListAsync();
            ViewBag.Heads = new SelectList(await _context.ChartOfAccounts.Where(c => c.Type == "Income").ToListAsync(), "Head", "Head");
            ViewBag.SearchTerm = searchTerm;
            return View(incomes);
        }

        [HttpPost]
        public async Task<IActionResult> CreateIncome(Income income)
        {
            if (ModelState.IsValid)
            {
                _context.Incomes.Add(income);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(Income));
        }

        // --- Chart of Account ---
        public async Task<IActionResult> ChartOfAccount(string searchTerm)
        {
            var query = _context.ChartOfAccounts.AsQueryable();
            if (!string.IsNullOrEmpty(searchTerm))
            {
                query = query.Where(h => h.Head.Contains(searchTerm));
            }
            var heads = await query.ToListAsync();
            ViewBag.SearchTerm = searchTerm;
            return View(heads);
        }

        [HttpPost]
        public async Task<IActionResult> CreateChartOfAccount(ChartOfAccount coaHead)
        {
            if (ModelState.IsValid)
            {
                _context.ChartOfAccounts.Add(coaHead);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(ChartOfAccount));
        }

        // --- Bank Account ---
        public async Task<IActionResult> BankAccount(string searchTerm)
        {
            var query = _context.BankAccounts.AsQueryable();
            if (!string.IsNullOrEmpty(searchTerm))
            {
                query = query.Where(b => b.BankName.Contains(searchTerm) || b.AccountName.Contains(searchTerm) || b.AccountNumber.Contains(searchTerm));
            }
            var accounts = await query.ToListAsync();
            ViewBag.SearchTerm = searchTerm;
            return View(accounts);
        }

        [HttpPost]
        public async Task<IActionResult> CreateBankAccount(BankAccount account)
        {
            if (ModelState.IsValid)
            {
                account.CurrentBalance = account.OpeningBalance;
                _context.BankAccounts.Add(account);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(BankAccount));
        }

        public async Task<IActionResult> EditBankAccount(int id)
        {
            var account = await _context.BankAccounts.FindAsync(id);
            if (account == null) return NotFound();
            return View(account);
        }

        [HttpPost]
        public async Task<IActionResult> EditBankAccount(BankAccount account)
        {
            if (ModelState.IsValid)
            {
                _context.Update(account);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(BankAccount));
            }
            return View(account);
        }

        [HttpPost]
        public async Task<IActionResult> DeleteBankAccount(int id)
        {
            var account = await _context.BankAccounts.FindAsync(id);
            if (account != null)
            {
                _context.BankAccounts.Remove(account);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(BankAccount));
        }

        [HttpPost]
        public async Task<IActionResult> DeleteChartOfAccount(int id)
        {
            var coa = await _context.ChartOfAccounts.FindAsync(id);
            if (coa != null)
            {
                _context.ChartOfAccounts.Remove(coa);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(ChartOfAccount));
        }

        [HttpPost]
        public async Task<IActionResult> DeleteIncome(int id)
        {
            var income = await _context.Incomes.FindAsync(id);
            if (income != null)
            {
                _context.Incomes.Remove(income);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(Income));
        }
    }
}

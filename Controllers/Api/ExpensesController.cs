using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Security.Claims;

namespace EasyEdu.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "SuperAdmin,Admin")]
    public class ExpensesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ExpensesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetExpenses()
        {
            var companyIdClaim = User.Claims.FirstOrDefault(c => c.Type == "CompanyId")?.Value;
            int? companyId = string.IsNullOrEmpty(companyIdClaim) ? null : int.Parse(companyIdClaim);

            var expenses = await _context.Expenses
                .Where(e => !companyId.HasValue || e.CompanyId == companyId)
                .OrderByDescending(e => e.Date)
                .Select(e => new {
                    e.Id,
                    e.Title,
                    e.Description,
                    e.Amount,
                    e.Category,
                    date = e.Date.ToString("MMM dd, yyyy"),
                    e.PaymentMethod,
                    e.ReferenceNumber
                })
                .ToListAsync();

            return Ok(expenses);
        }

        [HttpPost]
        public async Task<IActionResult> CreateExpense([FromBody] Expense expense)
        {
            var companyIdClaim = User.Claims.FirstOrDefault(c => c.Type == "CompanyId")?.Value;
            if (string.IsNullOrEmpty(companyIdClaim)) return BadRequest("Institution context not found.");
            int companyId = int.Parse(companyIdClaim);

            expense.CompanyId = companyId;
            expense.Date = DateTime.UtcNow;
            expense.CreatedBy = User.Identity?.Name ?? "Mobile App";

            _context.Expenses.Add(expense);
            await _context.SaveChangesAsync();

            // Accounting Posting
            await PostExpenseToLedger(expense);

            return Ok(new { success = true, id = expense.Id });
        }

        private async Task PostExpenseToLedger(Expense expense)
        {
            // 1. Get or Create EXPENSE LEDGER
            string expenseLedgerName = expense.Category + " Expense";
            var expenseLedger = await GetOrCreateLedger(expenseLedgerName, "Direct Expense", expense.CompanyId);

            // 2. Get Cash/Bank Ledger
            string paymentLedgerName = expense.PaymentMethod == "Bank" ? "Bank Account" : "Cash In Hand";
            string groupName = expense.PaymentMethod == "Bank" ? "Bank Accounts" : "Cash-in-hand";
            var paymentLedger = await GetOrCreateLedger(paymentLedgerName, groupName, expense.CompanyId);

            var voucher = new Voucher
            {
                VoucherNumber = "EXP-M-" + expense.Id + "-" + DateTime.Now.Ticks.ToString().Substring(14),
                Date = expense.Date,
                Type = VoucherType.Payment,
                Narration = $"Mobile Expense: {expense.Title} ({expense.ReferenceNumber ?? "N/A"})",
                CompanyId = expense.CompanyId,
                CreatedAt = DateTime.UtcNow,
                CreatedBy = User.Identity?.Name ?? "Mobile"
            };

            voucher.Details.Add(new VoucherDetail { LedgerId = expenseLedger.Id, DebitAmount = expense.Amount, Note = expense.Title });
            expenseLedger.OpeningBalance += expense.Amount;

            voucher.Details.Add(new VoucherDetail { LedgerId = paymentLedger.Id, CreditAmount = expense.Amount, Note = "Paid via " + expense.PaymentMethod });
            paymentLedger.OpeningBalance -= expense.Amount;

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
                    if (groupName.Contains("Bank") || groupName.Contains("Cash")) nature = AccountNature.Assets;
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
    }
}

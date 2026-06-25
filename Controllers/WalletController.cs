using EasyEdu.Data;
using EasyEdu.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EasyEdu.Controllers
{
    [Authorize]
    public class WalletController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public WalletController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // --- Pending Deposit ---
        [Authorize(Roles = "SuperAdmin,Admin,Accountant")]
        public async Task<IActionResult> PendingDeposit()
        {
            var pendingDeposits = await _context.WalletTransactions
                .Include(w => w.Student)
                .Where(w => w.TransactionType == "Deposit" && w.Status == "Pending")
                .OrderByDescending(w => w.Date)
                .ToListAsync();

            return View(pendingDeposits);
        }

        // --- Approve Deposit (View - shows approved list) ---
        [Authorize(Roles = "SuperAdmin,Admin,Accountant")]
        public async Task<IActionResult> ApproveDepositList()
        {
            var approved = await _context.WalletTransactions
                .Include(w => w.Student)
                .Where(w => w.TransactionType == "Deposit" && w.Status == "Approved")
                .OrderByDescending(w => w.Date)
                .ToListAsync();

            return View(approved);
        }

        // --- Reject Deposit (View - shows rejected list) ---
        [Authorize(Roles = "SuperAdmin,Admin,Accountant")]
        public async Task<IActionResult> RejectDepositList()
        {
            var rejected = await _context.WalletTransactions
                .Include(w => w.Student)
                .Where(w => w.TransactionType == "Deposit" && w.Status == "Rejected")
                .OrderByDescending(w => w.Date)
                .ToListAsync();

            return View(rejected);
        }

        // --- Wallet Transaction (All transactions) ---
        [Authorize(Roles = "SuperAdmin,Admin,Accountant")]
        public async Task<IActionResult> WalletTransaction()
        {
            var transactions = await _context.WalletTransactions
                .Include(w => w.Student)
                .OrderByDescending(w => w.Date)
                .ToListAsync();

            return View(transactions);
        }

        // --- Refund Request ---
        [Authorize(Roles = "SuperAdmin,Admin,Accountant")]
        public async Task<IActionResult> RefundRequest()
        {
            var refunds = await _context.WalletTransactions
                .Include(w => w.Student)
                .Where(w => w.TransactionType == "Refund")
                .OrderByDescending(w => w.Date)
                .ToListAsync();

            return View(refunds);
        }

        [HttpPost]
        [Authorize(Roles = "SuperAdmin,Admin,Accountant")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateRefundRequest(int studentId, decimal amount, string? note)
        {
            var refund = new WalletTransaction
            {
                StudentId = studentId,
                TransactionType = "Refund",
                Amount = amount,
                PaymentMethod = "Refund",
                Status = "Pending",
                Note = note,
                Date = DateTime.Now
            };
            _context.WalletTransactions.Add(refund);
            await _context.SaveChangesAsync();
            TempData["Success"] = "Refund request submitted successfully.";
            return RedirectToAction(nameof(RefundRequest));
        }

        // POST: Approve a deposit
        [HttpPost]
        [Authorize(Roles = "SuperAdmin,Admin,Accountant")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ApproveDeposit(int id)
        {
            var transaction = await _context.WalletTransactions.FindAsync(id);
            if (transaction == null) return NotFound();

            transaction.Status = "Approved";
            await _context.SaveChangesAsync();
            TempData["Success"] = "Deposit approved successfully.";
            return RedirectToAction(nameof(PendingDeposit));
        }

        // POST: Reject a deposit
        [HttpPost]
        [Authorize(Roles = "SuperAdmin,Admin,Accountant")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> RejectDeposit(int id)
        {
            var transaction = await _context.WalletTransactions.FindAsync(id);
            if (transaction == null) return NotFound();

            transaction.Status = "Rejected";
            await _context.SaveChangesAsync();
            TempData["Success"] = "Deposit rejected.";
            return RedirectToAction(nameof(PendingDeposit));
        }

        // POST: Approve a refund
        [HttpPost]
        [Authorize(Roles = "SuperAdmin,Admin,Accountant")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ApproveRefund(int id)
        {
            var transaction = await _context.WalletTransactions.FindAsync(id);
            if (transaction == null) return NotFound();

            transaction.Status = "Approved";
            await _context.SaveChangesAsync();
            TempData["Success"] = "Refund approved successfully.";
            return RedirectToAction(nameof(RefundRequest));
        }

        // POST: Reject a refund
        [HttpPost]
        [Authorize(Roles = "SuperAdmin,Admin,Accountant")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> RejectRefund(int id)
        {
            var transaction = await _context.WalletTransactions.FindAsync(id);
            if (transaction == null) return NotFound();

            transaction.Status = "Rejected";
            await _context.SaveChangesAsync();
            TempData["Success"] = "Refund rejected.";
            return RedirectToAction(nameof(RefundRequest));
        }

        // GET: My Wallet (Student view)
        public async Task<IActionResult> MyWallet()
        {
            var user = await _userManager.GetUserAsync(User);
            var student = await _context.Students.FirstOrDefaultAsync(s => s.UserId == user!.Id);
            
            if (student == null) return NotFound("Student profile not found.");

            var transactions = await _context.WalletTransactions
                .Where(w => w.StudentId == student.Id)
                .OrderByDescending(w => w.Date)
                .ToListAsync();

            ViewBag.Balance = transactions.Where(t => t.Status == "Approved").Sum(t => t.TransactionType == "Deposit" ? t.Amount : -t.Amount);

            return View(transactions);
        }
    }
}

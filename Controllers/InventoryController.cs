using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;
using System.Security.Claims;

namespace EasyEdu.Controllers
{
    [Authorize(Roles = "SuperAdmin,Admin,StoreManager")]
    public class InventoryController : Controller
    {
        private readonly ApplicationDbContext _context;

        public InventoryController(ApplicationDbContext context)
        {
            _context = context;
        }

        private async Task<int?> GetCompanyId()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _context.Users.FindAsync(userId);
            return user?.CompanyId;
        }

        // --- INVENTORY MASTER ---
        public async Task<IActionResult> Index()
        {
            var companyId = await GetCompanyId();
            var inventories = await _context.Inventories
                .Where(i => i.CompanyId == companyId || companyId == null)
                .Include(i => i.Category)
                .OrderBy(i => i.ItemName)
                .ToListAsync();
            return View(inventories);
        }

        public async Task<IActionResult> Create()
        {
            var companyId = await GetCompanyId();
            ViewBag.Categories = await _context.ItemCategories.Where(c => c.CompanyId == companyId || companyId == null).ToListAsync();
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Inventory inventory)
        {
            if (ModelState.IsValid)
            {
                inventory.CompanyId = await GetCompanyId() ?? 0;
                inventory.TotalValue = inventory.Quantity * inventory.UnitPrice;
                _context.Add(inventory);
                await _context.SaveChangesAsync();
                TempData["Success"] = "Asset synchronized with central registry.";
                return RedirectToAction(nameof(Index));
            }
            var companyId = await GetCompanyId();
            ViewBag.Categories = await _context.ItemCategories.Where(c => c.CompanyId == companyId || companyId == null).ToListAsync();
            return View(inventory);
        }

        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null) return NotFound();
            var companyId = await GetCompanyId();
            var inventory = await _context.Inventories.FirstOrDefaultAsync(i => i.Id == id && (i.CompanyId == companyId || companyId == null));
            if (inventory == null) return NotFound();

            ViewBag.Categories = await _context.ItemCategories.Where(c => c.CompanyId == companyId || companyId == null).ToListAsync();
            return View(inventory);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, Inventory inventory)
        {
            if (id != inventory.Id) return NotFound();

            if (ModelState.IsValid)
            {
                inventory.TotalValue = inventory.Quantity * inventory.UnitPrice;
                _context.Update(inventory);
                await _context.SaveChangesAsync();
                TempData["Success"] = "Inventory parameters updated.";
                return RedirectToAction(nameof(Index));
            }
            var companyId = await GetCompanyId();
            ViewBag.Categories = await _context.ItemCategories.Where(c => c.CompanyId == companyId || companyId == null).ToListAsync();
            return View(inventory);
        }

        // --- ASSET DISTRIBUTION (ISSUE/SELL) ---
        public async Task<IActionResult> IssueItem()
        {
            var companyId = await GetCompanyId();
            ViewBag.Inventories = await _context.Inventories.Where(i => (i.CompanyId == companyId || companyId == null) && i.Quantity > 0).ToListAsync();
            ViewBag.Students = await _context.Students.Where(s => s.CompanyId == companyId || companyId == null).ToListAsync();
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> IssueItem(InventoryTransaction transaction)
        {
            if (ModelState.IsValid)
            {
                var item = await _context.Inventories.FindAsync(transaction.InventoryId);
                if (item != null && item.Quantity >= transaction.Quantity)
                {
                    item.Quantity -= transaction.Quantity;
                    transaction.TransactionDate = DateTime.Today;
                    transaction.TransactionType = "Issue";
                    transaction.CreatedAt = DateTime.UtcNow;

                    _context.Add(transaction);
                    await _context.SaveChangesAsync();
                    TempData["Success"] = "Asset successfully provisioned to recipient.";
                    return RedirectToAction(nameof(Transactions));
                }
                ModelState.AddModelError("", "Insufficient inventory stock for processing.");
            }
            var companyId = await GetCompanyId();
            ViewBag.Inventories = await _context.Inventories.Where(i => i.CompanyId == companyId || companyId == null).ToListAsync();
            ViewBag.Students = await _context.Students.Where(s => s.CompanyId == companyId || companyId == null).ToListAsync();
            return View(transaction);
        }

        public async Task<IActionResult> ItemSell()
        {
            var companyId = await GetCompanyId();
            ViewBag.Inventories = await _context.Inventories.Where(i => (i.CompanyId == companyId || companyId == null) && i.Quantity > 0).ToListAsync();
            ViewBag.Students = await _context.Students.Where(s => s.CompanyId == companyId || companyId == null).ToListAsync();
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SellItem(InventoryTransaction transaction)
        {
            if (transaction.InventoryId > 0 && transaction.Quantity > 0)
            {
                var item = await _context.Inventories.FindAsync(transaction.InventoryId);
                if (item != null && item.Quantity >= transaction.Quantity)
                {
                    item.Quantity -= transaction.Quantity;
                    transaction.TransactionDate = DateTime.Now;
                    transaction.TransactionType = "Sale";
                    transaction.TotalAmount = transaction.Quantity * transaction.UnitPrice;
                    transaction.CreatedAt = DateTime.UtcNow;

                    _context.InventoryTransactions.Add(transaction);
                    await _context.SaveChangesAsync();
                    TempData["Success"] = "Sales transaction successfully recorded and stock adjusted.";
                    return RedirectToAction(nameof(Transactions));
                }
                TempData["Error"] = "Insufficient stock available for this transaction.";
            }
            return RedirectToAction(nameof(ItemSell));
        }

        public async Task<IActionResult> Transactions()
        {
            var companyId = await GetCompanyId();
            var transactions = await _context.InventoryTransactions
                .Where(t => t.Inventory.CompanyId == companyId || companyId == null)
                .Include(t => t.Inventory)
                .Include(t => t.Student)
                .OrderByDescending(t => t.TransactionDate)
                .ToListAsync();
            return View(transactions);
        }

        // --- PROCUREMENTS (RECEIVE) ---
        public async Task<IActionResult> ItemReceive()
        {
            var companyId = await GetCompanyId();
            ViewBag.Inventories = await _context.Inventories.Where(i => i.CompanyId == companyId || companyId == null).ToListAsync();
            ViewBag.Suppliers = await _context.Suppliers.Where(s => s.CompanyId == companyId || companyId == null).ToListAsync();
            
            var receives = await _context.ItemReceives
                .Where(r => r.CompanyId == companyId || companyId == null)
                .Include(r => r.Inventory)
                .Include(r => r.Supplier)
                .OrderByDescending(r => r.ReceiveDate)
                .ToListAsync();
            return View(receives);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateReceive(ItemReceive receive)
        {
            if (receive.InventoryId > 0)
            {
                var item = await _context.Inventories.FindAsync(receive.InventoryId);
                if (item != null)
                {
                    receive.CompanyId = await GetCompanyId() ?? 0;
                    item.Quantity += receive.Quantity;
                    receive.TotalPrice = receive.Quantity * receive.UnitPrice;
                    _context.ItemReceives.Add(receive);
                    await _context.SaveChangesAsync();

                    // Accounting Posting
                    await PostProcurementToLedger(receive);

                    TempData["Success"] = "Procurement data committed to stock and ledger.";
                }
            }
            return RedirectToAction(nameof(ItemReceive));
        }

        private async Task PostProcurementToLedger(ItemReceive receive)
        {
            // 1. Get or Create INVENTORY ASSET LEDGER
            var inventoryLedger = await GetOrCreateLedger("Inventory Assets", "Current Assets", receive.CompanyId);

            // 2. Get or Create SUPPLIER LEDGER (Liability)
            string supplierName = (await _context.Suppliers.FindAsync(receive.SupplierId))?.Name ?? "General Supplier";
            var supplierLedger = await GetOrCreateLedger(supplierName, "Sundry Creditors", receive.CompanyId);

            var voucher = new Voucher
            {
                VoucherNumber = "PROC-" + receive.Id + "-" + DateTime.Now.Ticks.ToString().Substring(14),
                Date = receive.ReceiveDate,
                Type = VoucherType.Journal,
                Narration = $"Inventory Procurement: {receive.Inventory.ItemName} from {supplierName}",
                CompanyId = receive.CompanyId,
                CreatedAt = DateTime.UtcNow,
                CreatedBy = User.Identity?.Name ?? "Store"
            };

            // Debit Inventory (Increases Asset)
            voucher.Details.Add(new VoucherDetail { LedgerId = inventoryLedger.Id, DebitAmount = receive.TotalPrice, Note = "Item Received" });
            inventoryLedger.OpeningBalance += receive.TotalPrice;

            // Credit Supplier (Increases Liability)
            voucher.Details.Add(new VoucherDetail { LedgerId = supplierLedger.Id, CreditAmount = receive.TotalPrice, Note = "Due to Supplier" });
            supplierLedger.OpeningBalance -= receive.TotalPrice;

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
                    var nature = AccountNature.Assets;
                    if (groupName.Contains("Creditors") || groupName.Contains("Liabilities")) nature = AccountNature.Liabilities;
                    
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

        // --- CATEGORIES ---
        public async Task<IActionResult> ItemCategory()
        {
            var companyId = await GetCompanyId();
            return View(await _context.ItemCategories.Where(c => c.CompanyId == companyId || companyId == null).ToListAsync());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateCategory(ItemCategory category)
        {
            if (ModelState.IsValid)
            {
                category.CompanyId = await GetCompanyId() ?? 0;
                _context.ItemCategories.Add(category);
                await _context.SaveChangesAsync();
                TempData["Success"] = "Asset category created.";
            }
            return RedirectToAction(nameof(ItemCategory));
        }

        // --- STORES ---
        public async Task<IActionResult> ItemStore()
        {
            var companyId = await GetCompanyId();
            return View(await _context.ItemStores.Where(s => s.CompanyId == companyId || companyId == null).ToListAsync());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateStore(ItemStore store)
        {
            if (ModelState.IsValid)
            {
                store.CompanyId = await GetCompanyId() ?? 0;
                _context.ItemStores.Add(store);
                await _context.SaveChangesAsync();
                TempData["Success"] = "Storage facility registered.";
            }
            return RedirectToAction(nameof(ItemStore));
        }

        // --- SUPPLIERS ---
        public async Task<IActionResult> Supplier()
        {
            var companyId = await GetCompanyId();
            return View(await _context.Suppliers.Where(s => s.CompanyId == companyId || companyId == null).ToListAsync());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateSupplier(Supplier supplier)
        {
            if (ModelState.IsValid)
            {
                supplier.CompanyId = await GetCompanyId() ?? 0;
                _context.Suppliers.Add(supplier);
                await _context.SaveChangesAsync();
                TempData["Success"] = "Supplier profile registered.";
            }
            return RedirectToAction(nameof(Supplier));
        }

        // --- ANALYTICS ---
        public async Task<IActionResult> Reports()
        {
            var companyId = await GetCompanyId();
            var model = new InventoryReportsViewModel
            {
                TotalAssets = await _context.Inventories.CountAsync(i => i.CompanyId == companyId || companyId == null),
                TotalValue = await _context.Inventories.Where(i => i.CompanyId == companyId || companyId == null).SumAsync(i => (decimal)i.TotalValue),
                LowStockItems = await _context.Inventories.Where(i => (i.CompanyId == companyId || companyId == null) && i.Quantity < 10).CountAsync(),
                RecentProcurements = await _context.ItemReceives
                    .Where(r => r.CompanyId == companyId || companyId == null)
                    .Include(r => r.Inventory)
                    .OrderByDescending(r => r.ReceiveDate)
                    .Take(10)
                    .ToListAsync()
            };
            return View(model);
        }
    }

    public class InventoryReportsViewModel
    {
        public int TotalAssets { get; set; }
        public decimal TotalValue { get; set; }
        public int LowStockItems { get; set; }
        public List<ItemReceive> RecentProcurements { get; set; } = new();
    }
}

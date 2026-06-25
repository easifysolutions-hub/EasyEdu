using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Security.Claims;

namespace EasyEdu.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "SuperAdmin,Admin,Staff")]
    public class InventoryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public InventoryController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetInventory()
        {
            var companyIdClaim = User.Claims.FirstOrDefault(c => c.Type == "CompanyId")?.Value;
            int? companyId = string.IsNullOrEmpty(companyIdClaim) ? null : int.Parse(companyIdClaim);

            var inventories = await _context.Inventories
                .Where(i => !companyId.HasValue || i.CompanyId == companyId)
                .Include(i => i.Category)
                .OrderBy(i => i.ItemName)
                .Select(i => new {
                    i.Id,
                    itemName = i.ItemName,
                    categoryName = i.Category != null ? i.Category.Name : "General",
                    i.Quantity,
                    i.UnitPrice,
                    i.TotalValue,
                    i.Unit,
                    i.SKU,
                    isLowStock = i.Quantity < (i.ReorderLevel ?? 10)
                })
                .ToListAsync();

            return Ok(inventories);
        }

        [HttpGet("transactions")]
        public async Task<IActionResult> GetTransactions()
        {
            var companyIdClaim = User.Claims.FirstOrDefault(c => c.Type == "CompanyId")?.Value;
            int? companyId = string.IsNullOrEmpty(companyIdClaim) ? null : int.Parse(companyIdClaim);

            var transactions = await _context.InventoryTransactions
                .Where(t => !companyId.HasValue || t.Inventory.CompanyId == companyId)
                .Include(t => t.Inventory)
                .Include(t => t.Student)
                .OrderByDescending(t => t.TransactionDate)
                .Select(t => new {
                    t.Id,
                    itemName = t.Inventory.ItemName,
                    recipientName = t.Student != null ? $"{t.Student.FirstName} {t.Student.LastName}" : "Staff/Other",
                    t.Quantity,
                    t.TransactionType,
                    date = t.TransactionDate.ToString("MMM dd, yyyy"),
                    t.TotalAmount
                })
                .ToListAsync();

            return Ok(transactions);
        }
    }
}

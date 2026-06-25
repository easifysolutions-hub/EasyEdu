using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;
using System.Security.Claims;

namespace EasyEdu.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "SuperAdmin,Admin")]
    public class AccountingController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AccountingController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("vouchers")]
        public async Task<IActionResult> GetVouchers([FromQuery] VoucherType? type)
        {
            var companyIdStr = User.FindFirst("CompanyId")?.Value;
            int.TryParse(companyIdStr, out var companyId);
            if (companyId == 0) companyId = 1;

            var query = _context.Vouchers
                .Include(v => v.Details)
                .ThenInclude(d => d.Ledger)
                .Where(v => v.CompanyId == companyId);

            if (type.HasValue)
            {
                query = query.Where(v => v.Type == type.Value);
            }

            var vouchers = await query
                .OrderByDescending(v => v.Date)
                .Select(v => new
                {
                    v.Id,
                    v.VoucherNumber,
                    v.Date,
                    v.Type,
                    TypeName = v.Type.ToString(),
                    v.Narration,
                    TotalAmount = v.Details.Sum(d => d.DebitAmount), // Dr should equal Cr
                    Details = v.Details.Select(d => new
                    {
                        d.LedgerId,
                        LedgerName = d.Ledger.Name,
                        d.DebitAmount,
                        d.CreditAmount,
                        d.Note
                    })
                })
                .ToListAsync();

            return Ok(vouchers);
        }

        [HttpGet("ledgers")]
        public async Task<IActionResult> GetLedgers()
        {
            var companyIdStr = User.FindFirst("CompanyId")?.Value;
            int.TryParse(companyIdStr, out var companyId);
            if (companyId == 0) companyId = 1;

            var ledgers = await _context.Ledgers
                .Where(l => l.CompanyId == companyId)
                .Select(l => new
                {
                    l.Id,
                    l.Name,
                    GroupName = l.AccountGroup.Name,
                    l.OpeningBalance,
                    l.IsDebitOpening
                })
                .ToListAsync();

            return Ok(ledgers);
        }

        [HttpPost("vouchers")]
        public async Task<IActionResult> CreateVoucher([FromBody] VoucherCreateDto model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var companyIdStr = User.FindFirst("CompanyId")?.Value;
            int.TryParse(companyIdStr, out var companyId);
            if (companyId == 0) companyId = 1;

            var username = User.Identity?.Name;

            var typePrefix = model.Type switch
            {
                VoucherType.Payment => "PAY",
                VoucherType.Receipt => "REC",
                VoucherType.Contra => "CON",
                VoucherType.Journal => "JOU",
                _ => "VOU"
            };
            
            var voucher = new Voucher
            {
                VoucherNumber = $"{typePrefix}-{DateTime.Now:yyyyMMdd}-{Guid.NewGuid().ToString().Substring(0, 4).ToUpper()}",
                Date = model.Date,
                Type = model.Type,
                Narration = model.Narration,
                CompanyId = companyId,
                CreatedBy = username,
                CreatedAt = DateTime.UtcNow
            };

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

            _context.Vouchers.Add(voucher);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Voucher saved successfully", id = voucher.Id });
        }
    }

    public class VoucherCreateDto
    {
        public DateTime Date { get; set; }
        public VoucherType Type { get; set; }
        public string? Narration { get; set; }
        public List<VoucherRowDto> Rows { get; set; } = new();
    }

    public class VoucherRowDto
    {
        public int LedgerId { get; set; }
        public decimal Debit { get; set; }
        public decimal Credit { get; set; }
        public string? Note { get; set; }
    }
}

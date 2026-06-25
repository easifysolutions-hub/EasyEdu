using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Security.Claims;
using System.Linq;

namespace EasyEdu.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class FeesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FeesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("invoices")]
        public async Task<IActionResult> GetInvoices()
        {
            var companyIdClaim = User.Claims.FirstOrDefault(c => c.Type == "CompanyId")?.Value;
            int? companyId = string.IsNullOrEmpty(companyIdClaim) ? null : int.Parse(companyIdClaim);

            var query = _context.FeesInvoices
                .Include(i => i.Student)
                .ThenInclude(s => s.Class)
                .AsQueryable();

            if (companyId.HasValue)
            {
                query = query.Where(i => i.Student.CompanyId == companyId);
            }

            var invoices = await query
                .OrderByDescending(i => i.Date)
                .Take(50)
                .Select(i => new {
                    id = i.Id,
                    invoiceNumber = i.InvoiceNumber,
                    studentId = i.StudentId,
                    studentName = i.Student != null ? i.Student.FullName : "Unknown",
                    className = i.Student != null && i.Student.Class != null ? i.Student.Class.Name : "N/A",
                    amount = i.TotalAmount,
                    paidAmount = i.PaidAmount,
                    status = i.Status,
                    date = i.Date.ToString("MMM dd, yyyy"),
                    dueDate = i.DueDate.ToString("MMM dd, yyyy")
                })
                .ToListAsync();

            return Ok(invoices);
        }

        [HttpPost("collect")]
        public async Task<IActionResult> CollectFee([FromBody] CollectFeeRequest request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var invoice = await _context.FeesInvoices.FindAsync(request.InvoiceId);
            
            if (invoice == null) return NotFound("Invoice not found.");

            var collection = new FeeCollection
            {
                StudentId = request.StudentId,
                FeesInvoiceId = request.InvoiceId,
                AmountPaid = request.AmountPaid,
                PaidDate = DateTime.Today,
                PaymentMethod = request.PaymentMode, // Fixed PaymentMode -> PaymentMethod
                ReceiptNumber = "MRCPT-" + DateTime.Now.Ticks.ToString().Substring(10),
                Status = "Paid",
                CreatedAt = DateTime.UtcNow,
                Remarks = "Collected via Mobile App" // Fixed Notes -> Remarks
            };

            _context.FeeCollections.Add(collection);

            invoice.PaidAmount += request.AmountPaid;
            if (invoice.PaidAmount >= invoice.TotalAmount)
                invoice.Status = "Paid";
            else
                invoice.Status = "Partial";

            await _context.SaveChangesAsync();

            return Ok(new { success = true, receiptNumber = collection.ReceiptNumber });
        }
    }

    public class CollectFeeRequest
    {
        public int StudentId { get; set; }
        public int InvoiceId { get; set; }
        public decimal AmountPaid { get; set; }
        public string PaymentMode { get; set; } = "Cash";
    }
}

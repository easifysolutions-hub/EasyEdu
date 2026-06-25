using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;

namespace EasyEdu.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class LeaveController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public LeaveController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetMyLeaves()
        {
            var userId = _userManager.GetUserId(User);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(new { success = false, message = "User not found" });
            }

            var requests = await _context.LeaveRequests
                .Include(r => r.LeaveType)
                .Where(r => r.UserId == userId)
                .OrderByDescending(r => r.ApplyDate)
                .Select(r => new
                {
                    id = r.Id,
                    type = r.LeaveType != null ? r.LeaveType.Name : "General",
                    applyDate = r.ApplyDate.ToString("MMM dd, yyyy"),
                    fromDate = r.FromDate.ToString("MMM dd, yyyy"),
                    toDate = r.ToDate.ToString("MMM dd, yyyy"),
                    reason = r.Reason,
                    status = r.Status,
                    approvedBy = r.ApprovedBy
                })
                .ToListAsync();

            return Ok(requests);
        }

        [HttpGet("types")]
        public async Task<IActionResult> GetLeaveTypes()
        {
            var types = await _context.LeaveTypes
                .Select(t => new { id = t.Id, name = t.Name })
                .ToListAsync();
            return Ok(types);
        }

        public class ApplyLeaveDto
        {
            public DateTime FromDate { get; set; }
            public DateTime ToDate { get; set; }
            public int LeaveTypeId { get; set; }
            public string Reason { get; set; } = string.Empty;
        }

        [HttpPost]
        public async Task<IActionResult> ApplyLeave([FromBody] ApplyLeaveDto data)
        {
            var userId = _userManager.GetUserId(User);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(new { success = false, message = "User not found" });
            }

            var request = new LeaveRequest
            {
                UserId = userId,
                ApplyDate = DateTime.Now,
                FromDate = data.FromDate,
                ToDate = data.ToDate,
                Reason = data.Reason,
                LeaveTypeId = data.LeaveTypeId,
                Status = "Pending"
            };

            _context.LeaveRequests.Add(request);
            await _context.SaveChangesAsync();

            return Ok(new { success = true, message = "Leave application submitted successfully." });
        }
    }
}

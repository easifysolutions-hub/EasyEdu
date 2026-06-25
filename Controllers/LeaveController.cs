using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;
using Microsoft.AspNetCore.Hosting;

namespace EasyEdu.Controllers
{
    [Authorize]
    public class LeaveController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IWebHostEnvironment _hostEnvironment;

        public LeaveController(ApplicationDbContext context, UserManager<ApplicationUser> userManager, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            _userManager = userManager;
            _hostEnvironment = hostEnvironment;
        }

        private async Task<int> GetCompanyId()
        {
            var userId = _userManager.GetUserId(User);
            var user = await _context.Users.FindAsync(userId);
            return user?.CompanyId ?? 1;
        }

        // --- Apply Leave ---
        public async Task<IActionResult> ApplyLeave()
        {
            var userId = _userManager.GetUserId(User);
            var requests = await _context.LeaveRequests
                .Include(r => r.LeaveType)
                .Where(r => r.UserId == userId)
                .OrderByDescending(r => r.ApplyDate)
                .ToListAsync();
            
            var companyId = await GetCompanyId();
            ViewBag.LeaveTypes = new SelectList(await _context.LeaveTypes.Where(l => l.CompanyId == companyId).ToListAsync(), "Id", "Name");
            return View(requests);
        }

        [HttpPost]
        public async Task<IActionResult> ApplyLeave(LeaveRequest request, IFormFile? file)
        {
            var userId = _userManager.GetUserId(User);
            if (userId != null)
            {
                request.UserId = userId;
                request.ApplyDate = DateTime.Now;
                request.Status = "Pending";
                
                if (file != null)
                {
                    request.AttachmentPath = await SaveFile(file, "leaves");
                }

                _context.LeaveRequests.Add(request);
                await _context.SaveChangesAsync();
                TempData["Success"] = "Leave application submitted.";
            }
            return RedirectToAction(nameof(ApplyLeave));
        }

        private async Task<string?> SaveFile(IFormFile? file, string folder)
        {
            if (file == null) return null;

            string wwwRootPath = _hostEnvironment.WebRootPath;
            string fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            string path = Path.Combine(wwwRootPath, "uploads", folder);
            
            if (!Directory.Exists(path)) Directory.CreateDirectory(path);
            
            using (var fileStream = new FileStream(Path.Combine(path, fileName), FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }
            return $"/uploads/{folder}/{fileName}";
        }

        [Authorize(Roles = "SuperAdmin,Admin")]
        public async Task<IActionResult> ApproveLeaveRequest()
        {
            var requests = await _context.LeaveRequests
                .Include(r => r.User)
                .Include(r => r.LeaveType)
                .OrderByDescending(r => r.ApplyDate)
                .ToListAsync();
            return View(requests);
        }

        [Authorize(Roles = "SuperAdmin,Admin")]
        public async Task<IActionResult> PendingLeaveRequest()
        {
            var requests = await _context.LeaveRequests
                .Include(r => r.User)
                .Include(r => r.LeaveType)
                .Where(r => r.Status == "Pending")
                .OrderByDescending(r => r.ApplyDate)
                .ToListAsync();
            return View(requests);
        }

        [HttpPost]
        [Authorize(Roles = "SuperAdmin,Admin")]
        public async Task<IActionResult> UpdateStatus(int id, string status, string? note)
        {
            var request = await _context.LeaveRequests.FindAsync(id);
            if (request != null)
            {
                request.Status = status;
                request.Note = note;
                request.ApprovedBy = _userManager.GetUserName(User);
                request.ApprovedDate = DateTime.Now;
                await _context.SaveChangesAsync();
            }
            return Json(new { success = true });
        }

        // --- Leave Type ---
        public async Task<IActionResult> LeaveType()
        {
            var companyId = await GetCompanyId();
            var types = await _context.LeaveTypes.Where(t => t.CompanyId == companyId).ToListAsync();
            return View(types);
        }

        [HttpPost]
        [Authorize(Roles = "SuperAdmin,Admin")]
        public async Task<IActionResult> CreateLeaveType(LeaveType type)
        {
            type.CompanyId = await GetCompanyId();
            _context.LeaveTypes.Add(type);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(LeaveType));
        }

        // --- Leave Define ---
        public async Task<IActionResult> LeaveDefine()
        {
            var companyId = await GetCompanyId();
            var defines = await _context.LeaveDefines
                .Include(d => d.LeaveType)
                .Where(d => d.LeaveType.CompanyId == companyId)
                .ToListAsync();
            ViewBag.LeaveTypes = new SelectList(await _context.LeaveTypes.Where(l => l.CompanyId == companyId).ToListAsync(), "Id", "Name");
            return View(defines);
        }

        [HttpPost]
        [Authorize(Roles = "SuperAdmin,Admin")]
        public async Task<IActionResult> CreateLeaveDefine(LeaveDefine define)
        {
            if (ModelState.IsValid)
            {
                _context.LeaveDefines.Add(define);
                await _context.SaveChangesAsync();
                TempData["Success"] = "Leave assignment authorized.";
            }
            return RedirectToAction(nameof(LeaveDefine));
        }
    }
}

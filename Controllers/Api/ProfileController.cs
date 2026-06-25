using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using EasyEdu.Models;

namespace EasyEdu.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ProfileController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public ProfileController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetProfile()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var user = await _userManager.Users
                .Include(u => u.Student)
                    .ThenInclude(s => s.Class)
                .Include(u => u.Student)
                    .ThenInclude(s => s.Section)
                .Include(u => u.Teacher)
                    .ThenInclude(t => t.Designation)
                .Include(u => u.Teacher)
                    .ThenInclude(t => t.Department)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null) return NotFound();

            var roles = await _userManager.GetRolesAsync(user);
            var role = roles.FirstOrDefault() ?? "User";

            return Ok(new
            {
                id = user.Id,
                fullName = user.FullName ?? user.UserName,
                email = user.Email,
                phoneNumber = user.PhoneNumber,
                role = role,
                profilePicture = user.ProfilePicture,
                joinedDate = user.CreatedAt.ToString("MMM dd, yyyy"),
                
                // Detailed Matrix Data
                admissionNumber = user.Student?.AdmissionNumber,
                rollNumber = user.Student?.RollNumber,
                className = user.Student?.Class?.Name,
                sectionName = user.Student?.Section?.Name,
                
                employeeId = user.Teacher?.EmployeeNumber,
                designation = user.Teacher?.Designation?.Title,
                department = user.Teacher?.Department?.Name,
                qualification = user.Teacher?.Qualification
            });
        }
        [HttpPut]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileRequest model)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userManager.FindByIdAsync(userId!);
            if (user == null) return NotFound();

            user.FullName = model.FullName;
            user.PhoneNumber = model.PhoneNumber;

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded) return BadRequest(result.Errors);

            return Ok(new { message = "Profile updated successfully" });
        }

        public class UpdateProfileRequest
        {
            public string? FullName { get; set; }
            public string? PhoneNumber { get; set; }
        }
    }
}

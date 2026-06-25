using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace EasyEdu.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "SuperAdmin,Admin")]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public UsersController(
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var companyIdStr = User.FindFirst("CompanyId")?.Value;
            int.TryParse(companyIdStr, out var companyId);
            if (companyId == 0) companyId = 1;

            var users = await _userManager.Users
                .Where(u => u.CompanyId == companyId)
                .ToListAsync();

            var userList = new List<UserDto>();
            foreach (var user in users)
            {
                userList.Add(new UserDto
                {
                    Id = user.Id,
                    Email = user.Email ?? "",
                    FullName = user.FullName ?? "",
                    Roles = (await _userManager.GetRolesAsync(user)).ToList(),
                    IsLockedOut = user.LockoutEnd > DateTimeOffset.UtcNow,
                    IsActive = user.IsActive
                });
            }

            return Ok(userList);
        }

        [HttpGet("roles")]
        public async Task<IActionResult> GetRoles()
        {
            var roles = await _roleManager.Roles.Select(r => r.Name).ToListAsync();
            return Ok(roles);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] UserCreateDto model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var companyIdStr = User.FindFirst("CompanyId")?.Value;
            int.TryParse(companyIdStr, out var companyId);
            if (companyId == 0) companyId = 1;

            var user = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email,
                FullName = model.FullName,
                CompanyId = companyId,
                EmailConfirmed = true
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded) return BadRequest(result.Errors);

            if (model.Roles.Any())
            {
                await _userManager.AddToRolesAsync(user, model.Roles);
            }

            return Ok(new { message = "User created successfully", userId = user.Id });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(string id, [FromBody] UserUpdateDto model)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null) return NotFound();

            user.FullName = model.FullName;
            
            // Handle enabling/disabling via lockout
            if (model.IsEnabled)
            {
                user.LockoutEnd = null;
                user.IsActive = true;
            }
            else
            {
                user.LockoutEnd = DateTimeOffset.MaxValue;
                user.IsActive = false;
            }

            var updateResult = await _userManager.UpdateAsync(user);
            if (!updateResult.Succeeded) return BadRequest(updateResult.Errors);

            // Update Roles
            var currentRoles = await _userManager.GetRolesAsync(user);
            await _userManager.RemoveFromRolesAsync(user, currentRoles);
            await _userManager.AddToRolesAsync(user, model.Roles);

            return Ok(new { message = "User updated successfully" });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null) return NotFound();

            // Prevent self-deletion
            if (user.Id == User.FindFirst(ClaimTypes.NameIdentifier)?.Value)
            {
                return BadRequest("You cannot delete your own account.");
            }

            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded) return BadRequest(result.Errors);

            return Ok(new { message = "User deleted successfully" });
        }
    }

    public class UserDto
    {
        public string Id { get; set; } = "";
        public string Email { get; set; } = "";
        public string FullName { get; set; } = "";
        public List<string> Roles { get; set; } = new();
        public bool IsLockedOut { get; set; }
        public bool IsActive { get; set; }
    }

    public class UserUpdateDto
    {
        public string FullName { get; set; } = "";
        public List<string> Roles { get; set; } = new();
        public bool IsEnabled { get; set; }
    }

    public class UserCreateDto
    {
        public string Email { get; set; } = "";
        public string Password { get; set; } = "";
        public string FullName { get; set; } = "";
        public List<string> Roles { get; set; } = new();
    }
}

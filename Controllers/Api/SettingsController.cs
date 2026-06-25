using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;
using System.Security.Claims;

namespace EasyEdu.Controllers.Api
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route("api/[controller]")]
    [ApiController]
    public class SettingsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SettingsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetSettings()
        {
            var companyId = int.TryParse(User.FindFirstValue("CompanyId"), out var id) ? id : 1;
            var company = await _context.Companies.FirstOrDefaultAsync(c => c.Id == companyId);
            
            if (company == null)
            {
                // Fallback to first company if not found
                company = await _context.Companies.FirstOrDefaultAsync();
            }

            return Ok(company);
        }

        [HttpPost]
        [Authorize(Roles = "SuperAdmin,Admin")]
        public async Task<IActionResult> UpdateSettings([FromBody] Company model)
        {
            var company = await _context.Companies.FindAsync(model.Id);
            if (company == null) return NotFound();

            company.Name = model.Name;
            company.Email = model.Email;
            company.Phone = model.Phone;
            company.Address = model.Address;
            
            await _context.SaveChangesAsync();
            return Ok(new { success = true, message = "Institutional settings updated." });
        }

        [HttpGet("academic-years")]
        public async Task<IActionResult> GetAcademicYears()
        {
            var years = await _context.AcademicYears.OrderByDescending(y => y.Name).ToListAsync();
            return Ok(years);
        }
    }
}

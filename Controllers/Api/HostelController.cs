using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Linq;
using System;

namespace EasyEdu.Controllers.Api
{
    [Area("Api")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class HostelController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public HostelController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("MyAllocation")]
        public async Task<IActionResult> GetMyAllocation()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var student = await _context.Students
                .Include(s => s.Dormitory)
                .Include(s => s.DormitoryRoom)
                .FirstOrDefaultAsync(s => s.UserId == userId);

            if (student == null)
            {
                return NotFound("Student profile not found.");
            }

            var dormInfo = student.Dormitory != null ? new 
            {
                id = student.Dormitory.Id,
                name = student.Dormitory.Name,
                type = student.Dormitory.Type,
                address = student.Dormitory.Address,
                capacity = student.Dormitory.Capacity
            } : null;

            var roomInfo = student.DormitoryRoom != null ? new
            {
                id = student.DormitoryRoom.Id,
                roomNumber = student.DormitoryRoom.RoomNumber,
                roomType = student.DormitoryRoom.RoomType,
                beds = student.DormitoryRoom.NumberOfBeds,
                costPerBed = student.DormitoryRoom.CostPerBed,
                description = student.DormitoryRoom.Description
            } : null;

            // Mock allocation if none exists to display UI capabilities
            if (dormInfo == null)
            {
                var fallbackDorm = await _context.Dormitories.Include(d => d.Rooms).FirstOrDefaultAsync();
                if (fallbackDorm != null)
                {
                    dormInfo = new 
                    {
                        id = fallbackDorm.Id,
                        name = fallbackDorm.Name,
                        type = fallbackDorm.Type,
                        address = fallbackDorm.Address,
                        capacity = fallbackDorm.Capacity
                    };
                    
                    var fallbackRoom = fallbackDorm.Rooms.FirstOrDefault();
                    if (fallbackRoom != null) 
                    {
                        roomInfo = new
                        {
                            id = fallbackRoom.Id,
                            roomNumber = fallbackRoom.RoomNumber,
                            roomType = fallbackRoom.RoomType,
                            beds = fallbackRoom.NumberOfBeds,
                            costPerBed = fallbackRoom.CostPerBed,
                            description = fallbackRoom.Description
                        };
                    }
                }
            }

            return Ok(new
            {
                isAllocated = student.DormitoryId.HasValue,
                dormitory = dormInfo,
                room = roomInfo,
                allocationStatus = student.DormitoryId.HasValue ? "ACTIVE" : "PENDING (MOCKED_VIEW)",
                wardenName = "Commander S. Reynolds",
                wardenContact = "+1-555-DORM-101",
                lastInspection = DateTime.UtcNow.AddDays(-2).ToString("yyyy-MM-dd")
            });
        }
        
        [HttpGet("AllDorms")]
        public async Task<IActionResult> GetAllDorms()
        {
            var dorms = await _context.Dormitories
                .Select(d => new
                {
                    id = d.Id,
                    name = d.Name,
                    type = d.Type,
                    capacity = d.Capacity
                })
                .ToListAsync();
            return Ok(dorms);
        }
    }
}

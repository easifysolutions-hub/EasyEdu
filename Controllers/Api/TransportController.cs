using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Linq;

namespace EasyEdu.Controllers.Api
{
    [Area("Api")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TransportController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TransportController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("MyTransit")]
        public async Task<IActionResult> GetMyTransitInfo()
        {
            var studentIdClaim = User.Claims.FirstOrDefault(c => c.Type == "StudentId")?.Value;
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            
            var student = await _context.Students
                .Include(s => s.Route)
                    .ThenInclude(r => r.Vehicles)
                        .ThenInclude(v => v.Driver)
                .FirstOrDefaultAsync(s => studentIdClaim != null ? s.Id == int.Parse(studentIdClaim) : s.UserId == userId);

            if (student == null)
            {
                return NotFound("Student profile not found.");
            }

            var routeInfo = student.Route != null ? new 
            {
                id = student.Route.Id,
                name = student.Route.Name,
                fee = student.Route.RouteFee,
                stops = student.Route.RouteStops ?? "[]"
            } : null;

            object? vehicleInfo = null;

            if (student.Route != null && student.Route.Vehicles.Any())
            {
                var fallbackVehicle = student.Route.Vehicles.First();
                vehicleInfo = new
                {
                    id = fallbackVehicle.Id,
                    vehicleNumber = fallbackVehicle.VehicleNumber,
                    model = fallbackVehicle.Model ?? "Standard Transit",
                    driverName = fallbackVehicle.Driver?.Name ?? "Unassigned Pilot",
                    driverContact = fallbackVehicle.Driver?.Phone ?? "No Comms Setup",
                    gpsTrackingUrl = "https://maps.google.com/?q=bus",
                    status = "ON_ROUTE",
                    eta = "18 Mins"
                };
            }

            return Ok(new
            {
                isSubscribed = student.RouteId.HasValue,
                route = routeInfo,
                vehicle = vehicleInfo,
                boardingPoint = student.BoardingPoint ?? "Main Entrance Plaza - N5",
                dropPoint = student.DropPoint ?? "Sector 7 Junction",
                lastUpdated = DateTime.UtcNow.ToString("h:mm tt UTC")
            });
        }
        
        [HttpGet("Routes")]
        public async Task<IActionResult> GetAllRoutes()
        {
            var routes = await _context.Routes
                .Where(r => r.IsActive)
                .Select(r => new
                {
                    id = r.Id,
                    name = r.Name,
                    fee = r.RouteFee,
                    description = r.Description
                })
                .ToListAsync();
            return Ok(routes);
        }
    }
}

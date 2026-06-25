using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;
using System.Security.Claims;

namespace EasyEdu.Controllers
{
    [Authorize(Roles = "SuperAdmin,Admin,TransportManager")]
    public class TransportController : Controller
    {
        private readonly ApplicationDbContext _context;

        public TransportController(ApplicationDbContext context)
        {
            _context = context;
        }

        private async Task<int?> GetCompanyId()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _context.Users.FindAsync(userId);
            return user?.CompanyId;
        }

        // --- ROUTES ---
        public async Task<IActionResult> Index()
        {
            var companyId = await GetCompanyId();
            var routes = await _context.Routes
                .Where(r => r.CompanyId == companyId || companyId == null)
                .Include(r => r.Vehicles)
                .Include(r => r.Students)
                .ToListAsync();
            return View(routes);
        }

        public IActionResult CreateRoute() => View();

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateRoute(EasyEdu.Models.Route route)
        {
            if (ModelState.IsValid)
            {
                route.CompanyId = await GetCompanyId() ?? 0;
                _context.Add(route);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(route);
        }

        public async Task<IActionResult> EditRoute(int? id)
        {
            if (id == null) return NotFound();
            var companyId = await GetCompanyId();
            var route = await _context.Routes.FirstOrDefaultAsync(m => m.Id == id && (m.CompanyId == companyId || companyId == null));
            if (route == null) return NotFound();
            return View(route);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditRoute(int id, EasyEdu.Models.Route route)
        {
            if (id != route.Id) return NotFound();
            if (ModelState.IsValid)
            {
                _context.Update(route);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(route);
        }

        // --- VEHICLES ---
        public async Task<IActionResult> Vehicles()
        {
            var companyId = await GetCompanyId();
            var vehicles = await _context.Vehicles
                .Where(v => v.CompanyId == companyId || companyId == null)
                .Include(v => v.Route)
                .Include(v => v.Driver)
                .ToListAsync();
            return View(vehicles);
        }

        public async Task<IActionResult> CreateVehicle()
        {
            var companyId = await GetCompanyId();
            ViewBag.Routes = await _context.Routes.Where(r => r.CompanyId == companyId || companyId == null).ToListAsync();
            ViewBag.Drivers = await _context.Drivers.Where(d => d.CompanyId == companyId || companyId == null).ToListAsync();
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateVehicle(Vehicle vehicle)
        {
            if (ModelState.IsValid)
            {
                vehicle.CompanyId = await GetCompanyId() ?? 0;
                _context.Add(vehicle);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Vehicles));
            }
            var companyId = await GetCompanyId();
            ViewBag.Routes = await _context.Routes.Where(r => r.CompanyId == companyId || companyId == null).ToListAsync();
            ViewBag.Drivers = await _context.Drivers.Where(d => d.CompanyId == companyId || companyId == null).ToListAsync();
            return View(vehicle);
        }

        public async Task<IActionResult> EditVehicle(int? id)
        {
            if (id == null) return NotFound();
            var companyId = await GetCompanyId();
            var vehicle = await _context.Vehicles.FirstOrDefaultAsync(v => v.Id == id && (v.CompanyId == companyId || companyId == null));
            if (vehicle == null) return NotFound();
            
            ViewBag.Routes = await _context.Routes.Where(r => r.CompanyId == companyId || companyId == null).ToListAsync();
            ViewBag.Drivers = await _context.Drivers.Where(d => d.CompanyId == companyId || companyId == null).ToListAsync();
            return View(vehicle);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditVehicle(int id, Vehicle vehicle)
        {
            if (id != vehicle.Id) return NotFound();
            if (ModelState.IsValid)
            {
                _context.Update(vehicle);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Vehicles));
            }
            var companyId = await GetCompanyId();
            ViewBag.Routes = await _context.Routes.Where(r => r.CompanyId == companyId || companyId == null).ToListAsync();
            ViewBag.Drivers = await _context.Drivers.Where(d => d.CompanyId == companyId || companyId == null).ToListAsync();
            return View(vehicle);
        }

        // --- DRIVERS ---
        public async Task<IActionResult> Drivers()
        {
            var companyId = await GetCompanyId();
            var drivers = await _context.Drivers
                .Where(d => d.CompanyId == companyId || companyId == null)
                .Include(d => d.Vehicles)
                .ToListAsync();
            return View(drivers);
        }

        public IActionResult CreateDriver() => View();

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateDriver(Driver driver)
        {
            if (ModelState.IsValid)
            {
                driver.CompanyId = await GetCompanyId() ?? 0;
                _context.Add(driver);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Drivers));
            }
            return View(driver);
        }

        public async Task<IActionResult> EditDriver(int? id)
        {
            if (id == null) return NotFound();
            var companyId = await GetCompanyId();
            var driver = await _context.Drivers.FirstOrDefaultAsync(d => d.Id == id && (d.CompanyId == companyId || companyId == null));
            if (driver == null) return NotFound();
            return View(driver);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditDriver(int id, Driver driver)
        {
            if (id != driver.Id) return NotFound();
            if (ModelState.IsValid)
            {
                _context.Update(driver);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Drivers));
            }
            return View(driver);
        }

        // --- ASSIGNMENTS ---
        public async Task<IActionResult> AssignStudents(int? classId)
        {
            var companyId = await GetCompanyId();
            var query = _context.Students.Where(s => s.CompanyId == companyId || companyId == null);
            if (classId.HasValue) query = query.Where(s => s.ClassId == classId);

            var students = await query.Include(s => s.Class).Include(s => s.Route).ToListAsync();
            ViewBag.Routes = await _context.Routes.Where(r => r.CompanyId == companyId || companyId == null).ToListAsync();
            ViewBag.Classes = await _context.Classes.Where(c => c.CompanyId == companyId || companyId == null).ToListAsync();
            ViewBag.SelectedClassId = classId;
            return View(students);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateStudentAllocation(int studentId, int routeId)
        {
            var student = await _context.Students.FindAsync(studentId);
            if (student == null) return Json(new { success = false, message = "Student not found" });

            student.RouteId = routeId == 0 ? null : routeId;
            await _context.SaveChangesAsync();
            return Json(new { success = true });
        }

        public async Task<IActionResult> AssignVehicle()
        {
            var companyId = await GetCompanyId();
            var vehicles = await _context.Vehicles.Where(v => v.CompanyId == companyId || companyId == null).Include(v => v.Route).Include(v => v.Driver).ToListAsync();
            ViewBag.Routes = await _context.Routes.Where(r => r.CompanyId == companyId || companyId == null).ToListAsync();
            ViewBag.Drivers = await _context.Drivers.Where(d => d.CompanyId == companyId || companyId == null).ToListAsync();
            return View(vehicles);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateVehicleAssignment(int vehicleId, int? routeId, int? driverId)
        {
            var vehicle = await _context.Vehicles.FindAsync(vehicleId);
            if (vehicle == null) return Json(new { success = false, message = "Asset not found" });

            vehicle.RouteId = routeId;
            vehicle.DriverId = driverId;
            await _context.SaveChangesAsync();
            return Json(new { success = true });
        }

        // --- REPORTS ---
        public async Task<IActionResult> Reports()
        {
            var companyId = await GetCompanyId();
            var stats = new TransportReportsViewModel
            {
                TotalRoutes = await _context.Routes.CountAsync(r => r.CompanyId == companyId || companyId == null),
                TotalVehicles = await _context.Vehicles.CountAsync(v => v.CompanyId == companyId || companyId == null),
                TotalStudents = await _context.Students.CountAsync(s => (s.CompanyId == companyId || companyId == null) && s.RouteId != null),
                RouteWiseStudents = await _context.Routes
                    .Where(r => r.CompanyId == companyId || companyId == null)
                    .Select(r => new RouteStudentCount { RouteName = r.Name, StudentCount = r.Students.Count })
                    .ToListAsync()
            };
            return View(stats);
        }

        public IActionResult LiveTracking() => View();
    }

    public class TransportReportsViewModel
    {
        public int TotalRoutes { get; set; }
        public int TotalVehicles { get; set; }
        public int TotalStudents { get; set; }
        public List<RouteStudentCount> RouteWiseStudents { get; set; } = new();
    }

    public class RouteStudentCount
    {
        public string RouteName { get; set; } = string.Empty;
        public int StudentCount { get; set; }
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;
using System.Runtime.InteropServices;

namespace EasyEdu.Controllers
{
    [Authorize(Roles = "SuperAdmin")]
    public class GeneralSettingsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public GeneralSettingsController(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            var company = await _context.Companies.FirstOrDefaultAsync();
            return View(company);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateGeneralSettings(Company company)
        {
            var existing = await _context.Companies.FindAsync(company.Id);
            if (existing != null)
            {
                existing.Name = company.Name;
                existing.Email = company.Email;
                existing.Phone = company.Phone;
                existing.Address = company.Address;
                // Update other fields
                await _context.SaveChangesAsync();
                TempData["Success"] = "Settings updated successfully.";
            }
            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> AcademicYear()
        {
            return View(await _context.AcademicYears.ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> CreateAcademicYear(AcademicYear year)
        {
            if (year.IsCurrent)
            {
                var others = await _context.AcademicYears.Where(a => a.IsCurrent).ToListAsync();
                foreach (var o in others) o.IsCurrent = false;
            }
            _context.AcademicYears.Add(year);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(AcademicYear));
        }

        [HttpPost]
        public async Task<IActionResult> SetCurrentYear(int id)
        {
            var year = await _context.AcademicYears.FindAsync(id);
            if (year != null)
            {
                var others = await _context.AcademicYears.Where(a => a.IsCurrent).ToListAsync();
                foreach (var o in others) o.IsCurrent = false;
                
                year.IsCurrent = true;
                year.IsActive = true;
                await _context.SaveChangesAsync();
                TempData["Success"] = $"Academic Year {year.Name} is now set as current.";
            }
            return RedirectToAction(nameof(AcademicYear));
        }

        [HttpPost]
        public async Task<IActionResult> DeleteAcademicYear(int id)
        {
            var year = await _context.AcademicYears.FindAsync(id);
            if (year != null)
            {
                if (year.IsCurrent)
                {
                    TempData["Error"] = "Cannot delete the current academic year.";
                    return RedirectToAction(nameof(AcademicYear));
                }

                _context.AcademicYears.Remove(year);
                await _context.SaveChangesAsync();
                TempData["Success"] = "Academic Year deleted successfully.";
            }
            return RedirectToAction(nameof(AcademicYear));
        }

        // ── Printer Settings ──────────────────────────────────────────────────
        public IActionResult PrinterSettings()
        {
            return View();
        }

        [HttpGet]
        [System.Runtime.Versioning.SupportedOSPlatform("windows")]
        public IActionResult GetInstalledPrinters()
        {
            var printers = new List<object>();

            try
            {
                if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
                {
                    // Read from Windows Registry: HKLM\SYSTEM\CurrentControlSet\Control\Print\Printers
                    using var registryKey = Microsoft.Win32.Registry.LocalMachine
                        .OpenSubKey(@"SYSTEM\CurrentControlSet\Control\Print\Printers");

                    if (registryKey != null)
                    {
                        string? defaultPrinter = GetDefaultPrinterFromRegistry();
                        var printerNames = registryKey.GetSubKeyNames();

                        foreach (var name in printerNames)
                        {
                            using var pKey = registryKey.OpenSubKey(name);
                            var portName   = pKey?.GetValue("Port")?.ToString() ?? "";
                            var driverName = pKey?.GetValue("Printer Driver")?.ToString() ?? "";
                            var attributes = pKey?.GetValue("Attributes");

                            // Attributes flag 0x80 = Work Offline; 0x20 = Shared
                            bool isOffline = attributes is int attr && (attr & 0x80) != 0;

                            printers.Add(new
                            {
                                name        = name,
                                type        = string.IsNullOrEmpty(driverName) ? "Local Printer" : driverName,
                                port        = portName,
                                status      = isOffline ? "offline" : "online",
                                isDefault   = name.Equals(defaultPrinter, StringComparison.OrdinalIgnoreCase),
                                description = portName
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Log error but don't crash – return empty list for client fallback
                Console.WriteLine($"Printer Registry Error: {ex.Message}");
            }

            // If no printers found via registry (or non-Windows), return empty so JS uses fallback
            return Json(printers);
        }

        [System.Runtime.Versioning.SupportedOSPlatform("windows")]
        private string? GetDefaultPrinterFromRegistry()
        {
            try
            {
                using var userKey = Microsoft.Win32.Registry.CurrentUser
                    .OpenSubKey(@"Software\Microsoft\Windows NT\CurrentVersion\Windows");
                var device = userKey?.GetValue("Device")?.ToString();
                return device?.Split(',')[0];
            }
            catch { return null; }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult SetDefaultPrinter([FromBody] SetDefaultPrinterRequest request)
        {
            // Store in TempData / Session for reference; actual OS default must be set via OS
            TempData["DefaultPrinter"] = request.PrinterName;
            return Ok(new { success = true, message = $"Default printer set to: {request.PrinterName}" });
        }

        // --- Base Setup ---
        public async Task<IActionResult> BaseSetup()
        {
            var setupItems = await _context.AdminSetupItems.ToListAsync();
            return View(setupItems);
        }

        // --- Backup ---
        public IActionResult Backup()
        {
            return View();
        }

        // --- Language Settings ---
        public IActionResult LanguageSettings()
        {
            return View();
        }
    }

    public class SetDefaultPrinterRequest
    {
        public string PrinterName { get; set; } = string.Empty;
    }
}

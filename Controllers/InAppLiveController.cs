using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using EasyEdu.Data;
using Microsoft.EntityFrameworkCore;

namespace EasyEdu.Controllers
{
    [Authorize]
    public class InAppLiveController : Controller
    {
        private readonly ApplicationDbContext _context;
        public InAppLiveController(ApplicationDbContext context) => _context = context;

        public async Task<IActionResult> Index()
        {
            var module = await _context.SystemModules.FirstOrDefaultAsync(m => m.Name == "In App Live Addon");
            if (module == null || !module.IsEnabled) return RedirectToAction("Index", "Home");
            return View();
        }
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using EasyEdu.Data;
using Microsoft.EntityFrameworkCore;

namespace EasyEdu.Controllers
{
    [Authorize]
    public class AiContentController : Controller
    {
        private readonly ApplicationDbContext _context;

        public AiContentController(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            var module = await _context.SystemModules.FirstOrDefaultAsync(m => m.Name == "Ai Content Addon");
            if (module == null || !module.IsEnabled)
            {
                return RedirectToAction("Index", "Home");
            }

            return View();
        }

        public IActionResult Generate()
        {
            return View();
        }
    }
}

using Microsoft.AspNetCore.Mvc;

namespace EasyEdu.Controllers
{
    public class CalendarController : Controller
    {
        public IActionResult Index()
        {
            return RedirectToAction("Calendar", "Communicate");
        }
    }
}

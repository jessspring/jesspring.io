using jesspring.io.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace jesspring.io.Controllers
{
    [Route("/{action=Index}")]
    public class HomeController : BaseController
    {
        public static string Name => GetControllerName(nameof(HomeController));

        public IActionResult Index()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public IActionResult Settings()
        {
            return View();
        }
    }
}

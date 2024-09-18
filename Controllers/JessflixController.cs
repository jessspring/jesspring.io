using Microsoft.AspNetCore.Mvc;

namespace jesspring.io.Controllers
{
    public class JessflixController : BaseController
    {
        public static string Name => GetControllerName(nameof(JessflixController));

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Watch(int id)
        {
            return View(id);
        }
    }
}

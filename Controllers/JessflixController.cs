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

        [HttpGet("[controller]/Watch/Movie/{id}")]
        public IActionResult WatchMovie(int id)
        {
            return View(id);
        }

        [HttpGet("[controller]/Watch/TV/{id}")]
        public IActionResult WatchTv(int id)
        {
            return View(id);
        }
    }
}

using Microsoft.AspNetCore.Mvc;

namespace jesspring.io.Controllers
{
    public class AchievementsController : BaseController
    {
        public static string Name => GetControllerName(nameof(AchievementsController));

        public IActionResult Index()
        {
            return View();
        }
    }
}

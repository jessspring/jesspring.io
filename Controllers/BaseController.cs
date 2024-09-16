using Microsoft.AspNetCore.Mvc;

namespace jesspring.io.Controllers
{
    public abstract class BaseController : Controller
    {
        private const string ControllerString = nameof(Controller);

        protected static string GetControllerName(string controllerClassName)
            => controllerClassName.EndsWith(ControllerString)
                ? controllerClassName.Substring(0, controllerClassName.Length - ControllerString.Length)
                : controllerClassName;
    }
}

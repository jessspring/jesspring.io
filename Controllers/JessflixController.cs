using HtmlAgilityPack;
using jesspring.io.Models;
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

        public IActionResult Watch(string titleId)
        {
            return View(null, titleId);
        }

        public async Task<JsonResult> GetTitlesFromSearch(string search)
        {
            const string url = "https://www.imdb.com/find/?s=tt&q=";

            var httpClient = new HttpClient();
            using var response = await httpClient.GetAsync(url + search);
            var html = await response.Content.ReadAsStringAsync();

            var htmlDocument = new HtmlDocument();
            htmlDocument.LoadHtml(html);

            var info = htmlDocument.DocumentNode
                .QuerySelectorAll("li.ipc-metadata-list-summary-item")
                .ToList()
                .ConvertAll(x => new JessflixInfoModel(x, (string titleId) => Url.Action(nameof(Watch), new { titleId })));

            return new JsonResult(info);
        }
    }
}

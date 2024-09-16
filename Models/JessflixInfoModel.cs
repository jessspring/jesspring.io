using HtmlAgilityPack;

namespace jesspring.io.Models
{
    public class JessflixInfoModel
    {
        public string ImageSource { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }

        public JessflixInfoModel(HtmlNode node, Func<string, string> urlCreator)
        {
            ImageSource = node.QuerySelector("img.ipc-image")?.GetAttributeValue("src", string.Empty) ?? string.Empty;
            //if (ImageSource != string.Empty)
            //{
            //    ImageSource = ImageSource.Split(".jpg")[0];
            //}

            if (ImageSource == string.Empty)
                ImageSource = "images/question_mark.png";

            var linkNode = node.QuerySelector("a.ipc-metadata-list-summary-item__t");
            Title = linkNode.InnerText;
            Url = urlCreator(linkNode.GetAttributeValue("href", string.Empty).Split("/")[2]);
            Description = linkNode.NextSiblingElement()?.QuerySelector("span.ipc-metadata-list-summary-item__li")?.InnerText ?? string.Empty;
        }
    }
}

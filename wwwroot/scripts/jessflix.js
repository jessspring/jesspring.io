const titleList = document.getElementById("title-list");
const searchForm = document.getElementById("search-form");

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(searchForm);

    fetch(searchForm.action + formData.get("search"))
        .then(x => x.json())
        .then(titles => {
            titleList.innerHTML = "";

            for (const title of titles) {
                const titleHtml =
                    `<div class="card title-card">
                        <div class="title-image-container">
                            <img class="title-image" src="${title.imageSource}" />
                            <div>
                                <div>${title.title}</div>
                                <div>${title.description}</div>
                            </div>
                        </div>
                        <a href="${title.url}">Watch</a>
                    </div>`;

                const titleElement = document.createElement("template");
                titleElement.innerHTML = titleHtml;
                titleList.appendChild(titleElement.content.firstChild);
            }
        });
});

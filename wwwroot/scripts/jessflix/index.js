const titleList = document.getElementById("title-list");
const searchForm = document.getElementById("search-form");

//Create movie title element from template
function createMovieElement(result) {
    const date = result.release_date != ""
        ? result.release_date
        : "Not specified"

    return createGenericTitleElement(result, date, result.title, `/Jessflix/Watch/Movie/${result.id}`);
}

//Create TV series title element from template
function createTvElement(result) {
    const date = result.first_air_date != ""
        ? result.first_air_date
        : "Not specified"

    return createGenericTitleElement(result, date, result.name, `/Jessflix/Watch/TV/${result.id}`);
}

//Base title element template
function createGenericTitleElement(result, date, name, url) {
    const posterPath = result.poster_path != null
        ? `https://image.tmdb.org/t/p/w200${result.poster_path}`
        : "/images/question_mark3.png";

    const overview = result.overview == null || result.overview == "" ? "" :
        `<div class="card yellow-card title-description">${result.overview}</div>`;
    const titleHtml =
        `<div class="card title-card">
                <img class="title-image" src="${posterPath}" />
                <div class="flex fd-column w-100">
                    <div class="card blue-card title-info">
                        <div>
                            <div class="pixel-font-bold title-name">${name}</div>
                            <div>Date: ${date}</div>
                        </div>
                        <a class="button" href="${url}">Watch</a>
                    </div>
                    ${overview}
                </div>
            </div>`;

    const titleElement = document.createElement("template");
    titleElement.innerHTML = titleHtml;

    return titleElement.content.firstChild;
}

async function getData() {
    //Send request
    const formData = new FormData(searchForm);
    const response = await fetch(searchForm.action + formData.get("search"));
    const json = await response.json();

    //Put titles with no art at the bottom
    const results = json.results.filter(x => x.poster_path != null).concat(json.results.filter(x => x.poster_path == null));

    //Clear title list and populate with new titles
    titleList.innerHTML = "";

    for (const result of results) {
        if (result.media_type == "movie")
            titleList.appendChild(createMovieElement(result));
        else if (result.media_type == "tv")
            titleList.appendChild(createTvElement(result));
    }
}

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    getData();
});

const movieUrl = "https://api.themoviedb.org/3/search/movie?api_key=710eae815b269abfbd23d6ca65580e55&query=";
const tvUrl = "https://api.themoviedb.org/3/search/tv?api_key=710eae815b269abfbd23d6ca65580e55&query="

const titleList = document.getElementById("title-list");
const searchForm = document.getElementById("search-form");

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(searchForm);

    fetch(searchForm.action + formData.get("search"))
        .then(x => x.json())
        .then(json => {
            titleList.innerHTML = "";

            for (const result of json.results) {
                const posterPath = result.poster_path != null
                    ? `https://image.tmdb.org/t/p/w200${result.poster_path}`
                    : "/images/question_mark.png";
                const date = result.release_date != ""
                    ? result.release_date
                    : "Not specified"

                const titleHtml =
                    `<div class="card title-card">
                        <img class="title-image" src="${posterPath}" />
                        <div class="flex fd-column w-100">
                            <div class="card blue-card title-info">
                                <div>
                                    <div class="pixel-font-bold title-name">${result.title}</div>
                                    <div>Date: ${date}</div>
                                </div>
                                <a class="button" href="/Jessflix/Watch/${result.id}">Watch</a>
                            </div>
                            <div class="card yellow-card title-description">${result.overview}</div>      
                        </div>
                    </div>`;

                const titleElement = document.createElement("template");
                titleElement.innerHTML = titleHtml;
                titleList.appendChild(titleElement.content.firstChild);
            }
        });
});

const moviesButton = document.getElementById("movies-button");
const tvButton = document.getElementById("tv-button");
const searchTypeInput = document.getElementById("search-type");

function setSearchType(searchType) {
    if (searchType == "movies") {
        moviesButton.classList.toggle("button-pressed", true);
        tvButton.classList.toggle("button-pressed", false);
        searchForm.action = movieUrl;
    }
    else {
        moviesButton.classList.toggle("button-pressed", false);
        tvButton.classList.toggle("button-pressed", true);
        searchForm.action = tvUrl;
    }

    searchTypeInput.value = searchType;
}

moviesButton.addEventListener("click", () => setSearchType("movies"));
tvButton.addEventListener("click", () => setSearchType("tv"));

window.addEventListener("load", () => setTimeout(() => {
    if (searchTypeInput.value == null) {
        moviesButton.classList.toggle("button-pressed", true);
        searchTypeInput.value = "movies";
        searchForm.action = movieUrl;
    }
    else if (searchTypeInput.value == "movies") {
        moviesButton.classList.toggle("button-pressed", true);
        tvButton.classList.toggle("button-pressed", false);
        searchForm.action = movieUrl;
    }
    else {
        moviesButton.classList.toggle("button-pressed", false);
        tvButton.classList.toggle("button-pressed", true);
        searchForm.action = tvUrl;
    }
}, 0));

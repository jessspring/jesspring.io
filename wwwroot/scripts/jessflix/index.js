const movieUrl = "https://api.themoviedb.org/3/search/movie?api_key=710eae815b269abfbd23d6ca65580e55&query=";
const tvUrl = "https://api.themoviedb.org/3/search/tv?api_key=710eae815b269abfbd23d6ca65580e55&query="

const titleList = document.getElementById("title-list");
const searchForm = document.getElementById("search-form");

function createMovieElement(result) {
    const date = result.release_date != ""
        ? result.release_date
        : "Not specified"

    return createGenericTitleElement(result, date, result.title, `/Jessflix/Watch/Movie/${result.id}`);
}

function createTvElement(result) {
    const date = result.first_air_date != ""
        ? result.first_air_date
        : "Not specified"

    return createGenericTitleElement(result, date, result.name, `/Jessflix/Watch/TV/${result.id}`);
}

function createGenericTitleElement(result, date, name, url) {
    const posterPath = result.poster_path != null
        ? `https://image.tmdb.org/t/p/w200${result.poster_path}`
        : "/images/question_mark.png";

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
                    <div class="card yellow-card title-description">${result.overview}</div>      
                </div>
            </div>`;

    const titleElement = document.createElement("template");
    titleElement.innerHTML = titleHtml;

    return titleElement.content.firstChild;
}

async function getData() {
    const formData = new FormData(searchForm);
    const response = await fetch(searchForm.action + formData.get("search"));
    const json = await response.json();

    titleList.innerHTML = "";

    if (response.url.startsWith(movieUrl)) {
        for (const result of json.results) {
            titleList.appendChild(createMovieElement(result));
        }
    }
    else if (response.url.startsWith(tvUrl)) {
        for (const result of json.results) {
            titleList.appendChild(createTvElement(result));
        }
    }
}

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    getData();
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
    if (searchTypeInput.value == null || searchTypeInput.value == "") {
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

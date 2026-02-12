const tvUrl = "https://api.themoviedb.org/3/tv/{tvId}?api_key=710eae815b269abfbd23d6ca65580e55";
const seasonUrl = "https://api.themoviedb.org/3/tv/{tvId}/season/{seasonNumber}?api_key=710eae815b269abfbd23d6ca65580e55";
const streamUrl = "https://vidsrc.xyz/embed/tv?tmdb={tvId}&season={seasonNumber}&episode={episodeNumber}&ds_lang=en";
const seasonSelect = document.getElementById("season-select");
const episodeSelect = document.getElementById("episode-select");
const streamEmbed = document.getElementById("stream-embed");
const newTabLink = document.getElementById("new-tab-link");
const diceButton = document.getElementById("dice-button");

fetch(tvUrl.replace("{tvId}", window.data.tvId))
    .then(x => x.json())
    .then(json => {
        //Set series image and info on load
        const posterPath = json.poster_path != null
            ? `https://image.tmdb.org/t/p/w400${json.poster_path}`
            : "/images/question_mark.png";

        document.getElementById("title-image").setAttribute("src", posterPath);

        if (json.first_air_date != null) {
            const date = json.first_air_date != ""
                ? json.first_air_date
                : "Not specified";

            document.getElementById("title-date").innerHTML = date;
        }

        document.getElementById("title-name").innerHTML = json.name;
        document.getElementById("title-description").innerHTML = json.overview;

        //Set season select options
        //Remove "Specials" season and add to the end of the list later
        let seasons = json.seasons;
        let specials = null;
        if (seasons[0].season_number == 0) {
            specials = seasons[0];
            specials.full_name = "Specials";
            seasons = seasons.slice(1);
        }

        //If all of the seasons are called "Season X" or "Series X" don't add "Season X: " before their name
        let allNamesMatch = true;
        for (const season of seasons) {
            season.full_name = `Season ${season.season_number}: ${season.name}`;
            season.series_name = `Series ${season.season_number}`;

            if (!(season.full_name.startsWith(season.name) || season.series_name == season.name))
                allNamesMatch = false;
        }

        //Add specials if it was removed
        if (specials != null)
            seasons.push(specials);

        //Add option for each season
        seasonSelect.innerHTML = "";
        for (const season of seasons) {
            const optionElement = document.createElement("option");
            optionElement.value = season.season_number;
            optionElement.text = allNamesMatch ? season.name : season.full_name;
            seasonSelect.appendChild(optionElement);
        }

        setSeasonFromQuery();
        loadEpisodes(true);
    });

seasonSelect.addEventListener("change", () => loadEpisodes());

function loadEpisodes(readQueryParam = false) {
    fetch(seasonUrl.replace("{tvId}", window.data.tvId).replace("{seasonNumber}", seasonSelect.value))
        .then(x => x.json())
        .then(json => {
            //Set episode select options
            //If all of the episodes are called "Episode X" don't add "Episode X: " before their name
            let allNamesMatch = true;
            for (const episode of json.episodes) {
                episode.full_name = `Episode ${episode.episode_number}: ${episode.name}`;

                if (!episode.full_name.startsWith(episode.name))
                    allNamesMatch = false;
            }

            //Add option for each episode
            episodeSelect.innerHTML = "";
            for (const episode of json.episodes) {
                const optionElement = document.createElement("option");
                optionElement.value = episode.episode_number;
                optionElement.text = allNamesMatch ? episode.name : episode.full_name;
                episodeSelect.appendChild(optionElement);
            }

            if (readQueryParam)
                setEpisodeFromQuery();
            else
                updateQuery();

            //Set links for stream embed and new tab button for the initial episode
            updateLinks();
        });
}

episodeSelect.addEventListener("change", () => {
    updateLinks();
    updateQuery();
});

diceButton.addEventListener("click", () => {
    fetch(tvUrl.replace("{tvId}", window.data.tvId))
        .then(x => x.json())
        .then(json => {
            //Remove specials if it exists and then pick a random season
            let seasons = json.seasons;
            if (seasons[0].season_number == 0)
                seasons = seasons.slice(1);

            const season = seasons[Math.floor(Math.random() * seasons.length)];
            seasonSelect.value = season.season_number;

            fetch(seasonUrl.replace("{tvId}", window.data.tvId).replace("{seasonNumber}", season.season_number))
                .then(x => x.json())
                .then(json => {
                    //Pick a random episode and update stream
                    const episodes = json.episodes;
                    const episode = episodes[Math.floor(Math.random() * episodes.length)];

                    updateQuery(season.season_number, episode.episode_number);
                    loadEpisodes(true);
                });
        });
});

let diceNumber = 1;
let interval;
diceButton.addEventListener("mouseover", () => {
    interval = setInterval(() => {
        diceNumber++;

        if (diceNumber > 3)
            diceNumber = 1;

        diceButton.src = `/images/dice/d${diceNumber}.png`;
    }, 250);
});

diceButton.addEventListener("mouseout", () => {
    clearInterval(interval);
});

function updateLinks() {
    const newLink = streamUrl
        .replace("{tvId}", window.data.tvId)
        .replace("{seasonNumber}", seasonSelect.value)
        .replace("{episodeNumber}", episodeSelect.value);

    streamEmbed.src = newLink;
    newTabLink.href = newLink;
}

function setSeasonFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const season = params.get("season");

    if (season == null)
        return;

    seasonSelect.value = season;
}

function setEpisodeFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const season = params.get("season");
    const episode = params.get("episode");

    if (season == null || episode == null)
        return;

    episodeSelect.value = episode;
}

function updateQuery(season = null, episode = null) {
    const url = new URL(window.location.href);
    url.searchParams.set("season", season == null ? seasonSelect.value : season);
    url.searchParams.set("episode", episode == null ? episodeSelect.value : episode);
    window.history.pushState(null, "", url.toString());
}

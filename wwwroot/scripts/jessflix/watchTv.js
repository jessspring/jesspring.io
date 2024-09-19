const tvUrl = "https://api.themoviedb.org/3/tv/{tvId}?api_key=710eae815b269abfbd23d6ca65580e55";
const seasonUrl = "https://api.themoviedb.org/3/tv/{tvId}/season/{seasonNumber}?api_key=710eae815b269abfbd23d6ca65580e55";
const streamUrl = "https://vidsrc.xyz/embed/tv?tmdb={tvId}&season={seasonNumber}&episode={episodeNumber}"
const seasonSelect = document.getElementById("season-select");
const episodeSelect = document.getElementById("episode-select");
const streamEmbed = document.getElementById("stream-embed");

fetch(tvUrl.replace("{tvId}", window.data.tvId))
    .then(x => x.json())
    .then(json => {
        const posterPath = json.poster_path != null
            ? `https://image.tmdb.org/t/p/w200${json.poster_path}`
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

        seasonSelect.innerHTML = "";

        for (const season of json.seasons) {
            const optionElement = document.createElement("option");
            optionElement.value = season.season_number;
            optionElement.text = `Season ${season.season_number}: ${season.name}`;
            seasonSelect.appendChild(optionElement);
        }

        loadEpisodes();
    });

seasonSelect.addEventListener("change", loadEpisodes);

function loadEpisodes() {
    fetch(seasonUrl.replace("{tvId}", window.data.tvId).replace("{seasonNumber}", seasonSelect.value))
        .then(x => x.json())
        .then(json => {
            episodeSelect.innerHTML = "";

            for (const episode of json.episodes) {
                const optionElement = document.createElement("option");
                optionElement.value = episode.episode_number;
                optionElement.text = `Episode ${episode.episode_number}: ${episode.name}`;
                episodeSelect.appendChild(optionElement);
            }

            setStreamEmbed();
        });
}

episodeSelect.addEventListener("change", setStreamEmbed);

function setStreamEmbed() {
    streamEmbed.src = streamUrl.replace("{tvId}", window.data.tvId).replace("{seasonNumber}", seasonSelect.value).replace("{episodeNumber}", episodeSelect.value);
}
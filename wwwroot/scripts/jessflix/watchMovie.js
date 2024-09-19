const url = "https://api.themoviedb.org/3/movie/{movieId}?api_key=710eae815b269abfbd23d6ca65580e55";

fetch(url.replace("{movieId}", window.data.movieId))
    .then(x => x.json())
    .then(json => {
        const posterPath = json.poster_path != null
            ? `https://image.tmdb.org/t/p/w200${json.poster_path}`
            : "/images/question_mark.png";

        document.getElementById("title-image").setAttribute("src", posterPath);

        if (json.release_date != null) {
            const date = json.release_date != ""
                ? json.release_date
                : "Not specified";

            document.getElementById("title-date").innerHTML = date;
        }

        document.getElementById("title-name").innerHTML = json.title;
        document.getElementById("title-description").innerHTML = json.overview;
    });
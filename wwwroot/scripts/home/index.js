//Recent achievements
const recentAchievements = document.getElementById("recent-achievements");

//Get a list of the 4 most recently unlocked achievement image names
let unlockedAchievements =
    achievementInfo.map(info => { return { info: info, time: window.localStorage.getItem("achievement_unlocked_" + info.id) }; })
        .filter(x => x.time != null)
        .sort((a, b) => b.time - a.time)
        .map(x => x.info.image)
        .slice(0, 4);

//Pad list to 4
const numUnlocked = unlockedAchievements.length;
for (let i = 0; i < 4 - numUnlocked; i++) {
    unlockedAchievements.push("missing_achievement");
}

//Insert image elements
recentAchievements.innerHTML = "";
unlockedAchievements.forEach(image => {
    const imageElement = document.createElement("template");
    imageElement.innerHTML = `<img src="/images/achievements/${image}.png" class="achievement-image" />`
    recentAchievements.appendChild(imageElement.content.firstChild);
});



//Recommended titles
const recommendedTitles = [
    //TV
    ["Breaking Bad", "TV/1396", "ztkUQFLlC19CCMYHW9o1zWhJRNq"],
    ["Spy × Family", "TV/120089", "3r4LYFuXrg3G8fepysr4xSLWnQL"],
    ["The Boys", "TV/76479", "2zmTngn1tYC1AvfnrFLhxeD82hz"],
    ["New Girl", "TV/1420", "8oCqMlKKomCArVtyOjRzMN6g40Z"],
    ["Silicon Valley", "TV/60573", "4ptpmWBVD9HY9hMh8Cbs6SMiy7p"],
    ["It's Always Sunny in Philadelphia", "TV/2710", "o0tMMK33JqmtpcWw0H41cEr9xQB"],
    ["Fallout", "TV/106379", "AnsSKR9LuK0T9bAOcPVA3PUvyWj"],
    ["The Mighty Boosh", "TV/7166", "dKlYEo7mc1XLN2PutYlRuTLUXlC"],
    ["The Last of Us", "TV/100088", "dmo6TYuuJgaYinXBPjrgG9mB5od"],
    ["Curb Your Enthusiasm", "TV/4546", "ziRhqatQtp2mlwCxT4YfylbZ9Ds"],
    ["Arcane", "TV/94605", "fqldf2t8ztc9aiwn3k6mlX3tvRT"],
    ["Pokémon", "TV/60572", "rOuGm07PxBhEsK9TaGPRQVJQm1X"],
    ["Game of Thrones", "TV/1399", "1XS1oqL89opfnbLl8WnZY1O1uJx"],
    ["Big Mouth", "TV/74204", "1Zio9w1tAd3r5Gu4d9AzTSx2hnT"],
    ["One-Punch Man", "TV/63926", "jbYJuxfZMpYDalkiOnBcCv9TaL"],
    ["Marvel's Daredevil", "TV/61889", "QWbPaDxiB6LW2LjASknzYBvjMj"],
    ["The Expanse", "TV/63639", "8djpxDeWpINnGhjpFXQjnBe6zbx"],
    ["Community", "TV/18347", "3KUjDt8XY7w2Ku70UE0SECmv1zP"],
    ["The Office", "TV/2316", "7DJKHzAi83BmQrWLrYYOqcoKfhR"],
    ["Dark", "TV/70523", "1DLjjvSWMYo17B7wuz6YikB96hH"],
    ["Lost", "TV/4607", "og6S0aTZU6YUJAbqxeKjCa3kY1E"],
    ["Sex Education", "TV/81356", "bc3bmTdnoKcRuO9xdQKgAbB7Y9Z"],
    ["Twin Peaks", "TV/1920", "lA9CNSdo50iQPZ8A2fyVpMvJZAf"],
    ["Chernobyl", "TV/87108", "hlLXt2tOPT6RRnjiUmoxyG1LTFi"],
    ["Serial Experiments Lain", "TV/1087", "93M6d0pAqVQySKrp43LfBYDTvZ"],
    ["SpongeBob SquarePants", "TV/387", "5h0EU2lqBb03dp5vtRuUHJwqzem"],
    ["Futurama", "TV/615", "6ZS8SOno6kTmWz4eQ8lX8EBXOMv"],

    //Movie
    ["Dominion", "Movie/472796", "sipSZ6Gcuz6O7gzQbLdskpwjh7V"],
    ["The Road", "Movie/20766", "qLaXnLzqleBWQtjvZ6JGVSaKoC3"],
    ["The Crow", "Movie/9495", "rMMB3v6jYHjsvXRNJYESacoTD7j"],
    ["The Lighthouse", "Movie/503919", "f1tIYarTbkBdIT1aW0gzelDwknv"],
    ["A Quiet Place", "Movie/447332", "nAU74GmpUk7t5iklEp3bufwDq4n"],
    ["No Country for Old Men", "Movie/6977", "6d5XOczc226jECq0LIX0siKtgHR"],
    ["Annihilation", "Movie/300668", "4YRplSk6BhH6PRuE9gfyw9byUJ6"],
    ["Vivarium", "Movie/458305", "myf3qzpeN0JbuFRPwSpJcz7rmAT"],
    ["What We Do in the Shadows", "Movie/246741", "a2rD3i3DBMeYbA34rBv6z3B9S3a"],
    ["The Lord of the Rings: The Fellowship of the Ring", "Movie/120", "6oom5QYQ2yQTMJIbnvbkBL9cHo6"],
    ["Mean Girls", "Movie/10625", "2ZkuQXvVhh45uSvkBej4S7Ix1NJ"],
    ["The Princess Diaries", "Movie/9880", "7axhsbEzFan6HQQ1aMOy7w3CFRx"],
    ["Twilight", "Movie/8966", "3Gkb6jm6962ADUPaCBqzz9CTbn9"],
    ["Skinamarink", "Movie/994143", "o942912KFh89SGhqWuKXuT0SXzN"],
    ["Grandma's Boy", "Movie/9900", "fSRdHBtisU0zhks4OjKezI3jnt7"],
    ["Pacific Rim", "Movie/68726", "8wo4eN8dWKaKlxhSvBz19uvj8gA"],
    ["Army of Darkness", "Movie/766", "xsgTuAtR2zSH8Umg3jWZcZjlDpe"],
    ["Pulse", "Movie/27324", "c3zEimDraIyMSasPMGDaNOrhnzn"],
];

let unusedTitles = recommendedTitles;
[
    document.getElementById("recommended-title-link-1"),
    document.getElementById("recommended-title-link-2"),
    document.getElementById("recommended-title-link-3"),
].forEach(link => {
    //Get a random title and remove it from the list
    const title = unusedTitles[Math.floor(Math.random() * unusedTitles.length)];
    unusedTitles = unusedTitles.filter(x => x != title);

    //Set the link and image properties
    link.href = "/Jessflix/Watch/" + title[1];
    link.title = title[0];
    link.firstElementChild.src = `https://image.tmdb.org/t/p/w400/${title[2]}.jpg`;
    link.firstElementChild.alt = title[0];
});

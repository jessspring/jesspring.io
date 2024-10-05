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
    ["Dominion", "Movie/472796", "sipSZ6Gcuz6O7gzQbLdskpwjh7V"],                    //for the animals
    ["Interstellar", "Movie/157336", "gEU2QniE6E77NI6lCU6MxlNBvIx"],                //for smyaly
    ["Pride", "Movie/234200", "mrITqHNw0XzT7egAPByDuiE3QZf"],                       //for psymple
    ["The Road", "Movie/20766", "qLaXnLzqleBWQtjvZ6JGVSaKoC3"],
    ["Breaking Bad", "TV/1396", "ztkUQFLlC19CCMYHW9o1zWhJRNq"],
    ["Titanic", "Movie/597", "9xjZS2rlVxm8SFx8kPC3aIGCOYQ"],                        //for vulcab
    ["Star Trek: The Next Generation", "TV/655", "vkLzXddgUKH5VcpnYiRzpJFrZhz"],    //for vulcab
    ["Space Dandy", "TV/60874", "ypaXEydotwQyDvdV7bgVND9fOTx"],                     //for bunpetals
    ["The Crow", "Movie/9495", "rMMB3v6jYHjsvXRNJYESacoTD7j"],
    ["Better Call Saul", "TV/60059", "fC2HDm5t0kHl7mTm7jxMR31b7by"],                //for sofmeright
    ["Neon Genesis Evangelion", "TV/890", "y2ah9t0navXyIvoHg1uIbIHO3tt"],           //for icera
    ["Shōgun", "TV/126308", "7O4iVfOMQmdCSxhOg1WnzG1AgYT"],                         //for icera
    ["Pokémon", "TV/60572", "rOuGm07PxBhEsK9TaGPRQVJQm1X"],
    ["Adventure Time", "TV/15260", "qk3eQ8jW4opJ48gFWYUXWaMT4l"],                   //for brooke
    ["Bob's Burgers", "TV/32726", "yVz5foNr6nCfathj0igg8RLVGfn"],                   //for brooke
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
    link.firstElementChild.src = `https://image.tmdb.org/t/p/w200/${title[2]}.jpg`;
    link.firstElementChild.alt = title[0];
});

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

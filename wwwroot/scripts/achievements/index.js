const achievementList = document.getElementById("achievement-list");
const unlockedAchievementCount = document.getElementById("unlocked-achievement-count");

window.addEventListener("load", () => {
    let unlocked = 0;

    //Add each achievement, sorted by their order
    achievementInfo.sort((a, b) => a.order - b.order)
        .forEach(info => {
            let achievementElement;

            //Only show full achievement if it is unlocked
            if (window.localStorage.getItem("achievement_unlocked_" + info.id) == null)
                achievementElement = createLocked(info);
            else {
                unlocked++;
                achievementElement = createUnlocked(info);
            }

            achievementList.appendChild(achievementElement);
        });

    //Update unlocked achievement count and percentage
    unlockedAchievementCount.innerHTML = `Unlocked ${unlocked} of ${achievementInfo.length} achievements (${Math.floor((unlocked / achievementInfo.length) * 100)}%)`;

    //Add listener for the "Ask nicely" achievement
    const askNicelyIcon = document.getElementById(`achivement-icon-${achievementIdMap["ask_nicely"]}`);
    askNicelyIcon.addEventListener("click", () => {
        unlockAchievement("ask_nicely");
    });
});


//Create unlocked achievement element from template
function createUnlocked(info) {
    return createAchievement(info.image, info.name, info.description, info.id);
}

//Create locked achievement element from template
function createLocked(info) {
    return createAchievement("missing_achievement", info.name, "???", info.id);
}

//Base achievement element template
function createAchievement(image, title, description, id) {
    const achievementHtml =
        `<div class="flex fd-row m-b-20">
            <img class="achievement-popup-image" id="achivement-icon-${id}" src="/images/achievements/${image}.png" />

            <div>
                <div class="font-size-2 home-card-title-yellow pixel-font-bold achievement-title">${title}</div>
                <div class="">${description}</div>
            </div>
        </div>`;

    const achievementElement = document.createElement("template");
    achievementElement.innerHTML = achievementHtml;

    return achievementElement.content.firstChild;
}

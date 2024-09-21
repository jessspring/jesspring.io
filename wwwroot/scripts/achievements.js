const achievementInfo = [
    {
        id: 1,
        order: 1,
        name: "Rainbow splash",
        descripion: "Hit the 1% chance to get rainbow splash text",
        image: "rainbow"
    },
    {
        id: 2,
        order: 2,
        name: "Catcophony",
        descripion: "Encounter the Catcophony easter egg",
        image: "cat_note"
    },
    {
        id: 3,
        order: 3,
        name: "#1 fan",
        descripion: "Visit all of the footer links",
        image: "number_one"
    },
];


window.addEventListener("keydown", (event) => {
    unlockAchievement(3);
});

function unlockAchievement(achievementId) {
    const storage = window.localStorage;
    const storageKey = "achievement_unlocked_" + achievementId;
    const get = storage.getItem(storageKey);

    //if (get == null) {
        storage.setItem(storageKey, new Date().getTime());

        const info = achievementInfo.filter(x => x.id == achievementId)[0];
        document.getElementById("achievement-popup-image").src = `/images/achievements/${info.image}.png`;
        document.getElementById("achievement-popup-name").innerHTML = info.name;

        const achievementContainer = document.getElementById("achievement-popup-container");
        achievementContainer.classList.toggle("achievement-popup-container-move", false);
        void achievementContainer.offsetWidth;
        achievementContainer.classList.toggle("achievement-popup-container-move", true);
    //}
}

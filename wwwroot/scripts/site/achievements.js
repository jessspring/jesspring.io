const achievementIdMap = {
    rainbow_splash: 1,
    catcophony: 2,
    number_one_fan: 3,
    ask_nicely: 4,
    watch_dominion: 5,
    playing_with_fire: 6,
};

const achievementInfo = [
    {
        id: 1,
        order: 3,
        name: "Rainbow splash",
        description: "Hit the 1% chance to get rainbow splash text.",
        image: "rainbow"
    },
    {
        id: 2,
        order: 4,
        name: "Catcophony",
        description: "Encounter the Catcophony easter egg.",
        image: "cat_note"
    },
    {
        id: 3,
        order: 1,
        name: "Number one fan",
        description: "Visit all of the footer links.",
        image: "number_one"
    },
    {
        id: 4,
        order: 2,
        name: "Ask nicely",
        description: "Click this achievement icon.",
        image: "ask_nicely"
    },
    {
        id: 5,
        order: 5,
        name: "watchdominion.org",
        description: "Watch dominion.",
        image: "watch_dominion"
    },
    {
        id: 6,
        order: 6,
        name: "Playing with fire",
        description: "Hold the final \"delete all data\" button for 5 seconds.",
        image: "playing_with_fire"
    },
];

function unlockAchievement(achievement) {
    //Try to get achievement from storage
    const achievementId = achievementIdMap[achievement];
    const storageKey = "achievement_unlocked_" + achievementId;
    const get = window.localStorage.getItem(storageKey);

    //Achievement has not been unlocked before
    if (get == null) {
        //Use current time as it is used to order achievements by unlock time
        window.localStorage.setItem(storageKey, new Date().getTime());

        //Set popup data
        const info = achievementInfo.filter(x => x.id == achievementId)[0];
        document.getElementById("achievement-popup-image").src = `/images/achievements/${info.image}.png`;
        document.getElementById("achievement-popup-name").innerHTML = info.name;

        //Animate popup
        const achievementContainer = document.getElementById("achievement-popup-container");
        achievementContainer.classList.toggle("achievement-popup-container-move", false);
        void achievementContainer.offsetWidth;
        achievementContainer.classList.toggle("achievement-popup-container-move", true);
    }
}

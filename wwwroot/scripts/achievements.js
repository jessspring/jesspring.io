const achievementIdMap = {
    rainbow_splash: 1,
    catcophony: 2,
    number_one_fan: 3,
};

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
        name: "Number one fan",
        descripion: "Visit all of the footer links",
        image: "number_one"
    },
];

//For testing
var testingCode = 0;
var testingEnabled = false;
window.addEventListener("keydown", (event) => {
    if (event.key == "Pause")
        testingCode++;
    else
        testingCode = 0;

    if (testingCode == 3 && !testingEnabled) {
        testingEnabled = true;
        console.log("Testing mode enabled");
    }

    if (testingEnabled) {
        if (event.key == "p") {
            unlockAchievement("number_one_fan");
        }

        if (event.key == "c") {
            window.localStorage.clear();
        }

        if (event.key == "s") {
            console.log(window.localStorage);
        }
    }
});

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

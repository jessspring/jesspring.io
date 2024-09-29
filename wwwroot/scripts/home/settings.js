//Mood buttons
const moodButtons = document.querySelectorAll("[data-mood]");
moodButtons.forEach(x => x.addEventListener("click", setMood));

function setMood(event) {
    const moodOverlay = document.getElementById("mood");
    const oldMood = window.localStorage.getItem("mood");
    const newMood = event.target.dataset.mood;
    moodOverlay.classList.toggle("mood-" + oldMood, false);
    moodOverlay.classList.toggle("mood-" + newMood, true);
    window.localStorage.setItem("mood", newMood);
}

//Cursor buttons
const cursorButtons = document.querySelectorAll("[data-cursor]");
cursorButtons.forEach(x => x.addEventListener("click", setCursor));

function setCursor(event) {
    const cursor = event.target.dataset.cursor;
    const cursorCss = document.getElementById("cursor-css");
    cursorCss.href = `/css/cursors/${cursor}.css`;
    window.localStorage.setItem("cursor", cursor);
}

//Delete localstorage data button
const deleteDataButton = document.getElementById("delete-data");
deleteDataButton.addEventListener("click", () => {
    if (deleteDataButton.dataset.step == 0) {
        deleteDataButton.dataset.step = 1;
        deleteDataButton.innerHTML = "Are you sure?";
        deleteDataButton.classList.toggle("button-yellow", true);
    }
    else if (deleteDataButton.dataset.step == 1) {
        deleteDataButton.dataset.step = 2;
        deleteDataButton.innerHTML = "REALLY?";
        deleteDataButton.classList.toggle("button-yellow", false);
        deleteDataButton.classList.toggle("button-red", true);
    }
    else if (deleteDataButton.dataset.step == 2) {
        window.localStorage.clear();
        window.location = window.location;
    }
});

//Playing with fire achievement
let timeout = null;
deleteDataButton.addEventListener("mousedown", event => {
    if (event.target.dataset.step == 2) {
        timeout = setTimeout(() => {
            unlockAchievement("playing_with_fire");
        }, 5000);
    }
});
deleteDataButton.addEventListener("mouseup", () => {
    clearTimeout(timeout);
});
deleteDataButton.addEventListener("mouseout", () => {
    clearTimeout(timeout);
});
deleteDataButton.addEventListener("mouseleave", () => {
    clearTimeout(timeout);
});

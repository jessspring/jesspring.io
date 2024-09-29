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

const cursorButtons = document.querySelectorAll("[data-cursor]");
cursorButtons.forEach(x => x.addEventListener("click", setCursor));

function setCursor(event) {
    const cursor = event.target.dataset.cursor;
    const cursorCss = document.getElementById("cursor-css");
    cursorCss.href = `/css/cursors/${cursor}.css`;
    window.localStorage.setItem("cursor", cursor);
}

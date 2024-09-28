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

let mood = window.localStorage.getItem("mood");

if (mood == null) {
    window.localStorage.setItem("mood", "default");
    mood = "default";
    writeCookie();
}

document.getElementById("mood").classList.toggle("mood-" + mood, true);

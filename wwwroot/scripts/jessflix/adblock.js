const adblockContainer = document.getElementById("adblock-container");
const adblockButton = document.getElementById("adblock-button");

if (window.localStorage.getItem("adblock-hidden") !== "true")
    adblockContainer.classList.toggle("display-none", false);

adblockButton.addEventListener("click", () => {
    window.localStorage.setItem("adblock-hidden", "true");
    adblockContainer.classList.toggle("display-none", true);
});

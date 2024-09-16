let splashFontLoaded = false;
let splashTextLoaded = false;

document.fonts.onloadingdone = fontLoaded;

fetch("/text/splash.txt")
    .then(x => x.text())
    .then(options => {
        const optionsSplit = options.split('\n');

        //Set the splash element text to a random option
        const splashElement = document.getElementById("splash-text");
        splashElement.innerText = optionsSplit[Math.floor(Math.random() * optionsSplit.length)];

        //1% chance to be rainbow :)
        if (Math.random() < 0.01) {
            splashElement.classList.add("splash-text-rainbow");
        }

        splashTextLoaded = true
        if (splashFontLoaded)
            setSplashWidth();
    });

function fontLoaded() {
    if (!document.fonts.check("1em PixelCraft"))
        return;

    splashFontLoaded = true;
    if (splashTextLoaded)
        setSplashWidth();
}

//This should only be called once the splash text has been set AND the font has completely finished loading
function setSplashWidth() {
    const splashElement = document.getElementById("splash-text");
    splashElement.classList.remove("display-none");

    //Shrink the text if it would go off the screen
    if (splashElement.clientWidth > 125) {
        const scale = 125 / splashElement.clientWidth;
        splashElement.style.transform = `scale(${scale})`;
    }
}

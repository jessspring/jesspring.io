let splashFontLoaded = false;
let splashTextLoaded = false;

document.fonts.addEventListener("loadingdone", fontLoaded);

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

let keyDownMemory = "0000000000";
window.addEventListener("keydown", (event) => {
    let code = "0";

    switch (event.key) {
        case "ArrowUp":
            code = "1";
            break;
        case "ArrowDown":
            code = "2";
            break;
        case "ArrowLeft":
            code = "3";
            break;
        case "ArrowRight":
            code = "4";
            break;
        case "b":
        case "B":
            code = "5";
            break;
        case "a":
        case "A":
            code = "6";
            break;
    }

    keyDownMemory = (code + keyDownMemory).substring(0, 10);

    if (keyDownMemory == "6543432211") {
        meow();
    }
});

function meow() {
    const meowFileNames = [
        "meow_1",
        "meow_2",
        "meow_3",
        "meow_4",
        "meow_5",
    ];

    const meowAudios = meowFileNames.map(x => new Audio("/sounds/" + x + ".mp3"));

    for (let i = 0; i < 150; i++) {
        const randomFile = meowAudios[Math.floor(Math.random() * meowAudios.length)];
        setTimeout(() => randomFile.play(), Math.floor(Math.random() * 5000));
    }
}
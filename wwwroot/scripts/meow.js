//Load audio files
const meowFileNames = [
    "meow_1",
    "meow_2",
    "meow_3",
    "meow_4",
    "meow_5",
    "meow_6",
    "meow_7",
];
const meowAudios = meowFileNames.map(x => new Audio("/sounds/" + x + ".mp3"));

//Keep memory of 10 most recent key presses 
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

    //Memory matches code
    if (keyDownMemory == "6543432211") {
        meow();
    }
});

function meow() {
    //Play meows randomly
    for (let i = 0; i < 150; i++) {
        const randomFile = meowAudios[Math.floor(Math.random() * meowAudios.length)];
        setTimeout(() => randomFile.play(), Math.floor(Math.random() * 5000));
    }
}

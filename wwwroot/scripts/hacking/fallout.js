const htmlElement = document.getElementsByTagName("html")[0];

const theme1 = {
    background: "#000000",
    normal: "#ff00ff",
    special: "#ffff00"
};

const theme2 = {
    background: "#000000",
    normal: "#ff0000",
    special: "#ffffff"
};

const theme3 = {
    background: "#ff0000",
    normal: "#ffffff",
    special: "#000000"
};

let theme = theme1;

const ySpacing = 24;
const xSpacing = 14;
const fontSize = 20;
const fontType = "Lucida Console";
const font = `${fontSize}px ${fontType}`;

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
context.imageSmoothingEnabled = false;

window.addEventListener("resize", canvasResize);
canvasResize();

class Mouse {
    x = -1;
    y = -1;

    previousMouseButtonDown = false;
    currentMouseButtonDown = false;
    runningMouseButtonDown = false;

    constructor() {
        window.addEventListener("mousemove", event => {
            this.x = event.clientX - offsetX;
            this.y = event.clientY - offsetY;
        });

        window.addEventListener("mousedown", event => {
            if (event.button == 0)
                this.runningMouseButtonDown = true;
        });

        window.addEventListener("mouseup", event => {
            if (event.button == 0)
                this.runningMouseButtonDown = false;
        });
    }

    update() {
        this.previousMouseButtonDown = this.currentMouseButtonDown;
        this.currentMouseButtonDown = this.runningMouseButtonDown;
    }

    isClicked() {
        return this.currentMouseButtonDown && !this.previousMouseButtonDown;
    }
}

function canvasResize() {
    canvas.style.width = window.innerWidth;
    canvas.style.height = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.imageSmoothingEnabled = false;
}

let previousTimestamp = 0;
let delta = 0;
const mouse = new Mouse();

//53 x 22
const terminalWidth = 53;
const terminalHeight = 22;
let attempts = 4;
const hexStart = 62704;
const hexStep = 62716 - hexStart;
const symbols = [..."(){}[]<>!?@;:#-+=,_$/\\.'\"%*|^"];
let puzzleText = "";
const usedBracketIndices = [];
let log = [];
let password = "";

for (let i = 0; i < 12 * 34; i++)
    puzzleText += getRandomSymbol();

let lines = [];
let allowUpdate = true;

fetch("https://raw.githubusercontent.com/powerlanguage/word-lists/refs/heads/master/common-7-letter-words.txt")
    .then(x => x.text())
    .then(text => {
        let words = text.split(String.fromCharCode(10))
            .map(x => x.toUpperCase().substring(0, 7));
        words.push("JESSICA");

        const wordPositions = [];
        for (let i = 0; i < 20; i++)
            while (true) {
                const randomPos = randomInt((12 * 34) - 6);

                const overlap = wordPositions.some(x => randomPos + 7 >= x && randomPos <= x + 7);
                if (!overlap) {
                    wordPositions.push(randomPos);
                    break;
                }
            }

        wordPositions.forEach(x => {
            const word = words[randomInt(words.length)];
            puzzleText = puzzleText.substring(0, x) + word + puzzleText.substring(x + 7);
            words = words.filter(x => x != word);
            password = word;
        });

        updateLines();

        run();
    });

function run() {
    previousTimestamp = document.timeline.currentTime;
    requestAnimationFrame(update);
}

let offsetX = 0;
let offsetY = 0;
function update(timestamp) {
    delta = (timestamp - previousTimestamp) / 1000;
    previousTimestamp = timestamp;

    offsetX = (window.innerWidth / 2) - ((terminalWidth / 2) * xSpacing);
    offsetY = (window.innerHeight / 2) - ((terminalHeight / 2) * ySpacing);

    context.clearRect(-Number.MAX_SAFE_INTEGER / 2, -Number.MAX_SAFE_INTEGER / 2, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);

    context.resetTransform();
    context.translate(offsetX, offsetY);

    if (attempts == 0)
        aaaaaaaaaa();

    mouse.update();

    drawStaticText();
    drawLines();
    drawLog();
    drawMouse();

    handleLink(attempts == 0 ? -1 : 0);

    requestAnimationFrame(update);

    if (!allowUpdate)
        return;

    handleInput();
}

let time = 0;
function aaaaaaaaaa() {
    time += delta;
    context.translate(Math.random() * 4 * time - 2, Math.random() * 2 * time - 1);
}

function handleLink(offset = 0) {
    if (mouse.x < 0 + offset * xSpacing ||
        mouse.x > 9 * xSpacing ||
        mouse.y < 0 ||
        mouse.y > 1 * ySpacing)
        return;

    if (attempts > 0)
        drawText("JESSPRING", 0, 0, theme.special, theme.normal);
    else
        drawText("BLOODGRASS", -1, 0, theme.special, theme.normal);

    if (!mouse.isClicked())
        return;

    window.location.href = "https://jesspring.io";
}

function handleInput() {
    if (!mouse.isClicked())
        return;

    const mouseIndex = getMouseIndex();
    if (mouseIndex == -1)
        return;

    if (openBracketChars.includes(puzzleText[mouseIndex]))
        handleBracketInput(mouseIndex)

    if (!symbols.includes(puzzleText[mouseIndex]))
        handleLetterInput(mouseIndex);
}

function handleBracketInput(mouseIndex) {
    if (usedBracketIndices.includes(mouseIndex))
        return;

    const range = getMousedOpenBracketRange(mouseIndex);
    if (range[0] == range[1])
        return;

    let word = "";
    for (let i = range[0]; i <= range[1]; i++)
        word += puzzleText[i];

    addToLog(word);
    addToLog("Attempt added");

    attempts++;
    theme = theme1;
    usedBracketIndices.push(mouseIndex);
}

function handleLetterInput(mouseIndex) {
    const range = getMousedLetterRange(mouseIndex);
    let word = "";
    for (let i = range[0]; i <= range[1]; i++)
        word += puzzleText[i];

    addToLog(word);

    if (word == password) {
        theme = theme1;
        addToLog("Exact match!", theme => theme.special);
        addToLog("Please wait", theme => theme.special);
        addToLog("while system", theme => theme.special);
        addToLog("is accessed.", theme => theme.special);

        htmlElement.classList.toggle("fallout-3", true);
        allowUpdate = false;

        setTimeout(() => window.location.href = "https://www.google.com", 3000);

        return;
    }
    else {
        addToLog("Entry denied");
        attempts--;

        let matchingLetters = 0;
        for (let i = 0; i < 7; i++)
            if (password[i] == word[i])
                matchingLetters++;

        addToLog(`${matchingLetters}/7 correct.`);
    }

    if (attempts > 1)
        theme = theme1;
    else if (attempts == 1) {
        theme = theme2;
        addToLog(" BE CAREFUL.");
    }
    else if (attempts == 0) {
        theme = theme3;
        htmlElement.classList.toggle("fallout-2", true);
        allowUpdate = false;
        addToLog("      OH NO.");

        setTimeout(() => window.location.href = "https://jesspring.io", 3000);
    }
}

function addToLog(string, colourFunction = theme => theme.normal) {
    log = [[string, colourFunction]].concat(log);
    if (log.length > 15)
        log = log.slice(0, 15);
}

function drawCharacter(char, x, y, textColour = theme.normal, backgroundColour = theme.background) {
    context.fillStyle = backgroundColour;
    context.fillRect(x * xSpacing - 2, y * ySpacing - 2, xSpacing + 2, ySpacing + 1);
    context.font = font;
    context.textBaseline = "top";
    context.fillStyle = textColour;
    context.fillText(char, x * xSpacing, y * ySpacing);
}

function drawText(text, x, y, textColour = theme.normal, backgroundColour = theme.background) {
    [...text].forEach(c => {
        drawCharacter(c, x, y, textColour, backgroundColour);
        x++;
    });
}

function drawStaticText() {
    if (attempts > 0)
        drawText("JESSPRING INDUSTRIES TERMLINK PROTOCOL", 0, 0);
    else
        drawText("BLOODGRASS INDUSTRIES TERMLINK PROTOCOL", -1, 0);

    if (attempts == 1)
        drawText("!!! WARNING: LOCKOUT IMMINENT !!!", 0, 1);
    else if (attempts == 0)
        drawText("!!! OH NO !!!", 0, 1);
    else
        drawText("ENTER PASSWORD NOW", 0, 1);

    drawText(`${attempts} ATTEMPT(S) LEFT:` + " █".repeat(attempts), 0, 3);

    for (let i = 0; i < 34; i++)
        drawText(`0x${(hexStart + (hexStep * i)).toString(16).toUpperCase()}`, Math.floor(i / 17) * 20, 5 + i % 17);
}

function drawLines() {
    for (let i = 0; i < 34; i++)
        drawText(lines[i], 7 + Math.floor(i / 17) * 20, 5 + i % 17);
}

function getMouseIndex() {
    if (mouse.x > 7 * xSpacing &&
        mouse.x < 19 * xSpacing &&
        mouse.y > 5 * ySpacing &&
        mouse.y < 22 * ySpacing)
        return ((Math.floor(mouse.y / ySpacing) - 5) * 12) + (Math.floor(mouse.x / xSpacing) - 7);

    if (mouse.x > 27 * xSpacing &&
        mouse.x < 39 * xSpacing &&
        mouse.y > 5 * ySpacing &&
        mouse.y < 22 * ySpacing)
        return ((Math.floor(mouse.y / ySpacing) + 12) * 12) + (Math.floor(mouse.x / xSpacing) - 27);

    return -1;
}

function drawMouse() {
    const mouseIndex = getMouseIndex();
    if (mouseIndex == -1) {
        drawCharacter("█", 41, 21);
        return;
    }

    const range = getMousedRange(mouseIndex);

    for (let i = range[0]; i <= range[1]; i++) {
        drawCharacter(puzzleText[i], 41 + (i - range[0]), 21, theme.normal, theme.background);
        drawCharacter(puzzleText[i],
            7 + (i % 12) + (Math.floor(i / (12 * 17)) * 20),
            5 + Math.floor(i / 12) - (Math.floor(i / (12 * 17)) * 17),
            theme.background, theme.special);
    }
}

function randomInt(range) {
    return Math.floor(Math.random() * range);
}

function getMousedRange(mouseIndex) {
    const mousedChar = puzzleText[mouseIndex];

    if (openBracketChars.includes(mousedChar))
        return getMousedOpenBracketRange(mouseIndex);

    if (!symbols.includes(mousedChar))
        return getMousedLetterRange(mouseIndex);

    return [mouseIndex, mouseIndex];
}

const openBracketChars = [..."({[<"];
const bracketPairChars = [
    ["(", ")"],
    ["{", "}"],
    ["[", "]"],
    ["<", ">"],
];
function getMousedOpenBracketRange(mouseIndex) {
    if (usedBracketIndices.includes(mouseIndex))
        return [mouseIndex, mouseIndex];

    const closedBracket = bracketPairChars.filter(x => x[0] == puzzleText[mouseIndex])[0][1];

    for (let i = mouseIndex + 1; i % 12 != 0; i++) {
        if (!symbols.includes(puzzleText[i]))
            return [mouseIndex, mouseIndex]

        if (puzzleText[i] == closedBracket)
            return [mouseIndex, i];
    }

    return [mouseIndex, mouseIndex];
}

function getMousedLetterRange(mouseIndex) {
    const range = [mouseIndex, mouseIndex];

    while (range[0] >= 0 && !symbols.includes(puzzleText[range[0]]))
        range[0]--;

    while (range[1] < 12 * 34 && !symbols.includes(puzzleText[range[1]]))
        range[1]++;

    range[0]++;
    range[1]--;

    return range;
}

function getRandomSymbol() {
    return symbols[randomInt(symbols.length)];
}

function updateLines() {
    lines = [];
    for (let i = 0; i < 34; i++)
        lines.push(puzzleText.substring(i * 12, (i + 1) * 12));
}

function drawLog() {
    for (let i = 0; i < log.length; i++) {
        drawText(">", 40, 19 - i);
        drawText(log[i][0], 41, 19 - i, log[i][1](theme));
    }

    drawCharacter(">", 40, 21);
}

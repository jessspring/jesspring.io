const bugButton = document.getElementById("bug");
bugButton.addEventListener("click", flyInvasion);

const canvas = document.getElementById("fly-canvas");
const context = canvas.getContext("2d");
context.imageSmoothingEnabled = false

window.addEventListener("resize", canvasResize);
canvasResize();

function canvasResize() {
    canvas.style.width = window.innerWidth;
    canvas.style.height = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.imageSmoothingEnabled = false;
}

const flyImages = [
    createImage("/images/fly/fly_1.png"),
    createImage("/images/fly/fly_2.png"),
    createImage("/images/fly/fly_3.png"),
]

function createImage(fileName) {
    const image = new Image();
    image.src = fileName;
    return image;
}

let previousTimestamp = 0;
let delta = 0;
const flies = [];

function flyInvasion() {
    bugButton.style.opacity = 0;
    previousTimestamp = document.timeline.currentTime;

    //Initialise flies around window edges
    const restImage = flyImages[0];
    const flyingImages = flyImages.slice(1);
    for (let i = 0; i < 15; i++) {
        flies.push(new Fly(restImage, flyingImages, -32, Math.random() * canvas.height, 0));
        flies.push(new Fly(restImage, flyingImages, Math.random() * canvas.width, -48, Math.PI * 0.5));
        flies.push(new Fly(restImage, flyingImages, canvas.width, Math.random() * canvas.height, Math.PI));
        flies.push(new Fly(restImage, flyingImages, Math.random() * canvas.width, canvas.height, Math.PI * 1.5));
    }

    requestAnimationFrame(update);
}

function update(timestamp) {
    delta = (timestamp - previousTimestamp) / 1000;
    previousTimestamp = timestamp;

    context.clearRect(-Number.MAX_SAFE_INTEGER / 2, -Number.MAX_SAFE_INTEGER / 2, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);

    flies.forEach(x => x.update());
    flies.forEach(x => x.draw());

    requestAnimationFrame(update);
}

class Fly {
    image;
    actionTimer = 0;
    currentRestTime = Math.random() * 5;
    restTime = 1.5;
    currentFlyTime = 0;
    flyTime = 2.5;
    resting = true;
    flyAngle = 0
    flyAngleTime = 0
    speed = 4;
    animationFps = 30;

    restImage;
    flyingImages;
    positionX;
    positionY;
    rotation;

    constructor(
        restImage,
        flyingImages,
        positionX,
        positionY,
        rotation
    ) {
        this.restImage = restImage;
        this.flyingImages = flyingImages;
        this.positionX = positionX;
        this.positionY = positionY;
        this.rotation = rotation;
    }

    update() {
        this.actionTimer += delta;

        //Wrap fly position if it goes too far from the viewport
        if (this.positionX < -100)
            this.positionX = canvas.width + 50;
        if (this.positionY < -100)
            this.positionY = canvas.height + 50;
        if (this.positionX > canvas.width + 100)
            this.positionX = -50;
        if (this.positionY > canvas.height + 100)
            this.positionY = -50;

        if (this.resting) {
            this.image = this.restImage;

            if (this.actionTimer >= this.currentRestTime) {
                this.actionTimer = 0;
                this.resting = false;
                this.currentFlyTime = this.flyTime + Math.random();
            }
        }
        else {
            this.image = getAnimationTexture(this.flyingImages, this.actionTimer, this.animationFps);

            //Pick new fly angle after angle timer runs out
            if (this.flyAngleTime <= 0) {
                this.flyAngleTime = Math.random();
                this.flyAngle = (Math.random() - 0.5) / 10;
            }

            this.flyAngleTime -= delta;
            this.rotation += this.flyAngle;
            this.positionX = this.positionX + Math.cos(this.rotation) * this.speed;
            this.positionY = this.positionY + Math.sin(this.rotation) * this.speed;

            if (this.actionTimer >= this.currentFlyTime) {
                this.actionTimer = 0;
                this.resting = true;
                this.currentRestTime = this.restTime + Math.random();
            }
        }
    }

    draw() {
        drawImage(this.image, this.positionX, this.positionY, this.rotation);
    }
}

function getAnimationTexture(animationImages, animationTimer, framesPerSecond) {
    return animationImages[Math.floor(animationTimer * framesPerSecond) % animationImages.length];
}

function drawImage(image, positionX, positionY, rotation) {
    const originalTransform = context.getTransform();
    context.translate(positionX + image.width / 2, positionY + image.height / 2);
    context.rotate(rotation);
    context.translate(-(positionX + image.width / 2), -(positionY + image.height / 2));
    context.drawImage(image, positionX, positionY);
    context.setTransform(originalTransform);
}

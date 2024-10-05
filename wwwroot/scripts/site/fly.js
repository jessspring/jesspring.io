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
    createImage("/images/fly/fly_5.png"),
    createImage("/images/fly/fly_6.png"),
    createImage("/images/fly/fly_7.png"),
]

function createImage(fileName) {
    const image = new Image();
    image.src = fileName;
    return image;
}

let previousTimestamp = 0;
let delta = 0;
const flies = [];
let mouse;

function flyInvasion() {
    bugButton.style.opacity = 0;
    previousTimestamp = document.timeline.currentTime;

    //Initialise flies around window edges
    const restImage = flyImages[0];
    const flyingImages = flyImages.slice(1, 3);
    const deadImages = flyImages.slice(3);

    for (let i = 0; i < 15; i++) {
        flies.push(new Fly(restImage, flyingImages, deadImages, -32, Math.random() * canvas.height, 0));
        flies.push(new Fly(restImage, flyingImages, deadImages, Math.random() * canvas.width, -48, Math.PI * 0.5));
        flies.push(new Fly(restImage, flyingImages, deadImages, canvas.width, Math.random() * canvas.height, Math.PI));
        flies.push(new Fly(restImage, flyingImages, deadImages, Math.random() * canvas.width, canvas.height, Math.PI * 1.5));
    }

    mouse = new Mouse();

    requestAnimationFrame(update);
}

function update(timestamp) {
    delta = (timestamp - previousTimestamp) / 1000;
    previousTimestamp = timestamp;

    context.clearRect(-Number.MAX_SAFE_INTEGER / 2, -Number.MAX_SAFE_INTEGER / 2, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);

    mouse.update();

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
    dead = false;
    flyAngle = 0
    flyAngleTime = 0
    speed = 4;
    animationFps = 30;

    restImage;
    flyingImages;
    deadImages;
    positionX;
    positionY;
    rotation;

    constructor(
        restImage,
        flyingImages,
        deadImages,
        positionX,
        positionY,
        rotation
    ) {
        this.restImage = restImage;
        this.flyingImages = flyingImages;
        this.deadImages = deadImages;
        this.positionX = positionX;
        this.positionY = positionY;
        this.rotation = rotation;
    }

    update() {
        if (this.dead)
            return;

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

        if (mouse.isClicked() && window.localStorage.getItem("cursor") == "swatter") {
            const centerX = this.positionX + this.image.width / 2;
            const centerY = this.positionY + this.image.height / 2;

            const diffX = mouse.x - centerX;
            const diffY = mouse.y - centerY;

            const dist2 = diffX * diffX + diffY * diffY;

            if (dist2 <= 750) {
                this.dead = true;
                this.image = this.deadImages[Math.floor(Math.random() * this.deadImages.length)];
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

class Mouse {
    x = 0;
    y = 0;

    previousMouseButtonDown = false;
    currentMouseButtonDown = false;
    runningMouseButtonDown = false;

    constructor() {
        window.addEventListener("mousemove", event => {
            this.x = event.clientX;
            this.y = event.clientY;
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

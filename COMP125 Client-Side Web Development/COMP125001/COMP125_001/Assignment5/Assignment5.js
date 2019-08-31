// Create the canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 655;
canvas.height = 570;

// Global constant variables
var roleWidth = 70;
var roleHeight = 70;
var bgBoundaryWidth = canvas.width - roleWidth;
var bgBoundaryHeight = canvas.height - roleHeight;
var mouseMoveId;
var speedInterval = 5000;


// Background image
var bgReady = false;
var bgImg = new Image();
bgImg.src = "images/background.jpg";
bgImg.onload = function () {
    bgReady = true;
};

// cat image
var catReady = false;
var catImg = new Image();
catImg.src = "images/TomAngry.png";
catImg.onload = function () {
    catReady = true;
};

// mouse image
var mouseReady = false;
var mouseImg = new Image();
mouseImg.src = "images/JerryHappy.png";
mouseImg.onload = function () {
    mouseReady = true;
};

// Game objects
var cat = {
    speed: 256,
    x: canvas.width / 2,
    y: canvas.height / 2
};
var mouse = {
    x: 0,
    y: 0
};
var mouseCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);


// Reset the game when the player catches a mouse
var reset = function () {
    // Throw the mouse somewhere on the screen randomly
    mouse.x = Math.random() * bgBoundaryWidth;
    mouse.y = Math.random() * bgBoundaryHeight;

    if (mouse.x < 0 || mouse.x > bgBoundaryWidth || mouse.y < 0 || mouse.y > bgBoundaryHeight) {
        mouse.x = Math.random() * bgBoundaryWidth;
        mouse.y = Math.random() * bgBoundaryHeight;
    }
};


// The mouse will move if the player doesn't catch it within a specific time interval
function startMouseMove() {
    mouseMoveId = setInterval(reset, speedInterval);
}


function stopMouseMove() {
    clearInterval(mouseMoveId);
}

// Reset Score
function resetScore() {
    mouseCaught = 0;
}

// Reset SpeedInterval
function resetSpeedInterval() {
    stopMouseMove();
    speedInterval = 5000;
}

// Update game objects
var update = function (modifier) {
    if (38 in keysDown) { // Player holding up
        if (cat.y > 0) {
            cat.y -= cat.speed * modifier;
        }
    }
    if (40 in keysDown) { // Player holding down
        if (cat.y < bgBoundaryHeight) {
            cat.y += cat.speed * modifier;
        }
    }
    if (37 in keysDown) { // Player holding left
        if (cat.x > 0) {
            cat.x -= cat.speed * modifier;
        }
    }
    if (39 in keysDown) { // Player holding right
        if (cat.x < bgBoundaryWidth) {
            cat.x += cat.speed * modifier;
        }
    }
    
    // Make sure the cat catches(touches) the mouse
    if (
        cat.x <= (mouse.x + roleWidth / 2)
        && mouse.x <= (cat.x + roleWidth / 2)
        && cat.y <= (mouse.y + roleHeight / 2)
        && mouse.y <= (cat.y + roleHeight / 2)
       )
    {
        catImg.src = "images/TomHappy.png";
        mouseImg.src = "images/JerryPain.png";
        setTimeout(function () {
            catImg.src = "images/TomAngry.png";
            mouseImg.src = "images/JerryHappy.png";
        }, 500);

        if (speedInterval > 500) {
            speedInterval -= 500;
        }
        stopMouseMove();
        startMouseMove();
        ++mouseCaught;
        reset();
    }
};

// Draw everything
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImg, 0, 0);
    }
    if (catReady) {
        ctx.drawImage(catImg, cat.x, cat.y, roleWidth, roleHeight);
    }
    if (mouseReady) {
        ctx.drawImage(mouseImg, mouse.x, mouse.y, roleWidth, roleHeight);
    }

    // Score
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseLine = "top";
    ctx.fillText("Score: " + mouseCaught, roleWidth / 4, roleHeight / 2);

};

// The main game loop
var main = function () {
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    render();

    then = now;

    // Request to do this again ASAP
    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();

// Set Mouse Move
startMouseMove();
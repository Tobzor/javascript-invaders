var canvas = document.getElementById('space-invaders');
var ctx = canvas.getContext("2d");

// EventListeners
document.addEventListener("keydown", keyPress, false);
document.addEventListener("keyup", keyRelease, false);

// Booleans and speed
var blueZone;
var greenZone;
var speed = 0;

// bullets
var bulletfired = false;
var bulletspeed = - 4;
var bullety = 268;

// Handles keyboard events
function keyPress(event) {
    if (event.key === "ArrowRight") {
        speed = 2;
    } else if (event.key === "ArrowLeft") {
        speed = -2;
    } else if (event.key === " ") {
        // Should add the x value to an array here
        // then the firebullet function will draw these bullets
        console.log("BAM!");
    }
}

function keyRelease(event) {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        speed = 0;
    }
}

function update() {
    var rightBound = x >= 280;
    var leftBound = x <= 0;
    edges(rightBound, leftBound)
    x = x + speed;

    if (bulletfired) {
      firebullet()
    }

    blueZone = x > 0 && x < 100;
    greenZone = !blueZone && x < 200;
};

function firebullet() {
    // Loop through the bullet array and draw the bullets
    // at x-location and with the specified bulletspeed.
    // Should be called from update to follow the gameflow.
}

function edges(rightBound, leftBound) {
    if (rightBound) {
        x = 280;
    } else if (leftBound) {
        x = 0;
    }
}

function draw() {
    // Removes previous rectangle
    ctx.clearRect(0, 0, 500, 500);

    if (blueZone) {
        ctx.fillStyle = "#3333FF";
    } else if (greenZone) {
        ctx.fillStyle = "#00CC66";
    } else {
        ctx.fillStyle = "rgb(200, 0, 100)";
    }

    ctx.fillRect(x, y, w, h);
}

var step = function() {
    // Update Positions
    update();
    // draw the updated objects
    draw();
    window.requestAnimationFrame(step);
}
step();

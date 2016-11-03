var myGameArea;
var myPlayer;
var myEnemies = [];
var bullets = [];

function listeners() {
  document.addEventListener('keyup', function(e) {Key.onKeyup(e);}, false);
  document.addEventListener('keydown', function(e) {Key.onKeydown(e);}, false);
}
function startGame() {
  myGameArea = new GameArea(300, 300);
  myGameArea.start();
  myPlayer = new Player(140, 270, 20, 30, "blue");

  // Adding enemies
  myEnemies.push(new Player(20, 0, 20, 30, "red"));
  myEnemies.push(new Player(60, 0, 20, 30, "red"));
  myEnemies.push(new Player(100,0, 20, 30, "red"));
  myEnemies.push(new Player(20, 60, 20, 30, "red"));
  myEnemies.push(new Player(60, 60, 20, 30, "red"));
  myEnemies.push(new Player(100, 60, 20, 30, "red"));

  // attaches eventlisteners
  listeners();
  // Starts the gameloop
  step();
}

function updateGameArea() {
  myGameArea.clear();
  // if there exists bullets call update/remove bullets
  bullets && updateBullets();
  myEnemies && updateEnemies();

  myPlayer.update(true);
}

function updateEnemies() {
  for (var e in myEnemies) {
    myEnemies[e].update(false);
  }
}

function updateBullets() {
  for (var b in bullets) {
    if (bullets[b].startY <= 0) {
      // remove bullet from array
      bullets.splice(b, 1);
    }
    else if (bullets[b].collision(myEnemies)) {
      // collision
      bullets.splice(b, 1);
      // Remove enemy
      console.log("Collision detected");
    }
    else {
      bullets[b].update();
    }
  }
}

var step = function() {
  updateGameArea();
  window.requestAnimationFrame(step);
};

startGame();

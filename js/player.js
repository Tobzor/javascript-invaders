// Player prototype
function Player(x, y, width, height, color) {
  this.x = x;
  this.y = y;
  // dimensions
  this.w = width;
  this.h = height;
  // Movespeed
  this.speedX = 0;

  this.update = function(movement) {
    // Updating position with each gameloop iteration
    // if the object has movement enabled
    movement && this.updatePos();
    // Getting context and drawing player.
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  // Player action logic
  this.updatePos = function() {
    if (Key.isDown(Key.RIGHT)) this.moveRight();
    if (Key.isDown(Key.LEFT)) this.moveLeft();
    if (Key.isDown(Key.SPACE)) this.shoot(this.x);

    //this.x += this.speedX;
  }
  this.moveRight = function() {
    this.x += 3;
  }
  this.moveLeft = function() {
    this.x -= 3;
  }
  this.moveStop = function() {
    this.speedX = 0;
  }
  this.shoot = function(startX) {
    bullets.push(new Bullet(startX + (this.w/2), this.y, "green"));
  }
}

// bullet prototype
function Bullet(x, y, color) {
  this.x = x - 2;
  this.y = y;
  this.w = 4;
  this.h = 8;

  this.update = function() {
    // Updating position with each gameloop iteration
    this.y -= 5;
    // Getting context and drawing player.
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  };

  this.collision = function(enemies) {
    // bullet sides
    var bleft = this.x;
    var bright = this.x + this.w;
    var btop = this.y;
    var bbot = this.y + this.h;
    // enemy sides
    var eleft;
    var eright;
    var etop;
    var ebot;
    // enemy collision
    var col;
    // enemy that was collided with
    var crash = [];
    for (enemy in enemies) {
      // enemy sides
      eleft = enemies[enemy].x;
      eright = enemies[enemy].x + enemies[enemy].w;
      etop = enemies[enemy].y;
      ebot = enemies[enemy].y + enemies[enemy].h;

      // collision
      col = true;
      if ((bbot < etop) ||
          (btop > ebot) ||
          (bright < eleft) ||
          (bleft > eright)) {
            col = false;
      }
      col && crash.push(enemy)
    }
    return col && crash;
  }
}

// Eventlistener helper object
var Key = {
  _pressed: {},
  LEFT: 37,
  RIGHT: 39,
  SPACE: 32,

  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },

  onKeydown: function(event) {
    this._pressed[event.keyCode] = true;
  },

  onKeyup: function(event) {
    delete this._pressed[event.keyCode];
  }
}

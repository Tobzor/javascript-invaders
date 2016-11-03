// Sets up the canvas, inserts it in canvascontainer div
function GameArea(width, height) {
  this.canvas = document.createElement("canvas");
  this.start = function() {
    this.canvas.width = width;
    this.canvas.height = height;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.getElementById('canvascontainer'));
  };
  this.clear = function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };
};

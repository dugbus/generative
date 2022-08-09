let count = 100;
let walkers = [];
let step = 3;

function setup() {
  createCanvas(windowWidth, windowHeight);
  resetSketch(windowWidth, windowHeight);
  background(220);
}

function draw() {
  //background(51);

  for (var i = 0; i < walkers.length; i++) {
    walkers[i].show();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  resetSketch(windowWidth, windowHeight);
}

function resetSketch(width = 500, height = 500) {
  walkers.length = 0;
  console.log(width, height);
  for (var i = 0; i < count; i++) {
    var w = new Walker(width / 2, height / 2);
    walkers.push(w);
  }
}

function mouseClicked() {
  resizeCanvas(windowWidth, windowHeight);
  resetSketch(windowWidth, windowHeight);
}

function Walker(x, y) {
  this.x = x;
  this.y = y;
}

Walker.prototype.show = function () {
  var choice = floor(random(4));
  if (choice === 0) {
    this.x = this.x + step;
  } else if (choice === 1) {
    this.x = this.x - step;
  } else if (choice === 2) {
    this.y = this.y + step;
  } else {
    this.y = this.y - step;
  }
  stroke('rgba(0, 0, 0, 0.1)');
  noFill();
  point(this.x, this.y);
}

window.onresize = resetSketch();

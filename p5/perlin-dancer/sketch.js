let II = false;

let xoff = 0;

let x, y;

const screenWidth = document.body.clientWidth
const screenHeight = document.body.clientHeight

function setup() {
  createCanvas(screenWidth, screenHeight);
  noStroke();
  fill(240, 240, 240, 10);
  start();
}

function draw() {
  x = noise(xoff) * width;
  y = noise(xoff + 10000) * height;
  circle(x, y, 10);
  xoff += 0.01;
}

function start() {
  xoff = 0;
  noiseSeed(47);
  background(22, 22, 29);
}

function mousePressed() {
  if (mouseButton === LEFT) {
    II = !II
    if (II) {
      noLoop();
    } else {
      loop();
    }
  }
  if (mouseButton === CENTER) {
    start();
  }
}
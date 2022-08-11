let II = false;

let xoff = 0;
let yoff = 0;
let zoff = 0;

let y = 0;
let res = 0.01;

let elevation = 0;

const screenWidth = document.body.clientWidth
const screenHeight = document.body.clientHeight

function setup() {
  createCanvas(screenWidth, screenHeight);
  stroke(100);
  strokeWeight(1);
  start();
}

function draw() {
  for (let x = 0; x < width; x++) {
    elevation = noise(xoff, yoff, zoff);
    stroke(elevation * 255);
    point(x, y);
    xoff += res;
  }
  xoff = 0;
  yoff += res;
  y++;
  if (y > height) {
    y = 0;
    zoff += res;
  }
}

function start() {
  xoff = 0;
  y = 0;
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
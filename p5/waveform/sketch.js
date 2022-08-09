let y = 0;
let lineHeight;
let rectWidth = 1;
let II = false;

let c1, c2;

let waves = [];

const screenWidth = document.body.clientWidth
const screenHeight = document.body.clientHeight

function setup() {
  createCanvas(screenWidth, screenHeight);
  frameRate(30);
  fillArray();
  c1 = color(204, 102, 0);
  c2 = color(0, 102, 153);
  noLoop();
}

function draw() {
  for (let i = 0; i < width; i++) {
    for (let j = height / 2 - waves[i] / 2; j < waves[i]; j++) {
      stroke(255, 255, 255);
      point(i, j);
    }
  }
}

function drawGradient(x, y, w, h, c1, c2, axis) {
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x + w, i);
  }
}

function fillArray() {
  background(22, 22, 29);
  waves[0] = random(screenHeight / 2);
  for (i = 1; i < screenWidth; i++) {
    waves[i] = waves[i - 1] + random(-5, 5);
  }
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
    fillArray();
    II = false;
    loop();
  }
}
let II = false;

let c1, c2;

let waves = [];

let x, y, mid;
let inc = 0.01;
let xOffset = 0;
let yOffset = 0;

const step = 3;

const screenWidth = document.body.clientWidth
const screenHeight = document.body.clientHeight

function setup() {
  createCanvas(screenWidth, screenHeight);
  fillArray();
  background(22, 22, 29);
  noStroke();
  noSmooth();
}

function draw() {
  for (let y = 0; y < waves[x]; y = y + step) {
    fill(100, 204, 240, y / 20 + 15);
    circle(x, mid + y, 5);
    fill(204, 204, 100, y / 20 + 15);
    circle(x, mid - y, 5);
  }
  x = x + step;
  if (x > width) {
    fillArray();
  }
}

// function drawGradient(x, y, w, h, c1, c2, axis) {
//   for (let i = y; i <= y + h; i++) {
//     let inter = map(i, y, y + h, 0, 1);
//     let c = lerpColor(c1, c2, inter);
//     stroke(c);
//     line(x, i, x + w, i);
//   }
// }

function fillArray() {

  x = 0;
  y = 0;
  //xOffset = 0;
  mid = height / 2;
  noiseSeed(47);

  for (let i = 0; i < width; i++) {
    waves[i] = noise(xOffset, yOffset) * mid;
    xOffset += inc;
  }
  yOffset += inc;
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
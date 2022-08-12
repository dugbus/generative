let count = 10;
let hoops = [];
let II = false;

const screenWidth = document.body.clientWidth
const screenHeight = document.body.clientHeight

function setup() {
  createCanvas(screenWidth, screenHeight);
  noFill();
  stroke(240, 240, 240, 10);
  fillArray();
}

function draw() {
  for (hoop of hoops) {
    showHoop(hoop);
    updateHoop(hoop);
  }
}

function fillArray() {
  background(22, 22, 29);
  hoops.length = 0;
  randomSeed(47);
  for (let i = 0; i < count; i++) {
    hoops[i] = {};
    hoops[i].x = random(width);
    hoops[i].y = random(height);
    hoops[i].r = random(0);
    hoops[i].s = random(3);
  }
}

// function fillArray() {
//   background(22, 22, 29);
//   hoops.length = 0;
//   for (let i = 0; i < count; i++) {
//     let hoop = {}
//     hoop.x = random(width);
//     hoop.y = random(height);
//     hoop.r = random(0);
//     hoop.s = random(3);
//     hoops.push(hoop);
//   }
// }

function showHoop(hoop) {
  circle(hoop.x, hoop.y, hoop.r);
}

function updateHoop() {
  hoop.r = hoop.r + hoop.s;
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
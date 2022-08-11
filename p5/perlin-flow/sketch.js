

let II = false;

let inc = 0.1;
let scl = 20;
let cols, rows;

let zOffset = 0;

let particles = [];

let flowField = [];

const screenWidth = document.body.clientWidth;
const screenHeight = document.body.clientHeight;

function setup() {
  createCanvas(screenWidth, screenHeight);
  cols = floor(width / scl);
  rows = floor(height / scl);
  noiseDetail(8, 0.5);
  background(240);

  // flowField = new Array(cols * rows);

  for (let i = 0; i < 200; i++) {
    particles[i] = new Particle();
  }
}

function draw() {

  let yOffset = 0;

  for (let y = 0; y < rows; y++) {
    let xOffset = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(xOffset, yOffset, zOffset) * TWO_PI * 4;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowField[index] = v;
      xOffset += inc;
      // stroke(0, 20);
      // push();
      // translate(x * scl, y * scl);
      // rotate(v.heading());
      // strokeWeight(1);
      // line(0, 0, scl, 0);
      // pop();
    }
    yOffset += inc;
  }
  zOffset += 0.01;

  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowField);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }

}

function mousePressed() {
  print(frameRate());
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
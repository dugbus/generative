// Graphing 1D Perlin Noise (1D Noise Graph)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/noise/0.4-graphing-1d.html
// https://youtu.be/y7sgcFhk6ZM

// Adding Y-Axis: https://editor.p5js.org/codingtrain/sketches/nCYG2SCNq
// Noise Graph: https://editor.p5js.org/codingtrain/sketches/EZeHXBhei
// Noisy Sin: https://editor.p5js.org/codingtrain/sketches/M_kuAXwV2

// This example has been updated to use es6 syntax. To learn more about es6 visit: https://thecodingtrain.com/Tutorials/16-javascript-es6

// Open Simplex Noise https://editor.p5js.org/hellonearthisman/sketches/deiJ6SL7K
let II = false;

let inc = 0.01;
let start = 0;

const screenWidth = document.body.clientWidth
const screenHeight = document.body.clientHeight

function setup() {
  createCanvas(screenWidth, screenHeight);
  startUp();
}

function draw() {
  background(51);

  stroke(255);
  noFill();
  beginShape();
  let xoff = start;
  for (let x = 0; x < width; x++) {
    stroke(255);
    // let y = random(height);
    // let y = sin(xoff) * height;
    let y = noise(xoff) * height;

    vertex(x, y);

    xoff += inc;
  }
  endShape();

  start += inc;

  //noLoop();
}

function startUp() {
  xoff = 0;
  y = 0;
  noiseDetail(4, 0.5);
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
    startUp();
  }
}

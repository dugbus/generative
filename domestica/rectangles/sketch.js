let count = 100;
let walkers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  resetSketch(windowWidth, windowHeight);
}

function draw() {

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  resetSketch(windowWidth, windowHeight);
}

function resetSketch(width = 500, height = 500) {
  background(51);
  noFill();
  strokeWeight(width * 0.007);

  const w = width * 0.1
  const h = height * 0.1
  const gap = width * 0.02
  const count = 6
  const ix = width * 0.15
  const iy = height * 0.15
  const off = width * 0.02

  let x, y

  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {

      x = ix + (w + gap) * i
      y = iy + (h + gap) * j

      stroke(getColour(19))
      rect(x, y, w, h)

      if (Math.random() > 0.5) {

        stroke(getColour(19))
        rect(x + off / 2, y + off / 2, w - off, h - off)

      }
    }
  }
}

function getColour(range) {
  const colours = ["#fd4343", "#fc7b44", "#fcb344", "#fcea44", "#d8fc44", "#a0fc44", "#69fc44", "#44fc57", "#44fc8e", "#44fcc5", "#44fcfc", "#44c5fc", "#448efc", "#4457fc", "#6944fc", "#a044fc", "#d844fc", "#fc44ea", "#fc44b3", "#fc447b"]
  return colours[Math.floor(Math.random() * range)]
}

window.onresize = resetSketch();

function mouseReleased() {
  resetSketch(windowWidth, windowHeight);
}
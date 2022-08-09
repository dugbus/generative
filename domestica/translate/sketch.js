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
  background(255);
  noStroke();
  fill(0);

  const cx = width * 0.75
  const cy = height * 0.75

  const w = width * 0.01
  const h = height * 0.1

  let x, y

  const num = 32
  const radius = width * 0.3

  for (let i = 0; i < num; i++) {

    const slice = radians(360 / num)
    const angle = slice * i

    x = cx + radius * Math.sin(angle)
    y = cy + radius * Math.cos(angle)

    push();
    translate(x, y)
    rotate(-angle)
    scale(random(1, 2))

    fill(getColour(19))
    rect(-w * 0.5, -h * 0.5, w, h)
    pop();

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
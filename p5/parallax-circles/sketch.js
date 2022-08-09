let vehicles = [];
let target;
let count = 100;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  for (i = 0; i < count; i++) {
    vehicles.push(new Vehicle(random(width), random(height)));
  }
}

function draw() {
  background(0);
  fill(255, 0, 0);
  noStroke()
  target = createVector(mouseX, mouseY);
  circle(target.x, target.y, 32);
  for (i = 0; i < count; i++) {
    vehicles[i].seek(target);
    vehicles[i].update();
    vehicles[i].show();
  }
}

class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 4;
    this.maxForce = 0.25;
    this.r = 16;
  }

  seek(target) {
    let force = p5.Vector.sub(target, this.pos);
    force.setMag(this.maxSpeed);
    force.sub(this.vel);
    force.limit(this.maxForce);
    this.applyForce(force);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill(255);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0);
    pop();
  }
}
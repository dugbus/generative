
let points = []
let noiseScale = 0.001
let density = 50
let seed = 50

function setup() {
    createCanvas(windowWidth, windowHeight)
    background(30)
    angleMode(DEGREES)
    noiseDetail(2)
    noiseSeed(seed)
    randomSeed(seed)
    colorMode(HSB, 360, 100, 100, 100)
    noStroke()

    let space = floor(width / density)

    for (let x = 0; x < width; x += space) {
        for (let y = 0; y < height; y += space) {
            let p = createVector(random(width), random(height))
            points.push(p)
        }

    }
}

function draw() {

    for (let el of points) {
        let angle = map(noise(el.x * noiseScale, el.y * noiseScale), 0, 1, 0, 720)
        fill(angle, 100, 100, 10)
        el.add(createVector(cos(angle), sin(angle)))
        circle(el.x, el.y, 2)
    }
}

function mouseClicked() {
    let today = new Date()
    console.log(today)
    saveCanvas('flowfield', 'png')
}
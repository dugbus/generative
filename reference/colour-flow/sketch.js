
let points = []
let noiseScale = 0.001
let density = 50
let seed = 50

function setup() {
    createCanvas(1080, 1350)
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
            let p = createVector(x + random(-density / 2, density / 2), y + random(-density / 2, density / 2))
            points.push(p)
        }

    }
}

function draw() {

    for (let i = 0; i < points.length; i++) {

        var angle = map(noise(points[i].x * noiseScale, points[i].y * noiseScale), 0, 1, 0, 720)

        fill(angle, 100, 100, 10)

        points[i].add(createVector(cos(angle), sin(angle)))


        circle(points[i].x, points[i].y, 2)
    }
}

function mouseClicked() {
    saveCanvas('flowfield', 'png');
}
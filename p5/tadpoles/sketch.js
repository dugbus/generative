
let balls = []
let count = 100
let noiseScale = 0.005

let cwidth = 1080
let cheight = 1350
let button

let encoder

const frate = 60 // frame rate
const numFrames = 800 // num of frames to record
let recording = false
let recordedFrames = 0

let frameCount = 0

function preload() {
    HME.createH264MP4Encoder().then(enc => {
        encoder = enc
        encoder.outputFilename = 'test'
        encoder.width = cwidth
        encoder.height = cheight
        encoder.frameRate = frate
        encoder.kbps = 50000 // video quality
        encoder.groupOfPictures = 10 // lower if you have fast actions.
        encoder.initialize()
    })
}

function setup() {
    createCanvas(cwidth, cheight)
    frameRate(frate)
    noStroke()
    fill(0)
    noiseSeed(42)
    randomSeed(42)
    populate()
}

function draw() {

    background(100, 200, 255, 100)

    for (let el of balls) {
        change(el)
        render(el)
    }

    // keep adding new frame
    if (recording) {
        console.log('recording')
        encoder.addFrameRgba(drawingContext.getImageData(0, 0, encoder.width, encoder.height).data);
        recordedFrames++
    }
    // finalize encoding and export as mp4
    if (recordedFrames === numFrames) {
        recording = false
        recordedFrames = 0
        console.log('recording stopped')

        encoder.finalize()
        const uint8Array = encoder.FS.readFile(encoder.outputFilename);
        const anchor = document.createElement('a')
        anchor.href = URL.createObjectURL(new Blob([uint8Array], { type: 'video/mp4' }))
        anchor.download = encoder.outputFilename
        anchor.click()
        encoder.delete()

        preload() // reinitialize encoder
    }
}

function populate() {
    for (let i = 0; i < count; i++) {
        let ball = {}
        ball.position = createVector(random(width), random(height))
        ball.mass = random(5, 10)
        ball.velocity = createVector(random(0, 1), random(0, 1))
        ball.acceleration = createVector(0, 0)
        balls.push(ball)
    }
}

function change(el) {

    let angle = map(noise(el.position.x * noiseScale, el.position.y * noiseScale), 0, 1, 0, 1440)

    el.acceleration = createVector(cos(angle), sin(angle))

    el.velocity.add(el.acceleration)

    el.velocity.limit(4)

    el.position.add(el.velocity)

    if (el.position.x > width) {
        el.position.x = 0
    }

    if (el.position.x < 0) {
        el.position.x = width
    }

    if (el.position.y > height) {
        el.position.y = 0
    }

    if (el.position.y < 0) {
        el.position.y = height
    }
}

function render(el) {
    circle(el.position.x, el.position.y, el.mass * 2)
}

function mouseClicked() {
    recording = true
    console.log(recording)
} 
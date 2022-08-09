import './styles.css'

const stats = document.getElementById('stats')
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const dpi = window.devicePixelRatio

console.log(devicePixelRatio)

const width = document.body.clientWidth
const height = document.body.clientHeight

canvas.width = width
canvas.height = height

let count = 20
let walkers = new Array()
let _stop = false



for (let i = 0; i < count; i++) {
  walkers.push({})
  walkers[i].x = Math.floor(width / 2)
  walkers[i].y = Math.floor(height / 2)
  walkers[i].color = `hsla(${18 * i}, 73%, 50%, 0.1)`
}

function fix_dpi() {
  let style_height = +getComputedStyle(canvas).getPropertyValue('height').slice(0, -2);
  let style_width = +getComputedStyle(canvas).getPropertyValue('width').slice(0, -2);

  canvas.setAttribute('height', style_height * dpi)
  canvas.setAttribute('width', style_width * dpi)

  console.log(style_height, style_width)
}

function walk(item) {
  let choice = Math.floor(Math.random() * 4)
  if (choice === 0) {
    item.x++
  } else if (choice === 1) {
    item.x--
  } else if (choice === 2) {
    item.y++
  } else {
    item.y--
  }
  ctx.fillStyle = item.color
  ctx.fillRect(item.x, item.y, 1, 1)
}

function moBlur(distance) {

  distance = distance < 0 ? 0 : distance;

  for (let n = 0; n < 5; n += 0.1) {
    ctx.globalAlpha = 1 / (2 * n + 1);
    let scale = distance / 5 * n;
    ctx.transform(1 + scale, 0, 0, 1 + scale, 0, 0);
    ctx.drawImage(canvas, 0, 0);
  }
  ctx.globalAlpha = 1;
  if (distance < 0.001) {
    window.requestAnimationFrame(() => {
      this.moBlur(distance + 0.0005);
    });
  }
}

function goBlur(blur) {

  let sum = 0;
  let delta = 5;
  let alpha_left = 1 / (2 * Math.PI * delta * delta);
  let step = blur < 3 ? 1 : 2;
  for (let y = -blur; y <= blur; y += step) {
    for (let x = -blur; x <= blur; x += step) {
      let weight = alpha_left * Math.exp(-(x * x + y * y) / (2 * delta * delta));
      sum += weight;
    }
  }
  let count = 0;
  for (let y = -blur; y <= blur; y += step) {
    for (let x = -blur; x <= blur; x += step) {
      count++;
      ctx.globalAlpha = alpha_left * Math.exp(-(x * x + y * y) / (2 * delta * delta)) / sum * blur;
      ctx.drawImage(canvas, x, y);
    }
  }
  ctx.globalAlpha = 1;

}

//*
function loop() {

  for (let j = 0; j < 120 - avg; j++) {
    for (let i = 0; i < count; i++) {
      walk(walkers[i])
    }
  }

  //moBlur(0.0000001)
  goBlur(0.01)

  t1 = Math.floor(performance.now())
  avg = Math.floor((t1 - t0 + avg) / 2)
  t0 = t1

  if (_stop) return
  stats.innerText = `delta = ${avg}
  dpi = ${dpi}`
  window.requestAnimationFrame(loop)
}
// */

canvas.addEventListener('click', function () { _stop = true })

ctx.globalCompositeOperation = 'soft-light'

ctx.fillStyle = '#16161d'
ctx.fillRect(0, 0, width, height)

let t0 = Math.floor(performance.now())
let t1 = 0
let avg = 0

//fix_dpi()
loop()
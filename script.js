let fft

// Define a particle and draw it
let Particle = function (position) {
  this.position = position
  this.speed = createVector(0, 1)
  this.color = color(208, 0, 0)

  this.draw = function () {
    circle(this.position.x, this.position.y, this.diameter)
    fill(this.color, 100)
  }
  // makes them shimmer :scream:
  this.update = function (energy) {
    this.diameter = random(1,8) + energy * 80
    this.position.y += this.speed.y * energy * 10
    if (this.position.y > height) {
      this.position.y = 0
    }

  }
}


// Sets up the canvas, along with mic and audio input.
function setup() {
  createCanvas(windowWidth, windowHeight)
  noStroke()

  let mic = new p5.AudioIn()
  mic.start()

  fft = new p5.FFT()
  fft.setInput(mic)

  positionParticles() //Adds a crap ton of particles randomly to the canvas
}
//Draws the particles 0-0
function draw() {
  background(0,0,0) // RGB format
  let spectrum = fft.analyze()
  updateParticles(spectrum)
}

//if user is in fullscreen using f11 then the canvas will be fullscreen
function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}

function resizeCanvas(w, h) {
    canvas.width = w
    canvas.height = h
}

//execute the functiion windowResized when the user presses f11
document.addEventListener('fullscreenchange', windowResized)
const MovingObject = require("./moving_object.js");
const Dot = require("./dot.js");
const Ship = require("./ship.js");
const Util = require("./util.js");

const DEFAULTS = {
  DIM_Y: 500,
  DIM_X: 500,
  NUM_DOTS: 20,
  COLORS: ['#7aadff', '#7fff81', '#ff7f90', '#fffa7f', '#da7fff'],
  SPEED: 2
};

class Game {
  constructor() {
    this.dots = [];
    this.ship = [];
    this.lives = 5;
    this.points = 0;
    this.speed = DEFAULTS.SPEED;
    this.colorCounter = 0;

    this.addDots();
    this.addShip();
  }

  addDots() {
    for (let i=0; i<(DEFAULTS.NUM_DOTS - this.dots.length); i++) {
      this.dots.push(new Dot({
        pos: Util.randomPosition(),
        game: this,
        color: DEFAULTS.COLORS[this.dots.length % 5],
        speed: this.speed
      }));
    }
  }

  addShip() {
    this.ship = new Ship({game: this});
    // const timerDisplay = document.getElementById("timer");
    // var secondsLeft = 5;
    // var interval = setInterval(function() {
    //   if (secondsLeft === 0) {
    //     secondsLeft = 5;
    //   }
    //   timerDisplay.innerHTML = --secondsLeft;
    // }, 1000);
    // setInterval(this.ship.changeColor, 5000);
  }

  draw(ctx) {
    ctx.clearRect(0, 0, DEFAULTS.DIM_X, DEFAULTS.DIM_Y);
    this.dots.forEach((dot) => {
      dot.draw(ctx);
    });
    this.ship.checkCollisions(this.dots);
    this.ship.draw(ctx);
  }

  move() {
    this.dots.forEach((dot) => {
      dot.move();
    });
  }

  step() {
    this.checkGameOver();
    this.move();
    this.ship.checkCollisions(this.dots);
  }

  remove(object) {
    if (object instanceof Dot) {
      object.pos = Util.randomPosition();
      this.points += 1;
      this.ship.radius += 0.5;
      this.colorTimer();
      // this.speed += 5;
    } else if (object instanceof Ship) {
      this.ship = "";
      this.addShip();
      this.lives -= 1;
      this.colorCounter = 0;
    }
  }

  checkGameOver() {
    if (this.lives === 0) {
      // save Score
      debugger;
      this.points = 0;
      this.lives = 5;
    }
  }

  colorTimer() {
    if (this.colorCounter === 3) {
      this.ship.changeColor();
      this.colorCounter = 0;
    } else {
      this.colorCounter += 1;
    }
  }

}

module.exports = Game;

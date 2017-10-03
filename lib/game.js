const MovingObject = require("./moving_object.js");
const Dot = require("./dot.js");
const Ship = require("./ship.js");
const Util = require("./util.js");

const DEFAULTS = {
  DIM_Y: 500,
  DIM_X: 500,
  NUM_DOTS: 20
};

class Game {
  constructor() {
    this.dots = [];
    this.ship = [];
    this.lives = 5;
    this.points = 0;

    this.addDots();
    this.addShip();
  }

  randomPosition() {
    return [
      Math.random() * DEFAULTS.DIM_Y,
      Math.random() * DEFAULTS.DIM_X
    ];
  }

  addDots() {
    for (let i=0; i<(DEFAULTS.NUM_DOTS - this.dots.length); i++) {
      this.dots.push(new Dot({pos: this.randomPosition(), game: this}));
    }
  }

  addShip() {
    this.ship = new Ship({game: this});
    setInterval(this.ship.changeColor, 5000);
    // const timerDisplay = document.getElementById("timer");
    // var seconds_left = 5;
    // var interval = setInterval(function() {
    //   timerDisplay.innerHTML = --seconds_left;
    // }, 1000);
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
      this.dots.splice(this.dots.indexOf(object), 1);
      this.points += 1;
      this.ship.radius += 1;
      console.log('points', this.points);
    } else if (object instanceof Ship) {
      this.ship = "";
      this.addShip();
      this.lives -= 1;
      console.log('lives', this.lives);
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

}

module.exports = Game;

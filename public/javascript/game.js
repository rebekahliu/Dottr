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
    this.points = 0;
    this.lives = 1;
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
    this.move();
    this.ship.checkCollisions(this.dots);
  }

  remove(object) {
    if (object instanceof Dot) {
      object.pos = Util.randomPosition();
      this.points += 1;
      this.ship.radius += 0.5;
      this.colorTimer();
    } else if (object instanceof Ship) {
      this.ship = "";
      this.addShip();
      this.lives -= 1;
      this.colorCounter = 0;
    }
  }

  checkGameOver() {
    return this.lives <= 0;
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

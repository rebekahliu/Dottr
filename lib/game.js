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
    for (let i=0; i<DEFAULTS.NUM_DOTS; i++) {
      this.dots.push(new Dot({pos: this.randomPosition(), game: this}));
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
    this.ship.draw(ctx);
  }

  move() {
    this.dots.forEach((dot) => {
      dot.move();
    });
  }

  bounce(pos, vel) {
    if (pos[0] < 5 || pos[0] > 495){
      return [-vel[0], vel[1]];
    } else if (pos[1] < 5 || pos[1] > 495) {
      return [vel[0], -vel[1]];
    }
  }

  checkCollisions() {
    for(let i=0; i < this.dots.length; i++) {
      for(let j=i+1; j < this.dots.length; j++) {
        if (this.dots[i].isCollidedWith(this.dots[j])){
          // this.dots[i].collideWith(this.dots[j]);
          console.log('collision');
          return;
        }
      }
    }
  }

  // moveShip() {
  //   this.ship.move(event);
  // }

  step() {
    this.move();
    // this.checkCollisions();
  }

  // remove(dot) {
  //   this.dots.splice(this.dots.indexOf(dot), 1);
  // }
}

module.exports = Game;

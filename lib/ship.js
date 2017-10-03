const MovingObject = require("./moving_object");
const Util = require("./util");

const DEFAULTS = {
  COLORS: ['#7aadff', '#7fff81', '#ff7f90', '#fffa7f', '#da7fff'],
};

class Ship extends MovingObject {
  constructor(options) {
    options.pos = [250, 250];
    options.vel = [0,0];
    options.color = DEFAULTS.COLORS[0];

    super(options);

    this.changeColor = this.changeColor.bind(this);
  }

  move(ship, mousePos) {
    var mouseVel = Util.directionVec(ship, mousePos);
    this.pos[0] += mouseVel[0];
    this.pos[1] += mouseVel[1];
  }

  isCollidedWith(otherObject) {
    var minDist = this.radius + otherObject.radius;
    return (Util.distance(this.pos, otherObject.pos) < minDist);
  }

  checkCollisions(dots) {
    for(let i=0; i < dots.length; i++) {
      if (this.isCollidedWith(dots[i])){
        this.handleCollision(dots[i]);
        return;
      }
    }
  }

  handleCollision(dot) {
    if (this.color === dot.color) {
      this.game.remove(dot);
    } else {
      this.game.remove(this);
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI);
    ctx.fill();
  }

  changeColor() {
    var currentColorIdx = DEFAULTS.COLORS.indexOf(this.color);
    if (currentColorIdx === DEFAULTS.COLORS.length - 1) {
      this.color = DEFAULTS.COLORS[0];
    } else {
      this.color = DEFAULTS.COLORS[currentColorIdx + 1];
    }
  }

}

module.exports = Ship;

const MovingObject = require("./moving_object");
const Util = require("./util");

const DEFAULTS = {
  COLOR: '#7fff81'
};

class Ship extends MovingObject {
  constructor(options) {
    options.pos = [250, 250];
    options.vel = [0,0];
    options.color = DEFAULTS.COLOR;

    super(options);
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
      //add points
    } else {
      this.game.remove(this);
    }
  }
}

module.exports = Ship;

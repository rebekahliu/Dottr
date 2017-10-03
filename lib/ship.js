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
}

module.exports = Ship;

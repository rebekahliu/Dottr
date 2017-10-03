const MovingObject = require("./moving_object");
const Util = require("./util");

const DEFAULTS = {
  COLOR: '#7aadff',
  SPEED: 3
};

class Dot extends MovingObject {
  constructor(options) {
    options.color = DEFAULTS.COLOR;
    options.vel = Util.randomVec(DEFAULTS.SPEED);

    super(options);
  }
}

module.exports = Dot;

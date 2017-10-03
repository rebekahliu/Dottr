const MovingObject = require("./moving_object");
const Util = require("./util");

const DEFAULTS = {
  SPEED: 2.5
};

class Dot extends MovingObject {
  constructor(options) {
    // options.color = DEFAULTS.COLORS[dotColorIdx];
    options.vel = Util.randomVec(DEFAULTS.SPEED);

    super(options);
  }


}

module.exports = Dot;

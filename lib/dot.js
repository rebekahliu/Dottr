const MovingObject = require("./moving_object");
const Util = require("./util");

const DEFAULTS = {
  SPEED: 1
};

class Dot extends MovingObject {
  constructor(options) {
    options.vel = 1;
    super(options);
  }
}

module.exports = Dot;

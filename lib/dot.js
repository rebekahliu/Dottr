const MovingObject = require("./moving_object");
const Util = require("./util");

class Dot extends MovingObject {
  constructor(options) {
    options.vel = Util.randomVec(options.speed);
    super(options);
  }
}

module.exports = Dot;

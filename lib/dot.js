const MovingObject = require("./moving_object");
const Util = require("./util");

const DEFAULTS = {
  COLORS: ['#7aadff', '#7fff81', '#ff7f90', '#fffa7f', '#da7fff'],
  SPEED: 2.5
};

class Dot extends MovingObject {
  constructor(options) {
    options.color = DEFAULTS.COLORS[Math.floor(Math.random()*DEFAULTS.COLORS.length)];
    options.vel = Util.randomVec(DEFAULTS.SPEED);

    super(options);
  }
}

module.exports = Dot;

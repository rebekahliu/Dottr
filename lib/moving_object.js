const Util = require("./util");

class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.color = options.color;
    this.game = options.game;
    this.radius = 5;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI);
    ctx.fill();
  }

  move() {
    var newVel = this.game.bounce(this.pos, this.vel);
    if (newVel) {
      this.vel = newVel;
    }
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }

  isCollidedWith(otherObject) {
    console.log('radius', this.radius);
    var min_dist = this.radius + otherObject.radius;
    return Util.distance(this.pos, otherObject.pos) < min_dist;
  }
}

module.exports = MovingObject;

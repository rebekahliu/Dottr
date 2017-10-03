const Util = {
  randomVec(length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },

  scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  },

  distance(pos1, pos2) {
    var x = Math.pow((pos1[0] - pos2[0]), 2);
    var y = Math.pow((pos1[1] - pos2[1]), 2);
    return Math.sqrt(x + y);
  },

  directionVec(pos1, pos2) {
    var x = (pos1[0] - pos2[0])/this.distance(pos1, pos2);
    var y = (pos1[1] - pos2[1])/this.distance(pos1, pos2);
    return [x, y];
  }
  // newDirection(circle1, circle2) {
  //   var cx1 = circle1.pos[0];
  //   var cy1 = circle1.pos[1];
  //   var cx2 = circle2.pos[0];
  //   var cy2 = circle2.pos[1];
  //
  //
  //   var d = Math.sqrt(Math.pow(cx1 - cx2, 2) + Math.pow(cy1 - cy2, 2));
  //   var nx = (cx2 - cx1) / d;
  //   var ny = (cy2 - cy1) / d;
  //   var p = 2 * (circle1.vel[0] * nx + circle1.vel[1] * ny - circle2.vel[0] * nx - circle2.vel[1] * ny) /
  //           (circle1.radius + circle2.radius);
  //
  //   var vx1 = circle1.vel[0] - p * circle1.radius * nx;
  //   var vy1 = circle1.vel[1] - p * circle1.radius * ny;
  //   var vx2 = circle2.vel[0] + p * circle2.radius * nx;
  //   var vy2 = circle2.vel[1] + p * circle2.radius * ny;
  //   circle1.vel = [vx1, vy1];
  //   circle2.vel = [vx2, vy2];
  // }
};


module.exports = Util;

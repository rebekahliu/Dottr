/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(1);

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
    var newVel = Util.bounce(this.pos, this.vel);
    if (newVel) {
      this.vel = newVel;
    }
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }
}

module.exports = MovingObject;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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
    var x = (pos2[0] - pos1[0])/this.distance(pos1, pos2);
    var y = (pos2[1] - pos1[1])/this.distance(pos1, pos2);
    return [x, y];
  },

  bounce(pos, vel) {
    if (pos[0] < 5 || pos[0] > 495){
      return [-vel[0], vel[1]];
    } else if (pos[1] < 5 || pos[1] > 495) {
      return [vel[0], -vel[1]];
    }
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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(0);
const Dot = __webpack_require__(4);
const Ship = __webpack_require__(5);
const Util = __webpack_require__(1);

const DEFAULTS = {
  DIM_Y: 500,
  DIM_X: 500,
  NUM_DOTS: 20
};

class Game {
  constructor() {
    this.dots = [];
    this.ship = [];
    this.lives = 5;
    this.points = 0

    this.addDots();
    this.addShip();
  }

  randomPosition() {
    return [
      Math.random() * DEFAULTS.DIM_Y,
      Math.random() * DEFAULTS.DIM_X
    ];
  }

  addDots() {
    for (let i=0; i<(DEFAULTS.NUM_DOTS - this.dots.length); i++) {
      this.dots.push(new Dot({pos: this.randomPosition(), game: this}));
    }
  }

  addShip() {
    this.ship = new Ship({game: this});
  }

  draw(ctx) {
    ctx.clearRect(0, 0, DEFAULTS.DIM_X, DEFAULTS.DIM_Y);
    this.dots.forEach((dot) => {
      dot.draw(ctx);
    });
    this.ship.checkCollisions(this.dots);
    this.ship.draw(ctx);
  }

  move() {
    this.dots.forEach((dot) => {
      dot.move();
    });
  }

  step() {
    this.move();
    this.ship.checkCollisions(this.dots);
  }

  remove(object) {
    if (object instanceof Dot) {
      this.dots.splice(this.dots.indexOf(object), 1);
      this.points += 1;
      console.log('points', this.points);
    } else if (object instanceof Ship) {
      this.ship = "";
      this.addShip();
      this.lives -= 1;
      console.log('lives', this.lives);
    }
  }

}

module.exports = Game;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(2);
const GameView = __webpack_require__(6);

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("canvas");

  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  new GameView(game, ctx).start();
});


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(0);
const Util = __webpack_require__(1);

const DEFAULTS = {
  COLORS: ['#7aadff', '#7fff81', '#ff7f90', '#fffa7f', '#da7fff'],
  SPEED: 3
};

class Dot extends MovingObject {
  constructor(options) {
    options.color = DEFAULTS.COLORS[Math.floor(Math.random()*DEFAULTS.COLORS.length)];
    options.vel = Util.randomVec(DEFAULTS.SPEED);

    super(options);
  }
}

module.exports = Dot;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(0);
const Util = __webpack_require__(1);

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


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(2);

class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;

    this.render = this.render.bind(this);
  }

  start() {
    setInterval(this.render, 20);
  }

  render() {
    this.game.move();
    this.mousemove();
    this.game.addDots();
    this.game.draw(this.ctx);
  }

  mousemove() {
    const ship = this.game.ship;

    const canvas = document.getElementById("canvas");

    canvas.addEventListener("mousemove", function(event) {
      const getMousePos = (evt) => {
        var rect = canvas.getBoundingClientRect();
        return [
          evt.clientX - rect.left,
          evt.clientY - rect.top
        ];
      };

      var mousePos = getMousePos(event);
      ship.move(ship.pos, mousePos);
    });
  }

 //  bindKeyHandlers() {
 //   const ship = this.ship;
 //
 //   Object.keys(GameView.MOVES).forEach((k) => {
 //     let move = GameView.MOVES[k];
 //     key(k, () => { ship.power(move); });
 //   });
 //
 //   key("space", () => { ship.fireBullet() });
 // }
}

module.exports = GameView;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(1);
const Dot = __webpack_require__(3);

const DEFAULTS = {
  DIM_Y: 500,
  DIM_X: 500,
  NUM_DOTS: 20
};

class Game {
  constructor(){
    this.dots = [];

    this.addDots();
  }

  randomPosition() {
    return [
      Math.random() * DEFAULTS.DIM_Y,
      Math.random() * DEFAULTS.DIM_X
    ];
  }

  addDots() {
    for (let i=0; i<DEFAULTS.NUM_DOTS; i++) {
      this.dots.push(new Dot({pos: this.randomPosition(), game: this}));
    }
  }

  draw(ctx){
    ctx.clearRect(0, 0, DEFAULTS.DIM_X, DEFAULTS.DIM_Y);
    this.dots.forEach((dot) => {
      dot.draw(ctx);
    });
  }

  move(){
    this.dots.forEach((dot) => {
      dot.move();
    });
  }


  bounce(pos, vel) {
    if (pos[0] < 5 || pos[0] > 495){
      return [-vel[0], vel[1]];
    } else if (pos[1] < 5 || pos[1] > 495) {
      return [vel[0], -vel[1]];
    }
  }

  checkCollisions(){
    for(let i=0; i < DEFAULTS.NUM_DOTS; i++) {
      for(let j=i+1; j < DEFAULTS.NUM_DOTS; j++)
      if (this.dots[i].isCollidedWith(this.dots[j])){
        console.log('collision');
      }
    }
  }

  step(){
    this.move();
    this.checkCollisions();
  }
}

module.exports = Game;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(4);

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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);
const GameView = __webpack_require__(5);


document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("canvas");

  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  new GameView(game, ctx).start();
});


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(1);
const Util = __webpack_require__(4);

const DEFAULTS = {
  COLOR: '#7aadff',
  SPEED: 5
};

class Dot extends MovingObject {
  constructor(options){
    options.color = DEFAULTS.COLOR;
    options.vel = Util.randomVec(DEFAULTS.SPEED);

    super(options);
  }
}

module.exports = Dot;


/***/ }),
/* 4 */
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
    Math.sqrt(x + y);
  }
};


module.exports = Util;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);

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
    this.game.step();
    this.game.draw(this.ctx);
  }
}

module.exports = GameView;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
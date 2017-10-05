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
/***/ (function(module, exports) {

const Util = {
  randomVec(speed) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], speed);
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
    if (pos[0] < 0 || pos[0] > 500){
      return [-vel[0], vel[1]];
    } else if (pos[1] < 0 || pos[1] > 500) {
      return [vel[0], -vel[1]];
    }
  },

  randomPosition() {
    return [
      Math.random() * 500,
      Math.random() * 500
    ];
  }
};


module.exports = Util;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);

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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(1);
const Dot = __webpack_require__(4);
const Ship = __webpack_require__(5);
const Util = __webpack_require__(0);

const DEFAULTS = {
  DIM_Y: 500,
  DIM_X: 500,
  NUM_DOTS: 20,
  COLORS: ['#7aadff', '#7fff81', '#ff7f90', '#fffa7f', '#da7fff'],
  SPEED: 2
};

class Game {
  constructor() {
    this.dots = [];
    this.ship = [];
    this.points = 0;
    this.lives = 1;
    this.speed = DEFAULTS.SPEED;
    this.colorCounter = 0;

    this.addDots();
    this.addShip();
  }

  addDots() {
    for (let i=0; i<(DEFAULTS.NUM_DOTS - this.dots.length); i++) {
      this.dots.push(new Dot({
        pos: Util.randomPosition(),
        game: this,
        color: DEFAULTS.COLORS[this.dots.length % 5],
        speed: this.speed
      }));
    }
  }

  addShip() {
    this.ship = new Ship({game: this});
    // const timerDisplay = document.getElementById("timer");
    // var secondsLeft = 5;
    // var interval = setInterval(function() {
    //   if (secondsLeft === 0) {
    //     secondsLeft = 5;
    //   }
    //   timerDisplay.innerHTML = --secondsLeft;
    // }, 1000);
    // setInterval(this.ship.changeColor, 5000);
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
    this.checkGameOver();
    this.move();
    this.ship.checkCollisions(this.dots);
  }

  remove(object) {
    if (object instanceof Dot) {
      object.pos = Util.randomPosition();
      this.points += 1;
      this.ship.radius += 0.5;
      this.colorTimer();
      // this.speed += 5;
    } else if (object instanceof Ship) {
      this.ship = "";
      this.addShip();
      this.lives -= 1;
      this.colorCounter = 0;
    }
  }

  checkGameOver() {
    if (this.lives === 0) {
      // save Score
      debugger;
      this.points = 0;
      this.lives = 1;
    }
  }

  colorTimer() {
    if (this.colorCounter === 3) {
      this.ship.changeColor();
      this.colorCounter = 0;
    } else {
      this.colorCounter += 1;
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

const MovingObject = __webpack_require__(1);
const Util = __webpack_require__(0);

class Dot extends MovingObject {
  constructor(options) {
    options.vel = Util.randomVec(options.speed);
    super(options);
  }
}

module.exports = Dot;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(1);
const Util = __webpack_require__(0);

const DEFAULTS = {
  COLORS: ['#7aadff', '#7fff81', '#ff7f90', '#fffa7f', '#da7fff'],
  BORDER: ['#3884ff', '#2bff67', '#ff3f59', '#fff73f', '#c435ff']
};

class Ship extends MovingObject {
  constructor(options) {
    options.pos = [250, 250];
    options.vel = [0,0];
    options.color = DEFAULTS.COLORS[0];

    super(options);

    this.changeColor = this.changeColor.bind(this);
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
    } else {
      this.game.remove(this);
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = DEFAULTS.BORDER[DEFAULTS.COLORS.indexOf(this.color)];

    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI);
    ctx.fill();
    ctx.stroke();
  }

  changeColor() {
    var currentColorIdx = DEFAULTS.COLORS.indexOf(this.color);
    if (currentColorIdx === DEFAULTS.COLORS.length - 1) {
      this.color = DEFAULTS.COLORS[0];
    } else {
      this.color = DEFAULTS.COLORS[currentColorIdx + 1];
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
    // this.resetGame();
  }

  render() {
    this.game.step();
    this.mousemove();
    this.display();
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

  resetGame() {
    const resetButton = document.getElementById("reset");

    resetButton.addEventListener("click", function() {
      this.game.points = 0;
      this.game.lives = 5;
      this.game.addShip();
    }.bind(this));
  }

  display() {
    const pointDisplay = document.getElementById("score");
    pointDisplay.innerHTML = `Score: ${this.game.points}`;
    const livesDisplay = document.getElementById("lives");
    livesDisplay.innerHTML = `Lives: ${this.game.lives}`;
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
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
      object.pos = Util.randomPosition();
      this.points += 1;
      this.ship.radius += 0.5;
      this.colorTimer();
    } else if (object instanceof Ship) {
      this.ship = "";
      this.addShip();
      this.lives -= 1;
      this.colorCounter = 0;
    }
  }

  checkGameOver() {
    return this.lives <= 0;
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

document.getElementById('signupForm').addEventListener('submit', function(event) {
  event.preventDefault();
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/v1/signup');
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify({
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  }));
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

    this.animate = this.animate.bind(this);
    this.start = this.start.bind(this);
  }

  start() {
    const instructions = document.getElementById('instruction');
    instructions.innerHTML = "<h2>Instructions</h2><span>Move your mouse!</span><br><span>Eat dots that match your ship</span><br><span>Avoid dots that do not</span><br><span>Every 4 dots you eat, your ship will change color</span><br >"
    this.animate();
  }

  animate() {
    if (this.game.checkGameOver()) {
      this.gameOver();
      this.restartGame();
      return;
    }
    this.game.step();
    this.mousemove();
    this.display();
    this.game.addDots();
    this.game.draw(this.ctx);

    requestAnimationFrame(this.animate);
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

  display() {
    const pointDisplay = document.getElementById("score");
    pointDisplay.innerHTML = `Score: ${this.game.points}`;
    const livesDisplay = document.getElementById("lives");
    livesDisplay.innerHTML = `Lives: ${this.game.lives}`;
  }

  gameOver() {
    this.displayGameOver(this.game.points);
  }

  displayGameOver(points) {
    const gameOverDisplay = document.getElementById('instruction');
    gameOverDisplay.innerHTML = `<div class='game-over'><h2>Game over!</h2><span>Points: ${points}</span><br><button id='restart'>Play Again!</button></div>`;
  }

  restartGame() {
    const restartButton = document.getElementById('restart');
    // const startGame = this.start;
    const that = this;
    restartButton.addEventListener('click', function() {
      that.start();
    });
    this.game.points = 0;
    this.game.lives = 1;
    this.game.dots = [];
  }
}

module.exports = GameView;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
const Game = require("./game.js");

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

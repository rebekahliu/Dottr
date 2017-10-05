const Game = require("./game.js");

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

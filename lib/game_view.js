const Game = require("./game.js");

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

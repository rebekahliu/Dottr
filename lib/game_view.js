const Game = require("./game.js");

class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;

    this.render = this.render.bind(this);
  }

  start() {
    this.mousemove();
    setInterval(this.render, 20);
  }

  render() {
    this.game.move();
    this.game.draw(this.ctx);
  }

  mousemove() {
    const ship = this.game.ship;

    const canvas = document.getElementById("canvas");

    canvas.addEventListener("mousemove", function(event) {
      const getMousePos = (evt) => {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      };

      var mousePos = getMousePos(event);

      console.log(mousePos);
      // ship.move(ship, mousePos);
    });
  }

  // canvas.addEventListener('mousemove', function(evt) {
  //       var mousePos = getMousePos(canvas, evt);
  //       var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
  //       writeMessage(canvas, message);
  //     }, false);

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

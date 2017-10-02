const Game = require("./game.js");
const GameView = require("./game_view.js");


document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("canvas");

  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  new GameView(game, ctx).start();
});

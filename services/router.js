var router = require('express').Router();

function game(req, res) {
  res.render('public/index.html');
}

function protectedRoute(req, res, next) {
  res.send("Here's the secret!");
}

router.route('/').get(game);

router.route('/protected')
      .get(protectedRoute);

module.exports = router;

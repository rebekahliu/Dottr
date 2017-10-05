var router = require('express').Router();

var game = function(req, res) {
  res.render('public/index.html');
};

router.route('/').get(game);

module.exports = router;

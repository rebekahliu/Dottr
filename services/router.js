const passport = require('passport');

const AuthenticationController = require('../controller/authentication_controller.js');
const passportService = require('./passport.js');

var requireAuth = passport.authenticate('jwt', {session: false});
var requireLogin = passport.authenticate('local', {session: false});
var router = require('express').Router();

function game(req, res) {
  res.render('public/index.html');
}

function protectedRoute(req, res, next) {
  res.send("Here's the secret!");
}

router.route('/signup').post(AuthenticationController.signup);

router.route('/signin').post([requireLogin, AuthenticationController.signin]);

router.route('/protected').get(requireAuth, protectedRoute);

router.route('/').get(game);

module.exports = router;

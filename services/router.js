const passport = require('passport');

const AuthenticationController = require('../controller/authentication_controller.js');
const passportService = require('./passport.js');

var requireAuth = passport.authenticate('jwt', {session: false});
var requireLogin = passport.authenticate('local', {session: false});
var router = require('express').Router();
var path = require('path');


function game(req, res) {
  res.render('public/index.html');
}

function signupForm(req, res) {
  res.sendFile('/Users/rebekahliu/Documents/App_Academy/dottr//public/signup.html');
}

function protectedRoute(req, res, next) {
  res.send("Here's the secret!");
}

function signup(req, res) {
  console.log('req', req);
  res.send(req);
}

router.route('/signup').post(AuthenticationController.signup);
router.route('/signup').get(signupForm);

router.route('/signin').post([requireLogin, AuthenticationController.signin]);

router.route('/protected').get(requireAuth, protectedRoute);

router.route('/').get(game);

module.exports = router;

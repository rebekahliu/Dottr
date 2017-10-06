const passport = require('passport');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local');

const User = require('../models/user.js');
const config = require('../config.js');

var localOptions = {
  usernameField: 'email'
};

var localStrategy = new LocalStrategy(localOptions, function(email, password, done) {
  //verify email and password
  User.findOne({email: email}, function(err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }
    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false); }
      return done(null, user);
    });
  });
});

const jwtOptions = {
  secretOrKey: config.secret,
  jwtFromRequest: ExtractJwt.fromHeader('authorization')
};

var jwtStrategy = new JwtStrategy(jwtOptions, function(payload, done) {
  //payload: unincrypted Jwt token
  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false); } //false for user
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(jwtStrategy);
passport.use(localStrategy);

const User = require('../models/users-schema')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy


function initializePassport(){
    passport.use(new LocalStrategy(
        function(username, password, done) {
          User.findOne({ username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.verifyPassword(password)) { return done(null, false); }
            return done(null, user);
          });
        }
      ));
    
    passport.serializeUser(function(user, done) {
        done(null, user._id); 
    });
    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    
}

module.exports = initializePassport
  
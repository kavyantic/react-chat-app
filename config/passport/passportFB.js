
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Admin = mongoose.model('Admin')
var FacebookStrategy = require('passport-facebook')

passport.use(new FacebookStrategy({
    clientID: "500046521841064",
    clientSecret: "db63bc53fc0b6a07fd2225bfd73958d6",
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(accessToken,refreshToken,cb);
    User.findOne({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
))
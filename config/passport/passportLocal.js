var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Admin = mongoose.model('Admin')
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var LocalStrategy = require('passport-local');
const { Strategy } = require('passport-google-oauth20');
const { admin } = require('googleapis/build/src/apis/admin');




 



passport.use('user', new LocalStrategy(
    function(username, password, done) {
      User.findOne({ email: username }, function (err, user) {
        if(user){
            user.checkPassword(password).then((result)=>{
              if(result){
                return done(null, user);
              } else {
                return done("Password did not match", false);
              }
            })
        } else {
          if (err) { return done(err); }
          if (!user) { return done("No user found with this username", false); }
        }
       
       });
    }
  ));

  passport.use('admin', new LocalStrategy(
    function(username, password, done) {
      Admin.findOne({ username: username }, function (err, user) {
        if(user){
            user.checkPassword(password).then((result)=>{
              if(result){
                return done(null, user);
              } else {
                return done("Password did not match", false);
              }
            })
        } else {
          if (err) { return done(err); }
          if (!user) { return done("No admin found with this username", false); }
        }
       
       });
    }
  ));
  


  // Strategy for admin to search with email instead of username
  passport.use('adminEmail', new LocalStrategy(
    function(email, password, done) {
      Admin.findOne({ email  }, function (err, user) {
        if(user){
            user.checkPassword(password).then((result)=>{
              if(result){
                return done(null, user);
              } else {
                return done("Password did not match", false);
              } 
            })
        } else {
          if (err) { return done(err); }
          if (!user) { return done("No admin found with this email", false); }
        }
       
       });
    }
  ))
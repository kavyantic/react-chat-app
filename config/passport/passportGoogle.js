var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Admin = mongoose.model('Admin')
var GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config()


GOOGLE_CLIENT_ID =process.env.GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL

passport.use('google',new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL,
    passReqToCallback:true,
  },
  function(accessToken, refreshToken, xobj, profile,cb) {
    let profileJson = profile._json
    console.log(refreshToken);
    User.findOne({googleId: profile.id }, function (err, user) {
      if(user){
          cb(err,user)
      } else if(err) {
        return cb(err, user);
      } else {
        User.findOne({email:profile._json.email},(err,emailUser)=>{
          if(emailUser){
            // User.updateOne({email:profile._json.email},)
            cb(null,emailUser)
          } else if(err){cb(err,null)} 
          else{
            let user = new User({
              emailVerified:true,
              provider:'google',
              googleId:profile.id,
              name:profileJson.name,
              firstName:profileJson.given_name,
              lastName:profileJson.family_name,
              picture:profileJson.picture,
              email:profileJson.email,
              googleRefreshToken:refreshToken
            })
            user.save()
            cb(null,user)
          }
        })
       
      }
    });
  }
  ));


  passport.use('googleAdmin',new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/login/google/admin/callback",
    passReqToCallback:true,
  },
  function(accessToken, refreshToken, xobj, profile,cb) {
    let profileJson = profile._json
    Admin.findOne({googleId: profile.id}, function (err, admin) {
      if(admin) {
          cb(err,admin)
      } else if(err) {
        return cb(err, admin);
      } else {
        Admin.findOne({email:profileJson.email},(err,emailAdmin)=>{
          if(emailAdmin){
            Admin.updateOne({email:profileJson.email},{googleId:profile.id,provider:'google'})
            cb(null,emailAdmin)
          } else if(err){cb(err,null)} 
          else{
            cb("Not authenticated admin email",null)
          }
        })
       
      }
    });
  }
  ));
  
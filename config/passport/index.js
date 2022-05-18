var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
// var bycrypt = require('bycrypt')
// require('./passportLocal')
// require('./passportGoogle')
// require('./passportFB')


passport.use('trial',(req,res,done)=>{ 
  done(null,{
    id:'fucktload'
  })
})


passport.serializeUser(function(user, done) {
    done(null, user.id);
  }); 
  
passport.deserializeUser(function(id, done) {
    done(null,id)
     });
  
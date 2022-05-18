const validator = require('mongoose-validator')
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
// const uniqueValidator  = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
saltRounds = 2


let userSchema = new mongoose.Schema({
  provider:String,
  googleId:String,
  googleRefreshToken:String,
  name:{
    type:String
  },
  active:{
    type:Boolean,
    default:false
  },
  emailVerified:{
    type:Boolean,
    default:()=>{
      return this.googleId && this.provider =='google'
    }
  },
  firstName:{
      type:String
    },
    lastName:{
        type:String
    },
    createdOn:{ 
      type:Date,
      default:Date.now
    },
    address:String,
    picture:String,
    password: {
      type: String,
    },
    email:{
      type: String,
      lowercase: true,
      require:[true,"Please enter your email"],
      unique:[true,"A distributor with this email already exists"],
      trim: true,
      validate: [
        validator({
          validator: 'isEmail',
          message: 'Oops..please enter valid email'
        })
      ],
    },
    phone:{
      unique:true,
      type:String,
      sparse:true,
      $regex: '^[6-9]\d{9}$' 
    
    },
    socketId:{
      type:String
    }
 })




userSchema.methods.checkPassword = async function(password){
  return await bcrypt.compare(password,this.password)
}


userSchema.methods.setPassword =  function(password) {
  let user  = this
  bcrypt.hash(password, saltRounds).then(function(hash,cb) {
    // mongoose.model('User').updateOne({email:this.email},{password:hash},(err,doc)=>{
    //   console.log(doc);
    // })
    user.password = hash
    user.save()
});
}



userSchema.methods.updatePassword = function(prevPassword,newPassword,cb){
  bcrypt.compare(prevPassword, this.password, function(err, result) {
    if(result){
      bcrypt.hash(newPassword, saltRounds).then(function(hash,cb) {
        // mongoose.model('User').updateOne({email:this.email},{password:hash},cb)
        this.password = hash
        this.save((err,user)=>{
          cb(err,user)
        })
      })
    } else { 
      cb(err,null)
    }
});
}
// userSchema.plugin(uniqueValidator, {message: 'is already taken'});

mongoose.model('User',userSchema)






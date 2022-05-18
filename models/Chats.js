const validator = require('mongoose-validator')
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
// const uniqueValidator  = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
saltRounds = 2


let userSchema = new mongoose.Schema({
        chatType:{
            type:String,
            enum:[
                'chat',
                'group'
            ],
            default:()=>{this.members.length>2?'group':'chat'}
        },
       members:[
           {
               id:mongoose.Schema.Types.ObjectId 
           }
       ] ,
      createdOn:{ 
        type:Date,
        default:Date.now
      },
     
      chats:[
          {
              sentOn:{ 
                type:Date,
                default:Date.now
              },
              message:{
                  type:String
              },
              sentBy:{
                  id:mongoose.Schema.Types.ObjectId,

                //   validate:{
                //       validator:(value)=>{
                //           return this.members.map(e=>e.id).includes(value)
                //       },
                //       message:(props)=>{`${props.value} is not in chat members` }
                //   }
              }
          }
      ]

     })
  
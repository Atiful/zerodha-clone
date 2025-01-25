const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const validator = require("email-validator");

const userSchema = new mongoose.Schema({
  // username and passowrd is added by the passport-local-mongoose

    email : {
        type : String,
        unique : true,
        required : true,
        validate : {
            validator : function(v){
                return validator.validate(v);
            },
            message : 'enter a valid email ID'
        }
    },
     balance : {
        type : Number,
        default : 0,
        min : [0 , "balance cannot be negative"],
     },
     isProfit : {
        type : Boolean
     },
     totalStock : {
        type : Number,
        min : [0 , "stock cannot be negative"],
     },
     netgainOrloss : {
        type : Number,
        default : 0,
     },
     totalInvestent : {
      type : Number,
      default : 0,
     },
     acceptedProfit : {
      type : Number,
      default : 0,
     },
     profilepic : {
      type : String,
     },
     createdAt : {
        type : Date,
        default : Date.now,
     }
});


userSchema.plugin(passportLocalMongoose);
const user = mongoose.model("user" , userSchema);

module.exports = user;
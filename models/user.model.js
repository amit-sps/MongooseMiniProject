const Mongoose = require("mongoose");
const validator=require("validator");
const UserSchema = new Mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    Name: {
      type: String,
      required: true,
    },
    password:{
        type:String,
        required:true,
        minlength:4
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    flowers: [{
        type:Mongoose.Schema.Types.ObjectId,
        ref:"user"
    }],
    followings: [{
        type:Mongoose.Schema.Types.ObjectId,
        ref:"user"
    }],
  },
  { timestamps: true }
);
module.exports = new Mongoose.model("User", UserSchema);

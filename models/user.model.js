const Mongoose = require("mongoose");
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
    email: {
      type: String,
      required: true,
      unique: true,
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

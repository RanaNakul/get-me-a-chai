import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function(v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        },
        message: props => `${props.value} is not a valid email!`
      }
    },
    name: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    profilepic: {
      type: String,
    },
    coverpic: {
      type: String,
    },
    razorpayKey:{
      type: String,
    },
    razorpaySecret:{
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || model("User", UserSchema);
export default User;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is require"],
  },
  email: {
    type: String,
    required: [true, "email is require"],
  },
  password: {
    type: String,
    required: [true, "password is require"],
  },
  // age: {
  //   type: Number,
  //   required: [true, "Age is required"],
  // },
  // sex: {
  //   type: String,
  //   required: [true, "Sex is required"],
  //   enum: ["male", "female", "other"],
  // },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isDoctor: {
    type: Boolean,
    default: false,
  },
  notifcation: {
    type: Array,
    default: [],
  },
  seennotification: {
    type: Array,
    default: [],
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;

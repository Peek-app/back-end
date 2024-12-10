const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  profilePic: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    match: RegExp("[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+"),
  },
  role: {
    type: Number,
    required: false,
    default: 0,
  },
  phone: {
    type: String,
    required: false,
    minLength: 2,
    maxLength: 50,
  },
  emailValidation: {
    type: Boolean,
    default: false,
  },
  birthday: {
    type: Date,
    default: new Date(),
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  createAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("users", userSchema);

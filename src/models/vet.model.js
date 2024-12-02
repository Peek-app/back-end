const mongoose = require("mongoose");

const vetSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    match: RegExp("[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+"),
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: Number,
    required: true,
    default: 0,
  },
  professionalId: {
    type: Number,
    required: true,
    minLength: 2,
    maxLength: 8,
  },
  specialtys: {
    type: Array,
    default: [],
  },
  raiting: {
    type: Number,
    required: false,
    default: 5,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "users",
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

module.exports = mongoose.model("vets", vetSchema);

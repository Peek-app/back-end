const mongoose = require("mongoose");

const vetSchema = mongoose.Schema({
  professionalId: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  specialtys: {
    type: Array,
    default: [],
  },
  raiting: {
    type: Number,
    required: true,
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

const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema({
  comment: {
    type: String,
    trim: true,
    maxlength: 500,
    minLength: 6,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  toUser: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  fromUser: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
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

module.exports = mongoose.model("reviews", reviewsSchema);

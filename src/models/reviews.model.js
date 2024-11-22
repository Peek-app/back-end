const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema({
  comment: {
    type: String,
    trim: true,
    maxlength: 500,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
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

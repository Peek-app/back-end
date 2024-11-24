const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema({
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

module.exports = mongoose.model("owners", ownerSchema);

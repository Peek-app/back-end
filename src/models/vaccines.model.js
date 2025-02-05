const mongoose = require("mongoose");

const vaccineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
  },
  comments: {
    type: String,
  },
  appliedBy: {
    type: String,
    minLength: 2,
  },
  petId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "pets",
  },
  vet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vet",
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

module.exports = mongoose.model("vaccines", vaccineSchema);

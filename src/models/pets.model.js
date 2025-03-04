const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
  },
  birthday: {
    type: Date,
    required: true,
  },
  typeAnimal: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  medals: {
    type: [String],
  },
  petOwner: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "users",
  },
  vet: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "vets",
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

module.exports = mongoose.model("pets", petSchema);

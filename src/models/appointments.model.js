const mongoose = require("mongoose");

const appointmentsSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  hour: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  petId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "pets",
    required: true,
  },
  vetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vets",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("Appointment", appointmentsSchema);

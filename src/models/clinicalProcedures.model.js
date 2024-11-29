const mongoose = require("mongoose");

const clinicalProceduresSchema = new mongoose.Schema({
  reason: {
    type: String,
    required: true,
  },
  diagnosis: {
    type: String,
    required: true,
  },
  prescription: {
    type: String,
    required: true,
  },
  vetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vets",
    required: false,
  },
  petId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "pets",
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

module.exports = mongoose.model("ClinicalProcedure", clinicalProceduresSchema);

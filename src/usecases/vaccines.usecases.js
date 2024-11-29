const createError = require("http-errors");

const Vaccines = require("../models/vaccines.model");

async function create(data) {
  if (!data) {
    throw createError(400, "Review mandatory fields");
  }
  const vaccine = await Vaccines.create(data);
  return vaccine;
}

async function getAll() {
  const vaccines = await Vaccines.find({}).populate("petId");
  return vaccines;
}

async function deleteById(id, userId) {
  const existingVaccine = await Vaccines.findById(id);

  if (!existingVaccine) {
    throw createError(404, "Vaccine not found");
  }

  const vaccineDeleted = await Vaccines.findByIdAndDelete(id);
  return vaccineDeleted;
}

async function updateById(id, newData) {
  const existingVaccine = await Vaccines.findById(id);
  if (!existingVaccine) {
    throw createError(404, "Vaccine not found");
  }

  const vaccineUpdated = await Vaccines.findByIdAndUpdate(id, newData, {
    new: true,
  });

  return vaccineUpdated;
}

module.exports = { create, getAll, deleteById, updateById };

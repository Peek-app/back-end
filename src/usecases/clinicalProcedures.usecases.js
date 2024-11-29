const createError = require("http-errors");
const ClinicalProcedure = require("../models/clinicalProcedures.model");

async function create(data) {
  if (!data) {
    throw createError(400, "All fields are mandatory");
  }
  const clinicalProcedure = await ClinicalProcedure.create(data);
  return clinicalProcedure;
}

async function getAll() {
  const clinicalProcedures = await ClinicalProcedure.find({});
  return clinicalProcedures;
}

async function getById(id) {
  const clinicalProcedure = await ClinicalProcedure.findById(id);
  if (!clinicalProcedure) {
    throw createError(404, "Clinical Procedure not found");
  }
  return clinicalProcedure;
}

async function updateById(id, newData) {
  const existingClinicalProcedure = await ClinicalProcedure.findById(id);
  if (!existingClinicalProcedure) {
    throw createError(404, "Clinical Procedure not found");
  }
  const updatedClinicalProcedure = await ClinicalProcedure.findByIdAndUpdate(
    id,
    newData,
    {
      new: true,
    }
  );
  return updatedClinicalProcedure;
}

async function deleteById(id) {
  const existingClinicalProcedure = await ClinicalProcedure.findById(id);
  if (!existingClinicalProcedure) {
    throw createError(404, "Clinical Procedure not found");
  }
  const deletedClinicalProcedure = await ClinicalProcedure.findByIdAndDelete(
    id
  );
  return deletedClinicalProcedure;
}

module.exports = { create, getAll, getById, updateById, deleteById };

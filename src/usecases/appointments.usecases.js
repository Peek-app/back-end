const createError = require("http-errors");

const Appointment = require("../models/appointments.model");
const Pet = require("../models/pets.model");

async function create(data) {
  if (!data) {
    throw createError(400, "All fields are mandatory");
  }
  const appointment = await Appointment.create(data);
  return appointment;
}

async function getAll() {
  const appointments = await Appointment.find({}).populate("petId");
  return appointments;
}

async function getAppointmentsByOwnerId(ownerId) {
  console.log("Owner ID:", ownerId);
  const pets = await Pet.find({ petOwner: ownerId }).select("_id");
  console.log("Pets found:", pets);
  const petIds = pets.map((pet) => pet._id);
  console.log("Pet IDs:", petIds);

  const appointments = await Appointment.find({ petId: { $in: petIds } })
    .populate("petId")
    .populate("vetId");
  console.log("Appointments found:", appointments);

  return appointments;
}

async function getById(id) {
  const appointment = await Appointment.findById(id).populate("petId");
  return appointment;
}

async function updateById(id, newData) {
  const existingAppointment = await Appointment.findById(id);
  if (!existingAppointment) {
    throw createError(404, "Appointment not found");
  }
  const updatedAppointment = await Appointment.findByIdAndUpdate(id, newData, {
    new: true,
  });
  return updatedAppointment;
}

async function deleteById(id) {
  const existingAppointment = await Appointment.findById(id);
  if (!existingAppointment) {
    throw createError(404, "Appointment not found");
  }
  const deletedAppointment = await Appointment.findByIdAndDelete(id);
  return deletedAppointment;
}

async function getByPetId(petId) {
  const appointments = await Appointment.find({ petId })
    .populate("petId")
    .populate("vetId");
  return appointments;
}

module.exports = {
  create,
  getAll,
  updateById,
  deleteById,
  getById,
  getByPetId,
  getAppointmentsByOwnerId,
};

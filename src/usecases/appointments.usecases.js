const createError = require("http-errors");

const Appointment = require("../models/appointments.model");

async function create(data) {
  if (!data) {
    throw createError(400, "All fields are mandatory");
  }
  const appointment = await Appointment.create(data);
  return appointment;
}

async function getAll() {
  const appointments = await Appointment.find({});
  return appointments;
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

module.exports = { create, getAll, updateById, deleteById };

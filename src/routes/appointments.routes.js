const express = require("express");
const auth = require("../middleware/auth");

const appointmentsUseCases = require("../usecases/appointments.usecases");

const router = express.Router();

router.post("/", async (request, response) => {
  try {
    const appointmentData = request.body;
    const newAppointment = await appointmentsUseCases.create(appointmentData);

    response.json({
      success: true,
      message: "Appointment is created",
      data: { appointment: newAppointment },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/", async (request, response) => {
  try {
    const appointments = await appointmentsUseCases.getAll();

    response.json({
      success: true,
      message: "All appointments",
      data: { appointments },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/pet/:petId", async (request, response) => {
  try {
    const petId = request.params.petId;
    const appointments = await appointmentsUseCases.getByPetId(petId);
    response.json({
      success: true,
      message: "Appointments for pet",
      data: { appointments },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/owner/:ownerId", auth, async (request, response) => {
  try {
    const ownerId = request.params.ownerId;
    console.log("Request for owner ID:", ownerId);
    const appointments = await appointmentsUseCases.getAppointmentsByOwnerId(
      ownerId
    );
    console.log("Appointments returned:", appointments);

    response.json({
      success: true,
      message: "Appointments for owner's pets",
      data: { appointments },
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const appointment = await appointmentsUseCases.getById(id);

    if (!appointment) {
      throw createError(404, "Appointment not found");
    }

    response.json({
      success: true,
      message: "Appointment found",
      data: { appointment },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const appointmentDeleted = await appointmentsUseCases.deleteById(id);

    response.json({
      success: true,
      message: "Appointment deleted",
      data: { appointment: appointmentDeleted },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.patch("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const appointmentData = request.body;
    const appointmentUpdated = await appointmentsUseCases.updateById(
      id,
      appointmentData
    );

    response.json({
      success: true,
      message: "Appointment updated",
      data: { appointment: appointmentUpdated },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;

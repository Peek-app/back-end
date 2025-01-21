const express = require("express");

const petsUseCases = require("../usecases/pets.usecases");
const appointmentsUseCases = require("../usecases/appointments.usecases");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (request, response) => {
  try {
    const petData = request.body;
    petData.petOwner = request.user._id;

    const newPet = await petsUseCases.create(petData);

    response.json({
      success: true,
      message: "Pet is created",
      data: { pet: newPet },
      token: response.locals.newToken,
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
    const pets = await petsUseCases.getAll();

    response.json({
      success: true,
      message: "All pets",
      data: { pets },
      token: res.locals.newToken,
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
    const petDeleted = await petsUseCases.deleteById(id);

    response.json({
      success: true,
      message: "Pet deleted",
      data: { pets: petDeleted },
      token: res.locals.newToken,
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
    const petsData = request.body;
    const petUpdated = await petsUseCases.updateById(id, petsData);

    response.json({
      success: true,
      message: "Pet updated",
      data: { pets: petUpdated },
      token: res.locals.newToken,
    });
  } catch (error) {
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
    const pet = await petsUseCases.getById(id);

    response.json({
      success: true,
      message: "Pet returned",
      data: { pet },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

// Ruta para obtener todas las mascotas relacionadas a un owner
router.get("/owner/:ownerId", auth, async (request, response) => {
  try {
    const ownerId = request.params.ownerId;
    const pets = await petsUseCases.getByOwnerId(ownerId);

    response.json({
      success: true,
      message: "Pets related to owner",
      data: { pets },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

// Ruta para obtener todas las mascotas relacionadas a un vet
router.get("/vet/:vetId", auth, async (request, response) => {
  try {
    const vetId = request.params.vetId;
    const pets = await petsUseCases.getByVetId(vetId);

    response.json({
      success: true,
      message: "Pets related to vet",
      data: { pets },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

// Ruta para obtener todas las vacunas de una mascota
router.get("/:petId/vaccines", auth, async (request, response) => {
  try {
    const petId = request.params.petId;
    const vaccines = await petsUseCases.getVaccinesByPetId(petId);

    response.json({
      success: true,
      message: "Vaccines related to pet",
      data: { vaccines },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

// Ruta para obtener todas las citas relacionadas a una mascota
router.get("/:petId/appointments", auth, async (request, response) => {
  try {
    const petId = request.params.petId;
    const appointments = await appointmentsUseCases.getByPetId(petId);

    response.json({
      success: true,
      message: "Appointments related to pet",
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

module.exports = router;

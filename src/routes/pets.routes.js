const express = require("express");

const petsUseCases = require("../usecases/pets.usecases");
const auth = require("../middleware/auth");
const jwt = require("../lib/jwt");

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

module.exports = router;

const express = require("express");
const vetUseCases = require("../usecases/vets.usecases");
const createError = require("http-errors");
const router = express.Router();
const auth = require("../middleware/auth");
const ownerUseCases = require("../usecases/owners.usecases");

router.post("/", async (request, response) => {
  try {
    const vetData = request.body;

    const existingVet = await vetUseCases.getById(request.body.user);
    const existingOwner = await ownerUseCases.getById(request.body.user);
    if (existingVet || existingOwner) {
      throw createError(404, "User alredy has a role");
    }

    const newVet = await vetUseCases.create(vetData);
    response.json({
      success: true,
      message: "Vet Created",
      data: { vet: newVet.id },
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
    const vets = await vetUseCases.getAll();
    response.json({
      success: true,
      message: "All vets",
      data: { vets },
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
    const vet = await vetUseCases.getById(id);
    if (!vet) {
      throw createError(404, "User not found");
    }
    response.json({
      success: true,
      message: "Vet by id",
      data: { vet },
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

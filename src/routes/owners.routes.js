const express = require("express");
const ownerUseCases = require("../usecases/owners.usecases");
const createError = require("http-errors");
const router = express.Router();
const auth = require("../middleware/auth");
const vetUseCases = require("../usecases/vets.usecases");

router.post("/", async (request, response) => {
  try {
    const ownerData = request.body;
    ownerData.user = request.user?.id;

    const existingVet = await vetUseCases.getById(ownerData.user);
    const existingOwner = await ownerUseCases.getById(ownerData.user);
    if (existingVet || existingOwner) {
      throw createError(404, "User alredy has a role");
    }

    const newOwner = await ownerUseCases.create(ownerData);
    response.json({
      success: true,
      message: "Owner Created",
      data: { owner: newOwner.id },
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
    const owners = await ownerUseCases.getAll();
    response.json({
      success: true,
      message: "All owners",
      data: { owners },
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
    const owner = await ownerUseCases.getById(id);
    if (!owner) {
      throw createError(404, "User not found");
    }
    response.json({
      success: true,
      message: "Owner by id",
      data: { owner },
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

const express = require("express");

const vaccinesUseCases = require("../usecases/vaccines.usecases");

const router = express.Router();

router.post("/", async (request, response) => {
  try {
    const vaccineData = request.body;
    const newVaccine = await vaccinesUseCases.create(vaccineData);
    response.json({
      success: true,
      message: "Vaccine created",
      data: { vaccine: newVaccine },
    });
  } catch (error) {
    if (error.status) {
      response.status(error.status);
    } else if (error.name === "ValidationError") {
      response.status(400);
    } else {
      response.status(500);
    }
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/", async (request, response) => {
  try {
    const vaccines = await vaccinesUseCases.getAll();
    response.json({
      success: true,
      message: "All vaccines",
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

router.get("/pet/:petId", async (request, response) => {
  try {
    const petId = request.params.petId;
    const vaccines = await vaccinesUseCases.getByPetId(petId);
    response.json({
      success: true,
      message: "Vaccines for pet",
      data: { vaccines },
    });
  } catch (error) {
    if (error.status) {
      response.status(error.status);
    } else if (error.name === "CastError") {
      response.status(400);
    } else {
      response.status(500);
    }
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const vaccineDeleted = await vaccinesUseCases.deleteReviewById(id);

    response.json({
      success: true,
      message: "Vaccine deleted",
      data: { vaccines: vaccineDeleted },
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
    const vaccinesData = request.body;
    const vaccineUpdated = await vaccineDeleted.updateById(id, vaccinesData);

    response.json({
      success: true,
      message: "Pet updated",
      data: { vaccines: vaccineUpdated },
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

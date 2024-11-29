const express = require("express");
const clinicalProceduresUseCases = require("../usecases/clinicalProcedures.usecases");
const createError = require("http-errors");

const router = express.Router();

router.post("/", async (request, response) => {
  try {
    const clinicalProcedureData = request.body;
    const newClinicalProcedure = await clinicalProceduresUseCases.create(
      clinicalProcedureData
    );

    response.json({
      success: true,
      message: "Clinical Procedure is created",
      data: { clinicalProcedure: newClinicalProcedure },
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
    const clinicalProcedures = await clinicalProceduresUseCases.getAll();

    response.json({
      success: true,
      message: "All Clinical Procedures",
      data: { clinicalProcedures },
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
    const clinicalProcedure = await clinicalProceduresUseCases.getById(id);

    if (!clinicalProcedure) {
      throw createError(404, "Clinical Procedure not found");
    }

    response.json({
      success: true,
      message: "Clinical Procedure found",
      data: { clinicalProcedure },
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
    const clinicalProcedureData = request.body;
    const updatedClinicalProcedure =
      await clinicalProceduresUseCases.updateById(id, clinicalProcedureData);

    response.json({
      success: true,
      message: "Clinical Procedure updated",
      data: { clinicalProcedure: updatedClinicalProcedure },
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
    const deletedClinicalProcedure =
      await clinicalProceduresUseCases.deleteById(id);

    response.json({
      success: true,
      message: "Clinical Procedure deleted",
      data: { clinicalProcedure: deletedClinicalProcedure },
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

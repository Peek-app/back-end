const express = require("express");
const userUseCases = require("../usecases/users.usecases");
const createError = require("http-errors");
const router = express.Router();

router.post("/", async (request, response) => {
  try {
    const userData = request.body;
    const newUser = await userUseCases.create(userData);
    response.json({
      success: true,
      message: "User Created",
      data: { user: newUser.id },
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
    const users = await userUseCases.getAll();
    response.json({
      success: true,
      message: "All users",
      data: { users },
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
    const user = await userUseCases.getById(id);
    if (!user) {
      throw createError(404, "User not found");
    }
    response.json({
      success: true,
      message: "User by id",
      data: { user },
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
    const userDelted = await userUseCases.deleteById(id);
    response.json({
      success: true,
      message: "User deleted by id",
      data: { user: userDelted.id },
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
    const userData = request.body;
    userData.updatedAt = new Date();
    const userUpdated = await userUseCases.updateById(id, userData);
    response.json({
      success: true,
      message: "user updated",
      data: { user: userUpdated },
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

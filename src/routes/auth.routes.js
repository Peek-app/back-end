const express = require("express");
const createError = require("http-errors");

const usersUseCases = require("../usecases/users.usecases");

const router = express.Router();

router.post("/login", async (request, response, next) => {
  try {
    const data = request.body;
    const { token, userID } = await usersUseCases.login(data);


    response.json({
      success: true,
      message: "Logged in",
      data: {
        token,
        userId,
      },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
  next();
});

module.exports = router;

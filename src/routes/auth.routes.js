const express = require("express");
const createError = require("http-errors");

const usersUseCases = require("../usecases/users.usecases");

const router = express.Router();

router.post("/login", async (req, res, next) => {
  try {
    const data = req.body;
    const { token, userID } = await usersUseCases.login(data);

    res.json({
      success: true,
      message: "Logged in",
      data: {
        token,
        userID,
      },
    });
  } catch (error) {
    res.status(error.status || 500);
    res.json({
      success: false,
      message: error.message,
    });
  }
  next();
});

module.exports = router;

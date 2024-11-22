const express = require("express");
const app = express();

app.get("/", (request, response) => {
  response.json({
    success: true,
    message: "Peek app",
  });
});

module.exports = app;

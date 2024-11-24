const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRoutes = require("./routes/auth.routes");

const app = express();

const usersRoutes = require("./routes/users.router");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(helmet());
app.use(express.json());
app.use("/auth", authRoutes);

app.use("/users", usersRoutes);

app.get("/", (request, response) => {
  response.json({
    success: true,
    message: "Back-End Peek App",
  });
});

module.exports = app;

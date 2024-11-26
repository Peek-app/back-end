const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

const authRoutes = require("./routes/auth.routes");
const usersRoutes = require("./routes/users.router");
const vetstRoutes = require("./routes/vets.router");
const ownersRoutes = require("./routes/owners.router");
const reviewsRoutes = require("./routes/reviews.routes");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(helmet());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/vets", vetstRoutes);
app.use("/owners", ownersRoutes);
app.use("/reviews", reviewsRoutes);

app.get("/", (request, response) => {
  response.json({
    success: true,
    message: "Back-End Peek App",
  });
});

module.exports = app;

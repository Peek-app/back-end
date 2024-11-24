const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();

const usersRoutes = require("./routes/users.router");
const vetstRoutes = require("./routes/vets.router");
const ownersRoutes = require("./routes/owners.router");

app.use(
  cors({
    //origin: "https://dev-to-arturo-juarezs-projects.vercel.app",
    origin: "http://localhost:3000",
  })
);

app.use(helmet());
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/vets", vetstRoutes);
app.use("/owners", ownersRoutes);

app.get("/", (request, response) => {
  response.json({
    success: true,
    message: "Back-End Peek App",
  });
});

module.exports = app;

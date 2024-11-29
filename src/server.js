const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const auth = require("./middleware/auth");

const app = express();

const authRoutes = require("./routes/auth.routes");
const usersRoutes = require("./routes/users.routes");
const vetstRoutes = require("./routes/vets.routes");
const ownersRoutes = require("./routes/owners.routes");
const reviewsRoutes = require("./routes/reviews.routes");
const petsRoutes = require("./routes/pets.routes");
const appointmentsRoutes = require("./routes/appointments.routes");
const clinicalProcedure = require("./routes/clinicalProcedures.routes");

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
app.use("/pets", petsRoutes);
app.use("/appointments", auth, appointmentsRoutes);
app.use("/clinicalProcedures", auth, clinicalProcedure);

app.get("/", (request, response) => {
  response.json({
    success: true,
    message: "Back-End Peek-App",
  });
});

module.exports = app;

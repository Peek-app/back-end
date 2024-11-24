const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();

const usersRoutes = require("./routes/users.router");
/*const postRoutes = require("../routes/posts.router");
const authRoutes = require("../routes/auth.router");
*/
app.use(
  cors({
    //origin: "https://dev-to-arturo-juarezs-projects.vercel.app",
    origin: "http://localhost:3000",
  })
);

app.use(helmet());
app.use(express.json());

app.use("/users", usersRoutes);
/*app.use("/posts", postRoutes);
app.use("/auth", authRoutes);
*/
app.get("/", (request, response) => {
  response.json({
    success: true,
    message: "Back-End Peek App",
  });
});

module.exports = app;

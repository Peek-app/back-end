require("dotenv").config();
const server = require("./src/server");
const port = process.env.PORT || 8080;
const db = require("./src/lib/db");

db.connect()
  .then(() => {
    console.log("DB connected");
    server.listen(port, () => {
      console.log("Server listeng on port: ", port);
    });
  })
  .catch((error) => {
    console.log(`DB connection error: ${error}`);
  });

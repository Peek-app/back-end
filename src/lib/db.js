const mongoose = require("mongoose");
require("dotenv").config();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_CONNECTION = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

//const DB_CONNECTION = `mongodb+srv://peekapp04:PeekApp02Kodemia@peek-cluster.jp3x3.mongodb.net/`;

function connect() {
  return mongoose.connect(DB_CONNECTION);
}
module.exports = { connect };

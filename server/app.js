// const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/router");
const cookieParser = require("cookie-parser");

require("./db/conn");
const signups = require("./models/signUpSchema");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(router);
app.listen(5000, function () {
  console.log("server is successfully working at port 5000");
});

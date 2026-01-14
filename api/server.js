const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();

const port = process.env.PORT;
const url = process.env.DB_URL;

// middleware for understand json format data
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connection with database

mongoose
  .connect(url)
  // const db = mongoose.connection;

  .then((req, res) => {
    console.log("Connected successfully");
  })
  .catch((err) => {
    console.log("Error durin Db connection", err);
  });

//Add Routes to the server

require("../api/Routes/category.route")(app); // ->calling routes and passing app object

require("../api/Routes/product.route")(app);

app.use("/eWebsite/api/auth", require("./Routes/user.routes"));

// Health Check Route
app.get("/", (req, res) => {
  console.log("Get api start");

  res.send("Backend is running & it is created By Govind Rajpoot!");
});

// 01method- start the server

app.listen(port, () => {
  console.log(`server is running on port no. : ${port}`);
});

//02vercel method- Export app as a vercel serverless function

module.exports = app;

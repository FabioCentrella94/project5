// DEVELOPMENT ENVIRONMENT
/*
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const helmet = require("helmet");
require("dotenv").config();

const cameraRoutes = require("./routes/camera");
const teddyRoutes = require("./routes/teddy");
const furnitureRoutes = require("./routes/furniture");

const app = express();

app.use(
  helmet({ crossOriginResourcePolicy: false, crossOriginEmbedderPolicy: false })
);

mongoose
  .connect(process.env.MONGO_DB_ATLAS_CONNECTION_STRING)
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:9000");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/images", express.static(path.join(__dirname, "images")));

app.use(bodyParser.json());

app.use("/api/cameras", cameraRoutes);
app.use("/api/teddies", teddyRoutes);
app.use("/api/furniture", furnitureRoutes);

app.get("/", function (req, res) {
  res.json({
    status: 200,
    message: "Server is running",
  });
});

app.get('/favicon.ico', (req, res) => res.status(204));

module.exports = app;
*/

//PRODUCTION ENVIRONMENT
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const helmet = require("helmet");

const cameraRoutes = require("./routes/camera");
const teddyRoutes = require("./routes/teddy");
const furnitureRoutes = require("./routes/furniture");

const app = express();

app.use(
  helmet({ crossOriginResourcePolicy: false, crossOriginEmbedderPolicy: false })
);

mongoose
  .connect(process.env.MONGO_DB_ATLAS_CONNECTION_STRING)
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://project5.myportfolio.training");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/images", express.static(path.join(__dirname, "images")));

app.use(bodyParser.json());

app.use("/api/cameras", cameraRoutes);
app.use("/api/teddies", teddyRoutes);
app.use("/api/furniture", furnitureRoutes);

app.get("/", function (req, res) {
  res.json({
    status: 200,
    message: "Server is running",
  });
});

app.get('/favicon.ico', (req, res) => res.status(204));

module.exports = app;
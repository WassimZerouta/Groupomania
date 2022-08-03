const express = require("express");
const path = require("path");

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

const db = require("./database/database");

const app = express();

db.sequelize.authenticate().then(
  function (err) {
    console.log("Connection has been established successfully.");
  },
  function (err) {
    console.log("Unable to connect to the database:", err);
  }
);

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
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
app.use("/videos", express.static(path.join(__dirname, "videos")));

app.use("/api/auth", userRoutes);

app.use("/api/post", postRoutes);

module.exports = app;

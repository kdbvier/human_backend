const createError = require("http-errors");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const indexRouter = require("./router.js");
const db = require("./src/config/db_connection");
const app = express();

app.use(express.json());

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());

app.use("/api", indexRouter);

// Handling Errors
app.use((err, req, res, next) => {
  // console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  db.connect(function (err) {
    if (err) throw err;
    console.log("Database is Connected!");
  });
  console.log(`Server is running on port ${PORT}`);
});

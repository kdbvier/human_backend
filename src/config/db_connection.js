const mysql = require("mysql");

const db = mysql.createConnection({
  // host: "localhost",
  // user: "root",
  // // password: "Password@#$",
  // database: "mydb",
  host: "142.132.197.45",
  user: "root",
  password: "humanbackend111V!",
  database: "human",
});

module.exports = db;

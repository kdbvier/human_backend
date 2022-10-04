const mysql = require("mysql");

const db = mysql.createConnection({
  host: "142.132.197.45",
  user: "root",
  password: "humanbackend111V!",
  database: "human",
});

module.exports = db;

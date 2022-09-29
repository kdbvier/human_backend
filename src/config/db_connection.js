const mysql = require("mysql");

const db = mysql.createConnection({
  host: "142.132.197.47",
  user: "nftmarketplace",
  password: "Password@#$",
  // database: "sql6521546",
});

module.exports = db;

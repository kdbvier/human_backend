const mysql = require("mysql");

const db = mysql.createConnection({
  host: "sql6.freemysqlhosting.net",
  user: "sql6521546",
  password: "ytIaE1vKZN",
  database: "sql6521546",
});

module.exports = db;

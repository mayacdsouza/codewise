/*
This file establishes a connection to the MySQL database using the 'mysql' library and exports the database connection object.
It includes the necessary credentials and configuration to connect to the database.
*/
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "classmysql.engr.oregonstate.edu",
  user: "capstone_2023_spq_1",
  password: "codewise!!!",
  database: "capstone_2023_spq_1",
});

db.connect(function (err) {
  if (err) {
    console.log("Connection error");
    throw err;
  } else {
    console.log("Connected!");
  }
});

module.exports = db;

/*
This file establishes a connection to the MySQL database using the 'mysql' library and exports the database connection object.
It includes the necessary credentials and configuration to connect to the database.
*/
const mysql = require('mysql');

const db = mysql.createConnection({
    host: "codewise-instance-1.cgwvxlkikwau.us-east-2.rds.amazonaws.com",
    user: "mayacdsouza",
    password: "mayacdsouza",
    database: "codewise",
})

db.connect(function(err) {
    if (err) {
        console.log("Connection error");
        throw err;
    } else {
        console.log("Connected!");
    }
});

module.exports = db;
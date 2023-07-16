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
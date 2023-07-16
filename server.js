const express = require("express");
const cors = require('cors');
const app = express();
const dbPort = 3306;
const db = require('./SQL/db-connector');

app.use(cors());
app.use(express.json());

app.post('/', (req, res) => {
    if ('signup' === req.body.formType) {
        if (req.body.name && req.body.signup_email && req.body.company && req.body.signup_password_hash) {
            const sql = `INSERT INTO Employers(name, email, company, password_hash) VALUES ('${req.body.name}', '${req.body.signup_email}', '${req.body.company}', '${req.body.signup_password_hash}')`;
            db.query(sql, (err, result, fields) => {
                if (err) res.send(err);
                if (result) res.send({
                    name: req.body.name,
                    email: req.body.signup_email,
                    company: req.body.company,
                    password_hash: req.body.signup_password_hash
                });
                if (fields) console.log(fields);
            });
        } else {
            console.log('Missing a parameter');
        }
    } else if ('login' === req.body.formType) {
        if (req.body.login_email && req.body.login_password_hash) {
            const sql = `SELECT * FROM Employers WHERE email = ? and password_hash = ?`;
            db.query(sql, [req.body.login_email, req.body.login_password_hash], (err, result, fields) => {
                if (err) return res.json("Error");
                if (result.length > 0) return res.json("Success");
                else res.send("Incorrect email and/or password");
            });
        } else {
            console.log('Missing a parameter');
        }
    }
});



app.listen(dbPort, () => {
    console.log("Express server is running on port " + dbPort);
});
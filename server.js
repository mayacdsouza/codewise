/*
This file represents the server-side code using the Express framework for handling API requests related to signup, login, and user settings.
It includes routes for handling form submissions and interacting with the database.
*/

const express = require("express");
const cors = require('cors');
const app = express();
const dbPort = 3306;
const db = require('./SQL/db-connector')

app.use(cors());
app.use(express.json());

// Handle signup and login form submissions
app.post('/', (req, res) => {
    // Handle signup form submission
    if ('signup' === req.body.formType) {
        if (req.body.name && req.body.signup_email && req.body.company && req.body.signup_password_hash) {
            // Insert new employer data into the database
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
    }
    // Handle login form submission 
    else if ('login' === req.body.formType) {
        if (req.body.login_email && req.body.login_password_hash) {
            // Check if the email and password combination exists in the database
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

// Handle settings form submissions
app.post('/settings', (req, res) => {
    const { formType, email, oldPassword, newPassword, deleteEmail, password } = req.body;
    // Update password
    if (formType === 'update') {
        if (email && oldPassword && newPassword) {
            // Find the employer ID based on the email and old password
            const findEmployerIdQuery = `SELECT id FROM Employers WHERE email = ? AND password_hash = ?`;
            db.query(findEmployerIdQuery, [email, oldPassword], (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Failed to update password' });
                } else {
                    if (result.length > 0) {
                        const employerId = result[0].id;
                        // Update the password using the employer ID
                        const updatePasswordQuery = `UPDATE Employers SET password_hash = ? WHERE id = ?`;
                        db.query(updatePasswordQuery, [newPassword, employerId], (err, result) => {
                            if (err) {
                                console.error(err);
                                res.status(500).json({ error: 'Failed to update password' });
                            } else {
                                console.log('Password updated for', employerId);
                                res.status(200).json({ message: 'Password updated successfully' });
                            }
                        });
                    } else {
                        res.status(404).json({ error: 'Employer not found' });
                    }
                }
            });
        } else {
            res.status(400).json({ error: 'Missing email, old password, or new password' });
        }
    }
    // Delete account 
    else if (formType === 'delete') {
        if (deleteEmail && password) {
            // Find the employer ID based on the email and password
            const findEmployerIdQuery = `SELECT id FROM Employers WHERE email = ? AND password_hash = ?`;
            db.query(findEmployerIdQuery, [deleteEmail, password], (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Failed to update password' });
                } else {
                    if (result.length > 0) {
                        const employerId = result[0].id;
                        // Delete the account using the employer ID
                        const deleteAccountQuery = `DELETE FROM Employers WHERE id = ?`;
                        db.query(deleteAccountQuery, [employerId], (err, result) => {
                            if (err) {
                                console.error(err);
                                res.status(500).json({ error: 'Failed to delete account' });
                            } else {
                                console.log('Account deleted:', employerId);
                                res.status(200).json({ message: 'Account deleted successfully' });
                            }
                        });
                    } else {
                        res.status(400).json({ error: 'Missing id' });
                    }
                }
            });
        } else {
            res.status(400).json({ error: 'Missing email or password' });
        }
    } else {
        res.status(400).json({ error: 'Invalid formType' });
    }
});

app.listen(dbPort, () => {
    console.log("Express server is running on port " + dbPort);
});
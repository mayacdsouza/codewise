/*
This file represents the server-side code using the Express framework for handling API requests related to signup, login, and user settings.
It includes routes for handling form submissions and interacting with the database.
*/

const express = require("express");
const cors = require("cors");
const app = express();
const dbPort = 3306;
const db = require("./SQL/db-connector");

app.use(cors());
app.use(express.json());

// Handle signup and login form submissions
app.post("/", (req, res) => {
  // Handle signup form submission
  if ("signup" === req.body.formType) {
    if (
      req.body.name &&
      req.body.signup_email &&
      req.body.company &&
      req.body.signup_password_hash
    ) {
      // Insert new employer data into the database
      const sql = `INSERT INTO Employers(name, email, company, password_hash) VALUES ('${req.body.name}', '${req.body.signup_email}', '${req.body.company}', '${req.body.signup_password_hash}')`;
      db.query(sql, (err, result, fields) => {
        if (err) res.send(err);
        if (result)
          res.send({
            name: req.body.name,
            email: req.body.signup_email,
            company: req.body.company,
            password_hash: req.body.signup_password_hash,
          });
        if (fields) console.log(fields);
      });
    } else {
      console.log("Missing a parameter");
    }
  }
  // Handle login form submission
  else if ("login" === req.body.formType) {
    if (req.body.login_email && req.body.login_password_hash) {
      // Check if the email and password combination exists in the database
      const sql = `SELECT * FROM Employers WHERE email = ? and password_hash = ?`;
      db.query(
        sql,
        [req.body.login_email, req.body.login_password_hash],
        (err, result, fields) => {
          if (err) return res.json("Error");
          if (result.length > 0) return res.json("Success");
          else res.send("Incorrect email and/or password");
        }
      );
    } else {
      console.log("Missing a parameter");
    }
  }
});

// Get employer name from Employers on dashboard page
app.get("/get_employer_name/:employerEmail", (req, res) => {
  const employerEmail = req.params.employerEmail;
  const sql = `SELECT name FROM Employers WHERE email = ?`;

  db.query(sql, [employerEmail], (err, result) => {
    if (err) {
      console.error("Error fetching employer name:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (result.length === 0) {
        res.status(404).json({ error: "Employer not found" });
      } else {
        res.json(result);
      }
    }
  });
});

// Handle settings form submissions
app.post("/settings", (req, res) => {
  const { formType, email, oldPassword, newPassword, deleteEmail, password } =
    req.body;
  // Update password
  if (formType === "update") {
    if (email && oldPassword && newPassword) {
      // Find the employer ID based on the email and old password
      const findEmployerIdQuery = `SELECT id FROM Employers WHERE email = ? AND password_hash = ?`;
      db.query(findEmployerIdQuery, [email, oldPassword], (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Failed to update password" });
        } else {
          if (result.length > 0) {
            const employerId = result[0].id;
            // Update the password using the employer ID
            const updatePasswordQuery = `UPDATE Employers SET password_hash = ? WHERE id = ?`;
            db.query(
              updatePasswordQuery,
              [newPassword, employerId],
              (err, result) => {
                if (err) {
                  console.error(err);
                  res.status(500).json({ error: "Failed to update password" });
                } else {
                  console.log("Password updated for", employerId);
                  res
                    .status(200)
                    .json({ message: "Password updated successfully" });
                }
              }
            );
          } else {
            res.status(404).json({ error: "Employer not found" });
          }
        }
      });
    } else {
      res
        .status(400)
        .json({ error: "Missing email, old password, or new password" });
    }
  }
  // Delete account
  else if (formType === "delete") {
    if (deleteEmail && password) {
      // Find the employer ID based on the email and password
      const findEmployerIdQuery = `SELECT id FROM Employers WHERE email = ? AND password_hash = ?`;
      db.query(findEmployerIdQuery, [deleteEmail, password], (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Failed to update password" });
        } else {
          if (result.length > 0) {
            const employerId = result[0].id;
            // Delete the account using the employer ID
            const deleteAccountQuery = `DELETE FROM Employers WHERE id = ?`;
            db.query(deleteAccountQuery, [employerId], (err, result) => {
              if (err) {
                console.error(err);
                res.status(500).json({ error: "Failed to delete account" });
              } else {
                console.log("Account deleted:", employerId);
                res
                  .status(200)
                  .json({ message: "Account deleted successfully" });
              }
            });
          } else {
            res.status(400).json({ error: "Missing id" });
          }
        }
      });
    } else {
      res.status(400).json({ error: "Missing email or password" });
    }
  } else {
    res.status(400).json({ error: "Invalid formType" });
  }
});

//get for displaying surveys on surveys page
app.get("/select_quizzes/:employerId", function (req, res) {
  const employerId = req.params.employerId;
  let query1 = `SELECT id, Employers_id, title FROM Quizzes WHERE Employers_id = ?`;
  db.query(query1, [employerId], (err, result) => {
    res.send(result);
  });
});

//get for displaying candidates on surveys page dropdown
app.get("/select_candidates", function (req, res) {
  let query1 = `SELECT id, name, email FROM Candidates`;
  db.query(query1, [], (err, result) => {
    res.send(result);
  });
});

// Adding a candidate on surveys page
app.post("/add_candidate", (req, res) => {
  const { name, email } = req.body;
  const sql = `INSERT into Candidates (name, email) VALUES (?,?)`;
  const values = [name, email];
  db.query(sql, values, (err, result, fields) => {
    if (err) {
      console.error("Error adding new candidate:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while adding the candidate." });
    }

    if (result) {
      res.status(200).json({
        name: req.body.name,
        email: req.body.email,
      });
    }
  });
});

//get for finding quiz id on new surveys page (used to know quiz id when creating a new question)
app.get("/get_max_quiz_id", function (req, res) {
  let query1 = `SELECT MAX(id) FROM Quizzes;`;
  db.query(query1, [], (err, result) => {
    res.send(result);
  });
});

// Adding a question on new surveys page
app.post("/add_question", (req, res) => {
  const { type, question, answer, a, b, c, d, quizzesId } = req.body;
  const sql = `INSERT into Questions (type, question, answer, a, b, c, d, Quizzes_id) VALUES (?,?,?,?,?,?,?,?)`;
  const values = [type, question, answer, a, b, c, d, quizzesId];
  db.query(sql, values, (err, result, fields) => {
    if (err) {
      console.error("Error adding new quiz:", err);
      return res.status(500).json({
        error: "An error occurred while adding the quiz.",
        type,
        question,
        answer,
        a,
        b,
        c,
        d,
        quizzesId,
      });
    }

    if (result) {
      res.status(200).json({
        type,
        question,
        answer,
        a,
        b,
        c,
        d,
        quizzesId,
      });
    }
  });
});

// Adding a quiz on new surveys page
app.post("/add_quiz", (req, res) => {
  const { title, time, employerId } = req.body;
  const sql = `INSERT into Quizzes (title, time, Employers_id) VALUES (?,?,?)`;
  const values = [title, time, employerId];
  db.query(sql, values, (err, result, fields) => {
    if (err) {
      console.error("Error adding new quiz:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while adding the quiz." });
    }

    if (result) {
      res.status(200).json({
        title: req.body.title,
        time: req.body.time,
        employerId: req.body.employerId,
      });
    }
  });
});

// Add new results entry to 'send to candidate' button on surveys page
app.post("/add_result", (req, res) => {
  const { grade, quiz_id, employer_id, candidate_id, link } = req.body;
  const sql = `
    INSERT INTO Results (grade, Quizzes_id, Employers_id, Candidates_id, link)
    VALUES (?, ?, ?, ?, ?)
  `;
  const values = [grade, quiz_id, employer_id, candidate_id, link];

  db.query(sql, values, (err, result, fields) => {
    if (err) {
      console.error("Error adding new result entry:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while adding the result entry." });
    }

    if (result) {
      res.status(200).json({
        grade: req.body.grade,
        quiz_id: req.body.quiz_id,
        employer_id: req.body.employer_id,
        candidate_id: req.body.candidate_id,
        link: req.body.link,
      });
    }
  });
});

// Get result_id, quiz_id, employer_id, candidate_id using results keylink on quiz page
app.get("/select_quiz_employer_candidate/:link", function (req, res) {
  const link = req.params.link;
  const sql = `SELECT id, Quizzes_id, Employers_id, Candidates_id, grade FROM Results WHERE link = ?`;
  db.query(sql, [link], (err, result) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(result);
    }
  });
});

// Get employer email from Employers for 'submit quiz' button on quiz page
app.get("/get_employer_email/:employerId", (req, res) => {
  const employerId = req.params.employerId;
  const sql = `SELECT name, email FROM Employers WHERE id = ?`;

  db.query(sql, [employerId], (err, result) => {
    if (err) {
      console.error("Error fetching employer email:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (result.length === 0) {
        res.status(404).json({ error: "Employer not found" });
      } else {
        res.json(result);
      }
    }
  });
});

// Get candidate name from Candidates for 'submit quiz' button on quiz page
app.get("/get_candidate_name/:candidateId", (req, res) => {
  const candidateId = req.params.candidateId;
  const sql = `SELECT name FROM Candidates WHERE id = ?`;

  db.query(sql, [candidateId], (err, result) => {
    if (err) {
      console.error("Error fetching candidate name:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (result.length === 0) {
        res.status(404).json({ error: "Candidate not found" });
      } else {
        const candidateName = result[0].name;
        res.json({ name: candidateName });
      }
    }
  });
});

// Get quiz title from Quizzes for 'submit quiz' button on quiz page
app.get("/get_quiz_title/:quizId", (req, res) => {
  const quizId = req.params.quizId;
  const sql = `SELECT title FROM Quizzes WHERE id = ?`;

  db.query(sql, [quizId], (err, result) => {
    if (err) {
      console.error("Error fetching quiz title: ", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (result.length === 0) {
        res.status(404).json({ error: "Quiz not found" });
      } else {
        const quizTitle = result[0].title;
        res.json({ title: quizTitle });
      }
    }
  });
});

// Get quiz time from Quizzes
app.get("/get_quiz_time/:quizId", (req, res) => {
  const quizId = req.params.quizId;
  const sql = `SELECT time FROM Quizzes WHERE id = ?`;

  db.query(sql, [quizId], (err, result) => {
    if (err) {
      console.error("Error fetching quiz title: ", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (result.length === 0) {
        res.status(404).json({ error: "Quiz not found" });
      } else {
        const quizTime = result[0].time;
        res.json({ time: quizTime });
      }
    }
  });
});

// Update results grade to 'submit quiz' button on quiz page
app.put("/update_grade/:resultId", (req, res) => {
  const resultId = req.params.resultId;
  const { grade } = req.body;

  if (!grade || isNaN(grade)) {
    return res
      .status(400)
      .json({ error: "Invalid grade. Grade must be a number." });
  }

  const sql = `UPDATE Results SET grade = ? WHERE id = ?`;

  db.query(sql, [grade, resultId], (err, result) => {
    if (err) {
      console.error("Error updating grade:", err);
      res.status(500).json({ error: "Internal server error" });
    }
    if (result) {
      res.status(200).json({
        grade: req.body.grade,
      });
    }
  });
});

// Get employer_id from employer_email for results page
app.get("/get_employer_id/:employerEmail", function (req, res) {
  const employerEmail = req.params.employerEmail;
  let query1 = `SELECT id FROM Employers WHERE email = ?`;
  db.query(query1, [employerEmail], (err, result) => {
    if (err) {
      console.error("Error fetching employer ID:", err);
      res.status(500).json({ error: "Error fetching employer ID" });
    } else {
      res.json(result);
    }
  });
});

// Get for displaying surveys (that the employer made) in drop-down menu on results page
app.get("/select_quizzes_results/:employerId", function (req, res) {
  const employerId = req.params.employerId;
  let query1 = `SELECT id, title FROM Quizzes WHERE Employers_id = ?`;
  db.query(query1, [employerId], (err, result) => {
    res.send(result);
  });
});

// Get quiz_id from quiz_title for results page
app.get("/get_quiz_id/:quizTitle", function (req, res) {
  let query = `SELECT id FROM Quizzes WHERE title = ?`;
  const quizTitle = req.params.quizTitle;
  db.query(query, [quizTitle], (err, result) => {
    if (err) {
      console.error("Error fetching quiz ID:", err);
      res.status(500).send("Error fetching quiz ID.");
    } else {
      res.send(result);
    }
  });
});

// Get for displaying quiz result table
app.get("/get_quiz_results/:selectedQuizId", function (req, res) {
  const selectedQuizId = req.params.selectedQuizId;
  let query1 = `SELECT name, grade
  FROM Results
  INNER JOIN Candidates ON Candidates.id = Results.Candidates_id
  WHERE Quizzes_id = ?
  ORDER BY grade DESC`;
  db.query(query1, [selectedQuizId], (err, result) => {
    res.send(result);
  });
});

// Get for displaying candidates in drop-down menu on results page
app.get("/select_candidates_results", function (req, res) {
  let query1 = `SELECT id, name FROM Candidates`;
  db.query(query1, [], (err, result) => {
    res.send(result);
  });
});

// Get candidate_id from candidate_name for results page
app.get("/get_candidate_id/:candidateName", function (req, res) {
  const candidateName = req.params.candidateName;
  let query = `SELECT id FROM Candidates WHERE name = ?`;

  db.query(query, [candidateName], (err, result) => {
    if (err) {
      console.error("Error fetching candidate ID:", err);
      res.status(500).send("Error fetching candidate ID.");
    } else {
      if (result.length > 0) {
        // Candidate found, send the candidate ID
        res.send(result);
      } else {
        // Candidate not found, send a suitable response
        res.status(404).send("Candidate not found.");
      }
    }
  });
});

// Get for displaying candidate result table
app.get("/get_candidate_results/:selectedCandidateId", function (req, res) {
  const selectedCandidateId = req.params.selectedCandidateId;
  let query = `SELECT title, grade
               FROM Results
               INNER JOIN Quizzes ON Quizzes.id = Results.Quizzes_id
               WHERE Candidates_id = ?
               ORDER BY grade DESC`;

  db.query(query, [selectedCandidateId], (err, result) => {
    if (err) {
      console.error("Error fetching candidate results:", err);
      res.status(500).send("Error fetching candidate results.");
    } else {
      res.send(result);
    }
  });
});

// Get for keylinks for custom quiz routes
app.get("/select_links", function (req, res) {
  let query1 = `SELECT link FROM Results`;
  db.query(query1, [], (err, result) => {
    res.send(result);
  });
});

// Get for displaying quiz title on quiz page
app.get("/results/:quizId", (req, res) => {
  const quizId = req.params.quizId;
  db.query(
    "SELECT name, grade FROM Results INNER JOIN Candidates ON Candidates.id = Results.Candidates_id WHERE Quizzes_id = ? ORDER BY grade DESC",
    [quizId],
    (err, results) => {
      if (err) {
        console.error("Error executing the query:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.json(results);
    }
  );
});

// Get for displaying quiz questions on quiz page
app.get("/get_quiz_questions/:quizId", (req, res) => {
  const quizId = req.params.quizId;
  db.query(
    "Select type, question, answer, a, b, c, d from Questions where Quizzes_id=?",
    [quizId],
    (err, results) => {
      if (err) {
        console.error("Error executing the query:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.json(results);
    }
  );
});

app.listen(dbPort, () => {
  console.log("Express server is running on port " + dbPort);
});

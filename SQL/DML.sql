-- EMPLOYERS SHOULD BE ABLE TO CRUD AN ACCOUNT/PROFILE AND LOG IN

--create an account
INSERT INTO Employers(name, email, company, password_hash) values (:name, :email, :company, :password_hash);

--retrieve account (for logging in)
SELECT * FROM Employers WHERE email = :email and password_hash = :password_hash;

--update password
UPDATE Employers SET password_hash = :password_hash WHERE Employers_id = :Employers_id;

--delete account
DELETE FROM Employers WHERE id = :id;

-- FOR THE EMPLOYER TO CREATE A QUIZ AND EMAIL A UNIQUE KEY LINK THAT AUTHORIZES PERSON TO TAKE THE QUIZ. THE APP SHOULD AUTO-EMAIL THE KEY LINK TO THE CANDIDATE. USER HAS CONFIGURABLE AMOUNT OF TIME TO COMPLETE THE QUIZ AFTER CLICKING THE KEY LINK CONFIRMING THE START OF THE QUIZ.

  -- query for creating a quiz
INSERT INTO Quizzes(title, time, Employers_id) values (:title, :time, :Employers_id);

  -- query for creating an individual question
INSERT INTO Questions(type, answer, a, b, c, d, Quizzes_id) values (:type, :answer, a, b, c, d, Quizzes_id);

  -- query to create a candidate
INSERT INTO Candidates(name, email) values (:name, :email);

  -- query to select a candidate by email
  SELECT * FROM Candidates where email = :email;

  -- query to create a results entry
INSERT INTO Results (id, Quizzes_id, Employers_id, Candidates_id, link) values (:id, :Quizzes_id, :Employers_id, :Candidates_id, :link);

-- FOR CANDIDATES, GIVEN THE KEY LINK, ALLOWS THEM TO TAKE THE TIMED QUIZ

-- query to update results entry with the grade the student recieved
UPDATE Results SET grade=:grade WHERE id=:id

-- AN EMAIL SHOULD BE SENT TO THE EMPLOYER AFTER A CANDIDATE HAS COMPLETED A QUIZ

-- query to get employer email using employer_id foreign key associated with quiz result

-- EMPLOYER SHOULD BE ABLE TO SEE THE QUIZ RESPONDENTS RANKED, AND ALSO INDIVIDUAL RESULTS AND STATS

-- select results by quiz and sort based on grade
SELECT name, grade
FROM Results
INNER JOIN Candidates ON Candidates.id = Results.Candidates_id
WHERE Quizzes_id=:Quizzes_id
ORDER BY grade DESC;

-- select results by individual
SELECT title, grade
FROM Results
INNER JOIN Quizzes ON Quizzes.id = Results.Quizzes_id
WHERE Candidates_id=:Candidates_id;

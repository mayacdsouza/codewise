-- EMPLOYERS SHOULD BE ABLE TO CRUD AN ACCOUNT/PROFILE AND LOG IN

--create an account
INSERT INTO Employers(name, email, company, password_hash) values (:name, :email, :company, :password_hash);

--retrieve account (for logging in)
SELECT * FROM Employers WHERE email = :email and password_hash = :password_hash;

--update password
UPDATE Employers SET password_hash = :password_hash;

--delete account
DELETE FROM Employers WHERE id = :id;

-- FOR THE EMPLOYER TO CREATE A QUIZ AND EMAIL A UNIQUE KEY LINK THAT AUTHORIZES PERSON TO TAKE THE QUIZ. THE APP SHOULD AUTO-EMAIL THE KEY LINK TO THE CANDIDATE. USER HAS CONFIGURABLE AMOUNT OF TIME TO COMPLETE THE QUIZ AFTER CLICKING THE KEY LINK CONFIRMING THE START OF THE QUIZ.

  -- query for creating a quiz
  -- query for creating an individual question
  -- query to create a candidate
  -- query to select a candidate by email
  -- query to create a results entry

-- FOR CANDIDATES, GIVEN THE KEY LINK, ALLOWS THEM TO TAKE THE TIMED QUIZ

-- query to update results entry with the grade the student recieved

-- AN EMAIL SHOULD BE SENT TO THE EMPLOYER AFTER A CANDIDATE HAS COMPLETED A QUIZ
-- query to get employer email using employer_id foreign key associated with quiz result

-- EMPLOYER SHOULD BE ABLE TO SEE THE QUIZ RESPONDENTS RANKED, AND ALSO INDIVIDUAL RESULTS AND STATS
-- select results by quiz and sort based on grade
-- select results by individual


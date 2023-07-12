-- Codewise Senior Capstone Project

-- overide default rules of database
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

CREATE OR REPLACE TABLE Employers (
  id INT NOT NULL UNIQUE AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL,
  company VARCHAR(45) NOT NULL,
  password_hash VARCHAR(45) NOT NULL,
  PRIMARY KEY (id))

CREATE TABLE Candidates (
  id INT NOT NULL UNIQUE AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL,
  PRIMARY KEY (id))

CREATE TABLE Quizzes (
  id INT NOT NULL UNIQUE AUTO_INCREMENT,
  title VARCHAR(45) NOT NULL,
  time INT NOT NULL,
  Employers_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (Employers_id) REFERENCES Employers (id)
    ON DELETE CASCADE
)

CREATE TABLE Questions (
  id INT NOT NULL UNIQUE AUTO_INCREMENT,
  type VARCHAR(45) NOT NULL,
  answer VARCHAR(200) NOT NULL,
  a VARCHAR(200),
  b VARCHAR(200),
  c VARCHAR(200),
  d VARCHAR(200),
  Quizzes_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (Quizzes_id) REFERENCES Quizzes(id)
    ON DELETE CASCADE
)

CREATE TABLE Results (
  id INT NOT NULL UNIQUE AUTO_INCREMENT,
  grade DECIMAL,
  Quizzes_id INT NOT NULL,
  Employers_id INT NOT NULL,
  Candidates_id INT NOT NULL,
  link VARCHAR(45),
  PRIMARY KEY (id),
  FOREIGN KEY (Quizzes_id) REFERENCES Quizzes(id)
    ON DELETE CASCADE,
  FOREIGN KEY (Employers_id) REFERENCES Employers(id)
    ON DELETE CASCADE,
  FOREIGN KEY (Candidates_id) REFERENCES Candidates(id)
    ON DELETE CASCADE)

    -- -----------------------------------------------------
-- Reset default settings
-- -----------------------------------------------------
SET FOREIGN_KEY_CHECKS=1;
COMMIT;
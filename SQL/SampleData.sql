INSERT INTO Employers (name, email, company, password_hash) values
("Harry Potter", "hp@gmail.com", "Hogwarts Enterprise", "hp123!"),
("Bob Jones", "bjones@gmail.com", "Generic Co.", "bob"),
("Sarah Smith", "ss@gmail.com", "Generic Co.", "Sarah*");


INSERT INTO Candidates (name, email) values
("Lola Parker", "lp123@gmail.com"),
("Cynthia Locke", "clocke@yahoo.com"),
("Joshua Jones", "jjones@yahoo.com");

INSERT INTO Quizzes (title, time, Employers_id) values
("Javascript Fundamentals", 60, 1),
("Data Structures", 20, 1),
("General Knowledge", 10, 2),
("C", 30, 2);

INSERT INTO Questions (type, question, answer, a, b, c, d, Quizzes_id) values
("Multiple Choice", "What color is in the rainbow?", "B", "teal", "blue", "maroon", "brown", 1),
("Multiple Choice", "What color is in the rainbow?", "B", "teal", "blue", "maroon", "brown", 2),
("Multiple Choice", "What color is in the rainbow?", "B", "teal", "blue", "maroon", "brown", 3),
("Multiple Choice", "What color is in the rainbow?", "B", "teal", "blue", "maroon", "brown", 4),
("Multiple Answer", "What colors are in the rainbow?", "BD", "teal", "blue", "maroon", "orange", 1),
("Multiple Answer", "What colors are in the rainbow?", "BD", "teal", "blue", "maroon", "orange", 2),
("Multiple Answer", "What colors are in the rainbow?", "BD", "teal", "blue", "maroon", "orange", 3),
("Multiple Answer", "What colors are in the rainbow?", "BD", "teal", "blue", "maroon", "orange", 4);

INSERT INTO Questions (type, question, answer, Quizzes_id) values
("Short Answer", "How many inches are in a foot?", "12", 1),
("Short Answer", "How many inches are in a foot?", "12", 2),
("Short Answer", "How many inches are in a foot?", "12", 3),
("Short Answer", "How many inches are in a foot?", "12", 4),
("True/False", "There are 12 inches in a foot.", "T", 1),
("True/False", "There are 12 inches in a foot.", "T", 2),
("True/False", "There are 12 inches in a foot.", "T", 3),
("True/False", "There are 12 inches in a foot.", "T", 4);

INSERT INTO Results (grade, Quizzes_id, Employers_id, Candidates_id, link) values
(100,1, 1, 1, "svasz"),
(90,1, 1, 2, "gpn9r"),
(70,1, 1, 3, "rn5k4"),
(100,2, 1, 1, "sv5rd"),
(90,2, 1, 2, "yi65e"),
(70,2, 1, 3, "o6ktrd");
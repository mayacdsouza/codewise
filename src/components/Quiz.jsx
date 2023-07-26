import React, { useState, useEffect } from "react";
import QuizQuestion from "./QuizQuestion";

const Quiz = (props) => {
  // Todo: quiz should return a quiz dynamically created. Use results id to find quiz id and display that quiz. Add a submit button that updates quiz results when submitted.
  const [candidateName, setCandidateName] = useState("");
  const [quizEmployerCandidateData, setQuizEmployerCandidateData] = useState(
    []
  );
  const [employerEmail, setEmployerEmail] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [quizTitle, setQuizTitle] = useState("");
  const [quizId, setQuizId] = useState("");
  const [isInitialClick, setIsInitialClick] = useState(true);
  const [questions, setQuestions] = useState();

  const handleInitialClick = async () => {
    if (isInitialClick) {
      setIsInitialClick(false);
      await handleQuizSubmit();
    }
  };

  // Fetch data and set the 'dataFetched' state to true when completed
  const fetchData = async () => {
    try {
      const link = props.value;
      console.log("Link: " + link);
      const response = await fetch(
        `http://localhost:3306/select_quiz_employer_candidate/${link}`
      );
      const data = await response.json();
      console.log("Data:", data);
      setQuizEmployerCandidateData(data);
      setQuizId(data[0].Quizzes_id);
      console.log(quizEmployerCandidateData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchEmployerEmail = async () => {
    try {
      if (quizEmployerCandidateData && quizEmployerCandidateData.length > 0) {
        const employerId = quizEmployerCandidateData[0].Employers_id;
        console.log("Employer ID: " + employerId);
        const employerResponse = await fetch(
          `http://localhost:3306/get_employer_email/${employerId}`
        );
        const employerData = await employerResponse.json();

        if (employerData.length > 0) {
          const employerEmail = employerData[0].email;
          const employerName = employerData[0].name;
          console.log("Employer email: " + employerEmail);
          console.log("Employer name: " + employerName);
          setEmployerEmail(employerEmail);
          setEmployerName(employerName);
        } else {
          console.log("Employer email/name not found.");
        }
      }
    } catch (error) {
      console.error("Error fetching employer email/name:", error);
    }
  };

  const fetchCandidateName = async () => {
    try {
      if (quizEmployerCandidateData && quizEmployerCandidateData.length > 0) {
        const candidateId = quizEmployerCandidateData[0].Candidates_id;
        console.log("Candidate ID: " + candidateId);
        const candidateResponse = await fetch(
          `http://localhost:3306/get_candidate_name/${candidateId}`
        );
        const candidateData = await candidateResponse.json();

        if (candidateData) {
          const candidateName = candidateData.name;
          console.log("Candidate name: " + candidateName);
          setCandidateName(candidateName);
        }
      }
    } catch (error) {
      console.error("Error fetching candidate name:", error);
    }
  };

  const fetchQuizTitle = async () => {
    try {
      if (quizEmployerCandidateData && quizEmployerCandidateData.length > 0) {
        const quizId = quizEmployerCandidateData[0].Quizzes_id;
        console.log("Quiz ID: " + quizId);
        const quizResponse = await fetch(
          `http://localhost:3306/get_quiz_title/${quizId}`
        );
        const quizData = await quizResponse.json();
        if (quizData && quizData.title) {
          // Check if the title key exists in the response
          const quizTitle = quizData.title;
          console.log("Quiz title: " + quizTitle);
          setQuizTitle(quizTitle);
        }
      }
    } catch (error) {
      console.error("Error fetching quiz title:", error);
    }
  };

  const handleQuizSubmit = async () => {
    try {
      await fetchEmployerEmail();
      await fetchCandidateName();
      await fetchQuizTitle();

      if (employerEmail && candidateName && quizTitle) {
        const subject = "Quiz Results";
        const body = `Dear ${employerName},\n\nCandidate ${candidateName} has submitted their ${quizTitle} quiz.\n\n\nBest regards,\nCodewise`;

        const mailtoLink = `mailto:${employerEmail}?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(body)}`;

        // Send a PUT request to update result grade
        const resultId = quizEmployerCandidateData[0].id;
        console.log("Result ID: " + resultId);
        const response = await fetch(
          `http://localhost:3306/update_grade/${resultId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              grade: 100, // Todo: Update variable to correct grade
            }),
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          console.log("Updated grade:", data);
          alert("Grade updated successfully");
          // Open the default email client with the pre-filled email fields
          window.location.href = mailtoLink;
        } else {
          console.error("Failed to update grade.");
        }
      }
    } catch (error) {
      console.error("Error handling quiz submission:", error);
    }
  };

  // Get result_id, quiz_id, employer_id, candidate_id
  useEffect(() => {
    fetchData();
  }, [props.value]);

  useEffect(() => {
    // Fetch quiz results based on the selected quiz
    async function fetchQuizResults(quizId) {
      const response = await fetch(
        `http://localhost:3306/get_quiz_title/${quizId}`
      );
      const data = await response.json();
      setQuizTitle(data.title);
    }

    async function fetchQuestionResults(quizId) {
      const response = await fetch(
        `http://localhost:3306/get_quiz_questions/${quizId}`
      );
      const data = await response.json();
      setQuestions(data);
    }

    fetchQuizResults(quizId);
    fetchQuestionResults(quizId);
  }, [quizId]);

  return (
    <div>
      <h1> {quizTitle}</h1>
      {/* Quiz questions and options go here */}
      {
        <div>
          {questions &&
            questions.map((element, key) => (
              <QuizQuestion
                type={element.type}
                question={element.question}
                a={element.a}
                b={element.b}
                c={element.c}
                d={element.d}
              />
            ))}
        </div>
      }
      {isInitialClick ? (
        <button onClick={handleInitialClick}>Submit Quiz</button>
      ) : (
        <>
          <p>Click 'Confirm and Send' again to submit the quiz.</p>
          <button onClick={handleQuizSubmit}>Confirm and Send</button>
        </>
      )}
      <br />
      <br />
    </div>
  );
};

export default Quiz;

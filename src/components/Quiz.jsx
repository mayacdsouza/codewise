import React, { useState, useEffect } from "react";
import QuizQuestion from "./QuizQuestion";
import { useNavigate } from "react-router-dom";
import "../styles/Surveys.css";

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
  const [time, setTime] = useState({});

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

  const fetchQuizTime = async () => {
    try {
      if (quizEmployerCandidateData && quizEmployerCandidateData.length > 0) {
        const quizId = quizEmployerCandidateData[0].Quizzes_id;
        const quizResponse = await fetch(
          `http://localhost:3306/get_quiz_time/${quizId}`
        );
        const quizData = await quizResponse.json();
        if (quizData && quizData.time) {
          console.log(quizData, "test");
          let hours = quizData.time % 60;
          let minutes = quizData.time - 60 * hours;
          let seconds = 0;
          setTime({ hours, minutes, seconds });
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
    navigate("/");
  };

  // Get result_id, quiz_id, employer_id, candidate_id
  useEffect(() => {
    fetchData();
  }, [props.value]);

  useEffect(() => {
    fetchQuizTime();
  }, [quizId]);

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

  const useInterval = (callback, delay) => {
    const savedCallback = React.useRef();

    React.useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    React.useEffect(() => {
      const tick = () => {
        savedCallback.current();
      };
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };

  const navigate = useNavigate();

  const decrementTime = (hours, minutes, seconds) => {
    const newTime = { hours, minutes, seconds };
    if (seconds) {
      newTime.seconds = newTime.seconds - 1;
    } else if (minutes) {
      newTime.minutes = newTime.minutes - 1;
      newTime.seconds = 59;
    } else if (hours) {
      newTime.hours = newTime.hours - 1;
      newTime.minutes = 59;
      newTime.seconds = 59;
    } else handleQuizSubmit();
    return newTime;
  };

  useInterval(() => {
    if (time.hours || time.minutes || time.seconds) {
      setTime(decrementTime(time.hours, time.minutes, time.seconds));
    }
  }, 1000);

  return (
    <div>
      <div className="navbar-quiz">
        <div className="navbar-container-quiz">
          <div className="navbar-logo">Codewise</div>
          <div className="quiz-clock">
            {time.hours < 10 ? "0" : ""}
            {time.hours}:{time.minutes < 10 ? "0" : ""}
            {time.minutes}:{time.seconds < 10 ? "0" : ""}
            {time.seconds}
          </div>
        </div>
      </div>
      <br></br>
      <h1 className="quiz">{quizTitle}</h1>
      {
        <div className="quiz">
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
      <div className="quiz-button">
        {isInitialClick ? (
          <button onClick={handleInitialClick}>Submit Quiz</button>
        ) : (
          <>
            <p>Click 'Confirm and Send' again to submit the quiz.</p>
            <button onClick={handleQuizSubmit}>Confirm and Send</button>
          </>
        )}
      </div>
      <br />
      <br />
    </div>
  );
};

export default Quiz;

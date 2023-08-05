import React, { useState, useEffect } from "react";
import "../styles/Surveys.css";
import { QuizQuestion } from "./QuizQuestion";

const Quiz = (props) => {
  const [correctObject, setCorrectObject] = useState({});

  const [candidateName, setCandidateName] = useState("");
  const [employerEmail, setEmployerEmail] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [quizTitle, setQuizTitle] = useState("");
  const [quizId, setQuizId] = useState(undefined);
  const [candidateId, setCandidateId] = useState(undefined);
  const [employerId, setEmployerId] = useState(undefined);
  const [resultId, setResultId] = useState(undefined);
  const [isInitialClick, setIsInitialClick] = useState(true);
  const [questions, setQuestions] = useState();
  const [time, setTime] = useState({});
  const [grade, setGrade] = useState(0);

  const handleInitialClick = async () => {
    if (isInitialClick) {
      setIsInitialClick(false);
      await handleQuizSubmit();
    }
  };

  // // Get result_id, quiz_id, employer_id, candidate_id
  useEffect(() => {
    // Fetch data and set the 'dataFetched' state to true when completed
    const fetchData = async () => {
      try {
        const link = props.value;
        console.log("Link : " + link);
        const response = await fetch(
          `http://localhost:3306/select_quiz_employer_candidate/${link}`
        );
        const data = await response.json();
        console.log("Data:", data);
        setCandidateId(data[0].Candidates_id);
        setQuizId(data[0].Quizzes_id);
        setEmployerId(data[0].Employers_id);
        setResultId(data[0].id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [props.value]);

  useEffect(() => {
    const fetchEmployerEmail = async () => {
      try {
        if (employerId) {
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
    fetchEmployerEmail();
  }, [employerId]);

  useEffect(() => {
    const fetchCandidateName = async () => {
      try {
        if (candidateId) {
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
    fetchCandidateName();
  }, [candidateId]);

  useEffect(() => {
    const fetchQuizTitle = async () => {
      try {
        if (quizId) {
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
    fetchQuizTitle();
  }, [quizId]);

  const handleQuizSubmit = async () => {
    const calculateGrade = () => {
      let questionsCorrect = 0;
      Object.values(correctObject).forEach((val) => {
        if (val) questionsCorrect++;
      });
      const totalQuestions = questions.length;
      return (questionsCorrect / totalQuestions) * 100;
    };

    setGrade(calculateGrade());

    try {
      if (employerEmail && candidateName && quizTitle) {
        const subject = "Quiz Results";
        const body = `Dear ${employerName},\n\nCandidate ${candidateName} has submitted their ${quizTitle} quiz.\n\n\nBest regards,\nCodewise`;

        const mailtoLink = `mailto:${employerEmail}?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(body)}`;

        // Send a PUT request to update result grade
        console.log("Result ID: " + resultId);

        const response = await fetch(
          `http://localhost:3306/update_grade/${resultId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              grade: grade, // Todo: Update variable to correct grade
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

  useEffect(() => {
    const fetchQuizTime = async () => {
      try {
        if (quizId) {
          const quizResponse = await fetch(
            `http://localhost:3306/get_quiz_time/${quizId}`
          );
          const quizData = await quizResponse.json();
          if (quizData && quizData.time) {
            console.log(quizData.time);
            let hours = Math.floor(quizData.time / 60);
            let minutes = quizData.time - 60 * hours;
            let seconds = 0;
            setTime({ hours, minutes, seconds });
          }
        }
      } catch (error) {
        console.error("Error fetching quiz title:", error);
      }
    };
    fetchQuizTime();
  }, [quizId]);

  useEffect(() => {
    // Fetch quiz results based on the selected quiz
    async function fetchQuizResults(quizId) {
      if (quizId) {
        const response = await fetch(
          `http://localhost:3306/get_quiz_title/${quizId}`
        );
        const data = await response.json();
        setQuizTitle(data.title);
      }
    }

    async function fetchQuestionResults(quizId) {
      if (quizId) {
        const response = await fetch(
          `http://localhost:3306/get_quiz_questions/${quizId}`
        );
        const data = await response.json();
        setQuestions(data);
      }
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
            questions.map((element, index) => (
              <QuizQuestion
                key={element.question}
                questionNumber={index}
                type={element.type}
                question={element.question}
                a={element.a}
                b={element.b}
                c={element.c}
                d={element.d}
                answer={element.answer}
                correctObject={correctObject}
                setCorrectObject={setCorrectObject}
              />
            ))}
        </div>
      }
      <div className="quiz-button">
        {isInitialClick ? (
          <button onClick={handleInitialClick}>Submit Quiz</button>
        ) : (
          <button onClick={handleQuizSubmit}>Confirm and Send</button>
        )}
      </div>
      <br />
      <br />
    </div>
  );
};

export default Quiz;

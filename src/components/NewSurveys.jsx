import React, { useEffect, useState } from "react";
import "../styles/Surveys.css";

const NewSurveys = () => {
  const [employerId, setEmployerId] = useState("");
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [quizId, setQuizId] = useState("");
  const [type, setType] = useState("Multiple Choice");
  const [question, setQuestion] = useState();
  const [answer, setAnswer] = useState();
  const [a, setA] = useState();
  const [b, setB] = useState();
  const [c, setC] = useState();
  const [d, setD] = useState();

  const fetchEmployerId = async () => {
    try {
      const employerEmailData = JSON.parse(
        sessionStorage.getItem("loggedInUser")
      );
      const employerEmail = employerEmailData?.email?.[0];
      if (employerEmail) {
        const employerResponse = await fetch(
          `http://localhost:3306/get_employer_id/${employerEmail}`
        );

        if (!employerResponse.ok) {
          throw new Error("Failed to fetch employer ID.");
        }

        const employerData = await employerResponse.json();

        if (employerData.length > 0) {
          const employerId = employerData[0].id;
          setEmployerId(employerId);
        } else {
          console.log("Employer ID not found.");
        }
      }
    } catch (error) {
      console.error("Error fetching employer ID:", error);
    }
  };

  const fetchQuizId = async () => {
    const quiz_id_response = await fetch(
      `http://localhost:3306/get_max_quiz_id`
    );
    setQuizId(quiz_id_response["MAX(id)"] + 1);
  };

  useEffect(() => {
    fetchEmployerId();
  }, [employerId]);

  useEffect(() => {
    fetchQuizId();
  }, [quizId]);

  const handleQuestionInput = async (e) => {
    try {
      console.log(type, question, answer, a, b, c, d);
      const response = await fetch("http://localhost:3306/add_question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: type,
          question: question,
          answer: answer,
          a: a,
          b: b,
          c: c,
          d: d,
          quizzesId: 12,
        }),
      });
    } catch (error) {
      console.error("Error adding new question entry:", error);
      alert(error);
    }
  };

  const handleQuizInput = async (e) => {
    try {
      const response = await fetch("http://localhost:3306/add_quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          time: time,
          employerId: Number(employerId),
        }),
      });
    } catch (error) {
      console.error("Error adding new quiz entry:", error);
      alert(error);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  return (
    <div className="settings-container">
      <h1>New Survey</h1>
      Title <input type="text" key="title" onChange={handleTitleChange} />
      Time <input type="number" key="time" onChange={handleTimeChange} />
      <button className="btn" onClick={handleQuizInput}>
        Save title and time
      </button>
      <br></br>
      <br></br>
      <br></br>
      <h1>Add Question to Survey</h1>
      <div className="settings-container">
        Question Type{" "}
        <select
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          <option value="Multiple Choice">Multiple Choice</option>
          <option value="Multiple Answer">Multiple Answer</option>
          <option value="Short Answer">Short Answer</option>
          <option value="True/False">True/False</option>
        </select>
        <br />
        <br />
        Question{" "}
        <input
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
        />
        Answer: Enter "T" or "F" for True/False. Enter "A", "B", "C", or "D" for
        multiple choice. Enter correct choices in alphabetical order for
        multiple answer. For example, enter "BD" if b and d are the correct
        answers. Enter the phrase for short answer.{" "}
        <input
          onChange={(e) => {
            setAnswer(e.target.value);
          }}
        />
        a - Only fill this out for multiple choice and multiple answer
        questions.{" "}
        <input
          onChange={(e) => {
            setA(e.target.value);
          }}
        />
        b - Only fill this out for multiple choice and multiple answer
        questions.{" "}
        <input
          onChange={(e) => {
            setB(e.target.value);
          }}
        />
        c - Only fill this out for multiple choice and multiple answer
        questions.{" "}
        <input
          onChange={(e) => {
            setC(e.target.value);
          }}
        />
        d - Only fill this out for multiple choice and multiple answer
        questions.{" "}
        <input
          onChange={(e) => {
            setD(e.target.value);
          }}
        />
      </div>
      <button onClick={handleQuestionInput}>Add Question</button>
      <br></br>
    </div>
  );
};

export default NewSurveys;

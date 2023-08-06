import React, { useEffect, useState } from "react";
import "../styles/Surveys.css";

const NewSurveys = () => {
  const [employerId, setEmployerId] = useState(undefined);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [quizId, setQuizId] = useState(undefined);
  const [type, setType] = useState("Multiple Choice");
  const [question, setQuestion] = useState();
  const [answer, setAnswer] = useState();
  const [a, setA] = useState();
  const [b, setB] = useState();
  const [c, setC] = useState();
  const [d, setD] = useState();
  const [quizzes, setQuizzes] = useState(undefined);

  useEffect(() => {
    const fetchEmployerId = async () => {
      const employerEmailData = JSON.parse(
        sessionStorage.getItem("loggedInUser")
      );
      const employerEmail = employerEmailData?.email?.[0];
      if (employerEmail) {
        const employerResponse = await fetch(
          `https://access.engr.oregonstate.edu:3378/get_employer_id/${employerEmail}`
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
    };
    fetchEmployerId();
  }, [employerId]);

  useEffect(() => {
    const fetchQuizId = async () => {
      const quiz_id_response = await fetch(
        `https://access.engr.oregonstate.edu:3378/get_max_quiz_id`
      );
      if (!quizId) {
        setQuizId(quiz_id_response["MAX(id)"] + 1);
      }
    };
    fetchQuizId();
  }, [quizId]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const response = await fetch(
        `https://access.engr.oregonstate.edu:3378/select_quizzes/${employerId}`
      );
      const data = await response.json();
      if (!quizzes) {
        setQuizzes(data);
      }
    };
    employerId && fetchQuizzes();
  }, [quizzes, employerId]);

  const handleQuestionInput = async (e) => {
    try {
      await fetch("https://access.engr.oregonstate.edu:3378/add_question", {
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
          quizzesId: quizId,
        }),
      });
    } catch (error) {
      console.error("Error adding new question entry:", error);
      alert(error);
    }
    window.location.reload();
  };

  const handleQuizInput = async (e) => {
    try {
      await fetch("https://access.engr.oregonstate.edu:3378/add_quiz", {
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
    window.location.reload();
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
        Create New Survey
      </button>
      <br></br>
      <br></br>
      <br></br>
      <h1>Add Question to Survey</h1>
      <div className="settings-container">
        Select Quiz <br></br>
        <select
          onChange={(e) => {
            setQuizId(Number(e.target.value));
          }}
        >
          <option></option>
          {quizzes &&
            quizzes.map((element) => {
              return (
                <option key={element.id} value={element.id}>
                  {element.title}
                </option>
              );
            })}
        </select>
        <br /> <br />
        Question Type
        <br></br>
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
        <br />
        Question{" "}
        <input
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
        />
        <br />
        <br />
        Answer: <br />
        Enter "T" or "F" for True/False. <br></br>
        Enter the capital letter for multiple choice. (i.e. "A").<br></br>
        Enter the capital letter(s) in alphabetical order (i.e. "BD") for
        multiple answer.
        <br></br>
        Enter the phrase for short answer.
        <input
          onChange={(e) => {
            setAnswer(e.target.value);
          }}
        />
        <br></br>
        <br></br>
        <br></br>
        Only fill this out for multiple choice/multiple answer questions:{" "}
        <br></br>
        <br></br>
        A
        <input
          onChange={(e) => {
            setA(e.target.value);
          }}
        />
        B
        <input
          onChange={(e) => {
            setB(e.target.value);
          }}
        />
        C
        <input
          onChange={(e) => {
            setC(e.target.value);
          }}
        />
        D
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

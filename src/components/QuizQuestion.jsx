import React, { useState } from "react";
import "../styles/Surveys.css";

export const QuizQuestion = ({
  question,
  type,
  answer,
  a,
  b,
  c,
  d,
  questionNumber,
  correctObject,
  setCorrectObject,
}) => {
  const [A, setA] = useState("");
  const [B, setB] = useState("");
  const [C, setC] = useState("");
  const [D, setD] = useState("");

  const handleQuestion = (e) => {
    setCorrectObject((prev) => {
      return { ...prev, [questionNumber]: e.target.value === answer };
    });
  };

  const handleA = (e) => {
    setA(e.target.checked ? "A" : "");

    setCorrectObject((prev) => {
      return { ...prev, [questionNumber]: A + B + C + D === answer };
    });
  };

  const handleB = (e) => {
    setB(e.target.checked ? "B" : "");

    setCorrectObject((prev) => {
      return { ...prev, [questionNumber]: A + B + C + D === answer };
    });
  };
  const handleC = (e) => {
    setC(e.target.checked ? "C" : "");

    setCorrectObject((prev) => {
      return { ...prev, [questionNumber]: A + B + C + D === answer };
    });
  };
  const handleD = (e) => {
    setD(e.target.checked ? "D" : "");

    setCorrectObject((prev) => {
      return { ...prev, [questionNumber]: A + B + C + D === answer };
    });
  };
  return (
    <div>
      <h3 className="question">{question}</h3>
      {type === "Short Answer" && (
        <div>
          <input onChange={handleQuestion} id="answer" type="text" />
        </div>
      )}
      {type === "True/False" && (
        <select onChange={handleQuestion} name="answer" id="answer">
          <option key="undefined" value="none" />
          <option key="true" value="T">
            True
          </option>
          <option key="false" value="F">
            False
          </option>
        </select>
      )}
      {type === "Multiple Answer" && (
        <div className="question-inner">
          {a} <input onChange={handleA} value="A" type="checkbox" />
          {b} <input onChange={handleB} type="checkbox" />
          {c} <input onChange={handleC} type="checkbox" />
          {d} <input onChange={handleD} type="checkbox" />
        </div>
      )}
      {type === "Multiple Choice" && (
        <select name="answer" id="answer" onChange={handleQuestion}>
          <option value="none"></option>
          <option value="A">{a}</option>
          <option value="B">{b}</option>
          <option value="C">{c}</option>
          <option value="D">{d}</option>
        </select>
      )}
      <br></br>
      <br></br>
    </div>
  );
};

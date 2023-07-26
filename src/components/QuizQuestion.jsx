import React from "react";
import "../styles/Surveys.css";

const QuizQuestion = ({ question, type, answer, a, b, c, d }) => {
  return (
    <div>
      <h3 className="question">{question}</h3>
      {type === "Short Answer" && (
        <div>
          <label htmlFor="answer"></label>
          <input id="answer" type="text" />
        </div>
      )}
      {type === "True/False" && (
        <select name="answer" id="answer">
          <option key="true" value="true">
            True
          </option>
          <option key="false" value="false">
            False
          </option>
        </select>
      )}
      {type === "Multiple Answer" && (
        <div className="question-inner">
          {a} <input type="checkbox" />
          {b} <input type="checkbox" />
          {c} <input type="checkbox" />
          {d} <input type="checkbox" />
        </div>
      )}
      {type === "Multiple Choice" && (
        <div className="question-inner">
          {a} <input type="radio" />
          {b} <input type="radio" />
          {c} <input type="radio" />
          {d} <input type="radio" />
        </div>
      )}

      <br></br>
      <br></br>
    </div>
  );
};

export default QuizQuestion;

import React, { useState } from "react";

const QuizQuestion = ({ question, type, answer, a, b, c, d }) => {
  return (
    <div>
      <h3>{question}</h3>
      <input></input>
      <h3>{question}</h3>
      <select name="candidates" id="candidates">
        <option key="true" value="true">
          True
        </option>
        <option key="false" value="false">
          False
        </option>
      </select>
      <br></br>
      <br></br>
    </div>
  );
};

export default QuizQuestion;

import React, { useState } from "react";

const Question = (number) => {
  return (
    <div className="settings-container">
      Question Type{" "}
      <select>
        <option>Multiple Choice</option>
        <option>Multiple Answer</option>
        <option>Short Answer</option>
        <option>True/False</option>
      </select>
      <br />
      <br />
      Question <input />
      Answer: Enter "T" or "F" for True/False. Enter "a", "b", "c", or "d" for
      multiple choice. Enter correct choices in alphabetical order for multiple
      answer. For example, enter "bd" if b and d are the correct answers. Enter
      the phrase for short answer. <input />
      a - Only fill this out for multiple choice and multiple answer questions.{" "}
      <input />
      b - Only fill this out for multiple choice and multiple answer questions.{" "}
      <input />
      c - Only fill this out for multiple choice and multiple answer questions.{" "}
      <input />
      d - Only fill this out for multiple choice and multiple answer questions.{" "}
      <input />
    </div>
  );
};

export default Question;

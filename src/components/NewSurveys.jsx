import React, { useState } from "react";
import "../styles/Surveys.css";
import Question from "./Question";

const NewSurveys = () => {
  const [questionList, setQuestionList] = useState([]);

  const onAddBtnClick = () => {
    setQuestionList(questionList.concat(<Question />));
  };

  //Todo: When create survey button is pressed, a new survey should be created.
  return (
    <div className="settings-container">
      <h1>New Survey</h1>
      Title <input />
      {questionList}
      <button onClick={onAddBtnClick}>Add Question</button>
      <br></br>
      <button className="btn">Create survey</button>
    </div>
  );
};

export default NewSurveys;

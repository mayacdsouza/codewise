import React, { useState } from "react";

const Quiz = (props) => {
  // Todo: quiz should return a quiz dynamically created. Use results id to find quiz id and display that quiz. Add a submit button that updates quiz results when submitted.
  const [quizResults, setQuizResults] = useState({});
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");

  const handleQuizSubmit = () => {
    // Simulate sending an email to the employer with quiz results
    const employerEmail = "maggielwu@gmail"; // Replace with the actual employer's email address
    const subject = "Quiz Results";
    const body = `Dear Employer,\n\nCandidate ${candidateName} has submitted their quiz.\nCandidate Email: ${candidateEmail}\n\nQuiz Results:\n${JSON.stringify(
      quizResults,
      null,
      2
    )}\n\nBest regards,\nCodewise`;

    const mailtoLink = `mailto:${employerEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // Open the default email client with the pre-filled email fields
    window.location.href = mailtoLink;
  };
  return (
    <div className="settings-container">
      <h1>Title goes here</h1>
      <div>Printing key link for now: {props.value}</div>
      <div>
        {/* Candidate name will be linked to key link (key link is part of results entry so can use this to get the candidate name and email. I just commented out though in case you still wanted to reference or use this code in any way.)
        <label>Candidate Name:</label>
        <input
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
        />
        <br />
        <label>Candidate Email:</label>
        <input
          value={candidateEmail}
          onChange={(e) => setCandidateEmail(e.target.value)}
        /> */}
      </div>
      {/* Quiz questions and options go here */}
      {/* Todo: Modify the event handle to do the actual quiz submit functionality - can reuse button but change event handler */}
      <button onClick={handleQuizSubmit}>Submit Quiz</button>
      <br />
      <br />
    </div>
  );
};

export default Quiz;

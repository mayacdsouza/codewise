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
    const body = `Dear Employer,\n\nCandidate ${candidateName} has submitted their quiz.\nCandidate Email: ${candidateEmail}\n\nQuiz Results:\n${JSON.stringify(quizResults, null, 2)}\n\nBest regards,\nCodewise`;

    const mailtoLink = `mailto:${employerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open the default email client with the pre-filled email fields
    window.location.href = mailtoLink;
  };
  return (
    <div className="settings-container">
      <h1>Test Quiz Page {props.value}</h1>
      <div>
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
        />
      </div>
      {/* Quiz questions and options go here */}
      {/* Todo: Replace the submit button with the actual quiz submit functionality */}
      <button onClick={handleQuizSubmit}>Submit Quiz</button>
      <br />
      <br />
    </div>

  );
};

export default Quiz;

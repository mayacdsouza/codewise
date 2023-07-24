import React, { useState, useEffect } from "react";

const Quiz = (props) => {
  // Todo: quiz should return a quiz dynamically created. Use results id to find quiz id and display that quiz. Add a submit button that updates quiz results when submitted.
  const [quizResults, setQuizResults] = useState({});
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [quizEmployerCandidateData, setQuizEmployerCandidateData] = useState([]);
  const [employerId, setEmployerId] = useState(null);
  const [employerEmail, setEmployerEmail] = useState("");
  const [quizTitle, setQuizTitle] = useState("");
  const [dataFetched, setDataFetched] = useState(false);
  const [showSubmitButton, setShowSubmitButton] = useState(false);

  // Fetch data and set the 'dataFetched' state to true when completed
  const fetchData = async () => {
    try {
      const link = props.value;
      console.log("Link: " + link);
      const response = await fetch(`http://localhost:3306/select_quiz_employer_candidate/${link}`);
      const data = await response.json();
      console.log("Data:", data);
      setQuizEmployerCandidateData(data);
      setDataFetched(true); // Set the flag to true when data is fetched
      setShowSubmitButton(true); // Show the 'submit quiz' button when data is fetched
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchEmployerEmail = async () => {
    try {
      if (quizEmployerCandidateData && quizEmployerCandidateData.length > 0) {
        const employerId = quizEmployerCandidateData[0].Employers_id;
        console.log("Employer ID: " + employerId);
        const employerResponse = await fetch(`http://localhost:3306/get_employer_email/${employerId}`);
        const employerData = await employerResponse.json();

        if (employerData.length > 0) {
          const employerEmail = employerData[0].email;
          console.log("Employer email: " + employerEmail);
          setEmployerEmail(employerEmail);
        } else {
          console.log("Employer email not found.");
        }
      }
    } catch (error) {
      console.error("Error fetching employer email:", error);
    }
  };

  const fetchCandidateName = async () => {
    try {
      if (quizEmployerCandidateData && quizEmployerCandidateData.length > 0) {
        const candidateId = quizEmployerCandidateData[0].Candidates_id;
        console.log("Candidate ID: " + candidateId);
        const candidateResponse = await fetch(`http://localhost:3306/get_candidate_name/${candidateId}`);
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

  const fetchQuizTitle = async () => {
    try {
      if (quizEmployerCandidateData && quizEmployerCandidateData.length > 0) {
        const quizId = quizEmployerCandidateData[0].Quizzes_id;
        console.log("Quiz ID: " + quizId);
        const quizResponse = await fetch(`http://localhost:3306/get_quiz_title/${quizId}`);
        const quizData = await quizResponse.json();
        if (quizData && quizData.title) { // Check if the title key exists in the response
          const quizTitle = quizData.title;
          console.log("Quiz title: " + quizTitle);
          setQuizTitle(quizTitle);
        }
      }
    } catch (error) {
      console.error("Error fetching quiz title:", error);
    }
  };

  const handleQuizSubmit = async () => {
    try {
      if (!dataFetched) {
        console.log("Data not fetched yet, please wait...");
        return;
      }
      await fetchEmployerEmail();
      await fetchCandidateName();
      await fetchQuizTitle();

      // Rest of the code to send the email
      if (employerEmail && candidateName && quizTitle) {
        const subject = "Quiz Results";
        const body = `Dear Employer,\n\nCandidate ${candidateName} has submitted their ${quizTitle} quiz.\n\n\nBest regards,\nCodewise`;

        const mailtoLink = `mailto:${employerEmail}?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(body)}`;

        // Send a PUT request to update result grade
        const resultId = quizEmployerCandidateData[0].id;
        console.log("Result ID: " + resultId);
        const response = await fetch(`http://localhost:3306/update_grade/${resultId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            grade: 100, // Todo: Update variable to correct grade
          }),
        });

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

  // Get result_id, quiz_id, employer_id, candidate_id
  useEffect(() => {
    fetchData();
  }, [props.value]);

  // Watch for changes in the 'dataFetched' state, and when it becomes true, set 'showSubmitButton' to true
  useEffect(() => {
    if (dataFetched) {
      setShowSubmitButton(true);
    }
  }, [dataFetched]);

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
      {/* Only render the 'submit quiz' button when data is fetched */}
      {showSubmitButton && <button onClick={handleQuizSubmit}>Submit Quiz</button>}
      <br />
      <br />
    </div>
  );
};

export default Quiz;

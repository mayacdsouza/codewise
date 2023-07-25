import React, { useState, useEffect } from "react";
import "../styles/Surveys.css";
import { Link } from "react-router-dom";

const Surveys = () => {
  // Todo: Change candidateName and email to be unique for each input element
  // Todo: Send to candidate should auto-generate a key link for that survey and email to the candidate. Should also create a results entry connected to that.
  const [quizzes, setQuizzes] = useState();
  const [tableEntries, setTableEntries] = useState();
  const [options, setOptions] = useState();
  const [candidates, setCandidates] = useState();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleCandidateInput = async (e) => {
    try {
      const response = await fetch("http://localhost:3306/add_candidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
        }),
      });
      setName("");
      setEmail("");
    } catch (error) {
      console.error("Error adding new result entry:", error);
      alert(error);
    }
  };

  const handleSendToCandidate = async (selectedSurvey, selectedCandidates) => {
    try {
      // Check if quizzes and candidates are loaded
      if (!quizzes || !candidates) {
        console.error("Quizzes and/or candidates data not loaded.");
        return;
      }
      // Find the selected quiz in the quizzes array based on the selectedSurvey ID
      const selectedQuiz = quizzes.find((quiz) => quiz.id === selectedSurvey);

      // Find the selected candidate in the candidate array based on the selectedCandidates ID
      const selectedCandidate = candidates.find(
        (candidate) => candidate.name === selectedCandidates
      );
      // Check if selectedCandidate is valid
      if (!selectedCandidate) {
        console.error("Selected candidate not found.");
        return;
      }

      // Todo: Link to specified quiz page ON WEBSITE HOST
      const keyLink = Math.random().toString(36).substring(7);

      // Prepare the email subject and body
      const subject = "Your Survey Link";
      const body = `Dear ${selectedCandidate.name},\n\nPlease click the following link to access your survey: http://localhost:3000/${keyLink}\n\nBest regards,\nCodewise`;

      console.log("Candidate name: " + selectedCandidate.name);
      console.log("Candidate email: " + selectedCandidate.email);

      // Generate the mailto link
      const mailtoLink = `mailto:${
        selectedCandidate.email
      }?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        body
      )}`;

      // Send a POST request to add new result entry
      const response = await fetch("http://localhost:3306/add_result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          grade: 0,
          quiz_id: selectedQuiz.id,
          employer_id: selectedQuiz.Employers_id,
          candidate_id: selectedCandidate.id,
          link: keyLink,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add new result entry.");
      }
      const data = await response.json();
      console.log("New result entry:", data);
      alert("Result entry added successfully.");
      // Open the default email client with the pre-filled email fields
      window.location.href = mailtoLink;
    } catch (error) {
      console.error("Error adding new result entry:", error);
      alert("Error adding new result entry.");
    }
  };

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch("http://localhost:3306/select_candidates");
        const data = await response.json();
        setCandidates(data);
        setOptions(
          data?.map(function (element) {
            return (
              <option key={element.id} value={element.name}>
                {element.name}
              </option>
            );
          })
        );
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };
    fetchCandidates();
  }, []);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch("http://localhost:3306/select_quizzes");
        const data = await response.json();
        setQuizzes(data);
        setTableEntries(
          data?.map(function (element) {
            return (
              <tr key={element.id} employee-id={element.Employers_id}>
                <td>{element.title}</td>
                <td>
                  <select name="candidates" id="candidates">
                    {options}
                  </select>
                </td>
                <td>
                  <button
                    className="btn"
                    onClick={() =>
                      handleSendToCandidate(
                        element.id,
                        document.getElementById("candidates").value
                      )
                    }
                  >
                    Send to candidate
                  </button>
                </td>
              </tr>
            );
          })
        );
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };
    fetchQuizzes();
  }, [options]);

  return (
    <div className="settings-container">
      <h1>Surveys</h1>
      <nav className="navbar">
        {" "}
        <Link to="/newsurveys" className="nav-link">
          Create a new survey
        </Link>
      </nav>
      <br></br>
      <br></br>
      <br></br>
      <div className="profile-edit">
        {" "}
        <h2>Add a new candidate</h2>
        <form onSubmit={handleCandidateInput}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        <br></br>
        <br></br>
        <br></br>
        <h2>Existing Surveys</h2>
        <table className="styled-table">
          <thead>
            <tr>
              <th>Survey Name</th>
              <th>Select Candidate</th>
              <th>Send to Candidate</th>
            </tr>
          </thead>
          <tbody>{tableEntries}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Surveys;

import React, { useState, useEffect } from "react";
import "../styles/Surveys.css";
import { Link } from "react-router-dom";

const Surveys = () => {
  // Todo: Change candidateName and email to be unique for each input element
  // Todo: Send to candidate should auto-generate a key link for that survey and email to the candidate. Should also create a results entry connected to that.

  // const [candidateName, setCandidateName] = useState();
  // const [candidateEmail, setCandidateEmail] = useState();

  // const handleSendToCandidate = () => {
  //   // Generate a random key link
  //   // Todo: Key link does not link to anything at the moment
  //   const keyLink = Math.random().toString(36).substring(7);

  //   // Prepare the email subject and body
  //   const subject = "Your Survey Link";
  //   const body = `Dear ${candidateName},\n\nPlease click the following link to access your survey: ${keyLink}\n\nBest regards,\nCodewise`;

  //   // Generate the mailto link
  //   const mailtoLink = `mailto:${candidateEmail}?subject=${encodeURIComponent(
  //     subject
  //   )}&body=${encodeURIComponent(body)}`;

  //   // Open the default email client with the pre-filled email fields
  //   window.location.href = mailtoLink;
  // };

  const [quizzes, setQuizzes] = useState();
  const [tableEntries, setTableEntries] = useState();
  const [options, setOptions] = useState();
  const [candidates, setCandidates] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const handleCandidateInput = (e) => {
    setName(e.target.name);
    setEmail(e.target.email);
  };

  const params = {
    name: name,
    email: email,
  };

  fetch("http://localhost:3306/add_candidate", {
    Method: "POST",
    Headers: {
      Accept: "application.json",
      "Content-Type": "application/json",
    },
    Body: JSON.stringify(params),
    Cache: "default",
  });

  useEffect(() => {
    const fetchQuizzes = async () => {
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
                <button className="btn">Send to candidate</button>
              </td>
            </tr>
          );
        })
      );
    };
    fetchQuizzes();
  }, []);

  useEffect(() => {
    async function fetchCandidates() {
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
    }
    fetchCandidates();
  }, []);
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
          <label>
            Name:
            <input type="text" name="name" placeholder="Name" />
          </label>
          <label>
            Email
            <input type="text" name="email" placeholder="Email" />
          </label>
          <input type="submit" value="Submit" />
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

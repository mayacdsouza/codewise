import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Surveys.css";
import { Link } from "react-router-dom";

const Surveys = () => {
  // Todo: Existing surveys should dynamically display created surveys instead of being hardcoded.
  // Todo: Send to candidate should auto-generate a key link for that survey and email to the candidate. Should also create a results entry connected to that.

  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");

  const handleSendToCandidate = () => {
    // Generate a random key link 
    // Todo: Key link does not link to anything at the moment 
    const keyLink = Math.random().toString(36).substring(7);

    // Prepare the email subject and body
    const subject = "Your Survey Link";
    const body = `Dear ${candidateName},\n\nPlease click the following link to access your survey: ${keyLink}\n\nBest regards,\nCodewise`;

    // Generate the mailto link
    const mailtoLink = `mailto:${candidateEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open the default email client with the pre-filled email fields
    window.location.href = mailtoLink;
  };

//   fetch("localhost:3306/surveys")
//     .then((response) => {
//       if (response.ok) {
//         return response;
//       }
//       throw new Error("Something went wrong");
//     })
//     .then((data) => {
//       return data.json();
//     })
//     .then((result) => console.log(result))
//     .catch((error) => {
//       console.log(error);
//     });


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
        <h2>Existing Surveys</h2>
        <table className="styled-table">
          <tr>
            <th>Survey Name</th>
            <th>Enter Candidate Name</th>
            <th>Enter Candidate Email</th>
            <th>Send to Candidate</th>
          </tr>
          <tr>
            <td>C Programming Fundamentals</td>
            <td>
            <input
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
              />

            </td>
            <td>
            <input
                value={candidateEmail}
                onChange={(e) => setCandidateEmail(e.target.value)}
              />
            </td>
            <td>
            <button className="btn" onClick={handleSendToCandidate}>
                Send to candidate
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Surveys;

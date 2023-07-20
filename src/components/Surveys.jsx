import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Surveys.css";
import { Link } from "react-router-dom";

const Surveys = () => {
  // Todo: Existing surveys should dynamically display created surveys instead of being hardcoded.
  // Todo: Send to candidate should auto-generate a key link for that survey and email to the candidate. Should also create a results entry connected to that.

  fetch("localhost:3306/surveys")
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error("Something went wrong");
    })
    .then((data) => {
      return data.json();
    })
    .then((result) => console.log(result))
    .catch((error) => {
      console.log(error);
    });

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
              <input />
            </td>
            <td>
              <input />
            </td>
            <td>
              <button className="btn">Send to candidate</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Surveys;

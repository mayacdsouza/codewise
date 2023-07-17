import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Surveys.css";

const Surveys = () => {
  return (
    <div className="settings-container">
      <h1>Surveys</h1>
      <button className="btn">Create a new survey</button>
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

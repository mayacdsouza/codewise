/*
This file represents the Dashboard component, which is responsible for rendering the user dashboard.
It includes options to manage surveys, view results, and customize profile settings.
*/

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

/*
The Dashboard component is a functional component that renders the user dashboard.
It provides navigation options to manage surveys, view results, and access settings.
*/
const Dashboard = () => {
  const navigate = useNavigate();
  const [employerName, setEmployerName] = useState("");

  useEffect(() => {
    const user = sessionStorage.getItem("loggedInUser");
    if (!user) {
      // Redirect the user to the login page if no valid user data exists
      alert("Please log in to access your Dashboard.");
      navigate("/");
    } else {
      fetchEmployerName();
    }
  }, [navigate]);

  const fetchEmployerName = async () => {
    try {
      const employerEmailData = JSON.parse(
        sessionStorage.getItem("loggedInUser")
      );
      const employerEmail = employerEmailData?.email?.[0];

      if (employerEmail) {
        const employerResponse = await fetch(
          `flip1.engr.oregonstate.edu:3378/get_employer_name/${employerEmail}`
        );
        const employerData = await employerResponse.json();
        if (employerData.length > 0) {
          const employerName = employerData[0].name;
          setEmployerName(employerName);
        } else {
          console.log("Employer email/name not found.");
        }
      }
    } catch (error) {
      console.error("Error fetching employer email/name:", error);
    }
  };

  const settings = () => {
    navigate("/settings");
  };
  const surveys = () => {
    navigate("/surveys");
  };
  const results = () => {
    navigate("/results");
  };

  /**
  Render the Dashboard component.
  It includes sections for managing surveys, viewing results, and accessing settings.
  */
  return (
    <div className="profile-container">
      {sessionStorage.getItem("loggedInUser") ? (
        <>
          <h1>Welcome to Your Dashboard, {employerName}!</h1>
          <div className="dashboard">
            <div className="dashboard-item">
              <h3>Surveys</h3>
              <p>Manage your surveys</p>
              <button className="dashboard-button" onClick={surveys}>
                Go to Surveys
              </button>
            </div>
            <div className="dashboard-item">
              <h3>Results</h3>
              <p>View survey results</p>
              <button className="dashboard-button" onClick={results}>
                View Results
              </button>
            </div>
            <div className="dashboard-item">
              <h3>Settings</h3>
              <p>Customize your profile</p>
              <button className="dashboard-button" onClick={settings}>
                Go to Settings
              </button>
            </div>
          </div>
        </>
      ) : (
        <h1>Error accessing Dashboard.</h1>
      )}
    </div>
  );
};

export default Dashboard;

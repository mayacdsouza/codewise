/*
This file represents the Dashboard component, which is responsible for rendering the user dashboard.
It includes options to manage surveys, view results, and customize profile settings.
*/

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

/*
The Dashboard component is a functional component that renders the user dashboard.
It provides navigation options to manage surveys, view results, and access settings.
*/
const Dashboard = () => {
  const navigate = useNavigate();
  const settings = () => {
    navigate('/settings');
  };
  const surveys = () => {
    navigate('/surveys');
  };
  const results = () => {
    navigate('/results');
  };

  /**
  Render the Dashboard component.
  It includes sections for managing surveys, viewing results, and accessing settings.
  */
  return (
    <div className="profile-container">
      <h1>Welcome to Your Dashboard!</h1>
      <div className="dashboard">
        <div className="dashboard-item">
          <h3>Surveys</h3>
          <p>Manage your surveys</p>
          <button className="dashboard-button" onClick={surveys}>Go to Surveys</button>
        </div>
        <div className="dashboard-item">
          <h3>Results</h3>
          <p>View survey results</p>
          <button className="dashboard-button" onClick={results}>View Results</button>
        </div>
        <div className="dashboard-item">
          <h3>Settings</h3>
          <p>Customize your profile</p>
          <button className="dashboard-button" onClick={settings}>Go to Settings</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;



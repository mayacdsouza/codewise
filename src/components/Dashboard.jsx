import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

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

  return (
    <div className="profile-container">
      <h1>Welcome to Your Dashboard</h1>
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



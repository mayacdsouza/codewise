/*
This file represents the Navbar component, which is responsible for rendering the navigation bar.
It includes links to different pages of the application, such as settings, surveys, and results.
*/

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {

  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Clear the user data from sessionStorage to log out the user
    sessionStorage.removeItem('loggedInUser');
    alert("You have logged out of your account.")
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo">
          Codewise
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/surveys" className="nav-link">
              Surveys
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/results" className="nav-link">
              Results
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/settings" className="nav-link">
              Settings
            </Link>
          </li>
          <li className="nav-item">
            {/* Add the Logout button with the logout-button class */}
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

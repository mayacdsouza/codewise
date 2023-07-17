/*
This file represents the Navbar component, which is responsible for rendering the navigation bar.
It includes links to different pages of the application, such as settings, surveys, and results.
*/

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
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
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

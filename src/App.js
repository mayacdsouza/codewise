/**
This is the main entry file of the React application.
It sets up the routing configuration using React Router and renders different components based on the current route.
*/

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import Surveys from './components/Surveys';
import Results from './components/Results';
import './App.css';
import Navbar from './components/Navbar';

/*
The App component serves as the entry point for the React application.
It sets up the routing configuration using React Router and renders the appropriate components based on the current route.
*/
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

/*
The AppContent component handles rendering the components based on the current route.
It also includes the Navbar component for non-login pages.
*/
function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <>
      {!isLoginPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/surveys" element={<Surveys />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import Surveys from './components/Surveys';
import Results from './components/Results';
import './App.css';
import Navbar from './components/Navbar';


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

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
        {/* <Route path="/surveys" element={<Surveys />} /> */}
        {/* <Route path="/results" element={<Results />} /> */}
      </Routes>
    </>
  );
}

export default App;

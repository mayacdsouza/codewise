/**
This is the main entry file of the React application.
It sets up the routing configuration using React Router and renders different components based on the current route.
*/

import React from "react";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Settings from "./components/Settings";
import Surveys from "./components/Surveys";
import Results from "./components/Results";
import "./App.css";
import Navbar from "./components/Navbar";
import NewSurveys from "./components/NewSurveys";
import Quiz from "./components/Quiz";

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
  const isLoginPage = location.pathname === "/";
  // TODO: change to select all the link parameters from results
  const [quizzes, setQuizzes] = useState([]);
  const [employerId, setEmployerId] = useState([]);

  useEffect(() => {
    async function fetchQuizzes() {
      const response = await fetch("http://localhost:3306/select_links");
      const data = await response.json();
      setQuizzes(data?.map((row) => row.link));
    }
    fetchQuizzes();
  }, []);

  useEffect(() => {
    async function fetchEmployerId() {
      const response = await fetch("http://localhost:3306/select_employer_id");
      const data = await response.json();
      setEmployerId(data?.map((row) => row.id));
    }
    fetchEmployerId();
  }, []);

  return (
    <>
      {!isLoginPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/surveys" element={<Surveys />} />
        <Route path="/newsurveys" element={<NewSurveys />} />
        {employerId.map((employer, key) => (
          <Route path={"/" + employer} element={<Results value={employer} />} />
        ))}
        {quizzes.map((quiz, key) => (
          <Route path={"/" + quiz} element={<Quiz value={quiz} />} />
        ))}
      </Routes>
    </>
  );
}

export default App;

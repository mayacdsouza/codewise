import React, { useState, useEffect } from 'react';
import '../styles/Results.css';
import { useNavigate } from "react-router-dom";


const Results = () => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [employerId, setEmployerId] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [candidateOptions, setCandidateOptions] = useState([]);
  const [quizOptions, setQuizOptions] = useState([]);
  const [quizResults, setQuizResults] = useState([]);
  const [candidateResults, setCandidateResults] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const user = sessionStorage.getItem('loggedInUser');
    if (!user) {
      // Redirect the user to the login page if no valid user data exists
      alert("Please log in to access your Settings.")
      navigate('/');
    }
  }, [navigate]);

  // Displays list of candidates in a drop-down menu
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchCandidates() {
      const response = await fetch('http://localhost:3306/select_candidates_results', {
        signal,
      });
      const data = await response.json();
      setCandidates(data);
      setCandidateOptions(
        data?.map(function (element) {
          return (
            <option key={element.id} value={element.name}>
              {element.name}
            </option>
          );
        })
      );
      return () => {
        controller.abort();
      };
    }
    fetchCandidates();
  }, []);

  // Fetch employerId with employerEmail
  const fetchEmployerId = async () => {
    try {
      const employerEmailData = JSON.parse(sessionStorage.getItem('loggedInUser'));
      const employerEmail = employerEmailData?.email?.[0];
      if (employerEmail) {
        const employerResponse = await fetch(`http://localhost:3306/get_employer_id/${employerEmail}`);

        if (!employerResponse.ok) {
          throw new Error("Failed to fetch employer ID.");
        }

        const employerData = await employerResponse.json();

        if (employerData.length > 0) {
          const employerId = employerData[0].id;
          setEmployerId(employerId);
        } else {
          console.log("Employer ID not found.");
        }
      }
    } catch (error) {
      console.error("Error fetching employer ID:", error);
    }
  };

  // Displays list of quizzes in a drop-down menu
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchQuizzes() {
      try {
        const response = await fetch(`http://localhost:3306/select_quizzes_results/${employerId}`, {
          signal,
        });
        const data = await response.json();
        setQuizzes(data);
        setQuizOptions(
          data?.map(function (element) {
            return (
              <option key={element.id} value={element.title}>
                {element.title}
              </option>
            );
          })
        );
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    }

    // Fetch employerId with employerEmail and then fetch quizzes
    fetchEmployerId().then(() => fetchQuizzes());

    return () => {
      controller.abort();
    };
  }, [employerId]);

  // Fetch quiz results based on the selected quiz
  useEffect(() => {
    if (selectedQuiz) {
      async function fetchQuizId() {
        try {
          const response = await fetch(`http://localhost:3306/get_quiz_id/${selectedQuiz}`);
          const data = await response.json();
          if (data.length > 0) {
            const quizId = data[0].id;
            console.log("Quiz ID:", quizId);

            async function fetchQuizResults() {
              const response = await fetch(`http://localhost:3306/get_quiz_results/${quizId}`);
              const data = await response.json();
              // Filter out results with NULL or '0' grade
              const filteredResults = data.filter((result) => result.grade !== null && result.grade !== '0');
              setQuizResults(filteredResults);
              console.log("Selected quiz data:", filteredResults);
            }
            fetchQuizResults();
          } else {
            console.log("Quiz ID not found.");
          }
        } catch (error) {
          console.error("Error fetching quiz ID:", error);
        }
      }
      fetchQuizId();
    }
  }, [selectedQuiz]);

  // Fetch candidate results based on the selected candidate
  useEffect(() => {
    if (selectedCandidate) {
      async function fetchCandidateId() {
        try {
          const response = await fetch(`http://localhost:3306/get_candidate_id/${selectedCandidate}`);
          const data = await response.json();
          if (data.length > 0) {
            const candidateId = data[0].id;
            console.log("Candidate ID:", candidateId);

            async function fetchCandidateResults() {
              const response = await fetch(`http://localhost:3306/get_candidate_results/${candidateId}`);
              const data = await response.json();
              // Filter out results with NULL or '0' grade
              const filteredResults = data.filter((result) => result.grade !== null && result.grade !== '0');
              setCandidateResults(filteredResults);
              console.log("Selected candidate data:", filteredResults);
            }
            fetchCandidateResults();
          } else {
            console.log("Candidate ID not found.");
          }
        } catch (error) {
          console.error("Error fetching candidate ID:", error);
        }
      }
      fetchCandidateId();
    }
  }, [selectedCandidate]);

  return (
    <div className="results-container">
      <h1>Results</h1>
      <h2>View Results by Quiz</h2>
      <div className="results-edit">
        {/* Dropdown menu for selecting the quiz */}
        <label htmlFor="quizDropdown">Quiz: </label>
        <select
          id="quizDropdown"
          onChange={(e) => setSelectedQuiz(e.target.value)}
          value={selectedQuiz || ''}
        >
          <option value="">Select Quiz</option>
          {quizOptions}
        </select>
      </div>
      {selectedQuiz && (
        <>
          <h3>Results for Quiz: {selectedQuiz}</h3>
          <div className="results-edit">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {quizResults.map((result) => (
                  <tr key={result.name}>
                    <td>{result.name}</td>
                    <td>{result.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      <h2>View Results by Candidate</h2>
      <div className="results-edit">
        {/* Dropdown menu for selecting the candidate */}
        <label htmlFor="candidateDropdown">Candidate: </label>
        <select
          id="candidateDropdown"
          onChange={(e) => setSelectedCandidate(e.target.value)}
          value={selectedCandidate || ''}
        >
          <option value="">Select Candidiate</option>
          {candidateOptions}
        </select>
      </div>
      {selectedCandidate && (
        <>
          <h3>Results for Candidate: {selectedCandidate}</h3>
          <div className="results-edit">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Quiz</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {candidateResults.map((result) => (
                  <tr key={result.title}>
                    <td>{result.title}</td>
                    <td>{result.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Results;

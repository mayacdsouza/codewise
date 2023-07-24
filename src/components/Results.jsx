import React, { useState, useEffect } from 'react';
import '../styles/Results.css';

const Results = (props) => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [candidateOptions, setCandidateOptions] = useState([]);
  const [quizOptions, setQuizOptions] = useState([]);
  const [quizResults, setQuizResults] = useState([]);
  const [candidateResults, setCandidateResults] = useState([]);

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

  // Displays list of quizzes in a drop-down menu
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchQuizzes() {
      const response = await fetch('http://localhost:3306/select_quizzes_results', {
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
    }
    fetchQuizzes();
  }, []);

  useEffect(() => {
    // Fetch quiz results based on the selected quiz
    if (selectedQuiz) {
      async function fetchQuizResults() {
        const response = await fetch(`http://localhost:3306/results/${selectedQuiz}`); // Replace with the correct URL for the results route with selected quiz ID
        const data = await response.json();
        setQuizResults(data);
      }
      fetchQuizResults();
    }
  }, [selectedQuiz]);

  useEffect(() => {
    // Fetch candidate results based on the selected candidate
    if (selectedCandidate) {
      async function fetchCandidateResults() {
        const response = await fetch(`http://localhost:3306/results/${selectedCandidate}`); // Replace with the correct URL for the results route with selected candidate ID
        const data = await response.json();
        setCandidateResults(data);
      }
      fetchCandidateResults();
    }
  }, [selectedCandidate]);

  return (
    <div className="results-container">
      <h1>Results</h1>
      <h3>Showing results for employer: {props.value}</h3>
      <h2>View Results by Quiz</h2>
      <div className="results-edit">
        {/* Dropdown menu for selecting the quiz */}
        <label htmlFor="quizDropdown">Select Quiz: </label>
        <select
          id="quizDropdown"
          onChange={(e) => setSelectedQuiz(e.target.value)}
          value={selectedQuiz || ''}
        >
          <option value="">All Quizzes</option>
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
        <label htmlFor="candidateDropdown">Select Candidate: </label>
        <select
          id="candidateDropdown"
          onChange={(e) => setSelectedCandidate(e.target.value)}
          value={selectedCandidate || ''}
        >
          <option value="">All Candidates</option>
          {candidateOptions}
        </select>
      </div>
      {selectedCandidate && (
        <>
          <h3>Results for Quiz: {selectedCandidate}</h3>
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
                  <tr key={result.quiz}>
                    <td>{result.quiz}</td>
                    <td>{result.score}</td>
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

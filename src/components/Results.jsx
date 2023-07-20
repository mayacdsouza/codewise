import React from 'react';
import '../styles/Results.css';


const Results = () => {
  // Dummy data for demonstration purposes
  const results = [
    {
      id: 1,
      name: 'John Doe',
      score: 80,
    },
    {
      id: 2,
      name: 'Jane Smith',
      score: 95,
    },
    {
      id: 3,
      name: 'Mike Johnson',
      score: 75,
    },
  ];

  return (
    <div className="results-container">
      <h1>Results</h1>
      <h2>Comprehensive Reports</h2>
      <p>View comprehensive reports and analysis of quiz results.</p>

      <h2>Individual Results</h2>
      <div className="results-edit">
        <table className="styled-table">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
          {results.map((result) => (
            <tr key={result.id}>
              <td>{result.id}</td>
              <td>{result.name}</td>
              <td>{result.score}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Results;

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./BelbinResult.css"

const BelbinResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { results, topRoles } = location.state || {};

  const handleGoBack = () => {
    navigate('/test/677ffc10bc648d0df2743ff7');
  };

  return (
    <div className="result-container">
      <h1>Belbin Test Results</h1>

      <div>
        <h2>Top 3 Roles</h2>
        <ul className="top-roles">
          {topRoles && topRoles.length > 0 ? (
            topRoles.map((role) => (
              <li>
                {role} 
              </li>
            ))
          ) : (
            <p>No roles available.</p>
          )}
        </ul>
      </div>
      {results && (
        <div>
          <h2>Detailed Results</h2>
          <table className="result-table">
            <thead>
              <tr>
                <th>Role</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <td>{result.role}</td>
                  <td>{result.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

       <button className="button" onClick={handleGoBack}>Go Back</button>
    </div>
  );
};

export default BelbinResultPage;

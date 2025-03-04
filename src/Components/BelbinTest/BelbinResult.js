import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

const BelbinResult = () => {
  const { userId } = useParams();
  const { state } = useLocation(); 
  const [topRoles, setTopRoles] = useState([]); 
  const navigate = useNavigate(); 

  useEffect(() => {
    console.log("State received:", state);

    if (state && state.results) {

      const roleScores = state.results; 

      console.log("Received role scores:", roleScores); 

      const sortedRoles = Object.entries(roleScores)
        .sort(([, a], [, b]) => b - a) 
        .slice(0, 3); 

      setTopRoles(sortedRoles);
    } else {
      console.error("No results data available in state.");

      fetchResults(userId);
    }
  }, [state, userId]);

  const fetchResults = async (userId) => {
    try {

      const response = await fetch(`/api/results/${userId}`); 
      const data = await response.json();

      if (data && data.results) {
        console.log("Fetched results:", data.results);
        const roleScores = data.results;

        const sortedRoles = Object.entries(roleScores)
          .sort(([, a], [, b]) => b - a) 
          .slice(0, 3);

        setTopRoles(sortedRoles);
      } else {
        console.error("No results found in API response.");
      }
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  return (
    <div className="result-container">
      <h1>Belbin Test Results for User {userId}</h1>
      <h3>Top 3 Roles:</h3>
      <ol>
        {topRoles.length > 0 ? (
          topRoles.map(([role, score], index) => (
            <li key={index}>
              <strong>{role.charAt(0).toUpperCase() + role.slice(1)}</strong>: {score} points
            </li>
          ))
        ) : (
          <li>No roles available.</li>
        )}
      </ol>
    </div>
  );
};

export default BelbinResult;

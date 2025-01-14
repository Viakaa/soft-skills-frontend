import React from 'react';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import rolesInfo from './roles.json';
import './BelbinResult.css';

const BelbinResult = () => {
  const location = useLocation();
  const { roles } = location.state || [];

  if (!roles || roles.length === 0) {
    return <Typography variant="h6">No roles selected or available</Typography>;
  }

  return (
    <Box className="result-container">
      <Typography variant="h4" className="result-role">
        Top 3 Roles
      </Typography>
      {roles.map((role, index) => {
        const roleInfo = rolesInfo[role];
        if (!roleInfo) return null;

        const { description, strengths, weaknesses, position } = roleInfo;

        const rolePoints = location.state.points[role];

        return (
          <Box className="result-box" key={index}>
            <Typography variant="h5" className="result-section">Role {index + 1}: {role}</Typography>
            <Typography variant="h6" className="result-section">Points: {rolePoints}</Typography>

            <Typography variant="h5" className="result-section">Description</Typography>
            <Typography variant="body1" className="result-text">{description}</Typography>

            <Typography variant="h5" className="result-section">Strengths</Typography>
            <Typography variant="body1" className="result-text">{strengths}</Typography>

            <Typography variant="h5" className="result-section">Weaknesses</Typography>
            <Typography variant="body1" className="result-text">{weaknesses}</Typography>

            <Typography variant="h5" className="result-section">Possible Position</Typography>
            <Typography variant="body1" className="result-text">{position}</Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default BelbinResult;

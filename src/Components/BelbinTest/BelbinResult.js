import React from 'react';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import rolesInfo from './roles.json';
import './BelbinResult.css';

const BelbinResult = () => {
  const location = useLocation();
  const { role } = location.state || {};

  if (!role || !rolesInfo[role]) {
    return <Typography variant="h6">Invalid Role or No Role Selected</Typography>;
  }

  const { description, strengths, weaknesses, position } = rolesInfo[role];

  return (
    <Box className="result-container">
      <Typography variant="h4" className="result-role">Your Role: {role}</Typography>
      <Box className="result-box">
        <Typography variant="h5" className="result-section">Description</Typography>
        <Typography variant="body1" className="result-text">{description}</Typography>

        <Typography variant="h5" className="result-section">Strengths</Typography>
        <Typography variant="body1" className="result-text">{strengths}</Typography>

        <Typography variant="h5" className="result-section">Weaknesses</Typography>
        <Typography variant="body1" className="result-text">{weaknesses}</Typography>

        <Typography variant="h5" className="result-section">Possible Position</Typography>
        <Typography variant="body1" className="result-text">{position}</Typography>
      </Box>
    </Box>
  );
};

export default BelbinResult;

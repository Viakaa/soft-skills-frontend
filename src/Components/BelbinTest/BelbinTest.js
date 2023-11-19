import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './BelbinTest.css';

const marks = Array.from({ length: 11 }, (_, i) => ({
  value: i,
  label: `${i}`,
}));
const questions = [
  "I think I can quickly spot the opportunities and make good use of them.",
  "I can work with different kinds of people successfully.",
  "Generating ideas is my natural ability.",
];

const Question = ({ question, index, value, updateResponse }) => {
  const handleChange = (event, newValue) => {
    updateResponse(index, newValue);
  };

  return (
    <Box sx={{ width: '100%', padding: '20px' }}>
      <Typography className='questions_belbin' gutterBottom>{question}</Typography>
      <Slider
        className="slider"
        value={value}
        min={0}
        step={1}
        max={10}
        marks={marks}
        onChange={handleChange}
        valueLabelDisplay="auto"
      />
    </Box>
  );
};

const BelbinTest = () => {
  const [responses, setResponses] = useState(Array(questions.length).fill(0));
  const [total, setTotal] = useState(0);

  const updateResponse = (index, newValue) => {
    const newResponses = [...responses];
    newResponses[index] = newValue;
    
    const newTotal = newResponses.reduce((acc, val) => acc + val, 0);

    if (newTotal <= 10) {
      setResponses(newResponses);
      setTotal(newTotal);
    }
  };

  const handleSubmit = () => {
    console.log('Responses:', responses);
  };

  return (
    <Box className='belbin_main' sx={{ margin: 'auto', width: '70%' }}>
      <Typography className='theme_belbin' variant="h4" component="h1" gutterBottom>
        What Contribution Do I Make to the Team?
      </Typography>
      {questions.map((question, index) => (
        <Question
          key={index}
          question={question}
          index={index}
          value={responses[index]}
          updateResponse={updateResponse}
        />
      ))}
      <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
        <Typography variant="subtitle1">
          <strong>Total:</strong> {total} / 10
        </Typography>
        <button onClick={handleSubmit} disabled={total !== 10}>Submit</button>
      </Box>
    </Box>
  );
};

export default BelbinTest;

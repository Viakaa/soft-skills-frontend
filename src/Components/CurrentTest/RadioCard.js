import React, { useState } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  Box,
} from "@mui/material";

const RadioCard = ({ question, number, onAnswerChange }) => {
  const { _id: questionId, question: questionText, answers } = question;
  const [selectedValue, setSelectedValue] = useState('');

  const handleRadioChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedValue(selectedOption);

    const selectedIndex = answers.findIndex(
      (answer) => String(answer) === String(selectedOption)
    );
    if (selectedIndex !== -1) {
      onAnswerChange(questionId, [selectedIndex]);
    }
  };

  if (!Array.isArray(answers) || answers.length === 0) {
    return (
      <Typography color="error">
        No options available for this question.
      </Typography>
    );
  }

  return (
    <>
      <div className="fristWrapper test_q">
        <div className="firstQuestion">{number}</div>
        <Typography
          className="question_wrap"
          variant="body1"
          sx={{
            backgroundColor: "#f9f9f9",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: 2,
            fontSize: "1rem",
            color: "#333",
            lineHeight: 1.4,
            boxSizing: "border-box",
            cursor: "default",
            userSelect: "none",
                textAlign: "left"
          }}
        >
          {questionText}
        </Typography>
      </div>

      <div className="option-container">
        <div className="correct-answer-section">
          <RadioGroup
            name={`radio-group-${questionId}`}
            value={selectedValue}
            onChange={handleRadioChange}
            sx={{
              display: "grid",
              gap: 2,
            }}
          >
            {answers.map((option, idx) => (
              <FormControlLabel
                key={idx}
                value={option}
                control={
                  <Radio
                    sx={{
                      color: "#0000FF",
                      "&.Mui-checked": { color: "#0000FF" },
                    }}
                  />
                }
                label={
                  <Box
                    sx={{
                      p: 2,
                      backgroundColor: "#f9f9f9",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      fontSize: "1rem",
                      color: "#333",
                      width: "300px",
                      cursor: "default",
                      userSelect: "none",
                      lineHeight: 1.4,
                    }}
                  >
                    {option}
                  </Box>
                }
                sx={{
                  alignItems: "flex-start",
                  display: "flex",
                  gap: 1,
                  m: 0,
                  width: "100%",
                }}
              />
            ))}
          </RadioGroup>
        </div>
      </div>
    </>
  );
};

export default RadioCard;

import React, { useState } from "react";

import { Radio, RadioGroup, FormControlLabel, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";

const RadioCard = ({ question, number, onAnswerChange }) => {
  const { question: questionId, title, answers } = question;
  const [selectedValue, setSelectedValue] = useState('');

  const handleRadioChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedValue(selectedOption);

    //find the index of the selected answer
    const selectedIndex = answers.findIndex(answer => answer === selectedOption);
    if (selectedIndex !== -1) {
      onAnswerChange(questionId, [selectedIndex]); //update to pass only the selected index
    }
  };


  return (
    <>
      <div className="fristWrapper test_q">
        <div className="firstQuestion">{number}</div>
        <TextField
          className="question_wrap"
          multiline
          readOnly
          InputProps={{
            readOnly: true,
          }}
          value={question.question}
          required
          readOnly
          style={{ whiteSpace: "normal", wordWrap: "break-word !important",fontSize:'40px !important' }}
        />

        <div className="closeButton" style={{backgroundColor:'#FED799 !important'}} >
          
        </div>
      </div>
      <div className="option-container">
        <div className="correct-answer-section" style={{ display: "flex" }}>
          <RadioGroup
            name={`radio-group-${question.questionId}`}
            value={selectedValue}
            onChange={handleRadioChange}
            style={{width:"94%"}}
          >
            {answers.map((option, idx) => (
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <div className="checkbox-with-form-control">
                  <div className="checkbox-container">
                    <FormControlLabel
                      control={<Radio  />}
                      label={
                        <TextField
                        fullWidth
                        multiline
                          className="questionText"
                          style={{ border: "none !important", width: "100%"}}
                          defaultValue={option}
                          InputProps={{
                            readOnly: true,
                          }}
                          sx={{ minWidth: '600px' }}
                        />

                      }
                                        value={option} 
                    />
                  </div>
                </div>
              </Box>
            ))}
          </RadioGroup>
        </div>
      </div>
    </>
  );
};

export default RadioCard;

import React, { useState } from "react";

import { Radio, RadioGroup, FormControlLabel, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";

const RadioCard = ({ question, number, onAnswerChange }) => {
  const { _id, title, answers } = question;
  const [selectedValue, setSelectedValue] = useState('');

  const handleRadioChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedValue(selectedOption);

    //find the index of the selected answer
    const selectedIndex = answers.findIndex(answer => answer === selectedOption);
    if (selectedIndex !== -1) {
      onAnswerChange(_id, [selectedIndex]); //update to pass only the selected index
    }
  };


  return (
    <>
      <div className="firstQuestion" style={{ marginRight: "auto" }}>
        {number}
      </div>
      <div
        className="fristQuestionText"
        style={{
          textAlign: "center",
          flexGrow: 1,
          marginTop: "-6%",
          marginBottom: "5%",
        }}
      >
        {title}
      </div>
      <div className="option-container">
        <div className="correct-answer-section" style={{ display: "flex" }}>
          <RadioGroup
            name={`radio-group-${question._id}`}
            value={selectedValue}
            onChange={handleRadioChange}
            style={{width:"69%"}}
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
                          size="small"
                          variant="outlined"
                          className="questionText"
                          value={option}
                          InputProps={{
                            readOnly: true,
                          }}
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

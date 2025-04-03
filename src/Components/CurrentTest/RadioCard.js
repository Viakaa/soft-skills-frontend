import React, { useState } from "react";

import { Radio, RadioGroup, FormControlLabel} from "@mui/material";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";

const RadioCard = ({ question, number, onAnswerChange }) => {
  const { question: questionId, answers } = question;
  const [selectedValue, setSelectedValue] = useState('');

  const handleRadioChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedValue(selectedOption);

    const selectedIndex = answers.findIndex(answer => answer === selectedOption);
    if (selectedIndex !== -1) {
      onAnswerChange(questionId, [selectedIndex]); 
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
        />
      </div>
      <div className="option-container">
        <div className="correct-answer-section" >
          <RadioGroup
            name={`radio-group-${question.questionId}`}
            value={selectedValue}
            onChange={handleRadioChange}
         
          >
            {answers.map((option, idx) => (
              <Box
               
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
                       
                          defaultValue={option}
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

import React, { useState } from "react";
import {Checkbox, FormControlLabel, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import './quest_cards.css'

const MultipleChoiceCard = ({ question, number, onAnswerChange }) => {
  const { question: title, answers } = question;
  const [checkedStates, setCheckedStates] = useState(answers.map(() => false));

  const handleCheckboxChange = (index, isChecked) => {
    const updatedCheckedStates = checkedStates.map((item, idx) =>
      idx === index ? isChecked : item
    );
    setCheckedStates(updatedCheckedStates);
    const newAnswers = updatedCheckedStates.reduce((acc, cur, idx) => {
      if (cur) acc.push(idx);
      return acc;
    }, []);
    onAnswerChange(question.questionId, newAnswers, true);
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
          value={title}
          required
         
        />

      </div>

      <div className="option-testcontainer ">
        <div className="correct-answer-section" style={{ display: "flex" }}>
          {answers.map((option, idx) => (
            <Box
              sx={{
                display: "flex",
              }}
            >
                <div className="checkbox-with-form-control">
                  <div className="checkbox-container">
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={option}
                          color="primary"
                          checked={checkedStates[idx]}
                          onChange={(event) => handleCheckboxChange(idx, event.target.checked)}
                        />
                      }
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
                    />
                </div>
              </div>

             
            </Box>
          ))}
        </div>
      </div>
    </>
  );
};

export default MultipleChoiceCard;

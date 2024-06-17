import React, { useState } from "react";
import Button from "@mui/material/Button";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Form from "react-bootstrap/Form";
import Box from "@mui/material/Box";

const MultipleChoiceCard = ({ question, number, onAnswerChange }) => {
  const { question: title, answers } = question;
  const [checkedStates, setCheckedStates] = useState(answers.map(() => false));

  //handle checkbox answers
  const handleCheckboxChange = (index, isChecked) => {
    const updatedCheckedStates = checkedStates.map((item, idx) =>
      idx === index ? isChecked : item
    );
    setCheckedStates(updatedCheckedStates);
  //update checkbox answers if it changes(unchecked)
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
        <input
          className="fristQuestionText"
          contenteditable="true"
          value={title}
          required
          readOnly
        />

        <div className="closeButton" style={{backgroundColor:'#FED799 !important'}} >
          
        </div>
      </div>

      <div className="option-container">
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
                          style={{ border: "none !important", width: "100%"}}
                          defaultValue={option}
                          InputProps={{
                            readOnly: true,
                          }}
                          sx={{ minWidth: '600px' }}
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

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
  const {
    question: title,
    answers,
    characteristics,
    correctAnswers,
  } = question;

  //option checked state
  const [checkedStates, setCheckedStates] = useState(answers.map(() => false));

  const handleCheckboxChange = (index, isChecked) => {
    const updatedCheckedStates = checkedStates.map((item, idx) =>
      idx === index ? isChecked : item
    );
    setCheckedStates(updatedCheckedStates);
  
    const { characteristicId, points } = characteristics[index];
  
    //calculate the point adjustment based on the check state
    const pointAdjustment = isChecked ? points : -points;
  
    onAnswerChange(question._id, characteristicId, pointAdjustment, isChecked);
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
                          onChange={(event) =>
                            handleCheckboxChange(idx, event.target.checked)
                          }
                        />
                      }
                      label={
                        <TextField
                          size="small"
                          variant="outlined"
                          className="questionText"
                          style={{ border: "none !important" }}
                          defaultValue={option}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      }
                    />
                </div>
              </div>

              <FormControl
                style={{ width: "200px", marginLeft: "10px" }}
              ></FormControl>
            </Box>
          ))}
        </div>
      </div>
    </>
  );
};

export default MultipleChoiceCard;

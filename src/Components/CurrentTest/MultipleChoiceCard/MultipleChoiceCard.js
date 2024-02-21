import React from 'react';
import Button from "@mui/material/Button";
import {
  Checkbox, FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import Form from "react-bootstrap/Form";
import Box from "@mui/material/Box";

const MultipleChoiceCard = ({question, number}) => {

  const {question: title, answers, characteristics, correctAnswers} = question;

  return (
    <>
      <div className="fristWrapper">
        <p className="firstQuestion">{number}</p>
        <h2 style={{textAlign: "center", flex: 1}} className="fristQuestionText">{title}</h2>
      </div>

      <div className="option-container">
        <div className="correct-answer-section" style={{display: 'flex'}}>
          {answers.map((option, idx) => (
            <Box sx={{
              display: "flex"
            }}>
              <div>

                <div className="checkbox-with-form-control">
                  <div className="checkbox-container">
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={option}
                          color="primary"
                        />
                      }
                      label={<TextField
                        size="small"
                        variant="outlined"
                        style={{border: 'none !important'}}
                        defaultValue={option}
                      />}
                    />
                  </div>
                </div>
              </div>

              <FormControl style={{width: "200px", marginLeft: "10px"}}>
               
              </FormControl>
            </Box>
          ))}
        </div>

      </div>
    </>
  )
};

export default MultipleChoiceCard;

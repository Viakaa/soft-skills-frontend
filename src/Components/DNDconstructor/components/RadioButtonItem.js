import React, {useState} from "react";
import {FormControlLabel, IconButton, Radio, RadioGroup} from "@mui/material";
import Form from "react-bootstrap/Form";
import CheckIcon from "@mui/icons-material/Check";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

export const RadioButtonItem = ({content, index, onDelete}) => {
  // State to manage the radio options and the selected correct answer
  const [options, setOptions] = useState(["Option 1", "Option 2"]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [correctAnswer1, setCorrectAnswer1] = useState(null);

  // Handler to add a new option
  const handleAddOption = () => {
    const newOption = `Option ${options.length + 1}`;
    setOptions([...options, newOption]);
  };

  // Handler to select the correct answer
  const handleCorrectAnswerChange = (option) => {
    setCorrectAnswer(option);
  };

  const handleCorrectAnswerChange1 = (option) => {
    setCorrectAnswer1(option);
  };

  return (
    <div className="question-item">
      <div className="firstWrapper">
        <p className="firstQuestion">{index + 1}</p>
        <span className="firstQuestionText">{content}</span>
        <button className="closeButton" onClick={() => onDelete(index)}>
          X
        </button>
      </div>
      <div className="flex-container">
        <div className="center">
          <RadioGroup>
            {options.map((option, idx) => (
              <FormControlLabel
                key={idx}
                value={option}
                control={<Radio/>}
                label={option}
                labelPlacement="end"
                onChange={() => handleCorrectAnswerChange1(option)}
                checked={correctAnswer1 === option}
              />
            ))}
          </RadioGroup>
          <IconButton color="primary" onClick={handleAddOption} size="small">
            <div className="circlee">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
              >
                <path
                  d="M0 4C0 1.79086 1.79086 0 4 0H19C21.2091 0 23 1.79086 23 4V19C23 21.2091 21.2091 23 19 23H4C1.79086 23 0 21.2091 0 19V4Z"
                  fill="#DBDFF4"
                />
                <path
                  d="M4.13998 11.5H18.4"
                  stroke="#384699"
                  stroke-width="3"
                  stroke-linecap="round"
                />
                <path
                  d="M11.27 18.4V4.60002"
                  stroke="#384699"
                  stroke-width="3"
                  stroke-linecap="round"
                />
              </svg>
            </div>
          </IconButton>
        </div>
        <div className="correct-container">
          <p className="title-choose">Choose correct answer</p>
          {options.map((option, idx) => (
            <IconButton
              key={idx}
              onClick={() => handleCorrectAnswerChange(option)}
              className={correctAnswer === option ? "selected" : ""}
            >
              <Form.Control size="sm" type="text" placeholder="+/- 1" className="addPoints"/>
              {correctAnswer === option ? (
                <div className="posiition1">
                  <CheckIcon className="aa"/>
                </div>
              ) : (
                <RadioButtonUncheckedIcon className="bb"/>
              )}
            </IconButton>
          ))}
        </div>
      </div>
    </div>
  );
};
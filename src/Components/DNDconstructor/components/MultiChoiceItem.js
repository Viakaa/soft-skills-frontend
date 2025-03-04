import React, {useState} from "react";
import {Checkbox, FormControlLabel, FormGroup, IconButton} from "@mui/material";
import {CheckboxWithFormControl} from "./CheckboxWithFormControl";

export const MultiChoiceItem = ({content, index, onDelete}) => {
  const [options, setOptions] = useState([
    "Totally disagree",
    "Mostly disagree",
    "Partially disagree",
  ]);
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [correctAnswers1, setCorrectAnswers1] = useState({});

  const handleAddOption = () => {
    const newOption = `Option ${options.length + 1}`;
    setOptions([...options, newOption]);
    setCorrectAnswers({...correctAnswers, [newOption]: false});
  };

  const handleCorrectAnswerChange = (option) => {
    setCorrectAnswers({...correctAnswers, [option]: !correctAnswers[option]});
  };

  const handleCorrectAnswerChange1 = (option) => {
    setCorrectAnswers1({
      ...correctAnswers1,
      [option]: !correctAnswers1[option],
    });
  };
  return (
    <div className="question-item">
      <div className="fristWrapper">
        <p className="firstQuestion">{index + 1}</p>
        <textarea defaultValue={content} />
        <button className="closeButton" onClick={() => onDelete(index)}>
          X
        </button>
      </div>

      <div className="option-container">
        <FormGroup>
          {options.map((option) => (
            <FormControlLabel
              key={option}
              control={
                <Checkbox
                  checked={correctAnswers1[option] || false}
                  onChange={() => handleCorrectAnswerChange1(option)}
                />
              }
              label={option}
            />
          ))}
          <IconButton onClick={handleAddOption} color="primary" size="small">
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
        </FormGroup>
        <div className="correct-answer-section" style={{display: 'flex'}}>
          <p className="title-choose">Choose correct answer</p>
          {options.map((option) => (
            <CheckboxWithFormControl
              key={option}
              option={option}
              correctAnswers={correctAnswers}
              handleCorrectAnswerChange={handleCorrectAnswerChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
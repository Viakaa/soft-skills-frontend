import Form from "react-bootstrap/Form";
import {Checkbox, FormControlLabel} from "@mui/material";
import React from "react";

export function CheckboxWithFormControl({option, correctAnswers, handleCorrectAnswerChange}) {
  return (
    <div className="checkbox-with-form-control">
      <div className="form-control-container">
        <Form.Control size="sm" type="text" placeholder="+/- 1" className="addPointsYN"/>
      </div>
      <div className="checkbox-container">
        <FormControlLabel
          control={
            <Checkbox
              checked={correctAnswers[option] || false}
              onChange={() => handleCorrectAnswerChange(option)}
              name={option}
              color="primary"
            />
          }
        />
      </div>
    </div>
  );
}

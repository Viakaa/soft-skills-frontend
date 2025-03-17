import React, { useState } from "react";
import { Checkbox, FormGroup, TextField, IconButton } from "@mui/material";
import { AddBox } from "@mui/icons-material";

export const MultiChoiceItem = ({ content, index, onDelete }) => {
  const [options, setOptions] = useState([
    "Totally disagree",
    "Mostly disagree",
    "Partially disagree",
  ]);
  const [selected, setSelected] = useState(null);

  const handleAddOption = () => {
    const newOption = `Option ${options.length + 1}`;
    setOptions([...options, newOption]);
  };

  const handleOptionSelect = (idx) => {
    setSelected(idx);
  };

  const handleOptionTextChange = (idx, newText) => {
    const updatedOptions = [...options];
    updatedOptions[idx] = newText;
    setOptions(updatedOptions);
  };

  return (
    <div className="question-item">
      <div className="header">
        <p className="question-number">{index + 1}</p>
        <TextField
          defaultValue={content}
          className="question-input"
          fullWidth
          variant="outlined"
        />
        <button className="close-button" onClick={() => onDelete(index)}>X</button>
      </div>

      <div className="options-container">
        <FormGroup className="options-grid">
          {options.map((option, idx) => (
            <div key={idx} className="option-item">
              <Checkbox
                checked={selected === idx}
                onChange={() => handleOptionSelect(idx)}
                sx={{ color: "black", '&.Mui-checked': { color: "blue" } }}
              />
              <TextField
                value={option}
                onChange={(e) => handleOptionTextChange(idx, e.target.value)}
                variant="outlined"
                size="small"
                className="option-input"
              />
              <Checkbox
                checked={selected === idx}
                onChange={() => handleOptionSelect(idx)}
                sx={{ color: "blue", '&.Mui-checked': { color: "blue" } }}
              />
            </div>
          ))}
        </FormGroup>
        <div className="add-option-container">
          <IconButton onClick={handleAddOption} color="primary" size="small">
            <AddBox sx={{ fontSize: 30, color: "black" }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
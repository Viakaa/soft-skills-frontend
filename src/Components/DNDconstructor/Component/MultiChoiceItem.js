import React, { useState, useEffect } from "react";
import axios from "axios";
import CheckboxWithFormControl from "./CheckboxWithFormControl"
import { IconButton } from "@mui/material";
import { FormGroup } from "@mui/material";

const MultiChoiceItem = ({
  characteristics,
  index,
  onDelete,
  onUpdate,
}) => {
  const [questionName, setQuestionName] = useState("QuestionName");
  const [options, setOptions] = useState([
    {
      id: 1,
      label: "Option 1",
      points: 1,
      characteristicId: "65c3adfbfe2b0e98e5ba7374",
      checked: false,
    },
  ]);
  const [characteristicList, setCharacteristicList] = useState([]); 

  const handleOptionChange = (optionId, field, value) => {
    const updatedOptions = options.map((option) => {
      if (option.id === optionId) {
        return { ...option, [field]: value };
      }
      return option;
    });
    setOptions(updatedOptions);
  };

  const [nextId, setNextId] = useState(2);

  const handleAddOption = () => {
    setOptions([
      ...options,
      {
        id: nextId,
        label: `Option ${nextId}`,
        points: 1,
        characteristicId: "65c3adfbfe2b0e98e5ba7374",
        checked: false,
      },
    ]);
    setNextId(nextId + 1); 
  };

  const handleDeleteOption = (optionId) => {
    const updatedOptions = options.filter((option) => option.id !== optionId);
    setOptions(updatedOptions);
    onUpdate(index, {
      content: questionName,
      options: updatedOptions.map((option) => ({
        text: option.label,
        isCorrect: option.checked,
        characteristicId: option.characteristicId,
        points: option.points,
      })),
    });
  };

  const fetchCharacteristics = async (authToken) => {
    try {
      const response = await axios.get(
        "http://ec2-13-60-83-13.eu-north-1.compute.amazonaws.com/characteristics",
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      
      const fetchedCharacteristics = response.data.map((char) => ({
        _id: char._id,
        title: char.title,
      }));

      console.log(fetchedCharacteristics);
      setCharacteristicList(fetchedCharacteristics);
    } catch (error) {
      console.error("Error fetching characteristics:", error);
    }
  };

  useEffect(() => {
    
    const arrCharacteristics = characteristics.map(el => ({
      _id: el._id,
      title: el.title,
    }))
    
    setCharacteristicList(arrCharacteristics);
  }, [characteristics]);

  useEffect(() => {

    onUpdate(index, {
      content: questionName,
      options: options.map((option) => ({
        label: option.label,
        checked: option.checked,
        characteristicId: option.characteristicId,
        points: option.points,
      })),
    });
  }, [questionName, options, onUpdate, index]);
  return (
    <div className="question-item">
      <div className="fristWrapper">
        <p className="firstQuestion">{index + 1}</p>
        <input
          className="fristQuestionText"
          contenteditable="true"
          value={questionName}
          required
          onChange={(e) => setQuestionName(e.target.value)}
        />
        <button className="closeButton" onClick={() => onDelete(index)}>
          X
        </button>
      </div>

      <div className="option-container">
        <div className="correct-answer-section" style={{ display: "flex" }}>
          <div>
            {options.map((option, idx) => (
              <CheckboxWithFormControl
                key={idx}
                option={option}
                handleOptionChange={handleOptionChange}
                handleDeleteOption={handleDeleteOption}
                characteristicList={characteristicList}
              />
            ))}
          </div>
        </div>
      </div>
      <FormGroup>
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
    </div>
  );
};
export default MultiChoiceItem;


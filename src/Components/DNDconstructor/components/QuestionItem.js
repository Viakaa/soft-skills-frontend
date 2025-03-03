import React, {useState} from "react";
import Slider from "@mui/material/Slider";

export const QuestionItem = ({question, index, onDelete, onEdit}) => {
  const [isEditing] = useState(false);
  const [editedText, setEditedText] = useState(question);


  return (
    <div className="question-item">
      {isEditing ? (
        <input
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
        />
      ) : (
        <>
          <div className="fristWrapper">
            <p className="firstQuestion">1</p>
            <span className="fristQuestionText">{question}</span>
            <button className="closeButton" onClick={() => onDelete(index)}>
              X
            </button>
          </div>
          <div className="flex">
            <Slider
              className="questionSlider"
              aria-label="Temperature"
              defaultValue={30}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={0}
              max={4}
              sx={{maxWidth: "500px"}}
            />


          </div>
        </>
      )}
    </div>
  );
};
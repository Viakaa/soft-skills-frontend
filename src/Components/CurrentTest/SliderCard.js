import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import { TextField } from "@mui/material";
import './MultipleChoiceCard/quest_cards.css';
const SliderCard = ({ question, number, onAnswerChange }) => {
  const { question: title, characteristics,questionId } = question;

  const [sliderValue, setSliderValue] = useState(0);

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
    
    onAnswerChange(questionId, [newValue]);
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
          style={{ whiteSpace: "normal", wordWrap: "break-word !important",fontSize:'40px !important' }}
        />

        <div className="closeButton" style={{backgroundColor:'#FED799 !important'}} >
          
        </div>
      </div>
        <div></div>
        <div className="flex">
          <Slider
           className="questionSlider"
           aria-label="Temperature"
           valueLabelDisplay="auto"
           step={1}
           marks
           min={0}
           max={characteristics.length-1}
           value={sliderValue}
           onChange={handleSliderChange}
           sx={{ maxWidth: "500px" }}
          />
        </div>
      </>
  );
};

export default SliderCard;

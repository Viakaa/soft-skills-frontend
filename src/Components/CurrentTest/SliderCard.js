import React, { useState } from "react";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";

const SliderCard = ({ question, number, onAnswerChange }) => {
  const { question: title, characteristics,questionId } = question;

  //SLIDER VALUE
  const [sliderValue, setSliderValue] = useState(0);

  //slider change function
  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
    
    onAnswerChange(questionId, [newValue]);
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

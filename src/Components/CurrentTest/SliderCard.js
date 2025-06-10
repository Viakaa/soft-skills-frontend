import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import { TextField } from "@mui/material";
import './quest_cards.css';

const SliderCard = ({ question, number, onAnswerChange }) => {
  const { question: title, characteristics, questionId, sliderMin, sliderMax } = question;

  const [sliderValue, setSliderValue] = useState(sliderMin);

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
        />
      </div>
      <div className="flex">
        <Slider
          className="questionSlider"
          aria-label="Value Range"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={sliderMin}
          max={sliderMax}
          value={sliderValue}
          onChange={handleSliderChange}
          sx={{ maxWidth: "500px", '& .MuiSlider-valueLabel': { color: 'black' } }}
        />
      </div>
    </>
  );
};

export default SliderCard;

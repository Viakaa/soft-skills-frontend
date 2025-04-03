import React, { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import { Select, MenuItem, FormControl } from "@mui/material";
import { MenuProps } from "./MenuProps";

const SliderQuestionItem = ({ characteristics, index, onDelete, onUpdate }) => {
  const [questionName, setQuestionName] = useState("QuestionName");
  const [sliderMin, setSliderMin] = useState(0);
  const [sliderMax, setSliderMax] = useState(4);
  const [characteristicsList, setCharacteristicsList] = useState([]);
  const [characteristicId, setCharacteristicId] = useState("65d70497c56e967ce42b13a1");
  const [mypoints, setPoints] = useState(1);

  useEffect(() => {
    const generatedAnswers = Array.from({ length: sliderMax - sliderMin + 1 }, (_, i) => (sliderMin + i).toString());
    const generatedCharacteristics = generatedAnswers.map((answer) => ({
      characteristicId: characteristicId,
      points: parseInt(answer),
    }));

    onUpdate(index, {
      content: questionName,
      answers: generatedAnswers,
      characteristics: generatedCharacteristics,
    });
  }, [questionName, sliderMin, sliderMax, characteristicId, onUpdate, index]);

  const increaseSliderMax = () => {
    if (sliderMax < 15) {
      setSliderMax(sliderMax + 1);
    }
  };

  const decreaseSliderMax = () => {
    if (sliderMax > sliderMin + 1) {
      setSliderMax(sliderMax - 1);
    }
  };

  const increaseSliderMin = () => {
    if (sliderMin < sliderMax - 1) {
      setSliderMin(sliderMin + 1);
    }
  };

  const decreaseSliderMin = () => {
    if (sliderMin > -15) {
      setSliderMin(sliderMin - 1);
    }
  };

  const handleChangeQuestionName = (e) => setQuestionName(e.target.value);
  const handleChangeCharacteristic = (event) => setCharacteristicId(event.target.value);

  useEffect(() => {
    setCharacteristicsList(characteristics.map(el => ({ _id: el._id, title: el.title })));
  }, [characteristics]);

  return (
    <div className="question-item">
      <div className="fristWrapper">
        <div className="firstQuestion">{index + 1}</div>
        <input
          className="fristQuestionText"
          value={questionName}
          required
          onChange={handleChangeQuestionName}
        />
        <button className="closeButton" onClick={() => onDelete(index)}>X</button>
      </div>
      <div className="flex">
        <button className="closeButton" onClick={decreaseSliderMin}>-</button>
        <span>{sliderMin}</span>
        <button className="closeButton" onClick={increaseSliderMin}>+</button>
        <Slider
          aria-label="Value Range"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={sliderMin}
          max={sliderMax}
          value={mypoints}
          onChange={(e, newValue) => setPoints(newValue)}
          sx={{ maxWidth: "500px", '& .MuiSlider-valueLabel': { color: 'black' } }}
        />
        <button className="closeButton" onClick={decreaseSliderMax}>-</button>
        <span>{sliderMax}</span>
        <button className="closeButton" onClick={increaseSliderMax}>+</button>
      </div>
      <FormControl fullWidth>
        <Select
          displayEmpty
          value={characteristicId}
          onChange={handleChangeCharacteristic}
          renderValue={(selected) => {
            const selectedChar = characteristicsList.find(char => char._id === selected);
            return selectedChar ? selectedChar.title : <em>Choose characteristic</em>;
          }}
          MenuProps={MenuProps}
        >
          <MenuItem disabled value="">
            <em>Choose characteristic</em>
          </MenuItem>
          {characteristicsList.map((char) => (
            <MenuItem key={char._id} value={char._id}>
              {char.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SliderQuestionItem;

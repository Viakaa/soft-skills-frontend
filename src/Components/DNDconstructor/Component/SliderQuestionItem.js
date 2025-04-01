import React, { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import { Select, MenuItem, FormControl} from "@mui/material";
import { MenuProps } from "./MenuProps";

const SliderQuestionItem = ({
  characteristics,
  index,
  onDelete,
  onUpdate,
}) => {
  const [questionName, setQuestionName] = useState("QuestionName");
  const [sliderMax, setSliderMax] = useState(4);
  const [characteristicsList, setCharacteristicsList] = useState([]);
  const [characteristicId, setCharacteristicId] = useState(
    "65d70497c56e967ce42b13a1"
  );
  const [mypoints, setPoints] = useState(1);

  useEffect(() => {
    const generatedAnswers = Array.from({ length: sliderMax + 1 }, (_, i) => i.toString());
    const generatedCharacteristics = generatedAnswers.map((answer) => ({
      characteristicId: characteristicId, 
      points: parseInt(answer),
    }));

    onUpdate(index, {
      content: questionName,
      answers: generatedAnswers,
      characteristics: generatedCharacteristics,
    });
  }, [questionName, sliderMax, onUpdate, index]);

  const increaseSliderMax = () => {
    if (sliderMax < 15) {
      setSliderMax(sliderMax + 1);
    }
  };

  const decreaseSliderMax = () => {
    if (sliderMax > 1) {
      setSliderMax(sliderMax - 1);
    }
  };

  const handleChangeQuestionName = (e) => {
    setQuestionName(e.target.value);
  };

  useEffect(() => {
    const arrCharacteristics = characteristics.map(el => ({
      _id: el._id,
      title: el.title,
    }))

    setCharacteristicsList(arrCharacteristics);
  }, [characteristics]);

  const handleChangeCharacteristic = (event) => {
    setCharacteristicId(event.target.value);
  };

  return (
    <>
    <div className="question-item">
      <div className="fristWrapper">
        <div className="firstQuestion">{index + 1}</div>
        <input
          className="fristQuestionText"
          contentEditable="true"
          value={questionName}
          required
          onChange={handleChangeQuestionName}
        />
        <button className="closeButton" onClick={() => onDelete(index)}>X</button>
      </div>
      <div className="flex">
        <Slider
          aria-label="Maximum Value"
          defaultValue={2}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={0}
          max={sliderMax}
          
          onChange={(e, newValue) => setPoints(newValue)}
          sx={{ maxWidth: "500px" }}
        />
       <div style={{ minWidth: "100px" }}>
            <button
              className="closeButton"
              onClick={decreaseSliderMax}
              disabled={sliderMax <= 1}
            >
              -
            </button>
            <span style={{ marginLeft: "10px", marginRight: "10px" }}>
              {sliderMax}
            </span>
            <button className="closeButton" onClick={increaseSliderMax}>
              +
            </button>
          </div>
      </div>
      <FormControl fullWidth>
          <Select
            displayEmpty
            className="ch_mult_txt"
            value={characteristicId}
            onChange={handleChangeCharacteristic}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Choose characteristic</em>;
              }

              const selectedChar = characteristicsList.find(
                (char) => char._id === selected
              );
              return selectedChar ? (
                selectedChar.title
              ) : (
                <em>Choose characteristic</em>
              );
            }}
            MenuProps={MenuProps}
            inputProps={{ "aria-label": "Without label" }}
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

   
    </>
  );
};

export default SliderQuestionItem;

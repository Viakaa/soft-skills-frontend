import {useDrag} from "react-dnd";
import Slider from "@mui/material/Slider";
import React from "react";
import {ItemTypes} from "./ItemTypes";

export const ExampleQuestion1 = ({question}) => {
  const [{isDragging}, drag] = useDrag(
    () => ({
      
      type: ItemTypes.QUESTION,
      item: {type: "question", content: question},
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [question]
  );

  return (
    <div
      ref={drag}
      className="draggable-question"
      style={{opacity: isDragging ? 0.5 : 1}}
    >
      {question}
      <Slider
        className="questionSlider"
        aria-label="Temperature"
        defaultValue={15}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={0}
        max={4}
        sx={{maxWidth: "500px"}}
        disabled
      />
    </div>
  );
};
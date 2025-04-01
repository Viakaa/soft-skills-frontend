import { useDrag } from 'react-dnd';  
import { ItemTypes } from './ItemTypes'; 
import React from 'react';
import Slider from "@mui/material/Slider";


const DraggableSliderQuestion = ({ content }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.SLIDER,
      item: { type: "slider", content: "" },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [content]
  );

  return (
    <div
      ref={drag}
      className="draggable-question"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {content}
      <Slider
        className="questionSlider"
        aria-label="Temperature"
        defaultValue={4}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={0}
        max={5}
        sx={{ maxWidth: "500px" }}
        disabled
      />
    </div>
  );
};
export default DraggableSliderQuestion;

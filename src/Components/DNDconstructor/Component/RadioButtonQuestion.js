import { useDrag } from 'react-dnd';  
import { ItemTypes } from './ItemTypes'; 
import React from 'react';
import { Radio, RadioGroup, FormControlLabel} from "@mui/material";


const DraggableRadioButton = ({ content }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.RADIO,
      item: { type: "radio", content },
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
      <RadioGroup>
        <FormControlLabel
          value="option1"
          control={<Radio />}
          label="Option 1"
          disabled
        />
        <FormControlLabel
          value="option2"
          control={<Radio />}
          label="Option 2"
          disabled
        />
      </RadioGroup>
    </div>
  );
};
export default DraggableRadioButton;

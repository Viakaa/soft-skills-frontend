import {useDrag} from "react-dnd";
import {FormControlLabel, Radio, RadioGroup} from "@mui/material";
import React from "react";
import {ItemTypes} from "./ItemTypes";

export const DraggableRadioButton = ({content}) => {
  const [{isDragging}, drag] = useDrag(
    () => ({
      
      type: ItemTypes.RADIO,
      item: {type: "radio", content},
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
      style={{opacity: isDragging ? 0.5 : 1}}
    >
      {content}
      <RadioGroup>
        <FormControlLabel
          value="option1"
          control={<Radio/>}
          label="Option 1"
          disabled
        />
        <FormControlLabel
          value="option2"
          control={<Radio/>}
          label="Option 2"
          disabled
        />
        {/* Add more options as needed */}
      </RadioGroup>
    </div>
  );
};
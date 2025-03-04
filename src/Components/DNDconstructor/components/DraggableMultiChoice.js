import {useDrag} from "react-dnd";
import React from "react";
import {ItemTypes} from "./ItemTypes";

export const DraggableMultiChoice = ({content}) => {
   const [{isDragging}, drag] = useDrag(
    () => ({
      type: ItemTypes.MULTI_CHOICE,
      item: {type: "multiple_choice", content},
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
    </div>
  );
};
import {useDrag} from "react-dnd";
import React from "react";
import {ItemTypes} from "./ItemTypes";

export const ExampleQuestion3 = () => {
  const uniqueContent = "New and unique example question";

  const [{isDragging}, drag] = useDrag(
    () => ({
      
      type: ItemTypes.QUESTION,
      item: {type: "question", content: uniqueContent},
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    []
  );

  return (
    <div
      ref={drag}
      className="draggable-question"
      style={{opacity: isDragging ? 0.5 : 1}}
    >
      {uniqueContent}
    </div>
  );
};
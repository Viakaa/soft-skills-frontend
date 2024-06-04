import {useDrag} from "react-dnd";
import React from "react";
import {ItemTypes} from "./ItemTypes";

export const ExampleQuestion2 = ({question}) => {
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
    </div>
  );
};
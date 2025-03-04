import {useDrag} from "react-dnd";
import React from "react";
import {ItemTypes} from "./ItemTypes";

export const DraggableSkillSelector = ({content}) => {
  const [{isDragging}, drag] = useDrag(
    () => ({
      
      type: ItemTypes.SKILL_SELECTOR,
      item: {type: "skillSelector", content},
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

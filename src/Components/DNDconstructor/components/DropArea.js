import {useDrop} from "react-dnd";
import React from "react";
import {ItemTypes} from "./ItemTypes";

export const DropArea = ({onAddItem, items}) => {
  const [, drop] = useDrop(
    () => ({
      accept: [
        ItemTypes.QUESTION,
        ItemTypes.TEXT_AREA,
        ItemTypes.RADIO,
        ItemTypes.MULTI_CHOICE,
        ItemTypes.SKILL_SELECTOR,
        ItemTypes.YES_NO_QUESTION,
      ],
      drop: (item, monitor) => {
        if (item.type === ItemTypes.TEXT_AREA) {
          onAddItem({type: ItemTypes.TEXT_AREA, content: ""});
        } else if (item.type === ItemTypes.RADIO) {
          onAddItem({type: ItemTypes.RADIO, content: "New radio question"});
        } else if (item.type === ItemTypes.MULTI_CHOICE) {
          onAddItem({
            type: ItemTypes.MULTI_CHOICE,
            content: "New multiple-choice question",
          });
        } else if (item.type === ItemTypes.SKILL_SELECTOR) {
          onAddItem({
            type: ItemTypes.SKILL_SELECTOR,
            content:
              "Select the categories of soft skills that will be used in the test.",
          });
        } else if (item.type === ItemTypes.YES_NO_QUESTION) {
          onAddItem({
            
            type: ItemTypes.YES_NO_QUESTION,
            content: "A long text of question or statement.",
          });
        } else {
          onAddItem({
            
            type: ItemTypes.QUESTION,
            content: "Enter the text of your question.",
          });
        }
      },
    }),
    [onAddItem]
  );

  return (
    <div ref={drop} className="drop-area">
      Drop here to add a question
    </div>
  );
};
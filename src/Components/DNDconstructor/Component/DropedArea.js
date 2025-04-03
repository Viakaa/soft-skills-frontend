import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";

const DropArea = ({ onAddItem }) => {
  const [, drop] = useDrop(
    () => ({
      accept: Object.values(ItemTypes),
      drop: (item) => {
        console.log("Dropped item:", item); 

        if (item.type === ItemTypes.YES_NO_QUESTION) {
          onAddItem({
            type: ItemTypes.YES_NO_QUESTION,
            content: "",
            answers: ["", ""],
            characteristics: [
              { id: null, title: "" },
              { id: null, title: "" },
            ],
          });
        } else if (item.type === ItemTypes.MULTI_CHOICE) {
          onAddItem({
            type: ItemTypes.MULTI_CHOICE,
            content:  item.content,
            answers: [],
            characteristics: [],
          });
        } else if (item.type === ItemTypes.SLIDER) {
          onAddItem({
            type: ItemTypes.SLIDER,
            content: "",
            answers: [],
            characteristics: [],
          });
        } else if (item.type === ItemTypes.RADIO) {
          onAddItem({
            type: ItemTypes.RADIO,
            content: "",
            answers: [],
            characteristics: [],
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

export default DropArea;

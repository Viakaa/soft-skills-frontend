import { useDrag } from 'react-dnd';  
import { ItemTypes } from './ItemTypes'; 

const DraggableYesNoQuestion = ({ content }) => {
  const [{ isDragging }, drag] = useDrag  (
    () => ({
      type: ItemTypes.YES_NO_QUESTION,
      item: { type: "yes_no", content: "ABC" },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [content]
  );

  return (
    <div ref={drag} className="draggable-question" style={{ opacity: isDragging ? 0.5 : 1 }}>
      {content}
    </div>
  );
};
export default DraggableYesNoQuestion;

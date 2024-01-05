import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import './DNDconstructor.css';

const ItemTypes = {
  QUESTION: 'question',
  TEXT_AREA: 'textArea',
};

// Draggable example question in the side panel
const ExampleQuestion = ({ question }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.QUESTION,
    item: { type: 'question', content: question }, // Include the question text here
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [question]);

  return (
    <div ref={drag} className="draggable-question" style={{ opacity: isDragging ? 0.5 : 1 }}>
      {question}
    </div>
  );
};


// Central drop area for adding questions
const DropArea = ({ onAddItem,items }) => {
  const [, drop] = useDrop(() => ({
    accept: [ItemTypes.QUESTION, ItemTypes.TEXT_AREA],
    drop: (item, monitor) => {
      if (item.type === 'textArea') {
        onAddItem({ type: 'textArea', content: '' });
      } else {
        onAddItem({ type: 'question', content: "Enter the text of your question." });
      }
    },
  }), [onAddItem]);

  return (
    <div ref={drop} className="drop-area">
      Drop here to add a question
    </div>
  );
};

// Main App component
// ... (previous imports and ItemTypes declaration)

// QuestionItem component for individual questions
const QuestionItem = ({ question, index, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(question);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(index, editedText);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="question-item">
      {isEditing ? (
        <input
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
        />
      ) : (
        <>
          <div className='fristWrapper'>
            <p className='firstQuestion'>1</p>
            <span className='fristQuestionText'>{question}</span>
          </div>
          <Slider className='questionSlider'
            aria-label="Temperature"
            defaultValue={30}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={4}
            sx={{maxWidth: "500px", marginLeft: "22%"}}
          />
        </>
      )}
      
    </div>
  );
};
const TextAreaItem = ({ item, index, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(item.content);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(index, editedText);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="text-area-item">
      {isEditing ? (
        <textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
        />
      ) : (
        <textarea disabled>{item.content}</textarea>
      )}
      <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
      <button onClick={() => onDelete(index)}>Delete</button>
    </div>
  );
};


// ... (ExampleQuestion and DropArea components)

function DNDconstructor() {
  const [items, setItems] = useState([]);

  const addItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const deleteItem = (index) => {
    setItems(items.filter((_, idx) => idx !== index));
  };

  const editItem = (index, newContent) => {
    setItems(items.map((item, idx) => {
      if (idx === index) {
        return { ...item, content: newContent };
      }
      return item;
    }));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <aside className="side-panel">
          <ExampleQuestion question="Drag this example question" />
        </aside>
        <main className="main-content">
          <div className="item-list">
            {items.map((item, index) => {
              return item.type === 'question' ? (
                <QuestionItem
                  key={index}
                  item={item}
                  index={index}
                  onDelete={deleteItem}
                  question={item.content}
                  onEdit={editItem}
                />
              ) : (
                <TextAreaItem
                  key={index}
                  item={item}
                  index={index}
                  onDelete={deleteItem}
                  onEdit={editItem}
                />
              );
            })}
          </div>
          <DropArea onAddItem={addItem} items={items} />
        </main>
      </div>
    </DndProvider>
  );
}
export default DNDconstructor;
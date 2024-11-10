import React, {useEffect, useState} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import "./DNDconstructor.css";
import axios from "axios";
import {
  DraggableMultiChoice,
  DraggableRadioButton,
  DraggableSkillSelector,
  DraggableYesNoQuestion,
  DropArea,
  ExampleQuestion1,
  MultiChoiceItem,
  QuestionItem,
  RadioButtonItem,
  SkillSelectorItem,
  TextAreaItem,
  YesNoQuestionItem
} from "./components";
import {ItemTypes} from "./components/ItemTypes";

function DNDconstructor() {
  const [items, setItems] = useState([]);

  const addItem = (newItem) => {
    const updatedItems = [...items, { ...newItem, id: Math.random() }];
    setItems(updatedItems);
    localStorage.setItem("dnd-items", JSON.stringify(updatedItems));
  };

  const deleteItem = (index) => {
    const updatedItems = items.filter((_, idx) => idx !== index);
    setItems(updatedItems);
    localStorage.setItem("dnd-items", JSON.stringify(updatedItems));
  };

  const editItem = (indexToEdit, newContent) => {
    setItems(
      items.map((item, index) => {
        if (index === indexToEdit) {
          return { ...item, content: newContent };
        }
        return item;
      })
    );
  };

  const [testTitle, setTestTitle] = useState("");

  const handleCreateTest = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      const savedItems = JSON.parse(localStorage.getItem("dnd-items")) || [];

      // Add each question to the database and collect their IDs
      const questionPromises = savedItems.map((item) =>
        axios.post(
          "http://ec2-34-239-91-8.compute-1.amazonaws.com/questions",
          {
            question: "Question",
            type: item.type,
            category: "communication",
            points: 3,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        )
      );

      // Wait for all questions to be added
      const questionResponses = await Promise.all(questionPromises);

      // Extract IDs from the responses
      const questionIds = questionResponses.map((res) => res.data._id);

      // Create the test with the question IDs
      const testResponse = await axios.post(
        "http://ec2-34-239-91-8.compute-1.amazonaws.com/tests",
        {
          title: testTitle,
          questions: questionIds,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log("Test created:", testResponse.data);

      // Remove items from local storage and clear them from the dragged area
      localStorage.removeItem("dnd-items");
      setItems([]); // This line clears the dragged area
      setTestTitle("");
    } catch (error) {
      console.error("Error creating test:", error);
    }
  };

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("dnd-items"));
    if (savedItems) {
      setItems(savedItems);
    }
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <aside className="side-panel">
          <ExampleQuestion1 question="Click and drag this Slider." />
          <DraggableYesNoQuestion content="Drag this 'Yes/No' question format." />
          <DraggableRadioButton content="Apply this radio button format by dragging and dropping." />
          <DraggableMultiChoice content="Multiple-choice format into your questionnaire." />
          <DraggableSkillSelector content="Select and place the soft skill categories." />
        </aside>

        <main className="main-content">
          <input
            className="test_name"
            placeholder="Test title"
            value={testTitle}
            onChange={(e) => setTestTitle(e.target.value)}
          />

          <div className="item-list">
            {items.map((item, index) => {
              if (item.type === ItemTypes.YES_NO_QUESTION) {
                return (
                  <YesNoQuestionItem
                    key={item.id}
                    content={item.content}
                    index={index}
                    onDelete={deleteItem}
                  />
                );
              }

              if (item.type === ItemTypes.SKILL_SELECTOR) {
                return (
                  <SkillSelectorItem
                    key={item.id}
                    content={item.content}
                    index={index}
                    onDelete={deleteItem}
                  />
                );
              }
              if (item.type === "question") {
                return (
                  <QuestionItem
                    key={item.id} // Use the unique id for the key
                    item={item}
                    index={index}
                    onDelete={deleteItem}
                    question={item.content}
                    onEdit={editItem}
                  />
                );
              } else if (item.type === "radio") {
                console.log(item.type);

                return (
                  <RadioButtonItem
                    key={item.id} // Use the unique id for the key
                    content={item.content}
                    index={index}
                    onDelete={deleteItem}
                  />
                );
              } else if (item.type === "multiChoice") {
                console.log(item.type);
                return (
                  <MultiChoiceItem
                    key={item.id}
                    content={item.content}
                    index={index}
                    onDelete={deleteItem}
                  />
                );
              } else {
                return (
                  <TextAreaItem
                    key={item.id}
                    item={item}
                    index={index}
                    onDelete={deleteItem}
                    onEdit={editItem}
                  />
                );
              }
            })}
          </div>
          <DropArea onAddItem={addItem} items={items} />
          <button onClick={handleCreateTest}>Create Test</button>
        </main>
      </div>
    </DndProvider>
  );
}

export default DNDconstructor;
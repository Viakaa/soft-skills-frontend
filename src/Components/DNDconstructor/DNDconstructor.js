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
    const updatedItems = items.map((item, index) => 
      index === indexToEdit ? { ...item, content: newContent } : item
    );
    setItems(updatedItems);
    localStorage.setItem("dnd-items", JSON.stringify(updatedItems));
  };
  

  const [testTitle, setTestTitle] = useState("");

 const handleCreateTest = async () => {
  try {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      console.error("Auth token is missing.");
      return;
    }

    const characteristicsResponse = await axios.get(
      "http://ec2-13-60-83-13.eu-north-1.compute.amazonaws.com:3000/characteristics",
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json"
        },
      }
    );

    const characteristics = characteristicsResponse.data;
    if (!characteristics.length) {
      console.error("No characteristics found.");
      return;
    }

    const characteristicId = characteristics[0]._id;

    const savedItems = JSON.parse(localStorage.getItem("dnd-items")) || [];

    const questionPromises = savedItems.map((item) => {
      if (!["multiple_choice", "yes_no", "slider", "radio"].includes(item.type)) {
        console.error(`Invalid question type: ${item.type}`);
        return Promise.reject(new Error("Invalid question type"));
      }

      return axios.post(
        "http://ec2-13-60-83-13.eu-north-1.compute.amazonaws.com:3000/questions",
        {
          question: item.content || "Default question",
          type: item.type,
          answers: item.answers || ["Option 1", "Option 2"],
          correctAnswers: item.correctAnswers || [true, false],
          characteristics: [
            {
              characteristicId: characteristicId, 
              points: 5,
            }
          ]
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json"
          },
        }
      );
    });

    const questionResponses = await Promise.all(questionPromises);
    const questionIds = questionResponses.map((res) => res.data._id);

    const testResponse = await axios.post(
      "http://ec2-13-60-83-13.eu-north-1.compute.amazonaws.com:3000/tests",
      {
        title: testTitle || "Untitled Test",
        questions: questionIds,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json"
        },
      }
    );

    console.log("Test created:", testResponse.data);

    localStorage.removeItem("dnd-items");
    setItems([]);
    setTestTitle("");
  } catch (error) {
    console.error("Error creating test:", error.response?.data || error.message);
  }
};

  
  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("dnd-items")) || [];
    setItems(savedItems);
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
                    key={item.id} 
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
                    key={item.id} 
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
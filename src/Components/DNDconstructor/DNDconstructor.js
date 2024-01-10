import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Slider from "@mui/material/Slider";
import "./DNDconstructor.css";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { Checkbox, FormGroup } from "@mui/material";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckIcon from "@mui/icons-material/Check";
import RemoveIcon from "@mui/icons-material/Remove";
import SearchIcon from "@mui/icons-material/Search";
import axios from 'axios';


const ItemTypes = {
  QUESTION: "question",
  TEXT_AREA: "textArea",
  RADIO: "radio",
  MULTI_CHOICE: "multiChoice",
  SKILL_SELECTOR: "skillSelector",
  YES_NO_QUESTION: "yesNoQuestion",
};

const ExampleQuestion1 = ({ question }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.QUESTION,
      item: { type: "question", content: question },
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
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {question}
      <Slider
        className="questionSlider"
        aria-label="Temperature"
        defaultValue={15}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={0}
        max={4}
        sx={{ maxWidth: "500px" }}
      />
    </div>
  );
};

// SkillSelectorItem component

const SkillSelectorItem = ({ content, index, onDelete }) => {
  const [skills, setSkills] = useState([
    "Soft skill one",
    "Soft skill one two",
    "Soft skill one two one",
    "Soft skill one hundred",
  ]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleSkillChange = (event) => {
    // Prevent selecting the same skill more than once
    if (!selectedSkills.includes(event.target.value)) {
      setSelectedSkills([...selectedSkills, event.target.value]);
    }
  };

  const handleDeleteSkill = (skillToDelete) => {
    setSelectedSkills(
      selectedSkills.filter((skill) => skill !== skillToDelete)
    );
  };

  return (
    <div className="question-item">
      <div className="fristWrapper">
        <p className="firstQuestion">{index + 1}</p>
        <span className="fristQuestionText">{content}</span>
        <button className="closeButton" onClick={() => onDelete(index)}>
          X
        </button>
      </div>
      <FormControl fullWidth>
        {/* <InputLabel id="skill-selector-label">{content}</InputLabel> */}
        <Select
          // labelId="skill-selector-label"
          id="skill-selector"
          value=""
          onChange={handleSkillChange}
          label={content}
          renderValue={() => ""}
          endAdornment={
            <IconButton
              edge="end"
              size="small"
              style={{
                position: "absolute",
                right: "3px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "#DBDFF4",
                borderRadius: "5px",
                padding: "10px",
                fontSize: "30px",
                color: "#384699",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="33"
                viewBox="0 0 34 33"
                fill="none"
              >
                <path
                  d="M3 16.5H31"
                  stroke="#384699"
                  stroke-width="6"
                  stroke-linecap="round"
                />
                <path
                  d="M17 30V3"
                  stroke="#384699"
                  stroke-width="6"
                  stroke-linecap="round"
                />
              </svg>
            </IconButton>
          }
          startAdornment={
            <IconButton
              edge="end"
              size="small"
              style={{
                position: "absolute",
                left: "0",
                top: "50%",
                transform: "translateY(-50%)",
                background: "#DBDFF4",
                borderRadius: "5px",
                padding: "16px 10px",
                fontSize: "30px",
                color: "#384699",
                zIndex: "1000",
              }}
            >
              <SearchIcon />
            </IconButton>
          }
        >
          {skills.map((skill) => (
            <MenuItem key={skill} value={skill} id="searched-item">
              {skill}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <List dense>
        <h2 className="title">Selected skills:</h2>
        {selectedSkills.map((skill) => (
          <div className="item">
            <ListItem
              key={skill}
              secondaryAction={
                <section>
                  <IconButton edge="end" aria-label="delete">
                    <CheckIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteSkill(skill)}
                  >
                    <RemoveIcon sx={{ color: "white" }} />
                  </IconButton>
                </section>
              }
            >
              <ListItemText primary={skill} />
            </ListItem>
          </div>
        ))}
      </List>
    </div>
  );
};

const DraggableSkillSelector = ({ content }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.SKILL_SELECTOR,
      item: { type: "skillSelector", content },
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
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {content}
      {/* This div would contain the layout for your skill selection */}
    </div>
  );
};

const DraggableYesNoQuestion = ({ content }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.YES_NO_QUESTION,
      item: { type: "yesNoQuestion", content },
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
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {content}
    </div>
  );
};

const YesNoQuestionItem = ({ content, index, onDelete }) => {
  // State to track the yes/no answer
  const [answer, setAnswer] = useState(null);

  return (
    <div className="question-item">
      <div className="fristWrapper">
        <div className="firstQuestion">{index + 1}</div>
        <span className="fristQuestionText">{content}</span>
        <button className="closeButton" onClick={() => onDelete(index)}>
          X
        </button>
      </div>
      <div className="yes-no-buttons">
        <Button
          variant="contained"
          onClick={() => setAnswer("yes")}
          sx={{
            backgroundColor: answer === "yes" ? "#1976d2" : "#5061C5", // Change color when selected
            "&:hover": {
              backgroundColor: answer === "yes" ? "#115293" : "#64b5f6", // Darker on hover
            },
            color: "white",
            fontSize: "34px",
            width: "190px",
            height: "41.158px",
            margin: "5px", // Spacing between buttons
            textTransform: "none", // Prevent uppercase transformation
            boxShadow: "none", // No shadow for a flatter appearance
            // Add other styles as needed to match your design
          }}
        >
          Yes
        </Button>
        <Button
          variant="contained"
          onClick={() => setAnswer("no")}
          sx={{
            backgroundColor: answer === "no" ? "#1976d2" : "#5061C5",
            "&:hover": {
              backgroundColor: answer === "no" ? "#115293" : "#64b5f6",
            },
            color: "white",
            width: "190px",
            height: "41.158px",

            fontSize: "34px",
            margin: "5px",
            textTransform: "none",
            boxShadow: "none",
            // Add other styles as needed to match your design
          }}
        >
          No
        </Button>
      </div>
    </div>
  );
};

const DraggableMultiChoice = ({ content }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.MULTI_CHOICE,
      item: { type: "multiChoice", content },
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
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {content}
      {/* <div> Add your multiple choice question layout here</div> */}
    </div>
  );
};

const RadioButtonItem = ({ content, index, onDelete }) => {
  // State to manage the radio options and the selected correct answer
  const [options, setOptions] = useState(["Option 1", "Option 2"]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [correctAnswer1, setCorrectAnswer1] = useState(null);

  // Handler to add a new option
  const handleAddOption = () => {
    const newOption = `Option ${options.length + 1}`;
    setOptions([...options, newOption]);
  };

  // Handler to select the correct answer
  const handleCorrectAnswerChange = (option) => {
    setCorrectAnswer(option);
  };

  const handleCorrectAnswerChange1 = (option) => {
    setCorrectAnswer1(option);
  };

  return (
    <div className="question-item">
      <div className="firstWrapper">
        <p className="firstQuestion">{index + 1}</p>
        <span className="firstQuestionText">{content}</span>
        <button className="closeButton" onClick={() => onDelete(index)}>
          X
        </button>
      </div>
      <div className="flex-container">
        <div className="center">
          <RadioGroup>
            {options.map((option, idx) => (
              <FormControlLabel
                key={idx}
                value={option}
                control={<Radio />}
                label={option}
                labelPlacement="end"
                onChange={() => handleCorrectAnswerChange1(option)}
                checked={correctAnswer1 === option}
              />
            ))}
          </RadioGroup>
          <IconButton color="primary" onClick={handleAddOption} size="small">
            <div className="circlee">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
              >
                <path
                  d="M0 4C0 1.79086 1.79086 0 4 0H19C21.2091 0 23 1.79086 23 4V19C23 21.2091 21.2091 23 19 23H4C1.79086 23 0 21.2091 0 19V4Z"
                  fill="#DBDFF4"
                />
                <path
                  d="M4.13998 11.5H18.4"
                  stroke="#384699"
                  stroke-width="3"
                  stroke-linecap="round"
                />
                <path
                  d="M11.27 18.4V4.60002"
                  stroke="#384699"
                  stroke-width="3"
                  stroke-linecap="round"
                />
              </svg>
            </div>
          </IconButton>
        </div>
        <div className="correct-container">
          <p className="title-choose">Choose correct answer</p>
          {options.map((option, idx) => (
            <IconButton
              key={idx}
              onClick={() => handleCorrectAnswerChange(option)}
              className={correctAnswer === option ? "selected" : ""}
            >
              {correctAnswer === option ? (
                <div className="posiition1">
                  <CheckIcon className="aa" />
                </div>
              ) : (
                <RadioButtonUncheckedIcon className="bb" />
              )}
            </IconButton>
          ))}
        </div>
      </div>
    </div>
  );
};

const DraggableRadioButton = ({ content }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.RADIO,
      item: { type: "radio", content },
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
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {content}
      <RadioGroup>
        <FormControlLabel
          value="option1"
          control={<Radio />}
          label="Option 1"
        />
        <FormControlLabel
          value="option2"
          control={<Radio />}
          label="Option 2"
        />
        {/* Add more options as needed */}
      </RadioGroup>
    </div>
  );
};

const ExampleQuestion2 = ({ question }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.QUESTION,
      item: { type: "question", content: question },
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
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {question}
    </div>
  );
};

const ExampleQuestion3 = () => {
  const uniqueContent = "New and unique example question";

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.QUESTION,
      item: { type: "question", content: uniqueContent },
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
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {uniqueContent}
    </div>
  );
};

// Central drop area for adding questions
const DropArea = ({ onAddItem, items }) => {
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
          onAddItem({ type: ItemTypes.TEXT_AREA, content: "" });
        } else if (item.type === ItemTypes.RADIO) {
          onAddItem({ type: ItemTypes.RADIO, content: "New radio question" });
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

const MultiChoiceItem = ({ content, index, onDelete }) => {
  const [options, setOptions] = useState([
    "Totally disagree",
    "Mostly disagree",
    "Partially disagree",
    // Add more initial options as needed
  ]);
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [correctAnswers1, setCorrectAnswers1] = useState({});

  // Function to add a new checkbox option
  const handleAddOption = () => {
    const newOption = `Option ${options.length + 1}`;
    setOptions([...options, newOption]);
    setCorrectAnswers({ ...correctAnswers, [newOption]: false });
  };

  // Function to handle correct answer selection
  const handleCorrectAnswerChange = (option) => {
    setCorrectAnswers({ ...correctAnswers, [option]: !correctAnswers[option] });
  };

  const handleCorrectAnswerChange1 = (option) => {
    setCorrectAnswers1({
      ...correctAnswers1,
      [option]: !correctAnswers1[option],
    });
  };
  return (
    <div className="question-item">
      <div className="fristWrapper">
        <p className="firstQuestion">{index + 1}</p>
        <span className="fristQuestionText">{content}</span>
        <button className="closeButton" onClick={() => onDelete(index)}>
          X
        </button>
      </div>

      <div className="option-container">
        <FormGroup>
          {options.map((option) => (
            <FormControlLabel
              key={option}
              control={
                <Checkbox
                  checked={correctAnswers1[option] || false}
                  onChange={() => handleCorrectAnswerChange1(option)}
                />
              }
              label={option}
            />
          ))}
          <IconButton onClick={handleAddOption} color="primary" size="small">
            <div className="circlee">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
              >
                <path
                  d="M0 4C0 1.79086 1.79086 0 4 0H19C21.2091 0 23 1.79086 23 4V19C23 21.2091 21.2091 23 19 23H4C1.79086 23 0 21.2091 0 19V4Z"
                  fill="#DBDFF4"
                />
                <path
                  d="M4.13998 11.5H18.4"
                  stroke="#384699"
                  stroke-width="3"
                  stroke-linecap="round"
                />
                <path
                  d="M11.27 18.4V4.60002"
                  stroke="#384699"
                  stroke-width="3"
                  stroke-linecap="round"
                />
              </svg>
            </div>
            {/* <AddCircleOutlineIcon /> */}
          </IconButton>
        </FormGroup>
        <div className="correct-answer-section">
          <p className="title-choose">Choose correct answer</p>
          {options.map((option) => (
            <FormControlLabel
              key={option}
              control={
                <Checkbox
                  checked={correctAnswers[option] || false}
                  onChange={() => handleCorrectAnswerChange(option)}
                  name={option}
                  color="primary"
                />
              }
              // label={option}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

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
          <div className="fristWrapper">
            <p className="firstQuestion">1</p>
            <span className="fristQuestionText">{question}</span>
            <button className="closeButton" onClick={() => onDelete(index)}>
              X
            </button>
          </div>
          <div className="flex">
            <Slider
              className="questionSlider"
              aria-label="Temperature"
              defaultValue={30}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={0}
              max={4}
              sx={{ maxWidth: "500px" }}
            />

            <IconButton
              edge="end"
              size="small"
              style={{
                background: "#DBDFF4",
                borderRadius: "5px",
                padding: "10px",
                fontSize: "30px",
                color: "#384699",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="33"
                viewBox="0 0 34 33"
                fill="none"
              >
                <path
                  d="M3 16.5H31"
                  stroke="#384699"
                  stroke-width="6"
                  stroke-linecap="round"
                />
                <path
                  d="M17 30V3"
                  stroke="#384699"
                  stroke-width="6"
                  stroke-linecap="round"
                />
              </svg>
            </IconButton>
          </div>
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
      <button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button>
      <button onClick={() => onDelete(index)}>Delete</button>
    </div>
  );
};

// ... (ExampleQuestion and DropArea components)

function DNDconstructor() {
  const [items, setItems] = useState([]);

  const addItem = (newItem) => {
    setItems((prevItems) => [
      ...prevItems,
      { ...newItem, id: Math.random() }, // Assign a unique ID to each item
    ]);
  };

  const deleteItem = (index) => {
    setItems(items.filter((_, idx) => idx !== index));
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



  const [testTitle, setTestTitle] = useState('');

  const handleCreateTest = async () => {
    try {
      const authToken = localStorage.getItem('authToken');

      // Filter for Yes/No questions only
      const yesNoQuestions = items.filter(item => item.type === ItemTypes.YES_NO_QUESTION);

      const questionPromises = yesNoQuestions.map(question =>
        axios.post('http://ec2-34-239-91-8.compute-1.amazonaws.com/questions', {
          question: "Question",
          type: 'yes_no',
          category: "communication",
          points:3
        },{
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        })
      );

      // Wait for all questions to be posted
      const questionResponses = await Promise.all(questionPromises);

      // Extract IDs from the responses
      const questionIds = questionResponses.map(res => res.data._id);
      console.log(questionIds);
      // Create the test with the question IDs
      const testResponse = await axios.post('http://ec2-34-239-91-8.compute-1.amazonaws.com/tests', {
        title: testTitle,
        questions: questionIds,
      },{
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      console.log('Test created:', testResponse.data);
    } catch (error) {
      console.error('Error creating test:', error);
    }
  };



  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <aside className="side-panel">
          <ExampleQuestion1 question="Click and drag this Slider." />
          <DraggableYesNoQuestion content="Drag this 'Yes/No' question format." />

          {/* These are additional draggable components that can be uncommented to use */}
          {/* <ExampleQuestion2 question="Grab and move this alternative example question." /> */}
          {/* <ExampleQuestion3 /> */}
          <DraggableRadioButton content="Apply this radio button format by dragging and dropping." />
          <DraggableMultiChoice content="Multiple-choice format into your questionnaire." />
          <DraggableSkillSelector content="Select and place the soft skill categories." />
        </aside>
        
        <main className="main-content">
        <input className='test_name' placeholder='Test title' value={testTitle}
        onChange={e => setTestTitle(e.target.value)}/>

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

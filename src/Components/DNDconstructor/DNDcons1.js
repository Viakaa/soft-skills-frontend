import React, { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Slider from "@mui/material/Slider";
import OutlinedInput from '@mui/material/OutlinedInput';
import { useTheme } from '@mui/material/styles';
import Form from "react-bootstrap/Form";
import "./DNDconstructor.css";
import { Radio, RadioGroup, FormControlLabel, Typography } from "@mui/material";
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
import axios from "axios";

const ItemTypes = {
  QUESTION: "question",
  TEXT_AREA: "textArea",
  RADIO: "radio",
  MULTI_CHOICE: "multiChoice",
  SKILL_SELECTOR: "skillSelector",
  YES_NO_QUESTION: "yesNoQuestion",
};

const DraggableYesNoQuestion = ({ content }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.YES_NO_QUESTION,
      item: { type: "yesNoQuestion", content: "ABC" },
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 0;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      backgroundColor: '#C9D0FB',
      marginLeft: "-13px"
    },
  },
};

const names = [
  'Skill number one',
  'Skill number two',
  'Skill number three',
  'Skill number four',
];

function getStyles(name, personName1, theme) {
  return {
    fontWeight:
      personName1.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function getStyles1(name, personName2, theme) {
  return {
    fontWeight:
      personName2.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}



const YesNoQuestionItem = ({
  content,
  answers,
  points,
  characteristics,
  index,
  onDelete,
  onUpdate,
}) => {
  const [answer, setAnswer] = useState(null);
  const [questionName, setQuestionName] = useState("QuestionName");
  const [yesPoints, setYesPoints] = useState(null); // points for yes
  const [noPoints, setNoPoints] = useState(null); // points for no
  const [characteristicsList, setCharacteristicsList] = useState([]); // characteristics list
  const [selectedYesChar, setSelectedYesChar] = useState(""); // characteristics for yes
  const [selectedNoChar, setSelectedNoChar] = useState("");// characteristics for no

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get("http://ec2-34-239-91-8.compute-1.amazonaws.com/soft-skills", config)
      .then((response) => {
        setCharacteristicsList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching characteristics:", error);
      });
  }, []);

  useEffect(() => {
    onUpdate(index, {
      content: questionName,
      answers: ["Yes", "No"],
      points: [yesPoints, noPoints],
      characteristics: [selectedYesChar, selectedNoChar],
    });
  }, [questionName, yesPoints, noPoints, onUpdate, index]);

  const theme = useTheme();
  const [personName1, setPersonName1] = React.useState([]);
  const [personName2, setPersonName2] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName1(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleChange2 = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName2(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div className="question-item">
      <div className="fristWrapper">
        <div className="firstQuestion">{index + 1}</div>
        <input
          className="fristQuestionText"
          contenteditable="true"
          value={questionName}
          onChange={(e) => setQuestionName(e.target.value)}
        />

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
          }}
        >
          No
        </Button>
      </div>
      <div className="wrapperPointsYN" >
        <Form.Control
          size="sm"
          type="text"
          placeholder="+/- 1"
          className="addPointsYN"
          value={yesPoints}
          onChange={(e) => setYesPoints(Number(e.target.value))}
        />
        <Form.Control
          size="sm"
          type="text"
          placeholder="+/- 1"
          className="addPointsYN"
          value={noPoints}
          onChange={(e) => setNoPoints(Number(e.target.value))}
        />
      </div>
      <div className="categoryDrop">
      <FormControl sx={{
        width: "283px", 
        fontSize: "18px", 
        backgroundColor: "#C9D0FB", 
        borderRadius: "10px", 
        border: "2px solid #384699",
        outline: "none",
        marginLeft: "60px"
      }}>
        <Select
          multiple
          displayEmpty
          value={personName1}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Choose the category of skill</em>;
            }

            return selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
          IconComponent={() => (
            <svg
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 10L12 15L17 10H7Z"
                fill={theme.palette.primary.main}
              />
            </svg>
          )}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={{ 
                fontSize: "18px", 
                backgroundColor: "#C9D0FB", 
                border: `3px solid ${personName1.includes(name) ? 'green' : '#384699'}`, 
                borderRadius: "5px", 
                padding: "4px",
                display: 'flex',
                justifyContent: 'space-between',
                outline: "none",
                marginTop: "5px",
                color: "#000F67",
              }}
              className={personName1.includes(name) ? 'Mui-selected' : ''}
            >
              {name} {personName1.includes(name) && <CheckIcon style={{ color: 'green', marginRight: '5px' }} />}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{
        width: "283px", 
        fontSize: "18px", 
        backgroundColor: "#C9D0FB", 
        borderRadius: "10px", 
        border: "2px solid #384699",
        outline: "none",
        marginLeft: "20px"
      }}>
        <Select
          multiple
          displayEmpty
          value={personName2}
          onChange={handleChange2}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Choose the category of skill</em>;
            }

            return selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
          IconComponent={() => (
            <svg
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 10L12 15L17 10H7Z"
                fill={theme.palette.primary.main}
              />
            </svg>
          )}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={{ 
                fontSize: "18px", 
                backgroundColor: "#C9D0FB", 
                border: `3px solid ${personName2.includes(name) ? 'green' : '#384699'}`, 
                borderRadius: "5px", 
                padding: "4px",
                display: 'flex',
                justifyContent: 'space-between',
                outline: "none",
                marginTop: "5px",
                color: "#000F67",
              }}
              className={personName2.includes(name) ? 'Mui-selected' : ''}
            >
              {name} {personName2.includes(name) && <CheckIcon style={{ color: 'green', marginRight: '5px' }} />}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  </div>
  );
};

// Drop area for adding questions
const DropArea = ({ onAddItem }) => {
  const [, drop] = useDrop(
    () => ({
      accept: Object.values(ItemTypes),
      drop: (item, monitor) => {
        if (item.type === ItemTypes.YES_NO_QUESTION) {
          onAddItem({
            type: ItemTypes.YES_NO_QUESTION,
            content: "",
            answers: ["", ""],
            characteristics: ["", ""],
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

  const updateItem = (index, newItemContent) => {
    const updatedItems = items.map((item, idx) =>
      idx === index ? { ...item, ...newItemContent } : item
    );
    setItems(updatedItems);
    localStorage.setItem("dnd-items", JSON.stringify(updatedItems));
  };
  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("dnd-items")) || [];
    if (savedItems.length > 0) {
      setItems(savedItems);
    }
  }, []);

  const [testTitle, setTestTitle] = useState("");

  const handleCreateTest = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      const savedItems = JSON.parse(localStorage.getItem("dnd-items")) || [];

      const questionPromises = savedItems.map((item) =>
        axios.post(
          "http://ec2-34-239-91-8.compute-1.amazonaws.com/questions",
          {
            question: item.content,
            type: "yes_no", //yes-no type
            answers: item.answers,
            correctAnswers: item.answers.map((answer) => answer === "Yes"), //yes is correct
            characteristics: [
              {
                //characteristicId: item.characteristics[0], //for yes answer
                characteristicId: "65b5c11125f8ef20c3de9ce3",
                points: item.points[0], //points for yes
              },
              {
                characteristicId: "65b5c11125f8ef20c3de9ce3", //for no answer'
                points: item.points[1], //points for no
              },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        )
      );

      const questionResponses = await Promise.all(questionPromises);

      // extract IDs from the responses
      const questionIds = questionResponses.map((res) => res.data._id);

      // map the items to api structure
      const questions = savedItems.map((item) => ({
        question: item.content,
        type: "yes_no", // Assuming all items are yes/no questions
        answers: item.answers,
        correctAnswers: item.answers.map((answer) => answer === "Yes"), // Assuming 'Yes' is always correct
        characteristics: [
          {
            //characteristicId: item.characteristics[0], // Assuming first characteristic is for 'Yes'
            characteristicId: "65b5c11125f8ef20c3de9ce3",
            points: item.points[0], // Assuming first point value is for 'Yes'
          },
          {
            characteristicId: "65b5c11125f8ef20c3de9ce3", // Assuming second characteristic is for 'No'
            points: item.points[1], // Assuming second point value is for 'No'
          },
        ],
      }));
      console.log("quest:", questions);

      // Create the test with the structured questions
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


      localStorage.removeItem("dnd-items");
      setItems([]);
      setTestTitle("");
    } catch (error) {
      console.error("Error creating test:", error);
    }
  };

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("dnd-items"));
    //const savedTitle = localStorage.getItem("dnd-test-title");

    if (savedItems) {
      setItems(savedItems);
    }
    /*if (savedTitle) {
      setTestTitle(savedTitle);
    }*/
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <aside className="side-panel">
          <DraggableYesNoQuestion content="Drag this 'Yes/No' question format." />
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
                    points={item.points}
                    answers={item.answers}
                    index={index}
                    onDelete={deleteItem}
                    onUpdate={updateItem}
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
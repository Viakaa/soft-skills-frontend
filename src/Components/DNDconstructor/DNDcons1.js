import React, { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Slider from "@mui/material/Slider";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useTheme } from "@mui/material/styles";
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
import { Toast } from "react-bootstrap";

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
      backgroundColor: "#C9D0FB",
      marginLeft: "-13px",
    },
  },
};

const names = [
  "Skill number one",
  "Skill number two",
  "Skill number three",
  "Skill number four",
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
  items,
  onDelete,
  onUpdate,
}) => {
  const [answer, setAnswer] = useState(null);
  const [questionName, setQuestionName] = useState("QuestionName");
  const [yesPoints, setYesPoints] = useState(null); // points for yes
  const [noPoints, setNoPoints] = useState(null); // points for no
  const [characteristicsList, setCharacteristicsList] = useState([]); // characteristics list
  const [selectedYesChar, setSelectedYesChar] = useState({ id: "", title: "" });
  const [selectedNoChar, setSelectedNoChar] = useState({ id: "", title: "" });

  const fetchCharacteristics = async (authToken) => {
    try {
      const response = await axios.get(
        "http://ec2-34-239-91-8.compute-1.amazonaws.com/characteristics",
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      const fetchedCharacteristics = response.data.map((char) => ({
        _id: char._id,
        title: char.title,
      }));

      console.log(fetchedCharacteristics);
      setCharacteristicsList(fetchedCharacteristics);
    } catch (error) {
      console.error("Error fetching characteristics:", error);
    }
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      console.error("Auth token is not available.");
      return;
    }
    fetchCharacteristics(authToken);
  }, []);
  //handle yes characteristic
  const handleYesCharChange = (event) => {
    const charId = event.target.value;
    const char = characteristicsList.find((c) => c._id === charId);
    setSelectedYesChar({ id: char._id, title: char.title });
  };

  //handle no characteristic

  const handleNoCharChange = (event) => {
    const charId = event.target.value;
    const char = characteristicsList.find((c) => c._id === charId);
    setSelectedNoChar({ id: char._id, title: char.title });
  };

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
    setPersonName1(typeof value === "string" ? value.split(",") : value);
  };

  const handleChange2 = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName2(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div className="question-item">
      <div className="fristWrapper">
        <div className="firstQuestion">{index + 1}</div>
        <input
          className="fristQuestionText"
          contenteditable="true"
          value={questionName}
          required
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
          className="yesno_button"
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
          className="yesno_button"
        >
          No
        </Button>
      </div>
      <div className="wrapperPointsYN">
        <Form.Control
          size="sm"
          type="number"
          placeholder="+/- 1"
          className="addPointsYN"
          value={yesPoints}
          onChange={(e) => setYesPoints(Number(e.target.value))}
          required
        />
        <Form.Control
          size="sm"
          type="number"
          placeholder="+/- 1"
          className="addPointsYN"
          value={noPoints}
          onChange={(e) => setNoPoints(Number(e.target.value))}
          required
        />
      </div>
      <div className="categoryDrop d-flex justify-content-around">
        <FormControl style={{ width: "200px" }}>
          <InputLabel id="yes-characteristic-label">
            Yes Characteristic
          </InputLabel>
          <Select
            labelId="yes-characteristic-label"
            value={selectedYesChar ? selectedYesChar.id : ""}
            onChange={handleYesCharChange}
            displayEmpty
            required
          >
            {characteristicsList.map((char) => (
              <MenuItem key={char._id} value={char._id}>
                {char.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl style={{ width: "200px" }}>
          <InputLabel id="no-characteristic-label">
            No Characteristic
          </InputLabel>
          <Select
            labelId="no-characteristic-label"
            value={selectedNoChar ? selectedNoChar.id : ""}
            onChange={handleNoCharChange}
            displayEmpty
            required
          >
            {characteristicsList.map((char) => (
              <MenuItem key={char._id} value={char._id}>
                {char.title}
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
            characteristics: [
              { id: null, title: "" },
              { id: null, title: "" },
            ], // Initialize characteristics for yes and no
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
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

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

      if (!testTitle.trim()) {
        setToastMessage("Please provide a title for the test.");
        setShowToast(true);
        return;
      }
  
      const savedI = JSON.parse(localStorage.getItem("dnd-items")) || [];
      if (savedI.length === 0) {
        setToastMessage("Please add at least one question to the test.");
        setShowToast(true);
        return;
      }

     
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
                characteristicId: item.characteristics[0].id,
                //characteristicId: "65c3adfbfe2b0e98e5ba7374",
                points: item.points[0], //points for yes
              },
              {
                characteristicId: item.characteristics[1].id,

                //characteristicId: "65c3adfbfe2b0e98e5ba7374", //for no answer'
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
      console.log("Questions: ", questionPromises);
      //extract IDs from the responses
      const questionIds = questionResponses.map((res) => res.data._id);

      //map the items to api structure
      const questions = savedItems.map((item) => ({
        question: item.content,
        type: "yes_no", // Assuming all items are yes/no questions
        answers: item.answers,
        correctAnswers: item.answers.map((answer) => answer === "Yes"), // Assuming 'Yes' is always correct
        characteristics: [
          {
            characteristicId: item.characteristics[0].id, // Assuming first characteristic is for 'Yes'
            //characteristicId: "65b5c11125f8ef20c3de9ce3",
            points: item.points[0], // Assuming first point value is for 'Yes'
          },
          {
            characteristicId: item.characteristics[1].id, // Assuming first characteristic is for 'Yes'

            //characteristicId: "65b5c11125f8ef20c3de9ce3", // Assuming second characteristic is for 'No'
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
      setToastMessage("Test successfully created!");
      setShowToast(true);

      localStorage.removeItem("dnd-items");
      setItems([]);
      setTestTitle("");
    } catch (error) {
      console.error("Error creating test:", error);
      
      let errorMessage = "Error creating test: ";
  
      if (error.response) {
        if (error.response.status === 500) {
          errorMessage += "Fill all fields to create the test.";
        } 
        if (error.response.status === 400) {
          errorMessage += "Test title cannot be empty";
        } else {
          errorMessage += ` Status code ${error.response.status}.`;
        }
        
      } else if (error.request) {
        errorMessage += "The request was made but no response was received.";
      } else {
        errorMessage += error.message;
      }
  
      setToastMessage(errorMessage);
      setShowToast(true);
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
                    items={items}
                    onUpdate={updateItem}
                  />
                );
              }
            })}
          </div>
          <DropArea onAddItem={addItem} items={items} />
          <button className="create_test" onClick={handleCreateTest}>
            Create Test
          </button>
        </main>
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            zIndex: 1000,
            backgroundColor: toastMessage.startsWith("Error")
              ? "#f8d7da"
              : "#dff0d8",
          }}
        >
          <Toast.Header
            style={{
              backgroundColor: toastMessage.startsWith("Error")
                ? "#d9534f"
                : "#5cb85c",
              color: "white",
            }}
          >
            <strong className="me-auto">Test Constructor</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </div>
    </DndProvider>
  );
}

export default DNDconstructor;

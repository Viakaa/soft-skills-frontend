import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Form from "react-bootstrap/Form";
import { Select, MenuItem, FormControl} from "@mui/material";
import { MenuProps } from "./MenuProps";

const YesNoQuestionItem = ({
  characteristics,
  index,
  onDelete,
  onUpdate,
}) => {
  const [answer, setAnswer] = useState(null);
  const [questionName, setQuestionName] = useState("QuestionName");
  const [yesPoints, setYesPoints] = useState(1); 
  const [noPoints, setNoPoints] = useState(1);
  const [characteristicsList, setCharacteristicsList] = useState([]);
  const [selectedYesChar, setSelectedYesChar] = useState({
    id: "",
    title: "",
  });
  const [selectedNoChar, setSelectedNoChar] = useState({
    id: "",
    title: "",
  });

  useEffect(() => {

    const arrCharacteristics = characteristics.map(el => ({
      _id: el._id,
      title: el.title,
    }))

    setCharacteristicsList(arrCharacteristics);
    const selectedYesChar = arrCharacteristics.length > 0 
    ? {
        id: arrCharacteristics[0]._id || "",
        title: arrCharacteristics[0].title || ""
      }
    : {
        id: "",
        title: ""
      };
  
  const selectedNoChar = arrCharacteristics.length > 0 
    ? {
        id: arrCharacteristics[0]._id || "",
        title: arrCharacteristics[0].title || ""
      }
    : {
        id: "",
        title: ""
      };
  
  setSelectedYesChar(selectedYesChar);
  setSelectedNoChar(selectedNoChar);
  }, [characteristics]);

  const handleChangeQuestionName = (e) => {
    setQuestionName(e.target.value);
  };

  const handleYesCharChange = (event) => {
    const charId = event.target.value;
    const char = characteristicsList.find((c) => c._id === charId);
    setSelectedYesChar({ id: char._id, title: char.title });
    onUpdate(index, {
      content: questionName,
      answers: ["Так", "Ні"],
      points: [yesPoints, noPoints],
      characteristics: [selectedYesChar, selectedNoChar],
    });
  };

  const handleNoCharChange = (event) => {
    const charId = event.target.value;
    const char = characteristicsList.find((c) => c._id === charId);
    setSelectedNoChar({ id: char._id, title: char.title });
    onUpdate(index, {
      content: questionName,
      answers: ["Так", "Ні"],
      points: [yesPoints, noPoints],
      characteristics: [selectedYesChar, selectedNoChar],
    });
  };

  useEffect(() => {
    onUpdate(index, {
      content: questionName,
      answers: ["Так", "Ні"],
      points: [yesPoints, noPoints],
      characteristics: [selectedYesChar, selectedNoChar],
    });
  }, [questionName, yesPoints, noPoints, onUpdate, index]);

  return (
    <div className="question-item">
      <div className="fristWrapper">
        <div className="firstQuestion">{index + 1}</div>
        <input 
          className="fristQuestionText"
          contenteditable="true"
          value={questionName}
          required
          onChange={handleChangeQuestionName}
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
            backgroundColor: answer === "yes" ? "#1976d2" : "#0000FF", 
            "&:hover": {
              backgroundColor: answer === "yes" ? "#115293" : "#896BB3", 
            },
            color: "white",
            fontSize: "34px",
            width: "190px",
            height: "41.158px",
            margin: "5px", 
            textTransform: "none",
            boxShadow: "none",
          }}
          className="yesno_button"
        >
          Yes
        </Button>

        <Button
          variant="contained"
          onClick={() => setAnswer("no")}
          sx={{
            backgroundColor: answer === "no" ? "#1976d2" : "#0D1119",
            "&:hover": {
              backgroundColor: answer === "no" ? "#115293" : "#896BB3",
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
      <div className="categoryDrop d-flex justify-content-evenly">
        <FormControl style={{ width: "200px" }}>
          <Select
            displayEmpty
            labelId="yes-characteristic-label"
            value={selectedYesChar ? selectedYesChar.id : ""}
            onChange={handleYesCharChange}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Choose characteristic</em>;
              }

              return selectedYesChar.title;
            }}
            className="ch_mult_txt"
            MenuProps={MenuProps}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem disabled value="">
              <em>Виберіть характеристику</em>
            </MenuItem>
            {characteristicsList.map((char) => (
              <MenuItem key={char._id} value={char._id}>
                {char.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl style={{ width: "200px" }}>
          <Select
            displayEmpty
            labelId="yes-characteristic-label"
            value={selectedNoChar ? selectedNoChar.id : ""}
            onChange={handleNoCharChange}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Виберіть характеристику</em>
              }

              return selectedNoChar.title;
            }}
            className="ch_mult_txt"
            MenuProps={MenuProps}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem disabled value="">
            <em>Виберіть характеристику</em>
            </MenuItem>
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
export default YesNoQuestionItem;

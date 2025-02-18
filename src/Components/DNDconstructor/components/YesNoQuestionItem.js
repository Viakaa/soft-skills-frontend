import React, {useState} from "react";
import Button from "@mui/material/Button";
import Form from "react-bootstrap/Form";

export const YesNoQuestionItem = ({content, index, onDelete}) => {
  const [answer, setAnswer] = useState(null);

  return (
    <div className="question-item">
      <div className="fristWrapper">
        <div className="firstQuestion">{index + 1}</div>
        <textarea className="fristQuestionText">{content}</textarea>
        <button className="closeButton" onClick={() => onDelete(index)}>
          X
        </button>
      </div>
      <div className="yes-no-buttons">
        <Button
          variant="contained"
          onClick={() => setAnswer("yes")}
          sx={{
            backgroundColor: answer === "yes" ? "#979EA9" : "#979EA9",
            "&:hover": {
              backgroundColor: answer === "yes" ? "#979EA9" : "#979EA9", 
            },
            color: "white",
            fontSize: "34px",
            width: "190px",
            height: "41.158px",
            margin: "5px", 
            textTransform: "none",
            boxShadow: "none", 

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
      <div className="wrapperPointsYN">
        <Form.Control size="sm" type="text" placeholder="+/- 1" className="addPointsYN"/>
        <Form.Control size="sm" type="text" placeholder="+/- 1" className="addPointsYN"/>
      </div>
      <div className="wrapperSkillChoice">

      </div>
    </div>
  );
};
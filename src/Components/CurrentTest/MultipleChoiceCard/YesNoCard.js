import React,{useState} from "react";
import Button from "@mui/material/Button";

const YesNoCard = ({ question, number, onAnswerChange }) => {
  const { question: title, characteristics } = question;
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  //const [previousAnswer, setPreviousAnswer] = useState(null);

  const handleAnswerSelection = (answer) => {
    if (selectedAnswer !== answer) {
      const newAnswerIndex = answer === 'yes' ? 0 : 1;
      const oldAnswerIndex = selectedAnswer === 'yes' ? 0 : 1;

      //call the onAnswerChange to update the points for the old answer if there was one
      if (selectedAnswer !== null) {
        onAnswerChange(question._id, characteristics[oldAnswerIndex].characteristicId, -characteristics[oldAnswerIndex].points, false);
      }
      //updating points for the new answer
      onAnswerChange(question._id, characteristics[newAnswerIndex].characteristicId, characteristics[newAnswerIndex].points, true);

      setSelectedAnswer(answer);  //UPdate the state to the new answer
    }
    console.log(question);

  };
  

  return (
    <>
      <div className="firstQuestion" style={{ marginRight: "auto" }}>
        {number}
      </div>
      <div
        className="fristQuestionText"
        style={{
          textAlign: "center",
          flexGrow: 1,
          marginTop: "-6%",
          marginBottom: "5%",
        }}
      >
        {title}
      </div>
      <div className="yes-no-buttons">
        <Button
          variant="contained"
          sx={{
            backgroundColor: selectedAnswer === 'yes' ? 'gray' : '#989EA9',
            color: selectedAnswer === 'yes' ? 'white' : 'default',
            
            color: "white",
            fontSize: "34px",
            width: "190px",
            height: "41.158px",
            margin: "5px", // Spacing between buttons
            textTransform: "none", // Prevent uppercase transformation
            boxShadow: "none", // No shadow for a flatter appearance
          }}
          className="yesno_button"
          onClick={() => handleAnswerSelection('yes')}

        >
          Yes
        </Button>

        <Button

          variant="contained"
          sx={{
            backgroundColor: selectedAnswer === 'no' ? 'gray' : '#989EA9',
            color: selectedAnswer === 'no' ? 'white' : 'default',
            width: "190px",
            height: "41.158px",

            fontSize: "34px",
            margin: "5px",
            textTransform: "none",
            boxShadow: "none",
          }}
          className="yesno_button"
          onClick={() => handleAnswerSelection('no')}

        >
          No
        </Button>
      </div>
    </>
  );
};

export default YesNoCard;

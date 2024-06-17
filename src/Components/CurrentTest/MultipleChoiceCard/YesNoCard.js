import React,{useState} from "react";
import Button from "@mui/material/Button";

const YesNoCard = ({ question, number, onAnswerChange }) => {
  const { question: title } = question;
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  //const [previousAnswer, setPreviousAnswer] = useState(null);


  //handle yes/no answer changes
  const handleAnswerSelection = (answer) => {
    const answerIndex = answer === 'yes' ? 0 : 1;
    if (selectedAnswer !== answer) {
      onAnswerChange(question.questionId, [answerIndex], true);
      setSelectedAnswer(answer);
    }
  };
  

  return (
    <>
    <div className="fristWrapper test_q">
        <div className="firstQuestion">{number}</div>
        <input
          className="fristQuestionText d-flex"
          contenteditable="true"
          value={title}
          required
          readOnly
          
        />

        <div className="closeButton" style={{backgroundColor:'#FED799 !important'}} >
          
        </div>
      </div>
      <div className="yes-no-buttons">
        <Button
          variant="contained"
          sx={{
            backgroundColor: selectedAnswer === 'yes' ? 'gray' : '#896BB3',
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
            backgroundColor: selectedAnswer === 'no' ? 'gray' : '#896BB3',
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

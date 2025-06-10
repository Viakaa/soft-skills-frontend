import React,{useState} from "react";
import Button from "@mui/material/Button";
import './quest_cards.css'
import { TextField } from "@mui/material";

const YesNoCard = ({ question, number, onAnswerChange }) => {
  const { question: title } = question;
  const [selectedAnswer, setSelectedAnswer] = useState(null);

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
        <TextField
          className="question_wrap"
          multiline
          readOnly
          InputProps={{
            readOnly: true,
          }}
          value={title}
          required
        />

      </div>
      <div className="yes-no-buttons">
      <Button
        variant="contained"
        className="yesno_button"
        onClick={() => handleAnswerSelection('yes')}
        style={{
          backgroundColor: selectedAnswer === 'yes' ? 'grey' : '#0000FF',
          color: 'white',
        }}
      >
        Так
      </Button>

      <Button
        variant="contained"
        className="yesno_button"
        onClick={() => handleAnswerSelection('no')}
        style={{
          backgroundColor: selectedAnswer === 'no' ? 'grey' : '#000000',
          color: 'white',
        }}
      >
        Ні
      </Button>
      </div>
    </>
  );
};

export default YesNoCard;

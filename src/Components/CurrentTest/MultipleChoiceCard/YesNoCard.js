import React from 'react';
import Button from "@mui/material/Button";

const YesNoCard = ({question, number}) => {

  const {question : title, characteristics } = question;

  return (
    <>
    
    <div className="firstQuestion" style={{ marginRight: 'auto' }}>{number}</div>
        <div className="fristQuestionText" style={{ textAlign: 'center', flexGrow: 1, marginTop:'-6%',marginBottom:'5%' }}>{title}</div>
        <div className="yes-no-buttons">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#5061C5",
              "&:hover": {
                backgroundColor: "#64b5f6",
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
            sx={{
              backgroundColor: "#5061C5",
              "&:hover": {
                backgroundColor: "#64b5f6",
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

    </>
  )
};

export default YesNoCard;

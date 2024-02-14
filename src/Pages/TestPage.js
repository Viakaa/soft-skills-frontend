import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import axios from "axios";
import Button from "@mui/material/Button";
import Form from "react-bootstrap/Form";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const TestPage = () => {
  const {id} = useParams();
  const [test, setTest] = useState({});
  const [questions, setQuestions] = useState([]);

  const getCurrentTest = async (authToken) => {
    try {
      console.log(id)
      const testResp = await axios.get(`http://ec2-34-239-91-8.compute-1.amazonaws.com/tests/${id}`, {
        headers: {Authorization: `Bearer ${authToken}`},
      });

      const questionsData = await Promise.all(
        testResp.data.questions.map(async (questionId) => {
          const questionResp = await axios.get(`http://ec2-34-239-91-8.compute-1.amazonaws.com/questions/${questionId}`, {
            headers: {Authorization: `Bearer ${authToken}`},
          });
          return questionResp.data; // Return the question object.
        })
      );

      setTest(testResp.data);
      setQuestions(questionsData); // Set all questions at once.
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      console.error("Auth token is not available.");
      return;
    }
    getCurrentTest(authToken)
  }, [id]); // Add id as a dependency to useEffect.


  return (
    <div className="main-content">
      <h1 className="test_name">{ test.title }</h1>
      <div className="item-list" style={{overflow: "unset"}}>
        {
          questions.map((question, index) => {
            const {question : title, characteristics } = question;
            
            console.log(question)
            
            return (
            <>
              <div style={{marginTop:'20px'}} className="question-item">
              <div className="firstQuestion" style={{ marginRight: 'auto' }}>{index + 1}</div>
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
             
                
              </div>
              
            </>
          )})
        }
      </div>
      <button style={{marginTop:'20px'}} className="create_test" >
            Complete Test
          </button>
    </div>
  );
};

export default TestPage;

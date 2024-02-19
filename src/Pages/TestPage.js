import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import axios from "axios";
import Button from "@mui/material/Button";
import Form from "react-bootstrap/Form";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import YesNoCard from "../Components/CurrentTest/MultipleChoiceCard/YesNoCard";
import MultipleChoiceCard from "../Components/CurrentTest/MultipleChoiceCard/MultipleChoiceCard";

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
      <h1 className="test_name">{test.title}</h1>
      <div className="item-list" style={{overflow: "unset"}}>
        {
          questions.map((question, index) => (
            <div key={index} style={{marginTop: '20px'}} className="question-item">
              {
                question.type === "yes_no" ? (
                  <YesNoCard number={index + 1} question={question}/>
                ) : (
                  <MultipleChoiceCard number={index + 1} question={question}/>
                )
              }
            </div>
          ))
        }
      </div>
      <button style={{marginTop: '20px'}} className="create_test">
        Complete Test
      </button>
    </div>
  );
};

export default TestPage;

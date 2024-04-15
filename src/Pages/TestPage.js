import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import axios from "axios";
import Button from "@mui/material/Button";
import Form from "react-bootstrap/Form";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import YesNoCard from "../Components/CurrentTest/MultipleChoiceCard/YesNoCard";
import MultipleChoiceCard from "../Components/CurrentTest/MultipleChoiceCard/MultipleChoiceCard";
import SliderCard from "../Components/CurrentTest/SliderCard";
import RadioCard from "../Components/CurrentTest/RadioCard";



const TestPage = () => {
  const {id} = useParams();
  const [test, setTest] = useState({});
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); //new state to store user's answers
  const [results, setResults] = useState({});

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
          return questionResp.data;
        })
      );

      setTest(testResp.data);
      setQuestions(questionsData);
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
  }, [id]); 

  //check for answer changes
  const handleAnswerChange = (questionId, characteristicId, points, isAdding) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: {
        ...prevAnswers[questionId],
        [characteristicId]: (prevAnswers[questionId] && prevAnswers[questionId][characteristicId] ? prevAnswers[questionId][characteristicId] : 0) + points
      }
    }));
  };
  
  
  

  //summary of characteristics
  const calculateResults = () => {
    const newResults = {};
  
    for (const questionAnswers of Object.values(answers)) {
      for (const [charId, points] of Object.entries(questionAnswers)) {
        if (!newResults[charId]) {
          newResults[charId] = 0;
        }
        newResults[charId] += points;  //add or subtract points based on latest answer
      }
    }
  
    setResults(newResults);
  };
  
  
  

  const handleSubmit = () => {
    calculateResults();
  };

  return (
    <div>
    <div className="main-content">
      <h1 className="test_name">{test.title}</h1>
      <div className="item-list1" style={{overflow: "unset"}}>
        {
          questions.map((question, index) => (
            <div key={index} style={{ marginTop: '20px' }} className="question-item">
              {question.type === "yes_no" && (
                <YesNoCard number={index + 1} question={question} onAnswerChange={handleAnswerChange} />
              )}
              {question.type === "multiple_choice" && (
                <MultipleChoiceCard number={index + 1} question={question} onAnswerChange={handleAnswerChange} />
              )}
              {question.type === "slider" && (
                <SliderCard number={index + 1} question={question} onAnswerChange={handleAnswerChange} />
              )}
              {question.type === "radio" && (
                <RadioCard number={index + 1} question={question} onAnswerChange={handleAnswerChange} />
              )}
            </div>
          ))}
      </div>
      
    </div>
    <div className="d-flex justify-content-center">
    <button style={{marginTop: '20px'}} className="create_test" onClick={handleSubmit}>
        Complete Test
      </button>
      <div>
        {Object.entries(results).map(([charId, points]) => (
          <p key={charId}>{charId} - Points: {points}</p>
        ))}
      </div>
      </div>
    </div>
  );
};

export default TestPage;

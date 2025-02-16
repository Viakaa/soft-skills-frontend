import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import axios from "axios";
import YesNoCard from "../Components/CurrentTest/MultipleChoiceCard/YesNoCard";
import MultipleChoiceCard from "../Components/CurrentTest/MultipleChoiceCard/MultipleChoiceCard";
import SliderCard from "../Components/CurrentTest/SliderCard";
import RadioCard from "../Components/CurrentTest/RadioCard";
import { useNavigate } from 'react-router-dom';

import Toast from 'react-bootstrap/Toast';


const TestPage = () => {
  const {id} = useParams();
  const [test, setTest] = useState({});
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); 
  const [results, setResults] = useState(null);
  const navigate = useNavigate(); 
  const [showCompletionToast, setShowCompletionToast] = useState(false);

  const getCurrentTest = async (authToken) => {
    try {
      console.log(id)
      //get current test
      const testResp = await axios.get(`http://ec2-13-60-83-13.eu-north-1.compute.amazonaws.com:3000/tests/${id}`, {
        headers: {Authorization: `Bearer ${authToken}`},
      });
      //get questions from current test
     
      setTest(testResp.data);
      console.log(testResp.data);

      setQuestions(testResp.data.questions);
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
  const handleAnswerChange = (questionId, selectedIndices) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: selectedIndices
    }));
  };
  
//submit results
const handleSubmit = async (e) => {
  e.preventDefault();

  const formattedAnswers = Object.entries(answers).map(([questionId, indexes]) => ({
    questionId,
    answers: indexes
  }));
  const abcd=[{questionId:"665cfc8c0c58639148265b0d",answers:[0]}]

  setResults(formattedAnswers);
  console.log('Formatted Answers:', formattedAnswers);

  const authToken = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");

  if (!authToken) {
    console.error("Auth token is not available.");
    return;
  }

  if (!userId) {
    console.error("UserId is not available.");
    return;
  }
  
  console.log("abcd",abcd);
  
  const url = `http://ec2-13-60-83-13.eu-north-1.compute.amazonaws.com:3000/users/${userId}/tests/${id}/results`;
  console.log('URL:', url);

  try {
    const response = await axios.post(url, formattedAnswers, {
      headers: { Authorization: `Bearer ${authToken}`}
    });
    
    console.log('Response:', response.data);
    console.log('Results submitted successfully');
    setShowCompletionToast(true);  // Display the completion toast
  } catch (e) {
    console.error('Error submitting results', e);
  }
  
};

useEffect(() => {
  if (showCompletionToast) {
    const timer = setTimeout(() => {
      navigate('/profile');  // Redirect to profile page after the toast hides
    }, 1500);  // Wait for the toast to show for 3 seconds and additional 1 second before navigating
    
    return () => clearTimeout(timer);  // Cleanup the timer
  }
}, [showCompletionToast, navigate]);

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
      <Toast
        onClose={() => setShowCompletionToast(false)}
        show={showCompletionToast}
        delay={3000}
        autohide
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 1000,
          backgroundColor: "#c2323",
        }}
      >
        <Toast.Header style={{ backgroundColor: "green", color: "white" }}>
          <strong className="me-auto">Test Completed</strong>
        </Toast.Header>
        <Toast.Body>Test was successfully completed!</Toast.Body>
      </Toast>
    </div>
    <div className="d-flex justify-content-center">
    <button style={{marginTop: '20px'}} className="create_test" onClick={handleSubmit}>
        Complete Test
      </button>
     
      </div>
    </div>
  );
};

export default TestPage;
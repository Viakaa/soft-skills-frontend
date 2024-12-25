import React, { useEffect, useState } from "react";

const API_URL = "http://ec2-13-60-83-13.eu-north-1.compute.amazonaws.com/tests/67320c98e3d58089a93379db"; 

const BelbinTest = () => {
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzY4MmIwYjEyYmM0MjgxMGI0NzA3ZWYiLCJlbWFpbCI6ImpvaG5kb2VAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzM1MTQ3MzA1LCJleHAiOjE3MzUyMzM3MDV9.4G8s1xifHLuKULnUXOmpAakXzox0_YJdBhmnsPmKUnI"; // JWT token

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await fetch(API_URL, { 
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch test: ${response.statusText}`);
        }

        const data = await response.json();
        setTest(data); 
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchTest();
  }, []); 

  const handleChangePoints = (questionIndex, value) => {
    if (!test) return;

    const updatedQuestions = [...test.questions];
    updatedQuestions[questionIndex].points = value;

    setTest({
      ...test,
      questions: updatedQuestions,
    });
  };

  if (loading) {
    return <div>Loading test...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="test-container">
      <h1>{test.title}</h1>
      {test.questions.length === 0 ? (
        <p>No questions available for this test.</p>
      ) : (
        test.questions.map((question, index) => (
          <div className="question" key={question._id}>
            <p>{question.text || `Question ${index + 1}`}</p>
            <input
              type="number"
              value={question.points || 0}
              min="0"
              max="10"
              onChange={(e) =>
                handleChangePoints(index, parseInt(e.target.value) || 0)
              }
            />
          </div>
        ))
      )}
      <div className="summary">
        <p>
          Total Points:{" "}
          {test.questions.reduce((sum, q) => sum + (q.points || 0), 0)}
        </p>
      </div>
    </div>
  );
};

export default BelbinTest;

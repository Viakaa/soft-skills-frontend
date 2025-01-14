import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './BelbinTest.css';

const API_URL = "http://ec2-13-60-83-13.eu-north-1.compute.amazonaws.com/tests/677ffc10bc648d0df2743ff7";

const BelbinTest = () => {
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzY4MmIwYjEyYmM0MjgxMGI0NzA3ZWYiLCJlbWFpbCI6ImpvaG5kb2VAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzM2Nzk0MjAzLCJleHAiOjE3MzY4ODA2MDN9.kVL6B61toQIQy78rLTvlaPUEPAg2hTTEILsao2gPsPg";

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

  const handleChangePoints = (questionIndex, subQuestionIndex, value) => {
    if (!test) return;

    const updatedQuestions = [...test.questions];
    const updatedSubQuestions = [...updatedQuestions[questionIndex].subQuestions];

    updatedSubQuestions[subQuestionIndex].points = value;

    const totalPointsForQuestion = updatedSubQuestions.reduce(
      (sum, subQuestion) => sum + (subQuestion.points || 0),
      0
    );

    if (totalPointsForQuestion <= 10) {
      updatedQuestions[questionIndex].subQuestions = updatedSubQuestions;

      setTest({
        ...test,
        questions: updatedQuestions,
      });
    }
  };

  const calculateRoles = () => {
    const pointsByRole = {};

    test.questions.forEach((question) => {
      question.subQuestions.forEach((subQuestion) => {
        if (!pointsByRole[subQuestion.role]) {
          pointsByRole[subQuestion.role] = 0;
        }
        pointsByRole[subQuestion.role] += subQuestion.points || 0;
      });
    });

    
    const sortedRoles = Object.entries(pointsByRole)
      .sort((a, b) => b[1] - a[1]) 
      .slice(0, 3); 

    return sortedRoles.map((role) => role[0]); 
  };

  const handleSubmit = () => {
    const topRoles = calculateRoles();
    const pointsForRoles = {};
  
    test.questions.forEach((question) => {
      question.subQuestions.forEach((subQuestion) => {
        if (subQuestion.points && subQuestion.role) {
          if (!pointsForRoles[subQuestion.role]) {
            pointsForRoles[subQuestion.role] = 0;
          }
          pointsForRoles[subQuestion.role] += subQuestion.points;
        }
      });
    });
  
    navigate("/belbinresult", { state: { roles: topRoles, points: pointsForRoles } });
  };
  

  if (loading) {
    return <div>Loading test...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="test-container">
      <h1>{test.title || "Test Title"}</h1>
      <p>Created by: {test.created_by || "Unknown"}</p>

      {test.questions && test.questions.length > 0 ? (
        <div className="horizontal-scroll-container">
          {test.questions.map((question, questionIndex) => {
            const totalPoints = question.subQuestions.reduce(
              (sum, subQuestion) => sum + (subQuestion.points || 0),
              0
            );

            return (
              <div className="question-block" key={question._id || questionIndex}>
                <h3>{question.question || `Question ${questionIndex + 1}`}</h3>
                
                {question.subQuestions && question.subQuestions.length > 0 ? (
                  question.subQuestions.map((subQuestion, subIndex) => (
                    <div className="sub-question" key={subIndex}>
                      <p>{subQuestion.text || `Sub-question ${subIndex + 1}`}</p>
                      <input
                        type="number"
                        value={subQuestion.points || 0}
                        min="0"
                        max="10"
                        onChange={(e) =>
                          handleChangePoints(questionIndex, subIndex, parseInt(e.target.value) || 0)
                        }
                      />
                    </div>
                  ))
                ) : (
                  <p>No sub-questions available.</p>
                )}
                <p className="total-points">Total Points: {totalPoints} / 10</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No questions available for this test.</p>
      )}

      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default BelbinTest;

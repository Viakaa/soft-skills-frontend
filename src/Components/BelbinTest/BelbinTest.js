import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BelbinTest.css";

const API_URL = "http://ec2-13-60-83-13.eu-north-1.compute.amazonaws.com:3000/tests/677ffc10bc648d0df2743ff7";

const BelbinTest = () => {
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);  // State to track the current question being displayed
  const navigate = useNavigate();
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzY4MmIwYjEyYmM0MjgxMGI0NzA3ZWYiLCJlbWFpbCI6ImpvaG5kb2VAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzM4NTIwNjQ5LCJleHAiOjE3Mzg2MDcwNDl9.0eI8nyQJbbW6blqBGfkqfktDUGYiQO51g9H-XXxTVP0";

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

    const handleResize = () => setIsSmallScreen(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleChangePoints = (questionIndex, subQuestionIndex, value) => {
    if (!test) return;

    const updatedQuestions = [...test.questions];
    const updatedSubQuestions = [...updatedQuestions[questionIndex].subQuestions];

    const previousValue = updatedSubQuestions[subQuestionIndex].points || 0;

    // Calculate the total points for the current question block
    const currentTotal = updatedQuestions[questionIndex].subQuestions.reduce((sum, sq) => sum + (sq.points || 0), 0);

    // Ensure the total points in the block don't exceed 10
    if (currentTotal - previousValue + value > 10) {
      return; // Prevent update if total exceeds 10
    }

    // Count how many sub-questions have points assigned in the current question block
    const pointsAssignedCount = updatedQuestions[questionIndex].subQuestions.filter(sq => sq.points > 0).length;

    const newValue = value === previousValue ? undefined : value;

    updatedSubQuestions[subQuestionIndex].points = newValue;
    updatedQuestions[questionIndex].subQuestions = updatedSubQuestions;

    setTest({
      ...test,
      questions: updatedQuestions,
    });
  };

  const handleSubmit = () => {
    navigate("/belbinresult");
  };

  const handleNext = () => {
    if (currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (loading) return <div>Loading test...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="test-container">
      <h1>{test.title || "Test Title"}</h1>
      <p>Created by: {test.created_by || "Unknown"}</p>

      {test.questions && test.questions.length > 0 ? (
        isSmallScreen ? (
          // Mobile version with one question at a time
          <div className="mobile-navigation">
            <button
              className="nav-button"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              ← Previous
            </button>
            <div className="question-block">
              <h3>{test.questions[currentQuestionIndex].question || `Question ${currentQuestionIndex + 1}`}</h3>
              {test.questions[currentQuestionIndex].subQuestions.map((subQuestion, subIndex) => {
                const previousValue = subQuestion.points || 0;
                const remainingPoints = 10 - test.questions[currentQuestionIndex].subQuestions.reduce((sum, sq) => sum + (sq.points || 0), 0) + previousValue;

                return (
                  <div className="sub-question" key={subIndex}>
                    <p>{subQuestion.text || `Sub-question ${subIndex + 1}`}</p>
                    <div className="point-input">
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                        const isSelected = subQuestion.points === num;
                        const isDisabled = num > remainingPoints;

                        return (
                          <button
                            key={num}
                            className={`point-button ${isSelected ? "selected" : ""}`}
                            onClick={() => {
                              if (!isDisabled) handleChangePoints(currentQuestionIndex, subIndex, num);
                            }}
                            style={isDisabled ? { pointerEvents: "none", opacity: 0.5 } : {}}
                          >
                            {num}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              className="nav-button"
              onClick={handleNext}
              disabled={currentQuestionIndex === test.questions.length - 1}
            >
              Next → 
            </button>
          </div>
        ) : (
          <div className="questions-column">
            {test.questions.map((question, index) => {
              const totalPoints = question.subQuestions.reduce((sum, sq) => sum + (sq.points || 0), 0);

              return (
                <div className="question-block" key={index}>
                  <h3>{question.question || `Question ${index + 1}`}</h3>
                  {question.subQuestions.map((subQuestion, subIndex) => {
                    const previousValue = subQuestion.points || 0;
                    const remainingPoints = 10 - totalPoints + previousValue;

                    return (
                      <div className="sub-question" key={subIndex}>
                        <p>{subQuestion.text || `Sub-question ${subIndex + 1}`}</p>
                        <div className="point-input">
                          <input
                            type="number"
                            value={subQuestion.points || 0}
                            min="0"
                            max="10"
                            onChange={(e) =>
                              handleChangePoints(index, subIndex, parseInt(e.target.value) || 0)
                            }
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )
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

import React, { useEffect, useState } from "react";
import './BelbinTest.css';

const API_URL = "http://ec2-13-60-83-13.eu-north-1.compute.amazonaws.com/tests/677ffc10bc648d0df2743ff7";

const BelbinTest = () => {
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState([]); // Store the answers here
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzY4MmIwYjEyYmM0MjgxMGI0NzA3ZWYiLCJlbWFpbCI6ImpvaG5kb2VAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzM2Njc3MDU3LCJleHAiOjE3MzY3NjM0NTd9.d6E7N6Q5mtE1Y_vysRMFV3WSj-i1jbWiP7rj_gmeB6Q"; // JWT token

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

    const subQuestionsWithPoints = updatedSubQuestions.filter(subQuestion => subQuestion.points > 0).length;

    const totalPointsForQuestion = updatedSubQuestions.reduce(
      (sum, subQuestion) => sum + (subQuestion.points || 0),
      0
    );

    if (totalPointsForQuestion <= 10 && subQuestionsWithPoints <= 4) {
      updatedQuestions[questionIndex].subQuestions = updatedSubQuestions;

      setTest({
        ...test,
        questions: updatedQuestions,
      });

      // Update the answers state
      const updatedAnswers = [...answers];
      const answerIndex = updatedAnswers.findIndex(answer => answer.questionId === updatedQuestions[questionIndex]._id);

      if (answerIndex !== -1) {
        updatedAnswers[answerIndex].answers = {
          role: updatedSubQuestions[subQuestionIndex].text,
          value: value,
        };
      } else {
        updatedAnswers.push({
          questionId: updatedQuestions[questionIndex]._id,
          answers: {
            role: updatedSubQuestions[subQuestionIndex].text,
            value: value,
          },
        });
      }

      setAnswers(updatedAnswers);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("YOUR_BACKEND_API_URL", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answers),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit answers: ${response.statusText}`);
      }

      alert("Test submitted successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  const calculateTotalPointsForQuestion = (question) => {
    return question.subQuestions.reduce((sum, subQuestion) => sum + (subQuestion.points || 0), 0);
  };

  const calculateTotalPoints = () => {
    return test.questions.reduce((sum, question) => sum + calculateTotalPointsForQuestion(question), 0);
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
        test.questions.map((question, questionIndex) => (
          <div className="question" key={question._id || questionIndex}>
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

            <div className="question-total">
              <p>Total Points for this block: {calculateTotalPointsForQuestion(question)}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No questions available for this test.</p>
      )}

      <div className="summary">
        <p>Total Points for all questions: {calculateTotalPoints()}</p>
      </div>

      <button onClick={handleSubmit}>Submit Test</button>
    </div>
  );
};

export default BelbinTest;

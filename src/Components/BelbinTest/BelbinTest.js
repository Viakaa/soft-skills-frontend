import React, { useState } from "react";
import belbinData from "./questions.json";
import "./BelbinTest.css"; 

const App = () => {
  const [questions, setQuestions] = useState(
    belbinData.map((block) => ({
      ...block,
      questions: block.questions.map((q) => ({ text: q, points: 0 })), 
    }))
  );

  const calculateTotalPoints = (blockIndex) =>
    questions[blockIndex].questions.reduce((sum, q) => sum + q.points, 0);

  const countFilledQuestions = (blockIndex) =>
    questions[blockIndex].questions.filter((q) => q.points > 0).length;

  const handleChangePoints = (blockIndex, questionIndex, value) => {
    const newQuestions = [...questions];
    const currentBlock = newQuestions[blockIndex];

    const totalPoints = calculateTotalPoints(blockIndex);
    const currentPoints = currentBlock.questions[questionIndex].points;
    const filledCount = countFilledQuestions(blockIndex);

    const isAssigningPoints = value > 0 && currentPoints === 0; 
    if (
      value >= 0 &&
      totalPoints - currentPoints + value <= currentBlock.limit &&
      (!isAssigningPoints || filledCount < 4)
    ) {
      newQuestions[blockIndex].questions[questionIndex].points = value;
      setQuestions(newQuestions);
    }
  };

  return (
    <div className="test-container">
      <h1>Belbin Team Roles Test</h1>
      {questions.map((block, blockIndex) => (
        <div className="question-block" key={blockIndex}>
          <h2>{block.block}</h2>
          {block.questions.map((question, questionIndex) => (
            <div className="question" key={questionIndex}>
              <p>{question.text}</p>
              <div className="input-group">
                <input
                  type="number"
                  value={question.points}
                  onChange={(e) =>
                    handleChangePoints(
                      blockIndex,
                      questionIndex,
                      parseInt(e.target.value) || 0
                    )
                  }
                  min="0"
                  max="10"
                />
              </div>
            </div>
          ))}
          <div className="summary">
            <p>
              Total Points for {block.block}: {calculateTotalPoints(blockIndex)}{" "}
              / {block.limit}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;


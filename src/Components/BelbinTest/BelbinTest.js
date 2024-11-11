import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './BelbinTest.css';
import belbinTestData from './questions.json';

const marks = Array.from({ length: 11 }, (_, i) => ({
  value: i,
  label: `${i}`,
}));

const Question = ({ question, index, categoryIndex, value, updateResponse, isSelected }) => {
  const handleChange = (newValue) => {
    updateResponse(categoryIndex, index, newValue);
  };

  return (
    <Box sx={{ width: '100%', padding: '20px' }}>
      <Typography className='questions_belbin' gutterBottom>{question}</Typography>
      <Slider
        className="slider"
        value={isSelected ? value : 0}
        min={0}
        step={1}
        max={10}
        marks={marks}
        onChange={(e, newValue) => handleChange(newValue)}
        valueLabelDisplay="auto"
        disabled={!isSelected}
      />
    </Box>
  );
};

const BelbinTest = () => {
  const navigate = useNavigate();
  const [responses, setResponses] = useState([]);
  const [categoryScores, setCategoryScores] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState({});
  const [role, setRole] = useState('');
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    if (belbinTestData.length > 0) {
      const initialResponses = belbinTestData.map((category) =>
        Array(category.questions.length).fill(0)
      );
      const initialCategoryScores = belbinTestData.map(() => 0);
      setResponses(initialResponses);
      setCategoryScores(initialCategoryScores);
    }
  }, []);

  const updateResponse = (categoryIndex, questionIndex, newValue) => {
    const newResponses = [...responses];
    newResponses[categoryIndex][questionIndex] = newValue;
    const newCategoryScores = [...categoryScores];
    newCategoryScores[categoryIndex] = newResponses[categoryIndex].reduce((acc, val) => acc + val, 0);

    if (newCategoryScores[categoryIndex] <= 10) {
      setResponses(newResponses);
      setCategoryScores(newCategoryScores);
    }
  };

  const toggleSelect = (categoryIndex, questionIndex) => {
    const selectedCountForCategory = selectedQuestions[categoryIndex]?.filter(Boolean).length || 0;

    if (selectedQuestions[categoryIndex]?.[questionIndex]) {
      setSelectedQuestions((prevSelected) => {
        const newSelected = { ...prevSelected };
        newSelected[categoryIndex][questionIndex] = false;
        return newSelected;
      });
    } else if (selectedCountForCategory < 4) {
      setSelectedQuestions((prevSelected) => {
        const newSelected = { ...prevSelected };
        if (!newSelected[categoryIndex]) newSelected[categoryIndex] = [];
        newSelected[categoryIndex][questionIndex] = true;
        return newSelected;
      });
    }
  };

  const handleSubmit = () => {
    const highestScores = belbinTestData.map((category, categoryIndex) => {
      const categoryResponses = responses[categoryIndex];
      const highestScore = Math.max(...categoryResponses);
      const highestScoreIndex = categoryResponses.indexOf(highestScore);
      return {
        category: category.category,
        question: category.questions[highestScoreIndex],
        score: highestScore,
        questionIndex: highestScoreIndex + 1,
      };
    });

    const roleCount = Array(9).fill(0);

    highestScores.forEach((result) => {
      const questionIndex = result.questionIndex;
      if (questionIndex >= 1 && questionIndex <= 8) {
        roleCount[questionIndex]++;
      }
    });

    const dominantRoleIndex = roleCount.indexOf(Math.max(...roleCount));
    const roleMap = [
      '', 'Coordinator', 'Expert', 'Creator', 'Idea Generator', 'Researcher', 'Diplomat', 'Implementer', 'Specialist',
    ];
    const determinedRole = roleMap[dominantRoleIndex];

    const totalScore = highestScores.reduce((sum, result) => sum + result.score, 0);

    setRole(determinedRole);
    setTotalScore(totalScore);


    navigate('/belbinresult', { state: { role: determinedRole, totalScore } });
  };

  const isSubmitEnabled = belbinTestData.every((category, categoryIndex) => {
    const selectedQuestionsCount = selectedQuestions[categoryIndex]?.filter(Boolean).length || 0;
    return selectedQuestionsCount === 4 && categoryScores[categoryIndex] > 0;
  });

  return (
    <Box className='belbin_main' sx={{ margin: 'auto', width: '70%' }}>
      <Typography className='theme_belbin' variant="h4" component="h1" gutterBottom>
        What Contribution Do I Make to the Team?
      </Typography>
      {belbinTestData.length > 0 && belbinTestData.map((category, categoryIndex) => (
        <div key={categoryIndex}>
          <Typography variant="h5">{category.category}</Typography>
          {category.questions.map((question, questionIndex) => {
            const isSelected = selectedQuestions[categoryIndex]?.[questionIndex] || false;
            return (
              <div key={questionIndex}>
                <Question
                  question={question}
                  index={questionIndex}
                  categoryIndex={categoryIndex}
                  value={responses[categoryIndex] ? responses[categoryIndex][questionIndex] : 0}
                  updateResponse={updateResponse}
                  isSelected={isSelected}
                />
                <button
                  onClick={() => toggleSelect(categoryIndex, questionIndex)}
                  disabled={isSelected && responses[categoryIndex][questionIndex] > 0}
                >
                  {isSelected ? 'Deselect' : 'Select'}
                </button>
              </div>
            );
          })}
          <Typography variant="subtitle1">
            <strong>Category Score:</strong> {categoryScores[categoryIndex]} / 10
          </Typography>
        </div>
      ))}
      <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={handleSubmit} disabled={!isSubmitEnabled}>Submit</button>
      </Box>
    </Box>
  );
};

export default BelbinTest;

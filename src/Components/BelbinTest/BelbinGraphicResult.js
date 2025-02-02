import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './BelbinGraphicResult.css';

const BelbinChart = ({ userId }) => {
  const [data, setData] = useState(null);
  const [dates, setDates] = useState([]);
  const [activeDate, setActiveDate] = useState('2024-06-21');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fakeData = {
          '2024-06-21': {
            implementer: 9,
            coordinator: 8,
            creator: 10,
            generatorOfIdeas: 12,
            researcher: 9,
            expert: 6,
            diplomat: 8,
            specialist: 10,
          },
          '2024-07-15': {
            implementer: 10,
            coordinator: 8,
            creator: 12,
            generatorOfIdeas: 10,
            researcher: 9,
            expert: 7,
            diplomat: 7,
            specialist: 7,
          },
          '2024-08-10': {
            implementer: 11,
            coordinator: 9,
            creator: 10,
            generatorOfIdeas: 8,
            researcher: 8,
            expert: 6,
            diplomat: 9,
            specialist: 9,
          },
          '2024-09-05': {
            implementer: 10,
            coordinator: 8,
            creator: 9,
            generatorOfIdeas: 8,
            researcher: 7,
            expert: 7,
            diplomat: 7,
            specialist: 7,
          },
        };

        setData(fakeData[activeDate]);
        setDates(Object.keys(fakeData));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId, activeDate]);

  if (!data || dates.length === 0) return <p>Loading...</p>;

  const formattedData = Object.entries(data).map(([role, score]) => ({
    role: (() => {
      switch (role) {
        case 'implementer':
          return 'Implementer';
        case 'coordinator':
          return 'Coordinator';
        case 'creator':
          return 'Creator';
        case 'generatorOfIdeas':
          return 'Idea Generator';
        case 'researcher':
          return 'Researcher';
        case 'expert':
          return 'Expert';
        case 'diplomat':
          return 'Diplomat';
        case 'specialist':
          return 'Specialist';
        default:
          return role;
      }
    })(),
    score,
  }));

  const topRoles = formattedData
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((role) => role.role);

  const CustomizedDot = ({ cx, cy, value, payload }) => {
    const { role } = payload; 

    if (topRoles.includes(role)) {
      return (
        <circle cx={cx} cy={cy} r={6} stroke="red" strokeWidth={1} fill="white" />
      );
    }
    return <circle cx={cx} cy={cy} r={4} stroke="green" strokeWidth={1} fill="white" />;
  };

  return (
    <div className="chart-container">
      <div className="chart-section">
        <h2 className="chart-title">Results of Belbin Test</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={formattedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="role" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              dot={<CustomizedDot />}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="date-section">
        {dates.map((date) => (
          <button
            key={date}
            className={`date-item ${date === activeDate ? 'active-date' : ''}`}
            onClick={() => setActiveDate(date)}
          >
            Date: {date}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BelbinChart;

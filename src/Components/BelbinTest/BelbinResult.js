import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import "./BelbinGraphicResult.css";
import "./BelbinResult.css";

 
const BelbinResultPage = () => {
  const { userId } = useParams();
  const { state } = useLocation();
  const [data, setData] = useState(null);
  const [dates, setDates] = useState([]);
  const [activeDate, setActiveDate] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (state && state.tests) {
      console.log("Received state:", state);
      const belbinTests = state.tests.filter((test) => test.type === "belbin");
      const formattedTests = {};

      belbinTests.forEach((test) => {
        if (Array.isArray(test.results)) {
          formattedTests[test.created_at] = test.results.reduce((acc, curr) => {
            acc[curr.role] = curr.value;
            return acc;
          }, {});
        } else {
          console.warn(`Unexpected results format for test:`, test.results);
        }
      });

      const sortedDates = Object.keys(formattedTests).sort(
        (a, b) => new Date(b) - new Date(a)
      );

      setData(formattedTests);
      setDates(sortedDates);
      if (sortedDates.length > 0) {
        setActiveDate(sortedDates[0]);
      }
    } else {
      fetchResults(userId, token);
    }
  }, [state, userId]);

  const fetchResults = async (userId, token) => {
    try {
      const response = await fetch(
        `http://ec2-13-60-83-13.eu-north-1.compute.amazonaws.com:3000/users/${userId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch results: ${response.statusText}`);
      }

      const userData = await response.json();
      console.log("Fetched user data:", userData);

      if (userData && userData.tests) {
        const belbinTests = userData.tests.filter(
          (test) => test.type === "belbin"
        );
        const formattedTests = {};

        belbinTests.forEach((test) => {
          const resultsArray = Array.isArray(test.results)
            ? test.results
            : Object.entries(test.results).map(([role, value]) => ({
                role,
                value
              }));

          formattedTests[test.created_at] = resultsArray.reduce(
            (acc, curr) => {
              acc[curr.role] = curr.value;
              return acc;
            },
            {}
          );
        });

        const sortedDates = Object.keys(formattedTests).sort(
          (a, b) => new Date(b) - new Date(a)
        );

        setData(formattedTests);
        setDates(sortedDates);
        if (sortedDates.length > 0) {
          setActiveDate(sortedDates[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  if (!data || dates.length === 0) return <p>Loading...</p>;

  const formattedData = Object.entries(data[activeDate] || {}).map(
    ([role, score]) => ({
      role,
      score
    })
  );

  const sortedData = [...formattedData].sort((a, b) => b.score - a.score);
  const topRoles = sortedData.slice(0, 3).map((item) => item.role);

  return (
    <div className="chart-container">
      <div className="chart-section">
        <h2 className="chart-title">Results of Test Belbin</h2>
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
              dot={({ cx, cy, payload }) =>
                topRoles.includes(payload.role) ? (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={6}
                    fill="#FDB7EA"
                    stroke="#B7B1F2"
                    strokeWidth={1}
                  />
                ) : (
                  <circle cx={cx} cy={cy} r={5} fill="#8884d8" />
                )
              }
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="date-section">
        <div className="date-scroll-container">
          {dates.map((date) => (
            <button
              key={date}
              className={`date-item ${date === activeDate ? "active-date" : ""}`}
              onClick={() => setActiveDate(date)}
            >
              Date: {new Date(date).toLocaleDateString()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BelbinResultPage;

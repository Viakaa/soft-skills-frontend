import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import "./Results.css"; 

const ResultPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const results = location.state?.results;

  const [characteristics, setCharacteristics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCharacteristics = async () => {
      if (!results || !results.tests) {
        setError("No results found.");
        setLoading(false);
        return;
      }

      const latestTest = results.tests.find(test => test.testId === id);
      const charData = latestTest?.results.characteristics || [];

      if (charData.length === 0) {
        setError("No characteristics found.");
        setLoading(false);
        return;
      }

      try {
        const authToken = localStorage.getItem("authToken");
        const fetchPromises = charData.map(async (char) => {
          const response = await axios.get(
            `http://ec2-13-60-83-13.eu-north-1.compute.amazonaws.com:3000/characteristics/${char.characteristicId}`,
            { headers: { Authorization: `Bearer ${authToken}` } }
          );

          return {
            title: response.data.title,  
            points: char.points
          };
        });

        const characteristicsWithTitles = await Promise.all(fetchPromises);
        setCharacteristics(characteristicsWithTitles);
      } catch (e) {
        console.error("Error fetching characteristics:", e);
        setError("Failed to load characteristic details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacteristics();
  }, [id, results]);

  if (loading) return <div className="loading">Завантаження...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="results-container">
      <h1 className="results-title">Результати Тесту</h1>
      {characteristics.length > 0 ? (
        <div className="results-list">
          {characteristics.map((char, index) => (
            <div className="results-card" key={index}>
              <h3 className="results-title-card">{char.title}</h3>
              <p className="results-points">{char.points} бали</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-results">Характеристики недоступні.</p>
      )}
    </div>
  );
};

export default ResultPage;

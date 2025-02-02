import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "react-bootstrap";
import "./UserTests.css";

export default function UserTests() {
  const [matchedData, setMatchedData] = useState({});
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetchUserResults();
  }, [userId, token]);

  const fetchUserResults = async () => {
    try {
      const userResultsResponse = await axios.get(
        `http://ec2-34-239-91-8.compute-1.amazonaws.com:3000/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userResults = userResultsResponse.data;
      console.log('User Results:', userResults);

      const characteristicsPromises = userResults.characteristics.map(async (char) => {
        try {
          const charResponse = await axios.get(
            `http://ec2-34-239-91-8.compute-1.amazonaws.com:3000/characteristics/${char.characteristicId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          return { ...char, details: charResponse.data };
        } catch (error) {
          console.error(`Error fetching characteristic ID ${char.characteristicId}:`, error);
          return null; 
        }
      });

      const characteristicsDetails = await Promise.all(characteristicsPromises);
      const validCharacteristicsDetails = characteristicsDetails.filter(char => char !== null);

      const organizedData = validCharacteristicsDetails.reduce((acc, char) => {
        const softSkillType = char.details.softSkill.type;
        if (!acc[softSkillType]) {
          acc[softSkillType] = [];
        }
        acc[softSkillType].push({
          title: char.details.title,
          points: char.points,
        });
        return acc;
      }, {});

      setMatchedData(organizedData);
    } catch (error) {
      console.error("Error fetching user results or characteristics:", error);
    }
  };

  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  return (
    <div className="main_wrapper">
      {Object.keys(matchedData).length === 0 ? (
        <div style={{color:'white'}}>No data available</div>
      ) : (
        Object.keys(matchedData).map((softSkill, index) => (
          <div className="test1" key={index}>
            <div className="test1_label">
              <label>{softSkill}</label>
            </div>

            <Carousel>
              {chunkArray(matchedData[softSkill], 4).map((chunk, chunkIndex) => (
                <Carousel.Item key={chunkIndex}>
                  <div className="test1_cards">
                    {chunk.map((char, charIndex) => (
                      <div className="test1_card1" key={charIndex}>
                        <p>{char.title}</p>
                        <p style={{ backgroundColor: "rgba(248, 251, 255, 1)", borderRadius: "10px" }}>
                          {char.points}
                        </p>
                      </div>
                    ))}
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        ))
      )}
    </div>
  );
}


/*
export default function UserTests() {
      const [matchedData, setMatchedData] = useState({});
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("authToken"); 
     
      return (
        <div className="main_wrapper">
       
              <div className="test1" >
                <div className="test1_label">
                  <label>Leadership</label>
                </div>
    
                <Carousel>
                 
                    <Carousel.Item>
                      <div className="test1_cards">
                        <div className="test1_card1">
                          <p>Creativity</p>
                          <p style={{ backgroundColor: "rgba(248, 251, 255, 1)", borderRadius: "10px" }}>
                            5
                          </p>
                        </div>
                        <div className="test1_card1">
                          <p>Communication</p>
                          <p style={{ backgroundColor: "rgba(248, 251, 255, 1)", borderRadius: "10px" }}>
                            12
                          </p>
                        </div>
                        <div className="test1_card1">
                          <p>Empathy</p>
                          <p style={{ backgroundColor: "rgba(248, 251, 255, 1)", borderRadius: "10px" }}>
                            7
                          </p>
                        </div>
                      </div>
                      
                    </Carousel.Item>
                  
             
                </Carousel>
              </div>
     
        </div>
      );
    }*/
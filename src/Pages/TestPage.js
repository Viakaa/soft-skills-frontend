import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import axios from "axios";
import Button from "@mui/material/Button";
import Form from "react-bootstrap/Form";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const TestPage = () => {
  const {id} = useParams();
  const [test, setTest] = useState({});
  const [questions, setQuestions] = useState([]);

  const getCurrentTest = async (authToken) => {
    try {
      console.log(id)
      const resp = await axios.get('http://ec2-34-239-91-8.compute-1.amazonaws.com/tests/' + id,
        {
          headers: {Authorization: `Bearer ${authToken}`},
        });

      for (const id1 of resp.data.questions) {
        const resp = await axios.get('http://ec2-34-239-91-8.compute-1.amazonaws.com/questions/' + id1,
          {
            headers: {Authorization: `Bearer ${authToken}`},
          });
        setQuestions([...questions, resp.data]);
      }

      setTest(resp.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      console.error("Auth token is not available.");
      return;
    }
    getCurrentTest(authToken)
  }, []);


  return (
    <div className="main-content">
      <h1 className="test_name">{ test.title }</h1>
      <div className="item-list" style={{overflow: "unset"}}>
        {
          questions.length &&
          questions.map((question, index) => {
            const {question : title, characteristics } = question;
            
            console.log(question)
            
            return (
            <>
              <div className="question-item">
                <div style={{flexDirection: "column"}} className="fristWrapper">
                  <div className="firstQuestion">{index + 1}</div>
                  <p style={{textAlign: "center"}} className="fristQuestionText">{title}</p>
                </div>
                <div className="yes-no-buttons">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#1976d2", // Change color when selected
                      "&:hover": {
                        backgroundColor: "#115293", // Darker on hover
                      },
                      color: "white",
                      fontSize: "34px",
                      width: "190px",
                      height: "41.158px",
                      margin: "5px", // Spacing between buttons
                      textTransform: "none", // Prevent uppercase transformation
                      boxShadow: "none", // No shadow for a flatter appearance
                    }}
                    className="yesno_button"
                  >
                    Yes
                  </Button>

                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#5061C5",
                      "&:hover": {
                        backgroundColor: "#64b5f6",
                      },
                      color: "white",
                      width: "190px",
                      height: "41.158px",

                      fontSize: "34px",
                      margin: "5px",
                      textTransform: "none",
                      boxShadow: "none",
                    }}
                    className="yesno_button"
                  >
                    No
                  </Button>
                </div>
                <div className="wrapperPointsYN">
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="+/- 1"
                    className="addPointsYN"
                    // value={yesPoints}
                    // onChange={(e) => setYesPoints(Number(e.target.value))}
                    required
                  />
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="+/- 1"
                    className="addPointsYN"
                    // value={noPoints}
                    // onChange={(e) => setNoPoints(Number(e.target.value))}
                    required
                  />
                </div>
                <div className="categoryDrop d-flex justify-content-around">
                  <FormControl style={{width: "200px"}}>
                    <Select
                      labelId="yes-characteristic-label"
                      // value={selectedYesChar ? selectedYesChar.id : ""}
                      // onChange={handleYesCharChange}
                      displayEmpty
                      required
                    >
                      {characteristics.map((char) => (
                        <MenuItem key={char.characteristicsId} value={char.characteristicsId}>
                          {char.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl style={{width: "200px"}}>
                    <Select
                      labelId="no-characteristic-label"
                      // value={selectedNoChar ? selectedNoChar.id : ""}
                      // onChange={handleNoCharChange}
                      displayEmpty
                      required
                    >
                      {characteristics.map((char) => (
                        <MenuItem key={char.characteristicsId} value={char.characteristicsId}>
                          {char.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
            </>
          )})
        }
      </div>
    </div>
  );
};

export default TestPage;

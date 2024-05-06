import "./TestCards.css";
import { Card, Button, Dropdown } from "react-bootstrap";
import DropdownItems from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import axios from "axios";
import React, { useState, useEffect } from "react";

import SecondTestImage from "../../Assets/Images/SecondTestImage.svg";
import ThirdTestImage from "../../Assets/Images/ThirdTestImage.svg";
import FirstTestImage from "../../Assets/Images/newTestImage.png";

export default function TestCards() {
  const [tests, setTests] = useState([]);

  const fetchTests = async (authToken) => {

    try {
      const response = await axios.get(
        "http://ec2-34-239-91-8.compute-1.amazonaws.com/tests",
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      const fetchedTests = response.data.map((test) => ({
        id: test._id, // id of the test

        title: test.title, // test title
      }));
      setTests(fetchedTests);
    } catch (error) {
      console.error("Error fetching tests:", error);
    }
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      console.error("Auth token is not available.");
      return;
    }
    fetchTests(authToken);
  }, []);

  return (
    <>
      <div className="testcards_main">
        <div className="d-flex justify-content-between">
          <p
            style={{
              color: "#292E46",
              backgroundColor: "white",
              textAlign: "center",
              padding: "4px 0px",
              borderRadius: "12px",
              fontWeight: "500",
              fontSize: "40px",
              width: "30%",
              border:'2px solid black',
            }}
          >
            Test Finished: 4
          </p>
          <p
            style={{
              color: "white",
              textAlign: "center",
              padding: "12px 0px",
              borderRadius: "12px",
              fontWeight: "500",
              fontSize: "36px",
              width: "30%",
            }}
          >
            Tests
          </p>
          <div
            style={{ width: "30%" }}
            id="dropdown-basic-button"
            title="Category"
            className="custom-dropdown"
          >
            
          </div>
        </div>
        <div
          className="cards_wrapper d-flex justify-content-center"
        >
          {tests.map((test, index) => (
            <div className="firstCard" key={index}>
              <Card style={{ width: "23rem",height:'36.5rem', backgroundColor: "white" }}>
                <Card.Img style={{marginTop:'-2.1%',marginLeft:'-3.4%', width:'107%'}} variant="top" src={FirstTestImage} />
                <Card.Body className="d-flex flex-column align-items-center">
                  <Card.Title style={{ color: "#292E46", fontWeight: "500" }}>
                    {test.title}
                  </Card.Title>
                  <Card.Text style={{ color: "#292E46",textAlign:'center',fontSize:'13px',paddingLeft:'10%',paddingRight:'10%' }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </Card.Text>
                  <Button
                    href={`/test/${test.id}`}
                    variant="primary"
                    className='start_test_btn'
                    style={{
                      width: "142px",
                      color: "#271B80",
                      fontWeight: "bold",
                   
                      backgroundColor: "#E0E5F4",
                      border: "1px solid #271B80 ",
                      marginTop:'8%'
                    }}
                  >
                    Start
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

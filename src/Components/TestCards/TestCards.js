import "./TestCards.css";
import { Card, Button, Dropdown } from "react-bootstrap";
import DropdownItems from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import axios from "axios";
import React, { useState, useEffect } from "react";

import FirstTestImage from "../../Assets/Images/FirstTestImage.svg";
import SecondTestImage from "../../Assets/Images/SecondTestImage.svg";
import ThirdTestImage from "../../Assets/Images/ThirdTestImage.svg";

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
        title: test.title,
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
              color: "#000F67",
              backgroundColor: "rgba(80, 97, 197, 0.65)",
              textAlign: "center",
              padding: "12px 0px",
              borderRadius: "12px",
              fontWeight: "bold",
              fontSize: "30px",
              width: "30%",
            }}
          >
            Test Finished: 4
          </p>
          <p
            style={{
              color: "#000F67",
              backgroundColor: "rgba(7, 21, 101, 0.14)",
              textAlign: "center",
              padding: "12px 0px",
              borderRadius: "12px",
              fontWeight: "bold",
              fontSize: "30px",
              width: "30%",
            }}
          >
            Tests
          </p>
          <DropdownButton
            style={{ width: "30%" }}
            id="dropdown-basic-button"
            title="Category"
            className="custom-dropdown"
          >
            <Dropdown.Item href="#/action-1" className="custom-dropdown-item">
              Test 1
            </Dropdown.Item>
            <Dropdown.Item href="#/action-2" className="custom-dropdown-item">
              Test 2
            </Dropdown.Item>
            <Dropdown.Item href="#/action-3" className="custom-dropdown-item">
              Test 3
            </Dropdown.Item>
          </DropdownButton>
        </div>
        <div
          className="cards_wrapper d-flex justify-content-center"
          style={{ gap: "100px" }}
        >
          {tests.map((test, index) => (
            <div className="firstCard" key={index}>
              <Card style={{ width: "18rem", backgroundColor: "#271B8066" }}>
                <Card.Img variant="top" src={FirstTestImage} />
                <Card.Body className="d-flex flex-column align-items-center">
                  <Card.Title style={{ color: "white", fontWeight: "bold" }}>
                    {test.title}
                  </Card.Title>
                  <Card.Text style={{ color: "white" }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </Card.Text>
                  <Button
                    variant="primary"
                    style={{
                      height: "38px",
                      width: "138px",
                      color: "#9288D9",
                      fontWeight: "bold",
                      backgroundColor: "#271B80",
                      border: "none",
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

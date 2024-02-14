import { Card, Col, Row, Button, Modal, Form, Toast } from "react-bootstrap";

import axios from "axios";
import React, { useState, useEffect } from "react";
import "./TestList.css";
import uimg from "../../Assets/Images/avatar.png";
function TestList() {
  const [tests, setTests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [editFormData, setEditFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    direction: "",
  });

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      console.error("Auth token is not available.");
      return;
    }
    fetchTests(authToken);
  }, []);

  //get users from database
  const fetchTests = async (authToken) => {
    try {
      const testsResponse = await axios.get(
        "http://ec2-34-239-91-8.compute-1.amazonaws.com/tests",
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      const testsWithData = await Promise.all(
        testsResponse.data.map(async (test) => {
          const questions = await Promise.all(
            test.questions.map(async (questionId) => {
              const questionResponse = await axios.get(
                `http://ec2-34-239-91-8.compute-1.amazonaws.com/questions/${questionId}`,
                {
                  headers: { Authorization: `Bearer ${authToken}` },
                }
              );
              return questionResponse.data; //return question object
            })
          );
          return { ...test, questions };
        })
      );

      setTests(testsWithData); //get tests with all data
    } catch (error) {
      console.error("Error fetching tests:", error);
    }
  };

  //delete test
  const handleDeleteTest = async (testId) => {
    try {
      const authToken = localStorage.getItem("authToken");
      await axios.delete(`http://ec2-34-239-91-8.compute-1.amazonaws.com/tests/${testId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      
      const updatedTests = tests.filter((test) => test._id !== testId); //delete test with testId from ui test state
      setTests(updatedTests);

      setShowToast(true);
    } catch (error) {
      console.error("Error deleting test:", error);
    }
  };

  return (
    <>
      <div className="all_tests text-center" style={{}}>
        <h1>All Tests</h1>
      </div>
      <Row xs={1} md={3} className="g-4">
        {tests.map((test, index) => (
          <Col key={index}>
            <Card
              style={{ height: "200px" }}
              className="flex a_testcard text-center"
            >
              <Card.Body style={{maxHeight:'60px'}}>
                <Card.Title>{test.title}</Card.Title>
                {test.questions.map((question, index) => (
                  <Card.Text key={index}>{question.question}</Card.Text>
                ))}
                
              </Card.Body>
              <Button
                  className="test_edit"
                  variant="primary"
                  onClick={() => handleDeleteTest(test._id)}
                >
                  Delete
                </Button>
            </Card>
          </Col>
        ))}
      </Row>

      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 1000,
          backgroundColor: "#c2323",
        }}
      >
        <Toast.Header style={{ backgroundColor: "#ff7c7c", color: "white" }}>
          <strong className="me-auto">Test Delete</strong>
        </Toast.Header>
        <Toast.Body>Test successfully deleted!</Toast.Body>
      </Toast>
    </>
  );
}

export default TestList;

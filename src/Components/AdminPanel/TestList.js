import { Card, Col, Row, Button, Toast } from "react-bootstrap";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "./TestList.css";
import { Link } from "react-router-dom";

function TestList() {
  const [tests, setTests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      console.error("Auth token is not available.");
      return;
    }
    fetchTests(authToken);
  }, []);

  const fetchTests = async (authToken) => {
    try {
      const testsResponse = await axios.get(
        "http://ec2-13-60-83-13.eu-north-1.compute.amazonaws.com:3000/tests",
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      setTests(testsResponse.data);
    } catch (error) {
      console.error("Error fetching tests:", error);
    }
  };

  // Delete test
  const handleDeleteTest = async (testId) => {
    try {
      const authToken = localStorage.getItem("authToken");
      await axios.delete(
        `http://ec2-13-60-83-13.eu-north-1.compute.amazonaws.com:3000/tests/${testId}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      setTests(tests.filter((test) => test._id !== testId));
      setShowToast(true);
    } catch (error) {
      console.error("Error deleting test:", error);
    }
  };

  return (
    <>
      <div className="all_tests text-center">
        <h1>All Tests</h1>
      </div>
      <Row xs={1} md={3} className="g-4">
        {tests.map((test, index) => (
          <Col key={index}>
            <Card style={{ height: "200px" }} className="flex a_testcard text-center">
              <Card.Body style={{ maxHeight: "60px" }}>
                <Card.Title>{test.title}</Card.Title>
              </Card.Body>
              <div className="d-flex justify-content-around pb-2">
                <Link to={`/test/${test._id}`} className="btn btn-primary">View</Link>
                <Button variant="danger" onClick={() => handleDeleteTest(test._id)}>
                  Delete
                </Button>
              </div>
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
          <strong className="me-auto">Test Deleted</strong>
        </Toast.Header>
        <Toast.Body>Test was deleted!</Toast.Body>
      </Toast>
    </>
  );
}

export default TestList;

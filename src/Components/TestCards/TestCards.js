import "./TestCards.css";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo } from "../../Redux/Actions/userActions.js";
import FirstTestImage from "../../Assets/Images/newTestImage.png";
import DescriptionComponent from "../Description/DescriptionComponent";

export default function TestCards() {
  const Skeleton = () => <div className="skeleton"></div>;

  const [tests, setTests] = useState([]);
  const [showDescription, setShowDescription] = useState(false);
  const [selectedTestId, setSelectedTestId] = useState(null);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const isLoading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  const fetchTests = async (authToken) => {
    try {
      const response = await axios.get(
        "http://ec2-13-60-83-13.eu-north-1.compute.amazonaws.com:3000/tests",
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      const fetchedTests = response.data.map((test) => ({
        id: test._id,
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

  if (isLoading || !userInfo) {
    return <Skeleton />;
  }

  const handleStartClick = (testId) => {
    if (testId === "677ffc10bc648d0df2743ff7") {
      setSelectedTestId(testId);
      setShowDescription(true);
    } else {
      window.location.href = `/test/${testId}`;
    }
  };

  return (
    <>
      <div className="testcards_main">
        <div className="d-flex justify-content-between test-text">
          <p className="testcard_text">Test Finished: {userInfo.tests.length}</p>
          <p className="testcards_test_text">Tests</p>
        </div>
        <div className="cards_wrapper d-flex justify-content-center">
          {tests.map((test) => (
            <div className="firstCard" key={test.id}>
              <Card style={{ width: "23rem", height: "36.5rem", backgroundColor: "white" }}>
                <Card.Img style={{ marginTop: "-2.1%", marginLeft: "-3.4%", width: "107%" }} variant="top" src={FirstTestImage} />
                <Card.Body className="d-flex flex-column align-items-center">
                  <Card.Title style={{ color: "#292E46", fontWeight: "500", textAlign: "center" }}>
                    {test.title}
                  </Card.Title>
                  <Card.Text style={{ color: "#292E46", textAlign: "center", fontSize: "13px", paddingLeft: "10%", paddingRight: "10%" }}>
                    Click "Start" to begin the test and discover your soft skills.
                  </Card.Text>
                  <Button
                    onClick={() => handleStartClick(test.id)}
                    variant="primary"
                    className="start_test_btn"
                    style={{
                      width: "142px",
                      color: "#271B80",
                      fontWeight: "bold",
                      backgroundColor: "#E0E5F4",
                      border: "1px solid #271B80",
                      marginTop: "8%",
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

      {showDescription && <DescriptionComponent show={showDescription} setShow={setShowDescription} />}
    </>
  );
}

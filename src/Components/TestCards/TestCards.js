import "./TestCards.css";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo } from "../../Redux/Actions/userActions.js";
import FirstTestImage from "../../Assets/Images/newTestImage.png";
import DescriptionComponent from "../Description/DescriptionComponent";
import debounce from "lodash.debounce";

export default function TestCards() {
  const Skeleton = () => <div className="skeleton"></div>;

  const [tests, setTests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDescription, setShowDescription] = useState(false);
  const [selectedTestId, setSelectedTestId] = useState(null);

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const isLoading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  const fetchTests = async (authToken, retries = 3, delay = 1000) => {
    try {
      const response = await axios.get(
        "http://ec2-13-60-83-13.eu-north-1.compute.amazonaws.com:3000/tests",
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      const fetchedTests = response.data.map((test) => ({
        id: test._id,
        title: test.title,
      }));

      setTests(fetchedTests);
      localStorage.setItem("tests", JSON.stringify(fetchedTests));
    } catch (error) {
      if (error.response?.status === 429 && retries > 0) {
        console.warn(`Too Many Requests: Retrying in ${delay}ms...`);
        setTimeout(() => fetchTests(authToken, retries - 1, delay * 2), delay);
      } else {
        console.error("Error fetching tests:", error);
      }
    }
  };

  const debouncedFetchTests = useCallback(debounce(fetchTests, 3000), []);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const cachedTests = localStorage.getItem("tests");

    if (!authToken) {
      console.error("Auth token is not available.");
      return;
    }

    if (cachedTests) {
      setTests(JSON.parse(cachedTests));
    } else {
      debouncedFetchTests(authToken);
    }
  }, [debouncedFetchTests]);

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
        <div className="testcards_controls">
          <h2 className="testcards_title">Тести</h2>
          <div className="search_filter_wrapper">
            <div className="searchbar_container">
              <input
                type="text"
                className="searchbar"
                placeholder="Пошук тестів..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
              />
            </div>
          </div>
        </div>

        <div className="cards_wrapper justify-content-center">
          {tests
            .filter((test) => test.title.toLowerCase().includes(searchTerm))
            .map((test) => (
              <div className="firstCard" key={test.id}>
                <Card
                  style={{
                    width: "23rem",
                    height: "36.5rem",
                    backgroundColor: "white",
                  }}
                >
                  <Card.Img
                    style={{
                      marginTop: "-2.1%",
                      marginLeft: "-3.4%",
                      width: "107%",
                    }}
                    variant="top"
                    src={FirstTestImage}
                  />
                  <Card.Body className="flex-column align-items-center">
                    <Card.Title
                      style={{
                        color: "#292E46",
                        fontWeight: "500",
                        textAlign: "center",
                      }}
                    >
                      {test.title}
                    </Card.Title>
                    <Card.Text
                      style={{
                        color: "#292E46",
                        textAlign: "center",
                        fontSize: "13px",
                        paddingLeft: "10%",
                        paddingRight: "10%",
                      }}
                    >
                      Натисніть «Почати», щоб розпочати тест і дізнатися про свої м’які навички
                    </Card.Text>
                    <Button
                      onClick={() => handleStartClick(test.id)}
                      variant="primary"
                      className="start_test_btn"
                    >
                      Почати
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
        </div>
      </div>

      {showDescription && (
        <DescriptionComponent show={showDescription} setShow={setShowDescription} />
      )}
    </>
  );
}

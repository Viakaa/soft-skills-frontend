import "./TestCards.css";
import { Card, Button, Dropdown } from 'react-bootstrap';
import DropdownItems from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


import FirstTestImage from "../../Assets/Images/FirstTestImage.svg";
import SecondTestImage from "../../Assets/Images/SecondTestImage.svg";
import ThirdTestImage from "../../Assets/Images/ThirdTestImage.svg";

export default function TestCards() {
    return (
        <>
        <div className='testcards_main'>
            <div className="cards_wrapper d-flex justify-content-center" style={{ gap: "100px" }}>
                <div className="firstCard">
                    <p style={{color: "#000F67", backgroundColor: "rgba(80, 97, 197, 0.65)", textAlign: "center", padding: "12px 0px", borderRadius: "12px", fontWeight: "bold", fontSize: "30px"}}>Test Finished: 4</p>

                    <Card style={{ width: '18rem', backgroundColor: "#271B8066", }}>
                        <Card.Img variant="top" src={FirstTestImage} />
                        <Card.Body className="d-flex flex-column align-items-center">
                            <Card.Title style={{color: "white", fontWeight: "bold"}}>Test 1</Card.Title>
                            <Card.Text style={{color: "white", }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </Card.Text>
                            <Button variant="primary" style={{ height: '38px', width: '138px', color: "#9288D9", fontWeight: "bold", backgroundColor: "#271B80", border: "none" }}>Start</Button>
                        </Card.Body>
                    </Card>
                </div>

                <div className="secondCard">
                    <p style={{color: "#000F67", backgroundColor: "rgba(7, 21, 101, 0.14)", textAlign: "center", padding: "12px 0px", borderRadius: "12px", fontWeight: "bold", fontSize: "30px"}}>Tests</p>

                    <Card style={{ width: '18rem', backgroundColor: "#3D853D66"}}>
                        <Card.Img variant="top" src={SecondTestImage} />
                        <Card.Body className="d-flex flex-column align-items-center">
                            <Card.Title style={{color: "white", fontWeight: "bold"}}>Test 2</Card.Title>
                            <Card.Text style={{color: "white", }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </Card.Text>
                            <Button variant="primary" style={{ height: '38px', width: '138px', color: "#A2E1A2", fontWeight: "bold", backgroundColor: "#3D853D", border: "none" }}>Start</Button>
                        </Card.Body>
                    </Card>
                </div>

                <div className="thirdCard">
                    <DropdownButton id="dropdown-basic-button" title="Category" className="custom-dropdown">
                        <Dropdown.Item href="#/action-1" className="custom-dropdown-item">Test 1</Dropdown.Item>
                        <Dropdown.Item href="#/action-2" className="custom-dropdown-item">Test 2</Dropdown.Item>
                        <Dropdown.Item href="#/action-3" className="custom-dropdown-item">Test 3</Dropdown.Item>
                    </DropdownButton>

                    <Card style={{ width: '18rem', backgroundColor: "#5061C566" }}>
                        <Card.Img variant="top" src={ThirdTestImage} />
                        <Card.Body className="d-flex flex-column align-items-center">
                            <Card.Title style={{color: "white", fontWeight: "bold"}}>Test 3</Card.Title>
                            <Card.Text style={{color: "white", }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </Card.Text>
                            <Button variant="primary" style={{ height: '38px', width: '138px', color: "#BBC3F4", fontWeight: "bold", backgroundColor: "#5061C5", border: "none" }}>Start</Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            </div>
        </>
    );
}
import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Description.css";
import descriptionData from "./description.json"; 

export default function DescriptionComponent({ show, setShow }) {
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleStartTest = () => {
    handleClose();
    navigate("/test/677ffc10bc648d0df2743ff7");
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="description-modal">
      <Modal.Header >
        <Modal.Title className="modal-title">Belbin Test</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <div className="description-text">
          <h5 className="description-header">About the Belbin Test</h5>
          <p className="modal-text">{descriptionData.description}</p>
        </div>
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <Button variant="secondary" onClick={handleClose} className="close-btn">
          Close
        </Button>
        <Button variant="primary" onClick={handleStartTest} className="start-btn">
          Start Test
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

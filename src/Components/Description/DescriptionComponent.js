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
  const belbinDescription = descriptionData.belbinTest.description;


  return (
    <Modal show={show} onHide={handleClose} centered className="description-modal">
      <Modal.Header >
        <Modal.Title className="modal-title">Тест Белбіна</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <div className="description-text">
          <h5 className="description-header">Про тест белбіна</h5>
          <p className="modal-text">{belbinDescription}</p>
        </div>
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <Button variant="secondary" onClick={handleClose} className="close-btn">
          Закрити
        </Button>
        <Button variant="primary" onClick={handleStartTest} className="start-btn">
          Почати тест
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

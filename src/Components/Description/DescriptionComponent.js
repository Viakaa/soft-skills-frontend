import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Description.css";

export default function DescriptionComponent({ show, setShow, test }) {
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleStartTest = () => {
    handleClose();
    navigate(`/test/${test.id}`);
  };

  if (!test) return null;

  return (
    <Modal show={show} onHide={handleClose} centered className="description-modal">
      <Modal.Header>
        <Modal.Title className="modal-title">{test.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <div className="description-text">
          <h5 className="description-header">Про тест</h5>
          <p className="modal-text">{test.description}</p>
        </div>
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <Button variant="secondary" onClick={handleClose} className="close-btn">
          х
        </Button>
        <Button onClick={handleStartTest} className="start-btn">
          Почати тест
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

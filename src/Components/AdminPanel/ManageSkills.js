import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form, Dropdown } from "react-bootstrap";
import "./ManageSkills.css";
import axios from "axios";

function ManageSkills() {
  const [skills, setSkills] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [characteristics, setCharacteristics] = useState([]);
  const [newSkill, setNewSkill] = useState({
    type: "",
    characteristics: [],
  });
  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => setShowModal(false);

  // Save new soft-skill to database
  const handleSaveSkill = async () => {
    const authToken = localStorage.getItem("authToken");
    try {
      console.log("Attempting to save skill:", newSkill);
      const response = await axios.post(
        "http://ec2-34-239-91-8.compute-1.amazonaws.com/soft-skills",
        newSkill,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      console.log("Skill saved successfully:", response.data);
      handleCloseModal();
      fetchSkills(authToken); // update soft-skills table
    } catch (error) {
      console.error("Error saving skill:", error);
      console.error("Error:", error.message);
    }
  };

  // Handle soft-skill name changes

  const handleSkillChange = (e) => {
    setNewSkill({ ...newSkill, type: e.target.value });
  };

  // Handle characteristic changes
  const handleCharacteristicChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => ({
        characteristicId: option.value,
        title: option.textContent,
      })
    );
    setNewSkill({
      ...newSkill,
      characteristics: selectedOptions,
    });
    console.log(selectedOptions);
  };

  useEffect(() => {
    console.log("newskill");

    console.log(newSkill);
  }, [newSkill]);

  // Get Skills
  const fetchSkills = async (authToken) => {
    try {
      const response = await axios.get(
        "http://ec2-34-239-91-8.compute-1.amazonaws.com/soft-skills",
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      const fetchedSkills = response.data.map((skill) => ({
        title: skill.type,
        characteristics: skill.characteristics.map((c) => c.title), //Taking just name of characteristic
      }));
      setSkills(fetchedSkills);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  // Get characteristics
  const fetchCharacteristics = async (authToken) => {
    try {
      const response = await axios.get(
        "http://ec2-34-239-91-8.compute-1.amazonaws.com/characteristics",
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      const fetchedCharacteristics = response.data.map((char) => ({
        _id: char._id, 
        title: char.title,
      }));

      console.log(fetchedCharacteristics);
      setCharacteristics(fetchedCharacteristics);
    } catch (error) {
      console.error("Error fetching characteristics:", error);
    }
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      console.error("Auth token is not available.");
      return;
    }
    fetchSkills(authToken);
    fetchCharacteristics(authToken);
  }, []);

  return (
    <>
      <Button variant="primary" onClick={handleShowModal}>
        +
      </Button>

      <Table striped bordered hover size="sm" style={{ width: "90%" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Characteristics</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((skill, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{skill.title}</td>
              <td>{skill.characteristics.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Soft Skill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newSkill.type}
                onChange={handleSkillChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Characteristics</Form.Label>
              <Form.Control
                as="select"
                multiple
                onChange={handleCharacteristicChange}
              >
                {characteristics.map((char, index) => (
                  <option key={index} value={char._id}>
                    {char.title}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveSkill}>
            Save Skill
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ManageSkills;

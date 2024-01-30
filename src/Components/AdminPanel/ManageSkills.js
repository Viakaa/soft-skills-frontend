import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import './ManageSkills.css';
import axios from 'axios';

function ManageSkills() {
  const [skills, setSkills] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newSkill, setNewSkill] = useState({ title: '', characteristics: [] });

  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => setShowModal(false);

  const handleNewSkillChange = (e) => {
    setNewSkill({ ...newSkill, [e.target.name]: e.target.value });
  };

  const handleAddSkill = () => {
    setSkills([...skills, newSkill]);
    setNewSkill({ title: '', characteristics: [] }); 
    handleCloseModal();
  };


  useEffect(() => {
    const fetchSkills = async () => {
      const authToken = localStorage.getItem("authToken");
  
      if (!authToken) {
        console.error('Auth token is not available.');
        return;
      }
      console.log(authToken);
  
      try {
        const response = await axios.get(
          "http://ec2-34-239-91-8.compute-1.amazonaws.com/soft-skills",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
  
        const fetchedSkills = response.data.map(skill => ({
          title: skill.type,
          characteristics: skill.characteristics.map(c => c.title),
        }));
  
        setSkills(fetchedSkills);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };
  
    fetchSkills();
  }, []); 
  

  return (
    <>
    
      <Button variant="primary" onClick={handleShowModal}>
        Add New Skill +
      </Button>
    
      <Table striped bordered hover size="sm" style={{ width: '90%' }}>
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
              <td>{skill.characteristics.join(', ')}</td>
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
                value={newSkill.title}
                onChange={handleNewSkillChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Characteristics</Form.Label>
              <Form.Control
                type="text"
                name="characteristics"
                value={newSkill.characteristics}
                onChange={(e) =>
                  setNewSkill({
                    ...newSkill,
                    characteristics: e.target.value.split(','),
                  })
                }
              />
              <Form.Text className="text-muted">
                Enter characteristics separated by commas.
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddSkill}>
            Save Skill
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ManageSkills;

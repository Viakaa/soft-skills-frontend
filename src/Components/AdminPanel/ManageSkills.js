import React, {useState, useEffect} from "react";
import {Button, Modal, Form, Dropdown} from "react-bootstrap";
import "./ManageSkills.css";
import axios from "axios";

import Pencil from "../../Assets/Images/pencil.png";
import Delete from "../../Assets/Images/delete.png";

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
  const [isEditting, setIsEditting] = useState(false);
  const [skillToEdit, setSkillToEdit] = useState({});

  const handleEditSkill = (skill) => {
    setIsEditting(true);
    setSkillToEdit(skill);
    setShowModal(true);
    setNewSkill({
      type: skill.title,
      characteristics: skill.characteristics.map((c) => ({
        characteristicId: c,
        title: c,
      })),
    });
  };

  const handleEditSaveSkill = async () => {
    const authToken = localStorage.getItem("authToken");

    try {
      console.log("Attempting to edit skill:", newSkill);
      const response = await axios.patch(
        `http://ec2-34-239-91-8.compute-1.amazonaws.com/soft-skills/${skillToEdit.id}`,
        newSkill,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      console.log("Skill edited successfully:", response.data);
      handleCloseModal();
      fetchSkills(authToken); //update soft-skills table
      setIsEditting(false);
    } catch (error) {
      console.error("Error editing skill:", error);
      console.error("Error:", error.message);
    }
  };

  const handleDeleteSkill = async (_id) => {
    const authToken = localStorage.getItem("authToken");
    console.log(_id);

    try {
        await axios.delete(
            `http://ec2-34-239-91-8.compute-1.amazonaws.com/soft-skills/${_id}`,
            { headers: { Authorization: `Bearer ${authToken}` } }
        );

        setSkills(prevSkills => prevSkills.filter((_, i) => i !== _id));

        console.log("Skill deleted successfully");
        handleCloseModal();
        fetchSkills(authToken);
    } catch (error) {
        console.error("Error deleting skill:", error);
        console.error("Error:", error.message);
    }
  };

  //save new soft-skill to database
  const handleSaveSkill = async () => {
    const authToken = localStorage.getItem("authToken");

    try {
      console.log("Attempting to save skill:", newSkill);
      const response = await axios.post(
        "http://ec2-34-239-91-8.compute-1.amazonaws.com/soft-skills",
        newSkill,
        {headers: {Authorization: `Bearer ${authToken}`}}
      );
      console.log("Skill saved successfully:", response.data);
      handleCloseModal();
      fetchSkills(authToken); // update soft-skills table
    } catch (error) {
      console.error("Error saving skill:", error);
      console.error("Error:", error.message);
    }
  };

  
  //handle changes in softskill input

  const handleSkillChange = (e) => {
    setNewSkill({...newSkill, type: e.target.value});
  };

  //handle changes in characteristic input
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

  //get skills from database
  const fetchSkills = async (authToken) => {
    try {
      const response = await axios.get(
        "http://ec2-34-239-91-8.compute-1.amazonaws.com/soft-skills",
        {
          headers: {Authorization: `Bearer ${authToken}`},
        }
      );
      const fetchedSkills = response.data.map((skill) => ({
        id:skill._id,
        title: skill.type,
        characteristics: skill.characteristics.map((c) => c.title), //Taking just name of characteristic
      }));
      setSkills(fetchedSkills);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  //get characteristics from database
  const fetchCharacteristics = async (authToken) => {

    try {
      const response = await axios.get(
        "http://ec2-34-239-91-8.compute-1.amazonaws.com/characteristics",
        {
          headers: {Authorization: `Bearer ${authToken}`},
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
      <div className="manageTable">
        <h1 className="manageTable__title">Soft skills</h1>
        
        <button type="button" className="manageTable__add" onClick={handleShowModal}>
          <svg className="manageTable__ico" width="35" height="33" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.91998 16.5H31.2" stroke="#292E46" strokeWidth="6" strokeLinecap="round"/>
            <path d="M17.56 30V3.00001" stroke="#292E46" strokeWidth="6" strokeLinecap="round"/>
          </svg>
          Add new soft skill...
        </button>

        <table className="manageTable__table">
          <div className="manageTable__body">
          {skills.map((skill, index) => (
            <div className="manageTable__tr" key={index}>
              <div className="manageTable__td-wrap">
                <div className="manageTable__td skill_admin">{skill.title}</div>
                <div className='char_skill'>
                <div className="manageTable__td">{skill.characteristics.join(", ")}</div>
                </div>
              </div>
              <button className="manageTable__btn" type="button" onClick={() => handleEditSkill(skill)}>
          <img src={Pencil} />
        </button>
              <button className="manageTable__btn" type="button" onClick={() => handleDeleteSkill(skill.id)}>
                <img src={Delete}/>
              </button>
            </div>
          ))}
          </div>
        </table>
      </div>

      <Modal show={showModal}  onHide={handleCloseModal}>
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title className="titleModal">
            {isEditting ? "Edit Soft Skill" : "Add New Soft Skill"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalBody">
          <Form>
            <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                className="titleInput"
                value={newSkill.type}
                onChange={handleSkillChange}
                style={{color:'white'}}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Characteristics</Form.Label>
              <Form.Control
                as="select"
                multiple
                className="charactList"
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
        <Modal.Footer className="modalFooter">
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          {isEditting ? (
            <Button variant="primary" className="saveButton" onClick={handleEditSaveSkill}>
              Save Changes
            </Button>
          ) : (
            <Button variant="primary" className="saveButton" onClick={handleSaveSkill}>
              Save
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ManageSkills;
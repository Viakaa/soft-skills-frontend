import React, { useState, useEffect } from "react";
import { Card, Col, Row, Button, Modal, Form, Toast, Pagination } from "react-bootstrap";
import axios from "axios";
import "./UserList.css";
import uimg from "../../Assets/Images/avatar.png";

function UserList() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(6); 

  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [directionOptions] = useState(['Web-programming', 'Data science', 'Business Analysis', 'DevOps','Management','Digital Economy','Digital Marketing and sales']);
  const [editFormData, setEditFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    direction: "",
  });

  const handleDirectionChange = (e) => {
    setEditFormData({
      ...editFormData,
      direction: e.target.value,
    });
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      console.error("Auth token is not available.");
      return;
    }
    fetchUsers(authToken);
  }, []);

  //get users data
  const fetchUsers = async (authToken) => {
    try {
      const response = await axios.get("http://ec2-34-239-91-8.compute-1.amazonaws.com/users", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  //edit user form
  const handleEditClick = (user) => {
    setCurrentUser(user);
    setEditFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      direction: user.direction,
    });
    setShowModal(true);
  };

  //handle changes in form
  const handleFormChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  //submit edit_form
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem("authToken");
    try {
      await axios.patch(`http://ec2-34-239-91-8.compute-1.amazonaws.com/users/${currentUser._id}`, editFormData, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setShowModal(false);
      setShowToast(true);
      fetchUsers(authToken);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  //total pages
  const totalPages = Math.ceil(users.length / usersPerPage);
  
  //get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  //cgange page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //generate page numbers
  let items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <>
      <div className="all_users text-center">
        <h1>All Users</h1>
      </div>
      <Row xs={1} md={3} className="g-4">
        {currentUsers.map((user, index) => (
          <Col key={index}>
            <Card className="flex a_usercard text-center">
              <Card.Img style={{ width: '50%' }} variant="top" src={uimg} />
              <Card.Body>
                <Card.Title>{`${user.firstName} ${user.lastName}`}</Card.Title>
                <Card.Text>Email: {user.email}</Card.Text>
                <Card.Text>Direction: {user.direction}</Card.Text>
                <Button className='user_edit' variant="primary" onClick={() => handleEditClick(user)}>
                  Edit
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Pagination className="pagination_ justify-content-center">{items}</Pagination>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalBody">
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={editFormData.firstName}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={editFormData.lastName}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editFormData.email}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Direction</Form.Label>
              <Form.Control
                as="select"
                name="direction"
                value={editFormData.direction}
                onChange={handleDirectionChange}
                required
              >
                {directionOptions.map((option, idx) => (
                  <option key={idx} value={option}>{option}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button className='user_edit' variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

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
          backgroundColor: "#dff0d8", 
        }}
      >
        <Toast.Header style={{ backgroundColor: "#5cb85c", color: "white" }}>
          <strong className="me-auto">User Update</strong>
        </Toast.Header>
        <Toast.Body>User successfully updated!</Toast.Body>
      </Toast>
    </>
  );
}

export default UserList;

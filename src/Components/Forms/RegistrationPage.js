import React, { useState } from "react";
import { Form, Button, Toast } from "react-bootstrap"; 
// import axios from "axios";
// import { useHistory } from 'react-router';
import {useNavigate } from "react-router-dom";
// import authService from '../../Services/authService.js'
import "./Registration.css";
// import { connect } from 'react-redux';
import { registerUser } from '../../Redux/Actions/userActions.js'; 
import { useDispatch } from 'react-redux';

function RegistrationForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    sex: "", //male/female only
    course: "",
    direction: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
  
    try {
      await dispatch(registerUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        sex: formData.sex,
        course: parseInt(formData.course, 10),
        direction: formData.direction,
      }));
      setShowSuccessToast(true); //success toast after registration
      setTimeout(() => {
        navigate("/login?redirect=registration");
      }, 3000);
    } catch (error) {
      console.error(error);
      //409 - email is already registered
      if (error.response && error.response.status === 409) {
        setError("This email is already registered. Please use a different email."); 
      } else {
        //other errors
        setError(error.message || "An unexpected error occurred. Please try again."); 
      }
      setShowErrorToast(true); //show error true
    }
  };
  
  

  return (
    <div class="d-flex justify-content-center ">

    <Form style={{ width: "450px" }} className='registrater_main' onSubmit={handleSubmit}>
      <h1 className='create_txt'>Create Your Account</h1>
      <p style={{color:'rgba(220, 235, 255, 1)',fontSize:'15px'}}>Create your account in order to have access to the tests and all the possibilities of the soft skills school</p>
      <Form.Group>
        <Form.Label>First Name</Form.Label>
        <Form.Control
          value={formData.firstName}
          onChange={handleChange}
          name="firstName"
          type="text"
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          value={formData.lastName}
          onChange={handleChange}
          name="lastName"
          type="text"
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          value={formData.email}
          onChange={handleChange}
          name="email"
          type="email"
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          value={formData.password}
          onChange={handleChange}
          name="password"
          type="password"
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          value={formData.confirmPassword}
          onChange={handleChange}
          name="confirmPassword"
          type="password"
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Sex</Form.Label>
        <Form.Control required as="select" value={formData.sex} onChange={handleChange} name="sex">
          <option value="">Select sex</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Year of study</Form.Label>
        <Form.Control as="select" value={formData.course} onChange={handleChange} name="course" required>
          <option value="">Select year of study</option>
          <option value="1">2021</option>
          <option value="2">2022</option>
          <option value="3">2023</option>
          <option value="4">2024</option>

        </Form.Control>
  
      </Form.Group>
      <Form.Group>
        <Form.Label>Direction</Form.Label>
        <Form.Control as="select" value={formData.direction} onChange={handleChange} name="direction" required>
          <option value="">Select direction</option>
          <option value="Web-programming">Web-Programming</option>
          <option value="Data science">Data Science</option>
          <option value="Business Analysis">Business Analysis</option>
          <option value="DevOps">DevOps</option>
          <option value="Management">Management</option>
          <option value="Digital Economy">Digital Economy</option>
          <option value="Digital Marketing and sales">Digital Marketing and Sales</option>



        </Form.Control>
      
      </Form.Group>

      <Button className='register_button' variant="primary" type="submit">
        Sign up
      </Button>
      <div className='agree_terms'><p>By creating an account, you agree to all terms of use and data collection</p></div>
    </Form>
    <Toast
        onClose={() => setShowSuccessToast(false)}
        show={showSuccessToast}
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
          <strong className="me-auto">User Registration</strong>
        </Toast.Header>
        <Toast.Body>User successfully registered!</Toast.Body>
      </Toast>

      <Toast
        onClose={() => setShowErrorToast(false)}
        show={showErrorToast}
        delay={5000}
        autohide
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 1000,
          backgroundColor: "#f8d7da",
        }}
      >
        <Toast.Header style={{ backgroundColor: "#d9534f", color: "white" }}>
          <strong className="me-auto">Registration Error</strong>
        </Toast.Header>
        <Toast.Body>{error}</Toast.Body>
      </Toast>
    </div>
  );
}

export default RegistrationForm;

import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useHistory } from 'react-router';
import {useNavigate } from "react-router-dom";
import authService from '../../Services/authService.js'
import "./Registration.css";
import { connect } from 'react-redux';
import { registerUser } from '../../Redux/Actions/userActions.js'; // Adjust the path as necessary
import { useDispatch } from 'react-redux';

function RegistrationForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    sex: "", // Male or Female
    course: "", // Integer
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
      dispatch(registerUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        sex: formData.sex,
        course: parseInt(formData.course),
        direction: formData.direction,
      }));
  
      alert('Registration Successful!');
      navigate("/login?redirect=registration"); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div class="d-flex justify-content-center ">

    <Form style={{ width: "500px" }} className='registrater_main' onSubmit={handleSubmit}>
      <h1 className='create_txt'>Create Your Account</h1>
      <p style={{color:'white',fontSize:'15px'}}>Create your account in order to have access to the tests and all the possibilities of the soft skills school</p>
      <Form.Group>
        <Form.Label>First Name</Form.Label>
        <Form.Control
          value={formData.firstName}
          onChange={handleChange}
          name="firstName"
          type="text"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          value={formData.lastName}
          onChange={handleChange}
          name="lastName"
          type="text"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          value={formData.email}
          onChange={handleChange}
          name="email"
          type="email"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          value={formData.password}
          onChange={handleChange}
          name="password"
          type="password"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          value={formData.confirmPassword}
          onChange={handleChange}
          name="confirmPassword"
          type="password"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Sex</Form.Label>
        <Form.Control as="select" value={formData.sex} onChange={handleChange} name="sex">
          <option value="">Select...</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Course</Form.Label>
        <Form.Control
          value={formData.course}
          onChange={handleChange}
          name="course"
          type="number"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Direction</Form.Label>
        <Form.Control
          value={formData.direction}
          onChange={handleChange}
          name="direction"
          type="direction"
        />
      </Form.Group>

      <Button className='register_button' variant="primary" type="submit">
        Register
      </Button>
      <div className='agree_terms'><p>By creating an account, you agree to all terms of use and data collection</p></div>
    </Form>
    </div>
  );
}

export default RegistrationForm;

import React, { useState } from 'react';
import { Form, Button, Toast } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link,useNavigate } from 'react-router-dom';
import "./LoginPage.css";

function LoginForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  //toasts
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  //handle inputs changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //sign in submit

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://ec2-34-239-91-8.compute-1.amazonaws.com/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userId', data._id);
        //show toast
        setShowSuccessToast(true);
        setTimeout(() => {
          navigate("/profile");
        }, 1500); 
      } else {
        //credentials error 
        setErrorMessage('Error during authentication. Please check your credentials.');
        setShowErrorToast(true); 
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred. Please try again.');
      setShowErrorToast(true); 
    }
  };

  return (
    <>
      <p className="text-center" style={{ color: 'rgba(0, 15, 103, 1)', fontSize: "40px", fontFamily: "Mitr"}}>Soft Skills School</p>

    <div className='d-flex justify-content-center'>

      <Form className='registrater_main' style={{ width: "450px" }} onSubmit={handleSubmit}>

        <Form.Group>
          <Form.Label className="emailLabel">Email</Form.Label>
          <Form.Control
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className='emailForm'
          />
        </Form.Group>

        <Form.Group>
          <Form.Label className="passwordLabel">Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className='passwordForm'
          />
        </Form.Group>

        <div className='loginOptions'>
         {/* <Form>
          {['checkbox'].map((type) => (
            <div key={`default-${type}`}>
              <Form.Check
                type={type}
                id={`default-${type}`}
                label={`Remember me`}
                className="checkbox"
              />
            </div>))}
          </Form>

          <Link to="/registration" className='forgotPassword'>Forgot password?</Link>*/}
        </div>

        <Button variant="primary" type="submit" className='register_button'>
          Sign In
        </Button>

        <Button variant="primary" href='/registration' type="submit" className='register_button'>
          Register
        </Button>
        <div style={{marginBottom:'50px'}}></div>
      </Form>
    </div>

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
          <strong className="me-auto">Login Successful</strong>
        </Toast.Header>
        <Toast.Body>Welcome back!</Toast.Body>
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
          <strong className="me-auto">Login Error</strong>
        </Toast.Header>
        <Toast.Body>{errorMessage}</Toast.Body>
      </Toast>
    </>
  );
}

export default LoginForm;

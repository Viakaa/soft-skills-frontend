import React, { useState } from 'react';
import { Form, Button, Toast } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../Redux/Actions/userActions'; 
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  //toasts
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const [emails, setEmails] = useState([]);

  // handle inputs changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // sign in submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const obj = { email: formData.email, password: formData.password };
  
    const isEmailRegistered = emails.some(item => item.email === obj.email);
  
    if (isEmailRegistered) {
      console.log("This email is already registered");
      throw new Error("This Email is already registered");
    } else {
      setEmails([...emails, obj]); 
      console.log("Email registered successsfully");
    }
  
    console.log(emails);


    // try {
    //   const response = await fetch('http://ec2-34-239-91-8.compute-1.amazonaws.com/auth/signin', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData),
    //   });

    //   if (response.ok) {
    //     const data = await response.json();
    //     localStorage.setItem('authToken', data.token);
    //     localStorage.setItem('userId', data._id);
    //     //show toast
    //     setShowSuccessToast(true);
    //     setTimeout(() => {
    //       navigate("/profile");
    //     }, 1500); 
    //   } else {
    //     //credentials error 
    //     setErrorMessage('Error during authentication. Please check your credentials.');
    //     setShowErrorToast(true); 
    //   }
    // } catch (error) {
    //   setErrorMessage('An unexpected error occurred. Please try again.');
    //   setShowErrorToast(true); 
    // }
  };

  return (
    <>
      <p className="text-center">Soft Skills School</p>

      <div className="d-flex justify-content-center">
        <Form className="login_main" onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label className="emailLabel">Username</Form.Label>
            <Form.Control
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="emailForm"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label className="passwordLabel">Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="passwordForm"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="register_button">
            Log in
          </Button>
          <Button  variant="primary" href='/registration' type="submit" className='register_button2'>
          Sign up
        </Button>
        </Form>
      </div>

      <Toast
        onClose={() => setShowSuccessToast(false)}
        show={showSuccessToast}
        delay={3000}
        autohide
        className="success-toast"
      >
        <Toast.Header style={{ backgroundColor: '#5cb85c', color: 'white' }}>
          <strong className="me-auto">Login Successful</strong>
        </Toast.Header>
        <Toast.Body>Welcome back!</Toast.Body>
      </Toast>

      <Toast
        onClose={() => setShowErrorToast(false)}
        show={showErrorToast}
        delay={5000}
        autohide
        className="error-toast"
      >
        <Toast.Header style={{ backgroundColor: '#d9534f', color: 'white' }}>
          <strong className="me-auto">Login Error</strong>
        </Toast.Header>
        <Toast.Body>{errorMessage}</Toast.Body>
      </Toast>
    </>
  );
}

export default LoginForm;

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

  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(loginUser(formData));
      setShowSuccessToast(true);
      setTimeout(() => {
        navigate('/profile');
      }, 1500);
    } catch (error) {
      setErrorMessage(error.message || 'Помилка авторизації. Перевірте свої дані.');
      setShowErrorToast(true);
    }
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

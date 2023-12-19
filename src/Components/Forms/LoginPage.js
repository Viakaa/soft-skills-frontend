import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link,useNavigate } from 'react-router-dom';
import "./LoginPage.css";

function LoginForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

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
      const response = await fetch('http://ec2-34-239-91-8.compute-1.amazonaws.com/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userId', data._id); 
        console.log('Successful auth!');
        navigate("/profile"); 

      } else {
        console.error('Error');
      }
    } catch (error) {
      console.error('Помилка під час відправки запиту', error);
    }
  };

  return (
    <div className='wrapper'>
      <p style={{ color: 'rgba(0, 15, 103, 1)', fontSize: "40px", fontFamily: "Mitr"}}>Soft Skills School</p>

      <Form className='formWrapper' style={{ maxWidth: '250px' }} onSubmit={handleSubmit}>
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
          <Form>
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

          <Link to="/registration" className='forgotPassword'>Forgot password?</Link>
        </div>

        <Button variant="primary" type="submit" className='loginButton'>
          Sign In
        </Button>

        <Button variant="primary" type="submit" className='registerButton'>
          Register
        </Button>
      </Form>
    </div>
  );
}

export default LoginForm;

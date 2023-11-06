import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function LoginForm() {
  return (
    <Form
        style={{ maxWidth: '250px' }}
    >
      <Form.Group>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          placeholder="Email"
          name="email"
          type="email"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          placeholder="Password"
          name="password"
          type="password"
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
}

export default LoginForm;

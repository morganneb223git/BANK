///Create Account Component ./frontend/src/createaccount.js

import React from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';

function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [variant, setVariant] = React.useState('success'); // For Alert styling

  return (
    <Card className="mt-3 mb-3">
      <Card.Body>
        <Card.Title>Create Account</Card.Title>
        {status && <Alert variant={variant}>{status}</Alert>}
        {show ? 
          <CreateForm setShow={setShow} setStatus={setStatus} setVariant={setVariant} /> : 
          <CreateMsg setShow={setShow} />}
      </Card.Body>
    </Card>
  );
}

function CreateMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <Button variant="primary" onClick={() => props.setShow(true)}>Add another account</Button>
    </>
  );
}

function CreateForm(props) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handle() {
    fetch('/account/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, email: email, password: password })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      props.setShow(false);
      props.setStatus('Account successfully created. Please log in.');
      props.setVariant('success');
    })
    .catch(error => {
      console.error('Error:', error);
      props.setStatus('Failed to create account. Please try again.');
      props.setVariant('danger');
    });
  }

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter name" 
          value={name} 
          onChange={e => setName(e.currentTarget.value)} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
          type="email" 
          placeholder="Enter email" 
          value={email} 
          onChange={e => setEmail(e.currentTarget.value)} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control 
          type="password" 
          placeholder="Enter password" 
          value={password} 
          onChange={e => setPassword(e.currentTarget.value)} />
      </Form.Group>

      <Button variant="primary" onClick={handle}>Create Account</Button>
    </Form>
  );
}

export default CreateAccount;
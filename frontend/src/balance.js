///Balance Component ./frontend/src/balance.js

import React from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';

function Balance() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <Card className="mt-3 mb-3">
      <Card.Header>Balance</Card.Header>
      <Card.Body>
        {status && <Alert variant="info">{status}</Alert>}
        {show ? (
          <BalanceForm setShow={setShow} setStatus={setStatus} />
        ) : (
          <BalanceMsg setShow={setShow} setStatus={setStatus} />
        )}
      </Card.Body>
    </Card>
  );
}

function BalanceMsg({ setShow, setStatus }) {
  return (
    <>
      <h5>Success</h5>
      <Button variant="light" onClick={() => {
        setShow(true);
        setStatus('');
      }}>
        Check balance again
      </Button>
    </>
  );
}

function BalanceForm({ setShow, setStatus }) {
  const [email, setEmail] = React.useState('');
  const [balance, setBalance] = React.useState('');
  const [error, setError] = React.useState('');

  function handle() {
    // Ensure the endpoint matches your server's configuration and can handle the dynamic email part
    fetch(`/api/users/${email}`) // Corrected to use template literals for dynamic email
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.error) {
        throw new Error(data.error); // If user not found or another error occurs, throw error
      }
      setStatus(`Balance retrieved successfully. Your balance is: ${data.balance}`);
      setBalance(data.balance); // Update the balance state to display it
      setShow(false); // Optionally, hide form or reset form fields here
    })
    .catch(error => {
      setError(`Error fetching balance: ${error.message}`);
      console.error('Error fetching balance:', error);
    });
  }

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control 
          type="email" 
          placeholder="Enter email" 
          value={email} 
          onChange={e => setEmail(e.currentTarget.value)} />
      </Form.Group>
      <Button variant="light" onClick={handle}>
        Check Balance
      </Button>
      {balance && <Alert variant="success">Your balance is: {balance}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
    </Form>
  );
}

export default Balance;
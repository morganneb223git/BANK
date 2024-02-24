/// Withdraw Component ./frontend/src/withdraw.js

import React from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';

function Withdraw() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [variant, setVariant] = React.useState('success'); // For Alert styling

  return (
    <Card className="mt-3 mb-3">
      <Card.Header>Withdraw</Card.Header>
      <Card.Body>
        {status && <Alert variant={variant}>{status}</Alert>}
        {show ? (
          <WithdrawForm setShow={setShow} setStatus={setStatus} setVariant={setVariant} />
        ) : (
          <WithdrawMsg setShow={setShow} setStatus={setStatus} />
        )}
      </Card.Body>
    </Card>
  );
}

function WithdrawMsg({ setShow, setStatus }) {
  return (
    <>
      <h5>Success</h5>
      <Button variant="secondary" onClick={() => {
        setShow(true);
        setStatus('');
      }}>
        Withdraw again
      </Button>
    </>
  );
}

function WithdrawForm({ setShow, setStatus, setVariant }) {
  const [email, setEmail] = React.useState('');
  const [amount, setAmount] = React.useState('');

  function handle() {
    fetch('/account/withdraw', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        amount: Math.abs(parseFloat(amount)) // Ensure the amount is positive for withdrawals
      })
    })
    .then(response => {
      if (!response.ok) {
        setVariant('danger');
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      setStatus(`Withdrawal successful. New Balance: ${data.balance}`);
      setShow(false);
      setVariant('success');
    })
    .catch(error => {
      setStatus(`Withdrawal failed: ${error.message}`);
      console.error('Error during withdrawal:', error);
      setVariant('danger');
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
          onChange={e => setEmail(e.currentTarget.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Amount</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={e => setAmount(e.currentTarget.value)}
        />
      </Form.Group>

      <Button variant="primary" onClick={handle}>Withdraw</Button>
    </Form>
  );
}

export default Withdraw;
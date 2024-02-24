///NavBar Component ./frontend/src/navbar.js
import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Bank of Brown</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/CreateAccount/">
              <Nav.Link>Create Account</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login/">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/deposit/">
              <Nav.Link>Deposit</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/withdraw/">
              <Nav.Link>Withdraw</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/balance/">
              <Nav.Link>Balance</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/alldata/">
              <Nav.Link>All Data</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
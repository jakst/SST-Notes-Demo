import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import "./App.css";
import { AppContext } from "./lib/contextLib";
import Routes from "./Routes";

function App() {
  const [isAuthenticated, setUserIsAuthenticated] = useState(false);

  function handleLogout() {
    setUserIsAuthenticated(false);
  }

  return (
    <div className="App container py-3">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
        <LinkContainer to="/">
          <Navbar.Brand className="font-weight-bold text-muted">
            Scratch
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
            {isAuthenticated ? (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            ) : (
              <>
                <LinkContainer to="/signup">
                  <Nav.Link>Signup</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <AppContext.Provider
        value={{
          isAuthenticated,
          setUserIsAuthenticated,
        }}
      >
        <Routes />
      </AppContext.Provider>
    </div>
  );
}

export default App;

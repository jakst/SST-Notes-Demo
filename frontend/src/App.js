import { Auth } from "aws-amplify";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { AppContext } from "./lib/contextLib";
import { onError } from "./lib/errorLib";
import Routes from "./Routes";

function App() {
  const navigate = useNavigate();

  const [isAuthenticated, setUserIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      setUserIsAuthenticated(true);
    } catch (error) {
      if (error !== "No current user") onError(error);
    }

    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();

    setUserIsAuthenticated(false);

    navigate("/");
  }

  return (
    !isAuthenticating && (
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
                <>
                  <LinkContainer to="/settings">
                    <Nav.Link>Settings</Nav.Link>
                  </LinkContainer>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </>
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
    )
  );
}

export default App;

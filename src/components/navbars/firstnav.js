import React, { useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./firstnav.css"; // Import your CSS file
import Cartmodal1 from "../checkout/cartmodal";

const Firstnavbar = () => {
  const [visible, setVisible] = useState(false);
  return (
    <Navbar className="firstnavbar-navbar" expand="lg">
      <Container className="firstnavbar-container">
        {/* First div: Image aligned to the left */}
        <Navbar.Brand href="#" className="firstnavbar-brand">
          <img
            src="../images/google stars.png" // Replace with your image path
            className="firstnavbar-logo d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>

        {/* Second div: Centered text */}

        <Nav className="firstnavbar-nav mx-auto">
          <Nav.Link  className="firstnavbar-center">
            <span className="code-off">10% OFF FIRST ORDER </span>
            <span className="code-text">CODE CWL10</span>
          </Nav.Link>
          <Nav.Link>
            <div className="button-show">
              <Link to="/get-quote" className="mainnav-quote-link">
                <Button variant="primary" className="mainnav-quote-button">
                  Get a Quote
                </Button>
              </Link>
              <img
                src="../images/phone.svg"
                className="mainnav-image"
                alt="Some Image"
              />
            </div>
          </Nav.Link>
        </Nav>

        {/* Third div: Login/Register and icons on the right side */}
        <Nav className="firstnavbar-nav ml-auto">
          <Nav.Link as={Link} to="/login" className="firstnavbar-link">
            Login/Register <FaUserCircle />
          </Nav.Link>
          <Nav.Link className="firstnavbar-link">
            <button
              onClick={() => setVisible(true)}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
            >
              <strong className="cart-strong">Cart</strong>{" "}
              <FaShoppingCart style={{ color: "rgb(82,83,84)" }} />
            </button>
            <Cartmodal1 visible={visible} onClose={() => setVisible(false)} />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Firstnavbar;

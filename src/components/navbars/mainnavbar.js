import React, { useEffect, useRef,useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./mainnavbar.css";
import Cartmodal1 from "../checkout/cartmodal";

const Mainnavbar = () => {
  const navigate = useNavigate(); // Hook to navigate
  const navbarRef = useRef(null); // Reference to the navbar

  // Function to handle clicks outside of the navbar
  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      // Handle click outside
      console.log("Clicked outside the navbar");
    }
  };

  // Handle navigation click
  const handleNavClick = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const [visible, setVisible] = useState(false);
  return (
    <Navbar className="mainnav-navbar" bg="light" expand="lg">
      <Container className="mainnav-container">
        {/* First div: Logo aligned to the left */}

        <Navbar.Brand
          as={Link}
          to="/"
          onClick={() => handleNavClick("/")}
          className="mainnav-brand"
        >
          <img
            src="../images/cwl-logo.svg" // Replace with your image path
            className="mainnav-logo d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>

        {/* Second div: Centered tabs */}
        <div className="changenavbar-nav ml-auto">
          <Link to="/login" className="changenavbar-link">
            <div>
              <FaUserCircle />
            </div>
          </Link>
          <Link   className="changenavbar-link">
          <button
              onClick={() => setVisible(true)}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }} // Remove default styles
            >
            <div>
              <FaShoppingCart />
            </div>
            </button>
            <Cartmodal1 visible={visible} onClose={() => setVisible(false)} />
          </Link>
        </div>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="mainnav-collapse">
          <Nav className="mainnav-nav mx-auto">
            <NavDropdown
              title={<span className="mainnav-link">CLOTHING LABELS</span>}
              id="clothing-dropdown"
            >
              <NavDropdown.Item
                as={Link}
                to="/all-clothing-labels"
                className="nav-dropdown-item"
              >
                All Clothing Labels
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/express-clothing" className="nav-dropdown-item">
                Express Clothing Labels
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link} to="/customwoven"
                className="nav-dropdown-item"
              >
                Custom Woven Labels
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link} to="/woven-text-label"
                className="nav-dropdown-item"
              >
                Woven Text Labels
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link} to="/satin-woven"
                className="nav-dropdown-item"
              >
                Custom Satin Woven Labels
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#custom-care"
                className="nav-dropdown-item"
              >
                Custom Care Labels
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#screen-printed"
                className="nav-dropdown-item"
              >
                Screen Printed Labels
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#custom-cotton"
                className="nav-dropdown-item"
              >
                Custom Cotton Labels
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#custom-sublimation"
                className="nav-dropdown-item"
              >
                Custom Sublimation Labels
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#custom-tyvek"
                className="nav-dropdown-item"
              >
                Custom Tyvek Labels
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#custom-tpu"
                className="nav-dropdown-item"
              >
                Custom TPU Labels
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#custom-heat-transfer"
                className="nav-dropdown-item"
              >
                Custom Heat Transfer Labels
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title={<span className="mainnav-link">HANGTAGS</span>}
              id="clothing-dropdown"
            >
              <NavDropdown.Item as={Link} to="/custom-hangtags" className="nav-dropdown-item">
                All Hang Tags
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/simple-hangtags" className="nav-dropdown-item">
                Simple Hang Tags
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#custom-woven"
                className="nav-dropdown-item"
              >
                Fancy Hang Tags
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#about" className="mainnav-link">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact-us" className="mainnav-link">
              Contact
            </Nav.Link>
          </Nav>

          {/* Third div: Get a Quote button aligned to the right */}
          <Link to="/get-quote">
            <Button variant="primary" className="mainnav-quote-button1">
              Get a Quote
            </Button>
          </Link>

          {/* Fourth div: Image aligned to the right */}
          <img
            src="../images/phone.svg"
            className="mainnav-image1"
            alt="Some Image"
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Mainnavbar;

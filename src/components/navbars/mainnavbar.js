import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { CiMobile3 } from "react-icons/ci";
import "bootstrap/dist/css/bootstrap.min.css";
import Cartmodal1 from "../checkout/cartmodal";
import { Slide } from "react-awesome-reveal";
import "./mainnavbar.css";

const Mainnavbar = () => {
  const navigate = useNavigate(); // Hook to navigate
  const navbarRef = useRef(null); // Reference to the navbar
  const [scrolled, setScrolled] = useState(false); // State to handle scroll position

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
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true); // Set scrolled to true when scrolling
      } else {
        setScrolled(false); // Set to false when at the top
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll); // Add scroll event listener

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll); // Clean up
    };
  }, []);

  const [visible, setVisible] = useState(false);
  return (
    <Navbar
      className={`mainnav-navbar ${scrolled ? "scrolled" : ""}`} // Add scrolled class based on state
      style={{ backgroundColor: "#FAF4EB" }}
      expand="lg"
      ref={navbarRef} // Attach the ref to the navbar
    >
      <Container className="mainnav-container">
        <Navbar.Brand
          as={Link}
          to="/"
          onClick={() => handleNavClick("/")}
          className="mainnav-brand"
        >
          <img
            src="../images/clothing-logo.svg" // Replace with your image path
            className="mainnav-logo d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>
        {/* Second div: Centered tabs */}
        <div className="changenavbar-nav ml-auto">
          <Link to="/login" className="changenavbar-link">
            <div>
              <FaUserCircle style={{ color: "black" }} />
            </div>
          </Link>
          <Link className="changenavbar-link">
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
          <Slide Cascade direction="down">
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
                <NavDropdown.Item
                  as={Link}
                  to="/express-clothing"
                  className="nav-dropdown-item"
                >
                  Express Clothing Labels
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/customwoven"
                  className="nav-dropdown-item"
                >
                  Custom Woven Labels
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/woven-text-label"
                  className="nav-dropdown-item"
                >
                  Woven Text Labels
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/satin-woven"
                  className="nav-dropdown-item"
                >
                  Custom Satin Woven Labels
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/custom-care-label"
                  className="nav-dropdown-item"
                >
                  Custom Care Labels
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/screen-printed-label"
                  className="nav-dropdown-item"
                >
                  Screen Printed Labels
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/custom-cotton-label"
                  className="nav-dropdown-item"
                >
                  Custom Cotton Labels
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/custom-sublimation-label"
                  className="nav-dropdown-item"
                >
                  Custom Sublimation Labels
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/custom-tyvek-label"
                  className="nav-dropdown-item"
                >
                  Custom Tyvek Labels
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/tpu-labels"
                  className="nav-dropdown-item"
                >
                  Custom TPU Labels
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/custom-heat-labels"
                  className="nav-dropdown-item"
                >
                  Custom Heat Transfer Labels
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title={<span className="mainnav-link">HANGTAGS</span>}
                id="clothing-dropdown"
              >
                <NavDropdown.Item
                  as={Link}
                  to="/custom-hangtags"
                  className="nav-dropdown-item"
                >
                  All Hang Tags
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/simple-hangtags"
                  className="nav-dropdown-item"
                >
                  Simple Hang Tags
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/fancy-hangtags"
                  className="nav-dropdown-item"
                >
                  Fancy Hang Tags
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/about-us" className="mainnav-link">
                About
              </Nav.Link>
              <Nav.Link as={Link} to="/contact-us" className="mainnav-link">
                Contact
              </Nav.Link>
            </Nav>
          </Slide>
          {/* Third div: Get a Quote button aligned to the right */}
          <Link to="/get-quote">
            <Button variant="primary" className="mainnav-quote-button1">
              Get a Quote
            </Button>
          </Link>
          <Slide direction="right">
            {/* Fourth div: Image aligned to the right */}
            <a href="tel:+1234567890" className="phone-number-div">
              <CiMobile3 className="mobile-icon" />
              <div className="text-phone">
                <p>+1 (630) 995-9797</p>
                <p>Speak With an Expert</p>
              </div>
            </a>
          </Slide>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Mainnavbar;

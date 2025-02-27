import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { CiMobile3 } from "react-icons/ci";
import "bootstrap/dist/css/bootstrap.min.css";
import Cartmodal1 from "../checkout/cartmodal";
import { Slide } from "react-awesome-reveal";
import { useAuth } from "../../context/authcontext"; // Import the useAuth hook

import "./mainnavbar.css";

const Mainnavbar = () => {
  const navigate = useNavigate();
  const navbarRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false); // State to track collapse

  // Check if user is logged in (using localStorage for this example)
  const { isLoggedIn } = useAuth(); // Access the user and isLoggedIn from AuthContext

  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setExpanded(false); // Collapse navbar if clicked outside
    }
  };

  const handleNavClick = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
    setExpanded(false); // Close the collapse after navigation
  };

  const handleUserIconClick = () => {
    if (isLoggedIn) {
      // Redirect to dashboard if logged in
      navigate("/my-account");
    } else {
      // Redirect to signup if not logged in
      navigate("/login");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Navbar
      expanded={expanded} // Control the expanded state
      onToggle={() => setExpanded(!expanded)} // Toggle collapse
      className={`mainnav-navbar ${scrolled ? "scrolled" : ""}`}
      style={{ backgroundColor: "#FAF4EB" }}
      expand="lg"
      ref={navbarRef}
    >
      <Container className="mainnav-container">
        <Navbar.Brand
          as={Link}
          to="/"
          onClick={() => handleNavClick("/")}
          className="mainnav-brand"
        >
          <img
            src="../images/clothing-logo.svg"
            className="mainnav-logo d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>

        <div className="changenavbar-nav ml-auto">
          <div className="changenavbar-link">
            <div>
              <FaUserCircle
                onClick={handleUserIconClick}
                style={{ color: "black" }}
              />
            </div>
          </div>

          <Link className="changenavbar-link">
            <button
              onClick={() => setVisible(true)}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
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
              <Nav.Link
                as={Link}
                to="/all-clothing-labels"
                className="mainnav-link"
                onClick={() => handleNavClick("/all-clothing-labels")}
              >
                CUSTOM WOVEN LABELS
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/custom-hangtags"
                className="mainnav-link"
                onClick={() => handleNavClick("/custom-hangtags")}
              >
                CUSTOM HANGTAGS{" "}
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/blogs"
                className="mainnav-link"
                onClick={() => handleNavClick("/blogs")}
              >
                BLOG
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/woven-text-label"
                className="mainnav-link"
                onClick={() => handleNavClick("/woven-text-label")}
              >
                DESIGN NOW
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/instagram-posts"
                className="mainnav-link"
                onClick={() => handleNavClick("/instagram-posts")}
              >
                GALLERY
              </Nav.Link>
            </Nav>
          </Slide>
          <div className="quote-and-contact">
            <Link to="/get-quote">
              <Button
                variant="primary"
                className="mainnav-quote-button1"
                onClick={() => handleNavClick("/get-quote")}
              >
                Get a Quote
              </Button>
            </Link>
            <Slide direction="right">
              <a href="tel:+1234567890" className="phone-number-div">
                <CiMobile3 className="mobile-icon" />
                <div className="text-phone">
                  <p>+1 (616) 888-7184</p>
                  <p>Speak With an Expert</p>
                </div>
              </a>
            </Slide>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Mainnavbar;

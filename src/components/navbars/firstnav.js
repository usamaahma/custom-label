import React, { useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { FaUserCircle, FaShoppingCart, FaTiktok } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import "bootstrap/dist/css/bootstrap.min.css";
import "./firstnav.css"; // Import your CSS file
import Cartmodal1 from "../checkout/cartmodal";
import { FaFacebookF } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { CiMobile3 } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { Slide } from "react-awesome-reveal";
import { useAuth } from "../../context/authcontext"; // Assuming this contains auth methods

const Firstnavbar = () => {
  const [visible, setVisible] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { user, logout } = useAuth(); // Get user and logout from context
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = async () => {
    try {
      await logout(); // Wait for the logout process to complete
      navigate("/"); // Redirect to the home page
    } catch (error) {
      console.error("Error during logout:", error); // Log any errors for debugging
    }
  };

  return (
    <Navbar className="firstnavbar-navbar" expand="lg">
      <Container className="firstnavbar-container">
        <Slide direction="left">
          <div className="logos-firstnav">
            <a href="" className="social-icon-first">
              <FaFacebookF />
            </a>
            <a href="" className="social-icon-first">
              <FaTiktok />
            </a>
            <a href="" className="social-icon-first">
              <RiInstagramFill />
            </a>
            <a
              href="https://wa.me/+19304440014"
              target="_blank"
              className="social-icon-first"
            >
              <IoLogoWhatsapp />
            </a>
          </div>
        </Slide>

        {/* Centered text */}
        <Slide direction="down">
          <Nav className="firstnavbar-nav mx-auto">
            <Nav.Link>
              <div className="button-show">
                <Link to="/get-quote" className="mainnav-quote-link">
                  <Button variant="primary" className="mainnav-quote-button">
                    Get a Quote
                  </Button>
                </Link>
                <Slide direction="right">
                  <a href="tel:+1234567890" className="phone-number-div-show">
                    <CiMobile3 className="mobile-icon-show" />
                    <div className="text-phone-show">
                      <p>+1 (630) 995-9797</p>
                      <p>Speak With an Expert</p>
                    </div>
                  </a>
                </Slide>
              </div>
            </Nav.Link>
          </Nav>
        </Slide>

        {/* Right side: User info, Cart, and Logout button */}
        <Slide direction="right">
          <Nav className="firstnavbar-nav ml-auto">
            {/* Display user name if logged in, otherwise show Login/Register */}
            {user ? (
              <Nav.Link as={Link} to="/my-account" className="firstnavbar-link">
                <span className="cart-strong">{user.name}</span>
                <FaUserCircle style={{ color: "#FAF4EB" }} />
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login" className="firstnavbar-link">
                <span className="cart-strong">Login/Register</span>
                <FaUserCircle style={{ color: "#FAF4EB" }} />
              </Nav.Link>
            )}

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
                <strong className="cart-strong">Cart</strong>
                <FaShoppingCart style={{ color: "#FAF4EB" }} />
              </button>
              <Cartmodal1 visible={visible} onClose={() => setVisible(false)} />
            </Nav.Link>

            {/* Logout Button */}
            {user && (
              <Nav.Link className="firstnavbar-link">
                <button
                  onClick={handleLogout} // Use handleLogout to log out and redirect
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                  }}
                >
                  <strong className="cart-strong">Logout</strong>
                  {/* <FaUserCircle style={{ color: "#FAF4EB" }} /> */}
                </button>
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="/mainsearch" className="firstnavbar-link">
              <button
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
              >
                <FaSearch style={{ color: "#FAF4EB" }} />
              </button>
            </Nav.Link>
          </Nav>
        </Slide>
      </Container>
    </Navbar>
  );
};

export default Firstnavbar;

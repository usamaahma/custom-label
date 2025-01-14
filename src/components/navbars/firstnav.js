import React, { useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaShoppingCart, FaTiktok } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import "bootstrap/dist/css/bootstrap.min.css";
import "./firstnav.css";
import Cartmodal1 from "../checkout/cartmodal";
import { FaFacebookF } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { CiMobile3 } from "react-icons/ci";
import { Slide } from "react-awesome-reveal";
import { useAuth } from "../../context/authcontext";

const Firstnavbar = () => {
  const [visible, setVisible] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
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
        <Slide direction="right">
          <Nav className="firstnavbar-nav ml-auto">
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
            {user && (
              <Nav.Link className="firstnavbar-link">
                <button
                  onClick={handleLogout}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                  }}
                >
                  <strong className="cart-strong">Logout</strong>
                </button>
              </Nav.Link>
            )}
          </Nav>
        </Slide>
      </Container>
    </Navbar>
  );
};

export default Firstnavbar;

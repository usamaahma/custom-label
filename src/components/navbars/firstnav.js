import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Badge } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaShoppingCart, FaTiktok } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import "bootstrap/dist/css/bootstrap.min.css";
import "./firstnav.css";
import Cartmodal1 from "../checkout/cartmodal";
import { FaFacebookF } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { CiMobile3 } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { Slide } from "react-awesome-reveal";
import { useAuth } from "../../context/authcontext";
import { useCart } from "../../context/cartcontext"; // Import useCart

const Firstnavbar = () => {
  const [visible, setVisible] = useState(false);
  const { user, logout } = useAuth();
  const { cart, clearCart } = useCart(); // Use cart from context
  const navigate = useNavigate();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Calculate total items in cart
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Handle logout
  const handleLogout = async () => {
    try {
      await clearCart();
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 991);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check initial screen size

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Navbar className="firstnavbar-navbar" expand="lg">
      <Container className="firstnavbar-container">
        {/* Social Icons */}
        {!isSmallScreen && (
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
        )}

        {/* Centered Text */}
        {!isSmallScreen && (
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
                        <p>+1 (616) 888-7184</p>
                        <p>Speak With an Expert</p>
                      </div>
                    </a>
                  </Slide>
                </div>
              </Nav.Link>
            </Nav>
          </Slide>
        )}

        {/* Right Side: User, Cart, Logout, Search */}
        {!isSmallScreen && (
          <Slide direction="right">
            <Nav className="firstnavbar-nav ml-auto">
              {user ? (
                <Nav.Link
                  as={Link}
                  to="/my-account"
                  className="firstnavbar-link"
                >
                  <span className="cart-strong">{user.name}</span>
                  <FaUserCircle
                    style={{ color: "#FAF4EB", fontSize: "24px" }}
                  />
                </Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/login" className="firstnavbar-link">
                  <span className="cart-strong">Login/Register</span>
                  <FaUserCircle style={{ color: "#FAF4EB" }} />
                </Nav.Link>
              )}

              {/* Cart with Badge */}
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
                  <Badge
                    count={cartCount}
                    offset={[10, 0]}
                    showZero
                    size="small"
                  >
                    <strong className="cart-strong">Cart</strong>
                    <FaShoppingCart
                      style={{ color: "#FAF4EB", fontSize: "24px" }}
                    />
                  </Badge>
                </button>
                <Cartmodal1
                  visible={visible}
                  onClose={() => setVisible(false)}
                />
              </Nav.Link>

              {/* Logout Button */}
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

              {/* Search Button */}
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
        )}
      </Container>
    </Navbar>
  );
};

export default Firstnavbar;

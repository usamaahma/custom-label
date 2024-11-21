import React, { useState } from "react";
import { Drawer, Button } from "antd"; // Import Drawer and Button from antd
import "./drawerviewedit.css";
import { useNavigate } from "react-router-dom";

function Drawerviewedit() {
  const [quantity, setQuantity] = useState(1);
  const price = 46.5; // Example price
  const subtotal = (price * quantity).toFixed(2); // Calculate subtotal

  const [visible, setVisible] = useState(true); // State to manage drawer visibility
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Handle quantity change
  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  // Open the drawer

  // Close the drawer
  const onClose = () => {
    setVisible(false);
    navigate("/"); // Navigate to checkout page
  };

  return (
    <div>
      {/* Button to open the drawer */}

      {/* Ant Design Drawer component */}
      <Drawer
        title="View and Edit Cart"
        placement="right"
        closable={true}
        onClose={onClose}
        visible={visible}
        width={600} // You can adjust the width of the drawer
      >
        {/* Main Cart Content */}
        <div className="main-view-cart">
          {/* Column 1 - Item (displayed at the top) */}
          <div className="cart-item-column">
            <div className="item-header">Item</div>
            <img
              className="image-viewcart"
              src="../images/cardclothing.jpg"
              alt="Placeholder"
            />
          </div>

          {/* Columns 2, 3, and 4 - Details, Price, and Summary */}
          <div className="cart-other-columns">
            {/* Column 2 - Details */}
            <div className="cart-details-column">
              <p className="custom-viewedit">Custom Woven Labels</p>
              <div className="cart-detail-list">
                <p>
                  <strong>Style:</strong> 5 x Loop Fold
                </p>
                <p>
                  <strong>Size:</strong> 5 x 2 x 0.625
                </p>
                <p>
                  <strong>Backing Options:</strong> 5 x None (Sew-On)
                </p>
                <p>
                  <strong>Metallic Thread:</strong> 5 x None (Regular Thread)
                </p>
                <p>
                  <strong>Size Symbols or Color Versions?:</strong> 5 x None
                </p>
                <p>
                  <strong>Proof Options:</strong> Digital Proof Only
                </p>
                <p>
                  <strong>Turnaround Options:</strong> 5 x Standard 15 Business
                  Days
                </p>
                <p>
                  <strong>Quantity:</strong> 5 x 5
                </p>
              </div>
            </div>

            {/* Column 3 - Price, Qty, Subtotal */}
            <div className="cart-price-column">
              <div className="cart-item-detail">
                <span className="price-label">Price:</span>
                <span className="price-value">${price.toFixed(2)}</span>
              </div>
              <div className="cart-item-detail">
                <span className="qty-label">Qty:</span>
                <input
                  type="number"
                  className="qty-input"
                  value={quantity}
                  min="1"
                  onChange={handleQuantityChange}
                />
              </div>
              <div className="cart-item-detail">
                <span className="subtotal-label">Subtotal:</span>
                <span className="subtotal-value">${subtotal}</span>
              </div>
            </div>

            {/* Column 4 - Summary */}
            <div className="cart-summary-column">
              <p className="summary-viewedit">Summary</p>
              <p className="estimated-view">Estimated Shipping and Tax</p>
              <hr />
              <div className="sub-viewed">
                <p>Sub Total</p>
                <p>${subtotal}</p>
              </div>
              <hr />
              <div className="order-viewed">
                <p>Order Total</p>
                <p>${subtotal}</p>
              </div>
              <div className="button1-container">
                <button className="Button1-viewed">Go to Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default Drawerviewedit;

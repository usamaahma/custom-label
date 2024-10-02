import React, { useState } from "react";
import "./vieweditcart.css";
import { Button } from "antd";

function Vieweditcart() {
  const [quantity, setQuantity] = useState(1);
  const price = 46.50; // Example price
  const subtotal = (price * quantity).toFixed(2); // Calculate subtotal

  // Handle quantity change
  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  return (
    <div style={{ display: "flex" }} className="main-view-cart">
      {/* Column 1 - Item */}
      <div
        style={{
          flex: 1,
          padding: "10px",
          textAlign: "left",
          fontWeight: "bold",
        }}
      >
        <div>Item</div>
        <img
          className="image-viewcart"
          src="../images/cardclothing.jpg"
          alt="Placeholder"
        />
      </div>

      {/* Column 2 - Details */}
      <div style={{ flex: 1, padding: "10px" }}>
        <p className="custom-viewedit">Custom Woven Labels</p>
        <div
          style={{
            overflowY: "scroll",
            height: "200px",
          }}
        >
          <p><strong>Style:</strong> 5 x Loop Fold</p>
          <p><strong>Size:</strong> 5 x 2 x 0.625</p>
          <p><strong>Backing Options:</strong> 5 x None (Sew-On)</p>
          <p><strong>Metallic Thread:</strong> 5 x None (Regular Thread)</p>
          <p><strong>Size Symbols or Color Versions?:</strong> 5 x None</p>
          <p><strong>Proof Options:</strong> Digital Proof Only</p>
          <p><strong>Turnaround Options:</strong> 5 x Standard 15 Business Days</p>
          <p><strong>Quantity:</strong> 5 x 5</p>
        </div>
      </div>

      {/* Column 3 - Price, Qty, Subtotal */}
      <div style={{ flex: 1, padding: "10px" }} className="cart-price-column">
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
      <div className="fourth-col-viewcart">
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
        <Button className="Button-viewed">
          <p className="place-button-viewcart">Go to Checkout</p>
        </Button>
      </div>
    </div>
  );
}

export default Vieweditcart;

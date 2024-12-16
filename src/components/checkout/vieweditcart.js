import React, { useState } from "react";
import { useCart } from "../../context/cartcontext"; // Import useCart hook
import "./vieweditcart.css";

function Vieweditcart() {
  const { cart, removeFromCart, addToCart } = useCart(); // Get cart and functions from context
  const [quantity, setQuantity] = useState(1); // Local state for quantity
  const price = 46.5; // Example price per item

  // Calculate subtotal based on the quantity
  const calculateSubtotal = (price, quantity) => (price * quantity).toFixed(2);

  // Handle quantity change
  const handleQuantityChange = (e, item) => {
    setQuantity(Number(e.target.value)); // Update the local quantity state
    // Update the quantity of the item in the cart
    const updatedItem = { ...item, quantity: Number(e.target.value) };
    addToCart(updatedItem); // Update the cart with new quantity
  };

  // Handle item removal from the cart
  const handleRemoveItem = (item) => {
    removeFromCart(item); // Remove item from cart
  };

  return (
    <div style={{ display: "flex" }} className="main-view-cart">
      {cart.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        cart.map((item, index) => (
          <div key={index} style={{ display: "flex", padding: "10px" }} className="cart-item">
            {/* Column 1 - Item Image */}
            <div style={{ flex: 1, padding: "10px", textAlign: "left", fontWeight: "bold" }}>
              <div>Item</div>
              <img
                className="image-viewcart"
                src={item.artwork} // Use the item artwork dynamically
                alt="Item"
              />
            </div>

            {/* Column 2 - Item Details */}
            <div style={{ flex: 1, padding: "10px" }}>
              <p className="custom-viewedit">{item.title}</p> {/* Item title */}
              <div style={{ overflowY: "scroll", height: "200px" }}>
              <p><strong>Style:</strong> {item.style}</p>
                <p><strong>Size:</strong> {item.size}</p>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                {/* Add other item properties dynamically as needed */}
              </div>
            </div>

            {/* Column 3 - Price, Qty, Subtotal */}
            <div style={{ flex: 1, padding: "10px" }} className="cart-price-column">
              <div className="cart-item-detail">
                <span className="price-label">Price:</span>
                <span className="price-value">${price.toFixed(2)}</span>
              </div>
              {/* <div className="cart-item-detail">
                <span className="qty-label">Qty:</span>
                <input
                  type="number"
                  className="qty-input"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => handleQuantityChange(e, item)}
                />
              </div> */}
              <div className="cart-item-detail">
                <span className="subtotal-label">Subtotal:</span>
                <span className="subtotal-value">${calculateSubtotal(price, item.quantity)}</span>
              </div>
            </div>

            {/* Column 4 - Remove Item */}
            <div style={{ padding: "10px" }}>
              <button onClick={() => handleRemoveItem(item)} className="remove-item-btn">Remove</button>
            </div>
          </div>
        ))
      )}

      {/* Summary and Checkout */}
      {cart.length > 0 && (
        <div className="fourth-col-viewcart">
          <p className="summary-viewedit">Summary</p>
          <p className="estimated-view">Estimated Shipping and Tax</p>
          <hr />
          <div className="sub-viewed">
            <p>Sub Total</p>
            <p>${cart.reduce((total, item) => total + calculateSubtotal(price, item.quantity), 0)}</p>
          </div>
          <hr />
          <div className="order-viewed">
            <p>Order Total</p>
            <p>${cart.reduce((total, item) => total + calculateSubtotal(price, item.quantity), 0)}</p>
          </div>
          <div className="button1-container">
            <button className="Button1-viewed">Go to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Vieweditcart;

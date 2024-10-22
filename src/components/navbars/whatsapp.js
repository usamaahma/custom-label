import React from "react";
import "./whatsapp.css"; // Import the CSS for the button

const WhatsappButton = () => {
  return (
    <a href="https://wa.me/+19304440014" className="whatsapp-button" target="_blank" rel="noopener noreferrer">
      <div className="whatsapp-container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          className="whatsapp-logo"
        />
        <div className="pulse-ring"></div>
      </div>
    </a>
  );
};

export default WhatsappButton;

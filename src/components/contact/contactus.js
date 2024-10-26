import React, { useState } from "react";
import "./contactus.css";

const countryCodes = [
  { code: "+1", name: "United States" },
  { code: "+44", name: "United Kingdom" },
  { code: "+91", name: "India" },
  { code: "+49", name: "Germany" },
  { code: "+61", name: "Australia" },
  // Add more country codes as needed
];

function Contactus() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneCode, setPhoneCode] = useState("+1"); // Default to US
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!captchaValue) {
      setError("Please verify that you are not a robot.");
      return;
    }

    // Handle form submission logic here (e.g., sending data to an API)
    alert("Form submitted successfully!");

    // Reset form
    setName("");
    setEmail("");
    setPhoneCode("+1");
    setPhone("");
    setMessage("");
    setAttachment(null);
    setCaptchaValue(null);
  };

  return (
    <div>
      <div className="contact-us-container">
        <h2 className="txt-contact-us">Contact Us</h2>
        <p>Questions? Contact Our Team</p>

        <div className="contact-us-form-container">
          <form className="contact-us-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="contact-us-phone-input">
              <select
                value={phoneCode}
                onChange={(e) => setPhoneCode(e.target.value)}
                required
              >
                {countryCodes.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.code} {country.name}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value.replace(/[^0-9]/g, ""))
                } // Only numbers
                required
              />
            </div>
            <textarea
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <input
              type="file"
              onChange={(e) => setAttachment(e.target.files[0])}
            />
            {error && <div className="error-message">{error}</div>}

            <button className="contact-us-btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="contact-us-details">
        <h2>Contact Details</h2>
        <div className="contact-all-things">
          <p>
            <strong className="address">Address:</strong>
            <br />
            1760 Glasco Turnpike
            <br />
            Woodstock, NY 12498
          </p>
          <p>
            <strong className="address">Phone:</strong>
            <br />
            Toll Free 1-844-868-3926
          </p>
          <p>
            <strong className="address">Email:</strong>
            <br />
            sales@theclothinglabels.com
          </p>
          <p>
            <strong className="address">Working Days/Hours:</strong>
            <br />
            Mon - Fri 9:00AM - 5:30PM EST
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contactus;

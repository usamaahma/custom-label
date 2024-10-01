import React from 'react';
import './footer.css'; // Import the CSS file for styling

function Footer1() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>Clothing Labels</h3>
          <ul>
            <li>Custom Woven Labels</li>
            <li>Iron-On Woven Labels</li>
            <li>Custom Sublimation Labels</li>
            <li>Custom Care Labels</li>
            <li>Custom Heat Transfer Labels</li>
            <li>Custom Cotton Labels</li>
            <li>Custom Satin Woven Labels</li>
            <li>Custom TPU Labels</li>
            <li>Custom Tyvek Labels</li>
            <li>Screen Printed Labels</li>
          </ul>
          <ul>
            <h3>Custom Patches</h3>
            <li>Custom Embroidered Patches</li>
            <li>Custom Woven Patches</li>
            <li>Custom PVC Patches</li>
            <li>Custom Leather Patches</li>
            <li>Printed Patches</li>
            <li>Chenille Patches</li>
            <li>Custom Woven Ribbon</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Hang Tags</h3>
          <ul>
            <li>Simple Hang Tags</li>
            <li>Fancy Hang Tags</li>
          </ul>
          <h3>Stock Labels & More</h3>
          <ul>
            <li>Stock Woven Labels</li>
            <li>Hangtag String</li>
            <li>Safety Pins</li>
          </ul>
          <h3>Resources</h3>
          <ul>
            <li>Inspiration Gallery</li>
            <li>Design Guide</li>
            <li>Color Chart</li>
            <li>Sewing Services</li>
            <li>FAQ</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>My Account</h3>
          <p>Dashboard</p>
          <p>Order History</p>
          <p>1-844-868-3926</p>
          <p>Artwork Approvals</p>
          <p>Privacy Policy</p>

          <h3>Contact Us</h3>
          <p>Monday-Friday</p>
          <p>9AM-5:30PM EST</p>
          <p>1-844-868-3926</p>
          <p>sales@customwovenlabels.com</p>
          <p>1760 Glasco Turnpike</p>
          <p>Woodstock NY 12498</p>
        </div>

        <div className="footer-column">
          <h3>Be The First To Know</h3>
          <p>Get all the latest information on events, sales, and offers. Sign up for our newsletter today.</p>
          <input type="email" placeholder="Your Email" className="footer-input" />
          <button className="btn-signup">Subscribe</button>

          <h3>We Accept</h3>
          <div className="footer-image">
            <img src='../../images/visacard.png' alt="Footer Logo" className='visaimg' />
          </div>
          <img src='../../images/highquality.png' alt="Footer Logo" className='highimg' />
        </div>
      </div>
      
      {/* Bottom Text and Line */}
      <div className="footer-bottom">
        <hr className="footer-line" />
        <p>© 2024 Custom Woven Labels, All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer1;

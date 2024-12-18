import React from "react";
import { Fade, Zoom } from "react-awesome-reveal";
import "./thankyou.css"; // Import the CSS file

function ThankYouPage() {
  return (
    <div className="thank-you-container">
      <Fade>
        <div className="thank-you-card">
          <Zoom cascade>
            <h1 className="thank-you-title">Thank You for Considering Us!</h1>
          </Zoom>
          <Fade bottom>
            <p className="thank-you-message">
              We truly appreciate your interest and trust in us. We look forward
              to serving you better!
            </p>
          </Fade>
          <Fade bottom>
            <button className="thank-you-button">Explore More</button>
          </Fade>
        </div>
      </Fade>
    </div>
  );
}

export default ThankYouPage;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
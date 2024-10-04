import React from "react";
import "./aboutstory.css";

function Aboutstory() {
  return (
    <div className="aboutstory-main">
      <div className="aboutstory-container">
        <div className="aboutstory-image">
          <img src="../images/about2.webp" alt="Descriptive Alt Text" />
        </div>
        <div className="aboutstory-text">
          <h2 className="aboutstory-title">
            Our Mission: Helping Millions of Organizations Grow Better
          </h2>
          <p className="aboutstory-description">
            We believe not just in growing bigger, but in growing better. And
            growing better means aligning the success of your own business with
            the success of your customers. Win-win!
          </p>
        </div>
      </div>
      <div className="aboutstory-container1">
        <div className="aboutstory-text1">
          <h2 className="aboutstory-title1">Our Story</h2>
          <p className="aboutstory-description1">
            In 2004, a group of passionate entrepreneurs identified a shift in
            the textile and fashion industry: customers were seeking unique,
            high-quality custom woven labels that represented their brand
            identity. By 2006, they launched a company dedicated to providing
            bespoke labeling solutions, transforming the way brands connect with
            their customers. Under the leadership of CEO Ahsan Khan, the company
            has evolved into a trusted partner for businesses, utilizing
            advanced technology and sustainable practices to produce custom
            woven labels. Committed to quality and innovation, they help brands
            create memorable impressions and build lasting connections with
            their audience.
          </p>
        </div>
        <div className="aboutstory-image1">
          <img src="../images/ceo.webp" alt="Descriptive Alt Text" />
        </div>
      </div>
    </div>
  );
}

export default Aboutstory;

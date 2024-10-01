import React from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import "./question.css";

function Question() {
  return (
    <Row className="question-row" justify="center" align="middle">
      <Col className="image-col" xs={24} sm={12} md={8}>
        <img
          className="img-bulb"
          src="../../images/bulb.svg"
          alt="Description"
        />
      </Col>
      <Col className="text-col" xs={24} sm={12} md={8}>
        <p className="question-text">Questions?</p>
        <p className="we-text">
          We are here to help. With over 15 years experience, we have the
          knowledge and experience to turn any vision into reality.
        </p>
      </Col>
      <Col className="button-col" xs={24} sm={12} md={8}>
        <Link to="/contact-us" className="contact-button-link">
          <button className="contact-button">Contact Us</button>
        </Link>
      </Col>
    </Row>
  );
}

export default Question;

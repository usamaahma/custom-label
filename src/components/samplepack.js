import React from "react";
import "./samplepack.css";
import { Row, Col } from "antd";

function Samplepack() {
  return (
    <div className="samplepack-container">
      <Row
        gutter={[16, 16]}
        justify="center"
        align="middle"
        className="row-sample"
      >
        <Col xs={24} md={18} className="col-image">
          <img src="../../images/brands.png" alt="Description" />
        </Col>
        <Col xs={24} md={6} className="col-text">
          <div className="get">
            <p>Get a Feel For Our Products</p>
          </div>
          <p className="explore">
            Explore our product line and decide what will work best for your
            next project.
          </p>
          <p className="sample">
            Sample Packs are $1 and ship within 1 business day.
          </p>
          <button className="btn-sample">Order a Sample Pack</button>
        </Col>
      </Row>
    </div>
  );
}

export default Samplepack;

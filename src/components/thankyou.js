import React from 'react';
import { Row, Col, Button } from 'antd';
import './thankyou.css';

 

function Thankyou1() {
  return (
    <div className="thankyou-page">
      <Row justify="center" align="middle" gutter={[16, 16]}>
        {/* Text Column - Right aligned */}
        <Col xs={24} sm={12} md={12} lg={12} className="thankyou-text-column">
          <div className="thankyou-text">
            <p className='thank-txt'>Thank You!</p>
            <p className='thank-txt2'>You have just done it! You have successfully completed your task.</p>
            <p className='thank-txt3'>What do you want to do next?</p>
            
            <div className="thankyou-buttons">
              <Button type="primary" size="large" href="/">Go Back Home</Button>
              <Button type="default" size="large" href="/all-products">View All Products</Button>
            </div>
          </div>
        </Col>

        {/* Image Column - with custom size */}
        <Col xs={24} sm={12} md={12} lg={12} className="thankyou-image-column">
          <div className="thankyou-image-container">
            <img src="../images/bachii.jpg" alt="Thank You" className="thankyou-image" />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Thankyou1;

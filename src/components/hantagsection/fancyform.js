import React from "react";
import "./fancyform.css";
import { Row, Col, Input, Select, Button, Form } from "antd";

const { Option } = Select;

const FancyForm1 = () => {
  return (
    <Form className="fancyform-main">
      <p className="fancy-heading-txt">Request Price Quote</p>
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <p className="txt-fancy-bold">Upload Artwork</p>
          <Form.Item className="custom-input-form">
            <Input type="file" className="custom-input-fancy" />
          </Form.Item>

          <p className="txt-fancy-bold">Size</p>
          <Row gutter={16} className="input-container-fancy">
            <Col>
              <Form.Item className="custom-input-form">
                <p>Width</p>
                <Input
                  placeholder="Width (inches)"
                  className="custom-input-fancy"
                  style={{ width: "10rem" }} // Adjust width as needed
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item className="custom-input-form">
                <p>Height</p>
                <Input
                  placeholder="Height (inches)"
                  className="custom-input-fancy"
                  style={{ width: "10rem" }} // Adjust width as needed
                />
              </Form.Item>
            </Col>
          </Row>

          <p className="txt-fancy-bold">Paper Weight</p>
          <Form.Item className="custom-input-form">
            <Select
              placeholder="Select Paper Weight"
              className="custom-input-fancy"
            >
              <Option value="100">100 gsm</Option>
              <Option value="200">200 gsm</Option>
              <Option value="300">300 gsm</Option>
            </Select>
          </Form.Item>
          <p className="txt-fancy-bold">Paper Finish</p>
          <Form.Item className="custom-input-form">
            <Select
              placeholder="Select Paper Finish"
              className="custom-input-fancy"
            >
              <Option value="matte">Matte</Option>
              <Option value="glossy">Glossy</Option>
              <Option value="silk">Silk</Option>
            </Select>
          </Form.Item>
          <p className="txt-fancy-bold">Print Option</p>
          <Form.Item className="custom-input-form">
            <Select
              placeholder="Select Print Option"
              className="custom-input-fancy"
            >
              <Option value="single">Single Sided</Option>
              <Option value="double">Double Sided</Option>
            </Select>
          </Form.Item>
          <p className="txt-fancy-bold">Hole Punch Position</p>
          <Form.Item className="custom-input-form">
            <Select
              placeholder="Select Position"
              className="custom-input-fancy"
            >
              <Option value="top">Top</Option>
              <Option value="bottom">Bottom</Option>
            </Select>
          </Form.Item>
          <p className="txt-fancy-bold">Emboss or Deboss</p>
          <Form.Item className="custom-input-form">
            <Select placeholder="Select Option" className="custom-input-fancy">
              <Option value="emboss">Emboss</Option>
              <Option value="deboss">Deboss</Option>
            </Select>
          </Form.Item>
          <p className="txt-fancy-bold">Round Corner</p>
          <Form.Item className="custom-input-form">
            <Select placeholder="Select Option" className="custom-input-fancy">
              <Option value="yes">Yes</Option>
              <Option value="no">No</Option>
            </Select>
          </Form.Item>
          <p className="txt-fancy-bold">UV Spot Gloss</p>
          <Form.Item className="custom-input-form">
            <Select placeholder="Select Option" className="custom-input-fancy">
              <Option value="yes">Yes</Option>
              <Option value="no">No</Option>
            </Select>
          </Form.Item>
          <p className="txt-fancy-bold">Metallic Foil Color</p>
          <Form.Item className="custom-input-form">
            <Select placeholder="Select Color" className="custom-input-fancy">
              <Option value="gold">Gold</Option>
              <Option value="silver">Silver</Option>
              <Option value="copper">Copper</Option>
            </Select>
          </Form.Item>
          <p className="txt-fancy-bold">String Color</p>
          <Form.Item className="custom-input-form">
            <Select placeholder="Select Color" className="custom-input-fancy">
              <Option value="red">Red</Option>
              <Option value="blue">Blue</Option>
            </Select>
          </Form.Item>
          <p className="txt-fancy-bold">Safety Color</p>
          <Form.Item className="custom-input-form">
            <Select placeholder="Select Color" className="custom-input-fancy">
              <Option value="yellow">Yellow</Option>
              <Option value="green">Green</Option>
            </Select>
          </Form.Item>
          <p className="txt-fancy-bold">Hole Grommet</p>
          <Form.Item className="custom-input-form">
            <Select placeholder="Select Grommet" className="custom-input-fancy">
              <Option value="yes">Yes</Option>
              <Option value="no">No</Option>
            </Select>
          </Form.Item>
          <p className="txt-fancy-bold">Proof Options</p>
          <Form.Item className="custom-input-form">
            <Select placeholder="Select Option" className="custom-input-fancy">
              <Option value="digital">Digital Proof</Option>
              <Option value="hard">Hard Copy Proof</Option>
            </Select>
          </Form.Item>
          <p className="txt-fancy-bold">Comments</p>
          <Form.Item className="custom-input-form">
            <Input.TextArea
              className="custom-input-fancy"
              placeholder="Enter any comments here"
            />
          </Form.Item>
          <p className="txt-fancy-bold">Quantity</p>
          <Form.Item className="custom-input-form">
            <Input
              type="number"
              className="custom-input-fancy"
              placeholder="Enter quantity"
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <p className="txt-fancy-bold">Name</p>
          <Form.Item className="custom-input-form">
            <Input
              placeholder="Enter your name"
              className="custom-input-fancy"
            />
          </Form.Item>
          <p className="txt-fancy-bold">Email</p>
          <Form.Item className="custom-input-form">
            <Input
              type="email"
              placeholder="Enter your email"
              className="custom-input-fancy"
            />
          </Form.Item>
          <p className="txt-fancy-bold">Phone Number</p>
          <Form.Item className="custom-input-form">
            <Input
              placeholder="Enter your phone number"
              className="custom-input-fancy"
            />
          </Form.Item>

          <Form.Item>
            <Button className="btn-fancy" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          <p className="txt-fancy-endline">
            After submitting, we will email you a custom price quote within
            <br></br> 2 business days.
          </p>
        </Col>
      </Row>
    </Form>
  );
};

export default FancyForm1;

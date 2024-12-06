import React from "react";
import "./fancyform.css";
import { Row, Col, Input, Select, Button, Form, message } from "antd";
import { requestquote } from "../../utils/axios";
const { Option } = Select;

const FancyForm1 = () => {
  const onFinish = (values) => {
    console.log("Form Values:", values);

    const data1 = {
      name: values.name || "",
      email: values.email || "",
      phoneNumber: values.phonenumber || "",
      // product: values.product || "",
      image: values.artwork || "defaultImagePath",
      width: Math.max(Number(values.width) || 0, 1), // Minimum width of 1
      height: Math.max(Number(values.height) || 0, 1),
      quantity: Number(values.quantity) || 1,
      proofOptions: values.proofOptions || "defaultOption",
      holeGrommet: values.holeGrommet || "defaultGrommet",
      safetyColor: values.safetyColor || "defaultColor",
      stringColor: values.stringColor || "defaultStringColor",
      metallicFoilColor: values.metallicFoilColor || "defaultFoil",
      uvSpotGloss: values.uvSpotGloss || false,
      roundCorner: values.roundCorner || false,
      embossOrDeboss: values.embossOrDeboss || false,
      holePunchPosition: values.holePunchPosition || "defaultPosition",
      printOption: values.printOption || "defaultPrint",
      paperFinish: values.paperFinish || "defaultFinish",
      paperWeight: values.paperWeight || "defaultWeight",
      comments: values.comments || "",
    };

    console.log("Payload Sent to API:", data1);

    requestquote({
      method: "post",
      data: data1,
    })
      .then((res) => {
        console.log("Success:", res);
        message.success("Thank you for considering us!");
      })
      .catch((error) => {
        console.error("Error during the request:", error);

        if (error.response) {
          message.error(
            `Error: ${
              error.response.data?.message ||
              "Something went wrong, please try again!"
            }`
          );
        } else {
          message.error("Network error or no response from the server.");
        }
      });
  };

  return (
    <Form
      className="fancyform-main"
      onFinish={onFinish} // Add onFinish handler
      layout="vertical" // Better layout for labels and inputs
    >
      <p className="fancy-heading-txt">Request Price Quote</p>
      <Row>
        <Col xs={24} sm={12}>
          <p className="txt-fancy-bold">Upload Artwork</p>
          <Form.Item className="custom-input-form" name="artwork">
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
          <Form.Item className="custom-input-form" name="paperWeight">
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
          <Form.Item className="custom-input-form" name="paperFinish">
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
          <Form.Item className="custom-input-form" name="printOption">
            <Select
              placeholder="Select Print Option"
              className="custom-input-fancy"
            >
              <Option value="single">Single Sided</Option>
              <Option value="double">Double Sided</Option>
            </Select>
          </Form.Item>
          <p className="txt-fancy-bold">Hole Punch Position</p>
          <Form.Item className="custom-input-form" name="holePunchPosition">
            <Select
              placeholder="Select Position"
              className="custom-input-fancy"
            >
              <Option value="top">Top</Option>
              <Option value="bottom">Bottom</Option>
            </Select>
          </Form.Item>
          <p className="txt-fancy-bold">Emboss or Deboss</p>
          <Form.Item className="custom-input-form" name="embossOrDeboss">
            <Select placeholder="Select Option" className="custom-input-fancy">
              <Option value="emboss">Emboss</Option>
              <Option value="deboss">Deboss</Option>
            </Select>
          </Form.Item>
          <p className="txt-fancy-bold">Round Corner</p>
          <Form.Item className="custom-input-form" name="roundCorner">
            <Select placeholder="Select Option" className="custom-input-fancy">
              <Option value="yes">Yes</Option>
              <Option value="no">No</Option>
            </Select>
          </Form.Item>
          <p className="txt-fancy-bold">UV Spot Gloss</p>
          <Form.Item className="custom-input-form" name="uvSpotGloss">
            <Select placeholder="Select Option" className="custom-input-fancy">
              <Option value="yes">Yes</Option>
              <Option value="no">No</Option>
            </Select>
          </Form.Item>
          <p className="txt-fancy-bold">Metallic Foil Color</p>
          <Form.Item className="custom-input-form" name="metallicFoilColor">
            <Select placeholder="Select Color" className="custom-input-fancy">
              <Option value="gold">Gold</Option>
              <Option value="silver">Silver</Option>
              <Option value="copper">Copper</Option>
            </Select>
          </Form.Item>
          <p className="txt-fancy-bold">String Color</p>
          <Form.Item className="custom-input-form" name="stringColor">
            <Select placeholder="Select Color" className="custom-input-fancy">
              <Option value="red">Red</Option>
              <Option value="blue">Blue</Option>
            </Select>
          </Form.Item>
          <p className="txt-fancy-bold">Safety Color</p>
          <Form.Item className="custom-input-form" name="safetyColor">
            <Select placeholder="Select Color" className="custom-input-fancy">
              <Option value="yellow">Yellow</Option>
              <Option value="green">Green</Option>
            </Select>
          </Form.Item>
          <p className="txt-fancy-bold">Hole Grommet</p>
          <Form.Item className="custom-input-form" name="holeGrommet">
            <Select placeholder="Select Grommet" className="custom-input-fancy">
              <Option value="yes">Yes</Option>
              <Option value="no">No</Option>
            </Select>
          </Form.Item>
          <p className="txt-fancy-bold">Proof Options</p>
          <Form.Item className="custom-input-form" name="proofOptions">
            <Select placeholder="Select Option" className="custom-input-fancy">
              <Option value="digital">Digital Proof</Option>
              <Option value="hard">Hard Copy Proof</Option>
            </Select>
          </Form.Item>
          <p className="txt-fancy-bold">Comments</p>
          <Form.Item className="custom-input-form" name="comments">
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
          <Form.Item className="custom-input-form" name="name">
            <Input
              placeholder="Enter your name"
              className="custom-input-fancy"
            />
          </Form.Item>
          <p className="txt-fancy-bold">Email</p>
          <Form.Item className="custom-input-form" name="email">
            <Input
              type="email"
              placeholder="Enter your email"
              className="custom-input-fancy"
            />
          </Form.Item>
          <p className="txt-fancy-bold">Phone Number</p>
          <Form.Item className="custom-input-form" name="phonenumber">
            <Input
              placeholder="Enter your phone number"
              className="custom-input-fancy"
            />
          </Form.Item>

          <Form.Item>
            <Button className="btn-fancy" htmlType="submit">
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

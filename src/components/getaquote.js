import React from "react";
import {
  Form,
  Input,
  Button,
  InputNumber,
  Upload,
  Select,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Zoom } from "react-awesome-reveal";
import { getquote } from "../utils/axios";

import "./getaquote.css";

const { TextArea } = Input;
const { Option } = Select;

function Getaquote1() {
  const onFinish = (values) => {
    console.log("Success:", values);

    const data1 = {
      name: values.name,
      email: values.email,
      product: values.products,
      artwork: values.artwork,
      width: String(values.width), // Convert to string
      height: String(values.height), // Convert to string
      quantity: String(values.quantity), // Convert to string
      phonenumber: values.contactNumber,
      comments: values.comments,
    };

    getquote({
      method: "post",
      data: data1,
    })
      .then((res) => {
        console.log(res);
        message.success("Thank you for considering us!");
      })
      .catch(() => {
        message.error("something went wrong, please try again!");
      });
  };

  const handleChange = (info) => {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
  };

  return (
    <div className="customform-wrapper">
      <div className="customform-container">
        <h2 className="customform-heading">Get a Quote</h2>
        <p className="customform-quote-text">
          Receive the lowest pricing & work with a team of experts.
        </p>

        <Zoom cascade>
          <img
            src="../../images/uploadform.png"
            alt="Approve"
            className="customform-upload-image"
          />
        </Zoom>
        <p className="customform-upload">Upload Artwork</p>
        <p className="customform-upload">
          Acceptable file types: png, jpg, jpeg, gif, pdf, ai, psd, svg
        </p>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label={<span className="customform-label">Select Products</span>}
            name="products"
            rules={[{ required: true, message: "Please select a product!" }]}
          >
            <Select
              placeholder="Select a product"
              className="customform-select"
            >
              <Option value="Express Clothing Labels">Express Clothing Labels</Option>
              <Option value="Custom Heat Transfer Labels">Custom Heat Transfer Labels</Option>
              <Option value="Custom Cotton Labels">Custom Cotton Labels</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label={<span className="customform-label">Upload Artwork</span>}
            name="artwork"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
            rules={[{ required: true, message: "Please upload your artwork!" }]}
          >
            <Upload onChange={handleChange} beforeUpload={() => false} multiple>
              <Button
                className="customform-uploadbutton"
                icon={<UploadOutlined />}
              >
                Upload Artwork
              </Button>
            </Upload>
          </Form.Item>

          <div className="customform-item-row">
            <Form.Item
              label={<span className="customform-label">Width (inches)</span>}
              name="width"
              rules={[{ required: true, message: "Please enter the width!" }]}
            >
              <InputNumber
                placeholder="Enter width"
                className="customform-input-number"
                min={1}
              />
            </Form.Item>

            <Form.Item
              label={<span className="customform-label">Height (inches)</span>}
              name="height"
              rules={[{ required: true, message: "Please enter the height!" }]}
            >
              <InputNumber
                placeholder="Enter height"
                className="customform-input-number"
                min={1}
              />
            </Form.Item>
          </div>

          <Form.Item
            label={<span className="customform-label">Quantity</span>}
            name="quantity"
            rules={[{ required: true, message: "Please enter the quantity!" }]}
          >
            <InputNumber
              placeholder="Enter quantity"
              className="customform-input-number"
              min={1}
            />
          </Form.Item>
          <Form.Item
            label={<span className="customform-label">Contact Number</span>}
            name="contactNumber"
            rules={[
              { required: true, message: "Please enter your contact number!" },
              { len: 11, message: "Contact number must be exactly 11 digits!" },
              {
                pattern: /^[0-9]+$/,
                message: "Contact number must be numeric!",
              }, // Ensures only digits are allowed
            ]}
          >
            <Input
              placeholder="Enter Your Contact Number"
              className="customform-input-number"
              type="tel" // Use 'tel' to open numeric keypad
              maxLength={11} // Limit input to 11 characters
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault(); // Prevent non-numeric input
                }
              }}
            />
          </Form.Item>

          <Form.Item
            label={<span className="customform-label">Name</span>}
            name="name"
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input placeholder="Enter your name" className="customform-input" />
          </Form.Item>

          <Form.Item
            label={<span className="customform-label">Email Address</span>}
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              placeholder="Enter your email address"
              className="customform-input"
            />
          </Form.Item>

          <Form.Item
            label={<span className="customform-label">Comments</span>}
            name="comments"
            rules={[{ required: true, message: "Please add your comments!" }]}
          >
            <TextArea
              placeholder="Your comments"
              rows={4}
              className="customform-textarea"
            />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              block
              className="customform-submit-button"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>

        <h6 className="customform-h6-form">
          In a Hurry? Give us a call at{" "}
          <a href="tel:+1234567890" className="customform-call-link">
            +123-456-7890
          </a>
        </h6>

        <hr />
      </div>
    </div>
  );
}

export default Getaquote1;

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
import { getquote } from "../../utils/axios";

import "./beatquote.css";

const { TextArea } = Input;
const { Option } = Select;

function Beatquote() {
  const onFinish = (values) => {
    console.log("Success:", values);

    const data1 = {
      name: values.name,
      email: values.email,
      product: values.products,
      artwork: values.artwork,
      width: String(values.width),
      height: String(values.height),
      quantity: String(values.quantity),
      phonenumber: values.contactNumber,
      comments: values.comments,
    };

    getquote({
      method: "post",
      data: data1,
    })
      .then((res) => {
        console.log("success", res);
        message.success("Thank you for considering us!");
      })
      .catch(() => {
        message.error("Something went wrong, please try again!");
      });
  };

  const handleChange = (info) => {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
  };

  return (
    <div className="beatquote-customform-wrapper">
      <h2 className="beatquote-customform-heading">Get a Quote</h2>
      <div className="beatquote-customform-container">
        <p className="beatquote-customform-quote-text">
          Receive the lowest pricing & work with a team of experts.
        </p>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label={
              <span className="beatquote-customform-label">
                Select Products
              </span>
            }
            name="products"
            rules={[{ required: true, message: "Please select a product!" }]}
          >
            <Select
              placeholder="Select a product"
              className="beatquote-customform-select"
            >
              <Option value="Express Clothing Labels">
                Express Clothing Labels
              </Option>
              <Option value="Custom Heat Transfer Labels">
                Custom Heat Transfer Labels
              </Option>
              <Option value="Custom Cotton Labels">Custom Cotton Labels</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label={
              <span className="beatquote-customform-label">Upload Artwork</span>
            }
            name="artwork"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
            rules={[{ required: true, message: "Please upload your artwork!" }]}
            className="beatquote-customform-uploadbutton"
          >
            <Upload onChange={handleChange} beforeUpload={() => false} multiple>
              <Button icon={<UploadOutlined />}>Upload Artwork</Button>
            </Upload>
          </Form.Item>

          <div className="beatquote-customform-item-row">
            <Form.Item
              label={<span className="beatquote-customform-label">Width</span>}
              name="width"
              rules={[{ required: true, message: "Please enter the width!" }]}
            >
              <InputNumber
                placeholder="Enter width"
                className="beatquote-customform-input-number"
                min={1}
              />
            </Form.Item>

            <Form.Item
              label={<span className="beatquote-customform-label">Height</span>}
              name="height"
              rules={[{ required: true, message: "Please enter the height!" }]}
            >
              <InputNumber
                placeholder="Enter height"
                className="beatquote-customform-input-number"
                min={1}
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="beatquote-customform-label">Quantity</span>
              }
              name="quantity"
              rules={[
                { required: true, message: "Please enter the quantity!" },
              ]}
            >
              <InputNumber
                placeholder="Enter quantity"
                className="beatquote-customform-input-number"
                min={1}
              />
            </Form.Item>
          </div>

          <Form.Item
            label={
              <span className="beatquote-customform-label">Contact Number</span>
            }
            name="contactNumber"
            rules={[
              { required: true, message: "Please enter your contact number!" },
              { len: 11, message: "Contact number must be exactly 11 digits!" },
              {
                pattern: /^[0-9]+$/,
                message: "Contact number must be numeric!",
              },
            ]}
          >
            <Input
              placeholder="Enter Your Contact Number"
              className="beatquote-customform-input-number"
              type="tel"
              maxLength={11}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          </Form.Item>

          <Form.Item
            label={<span className="beatquote-customform-label">Name</span>}
            name="name"
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input
              placeholder="Enter your name"
              className="beatquote-customform-input"
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="beatquote-customform-label">Email Address</span>
            }
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              placeholder="Enter your email address"
              className="beatquote-customform-input"
            />
          </Form.Item>

          <Form.Item
            label={<span className="beatquote-customform-label">Comments</span>}
            name="comments"
            rules={[{ required: true, message: "Please add your comments!" }]}
          >
            <TextArea
              placeholder="Your comments"
              rows={4}
              className="beatquote-customform-textarea"
            />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              block
              className="beatquote-customform-submit-button"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>

        <h6 className="beatquote-customform-h6-form">
          In a Hurry? Give us a call at{" "}
          <a href="tel:+1234567890" className="beatquote-customform-call-link">
            +123-456-7890
          </a>
        </h6>

        <hr />
      </div>
    </div>
  );
}

export default Beatquote;

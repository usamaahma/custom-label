import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  InputNumber,
  Select,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Storage } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

import {
  uploadBytes,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { getquote } from "../../utils/axios";

import "./beatquote.css";

const { TextArea } = Input;
const { Option } = Select;

function Beatquote() {
  const navigate = useNavigate();
  const [percent, setPercent] = useState("");
  const [url, setUrl] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const date = new Date();
  const showTime =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  const handlesubmit = (e) => {
    const uploadedFile = e.target.files[0]; // Get the uploaded file
    if (uploadedFile) {
      const imageDocument = ref(
        Storage,
        `images/${uploadedFile.name + showTime}`
      );
      const uploadTask = uploadBytesResumable(imageDocument, uploadedFile);

      uploadTask.on("state_changed", (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPercent(percent);
      });

      uploadBytes(imageDocument, uploadedFile)
        .then(() => {
          getDownloadURL(imageDocument)
            .then((Url) => {
              setUrl(Url);
              setUploadedImageUrl(Url); // Set the uploaded image URL
              console.log(Url);
            })
            .catch((error) => {
              console.log(error.message, "error getting the image url");
            });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };
  const onFinish = (values) => {
    console.log("Success:", values);

    const data1 = {
      name: values.name,
      email: values.email,
      product: values.products,
      artwork: [url],
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
        navigate("/thank-you"); 
      })
      .catch(() => {
        message.error("Something went wrong, please try again!");
      });
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

          <input type="file" onChange={handlesubmit} />
          <img src={url} alt="image" style={{width:"5rem",height:"5rem"}}/>

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

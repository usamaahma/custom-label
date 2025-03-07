import React, { useEffect, useState } from "react";
import { Form, Input, Button, InputNumber, Select, message } from "antd";
import { Zoom } from "react-awesome-reveal";
import { getquote, products } from "../utils/axios";
import { Storage } from "../firebaseConfig";
import {
  uploadBytes,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { useNavigate } from "react-router-dom"; 
import { Helmet } from "react-helmet"; 

import "./getaquote.css";

const { Option } = Select;

function Getaquote1() {
  const navigate = useNavigate();
  const [percent, setPercent] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const date = new Date();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await products.get("/");
        const data = response.data.results || response.data;
        setAllProducts(data.map((item) => item.title));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const onFinish = (values) => {
    console.log("Success:", values);

    const data1 = {
      name: values.name,
      email: values.email,
      product: values.products,
      artwork: [url],
      size: values.size,
      quantity: String(values.quantity),
      phonenumber: values.contactNumber,
    };

    getquote({
      method: "post",
      data: data1,
    })
      .then((res) => {
        message.success("Thank you for considering us!");
        navigate("/thank-you");
      })
      .catch(() => {
        message.error("something went wrong, please try again!");
      });
  };

  const showTime =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  const handlesubmit = (e) => {
    const uploadedFile = e.target.files[0];
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
              setUploadedImageUrl(Url);
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
  return (
    <div className="customform-wrapper">
      <Helmet>
        <title>
          Woven Labels - High-Quality Custom Labels for Your Products
        </title>
        <meta
          name="description"
          content="Discover high-quality woven labels to personalize your products. Custom labels designed for durability and style."
        />
        <meta
          name="keywords"
          content="woven labels, custom labels,product labels, high-quality labels, personalized labels"
        />
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Custom Woven Labels",
            "description": "Discover high-quality woven labels to personalize your products. Custom labels designed for durability and style.",
            "url": "https://www.mywebsite.com/wovenlabels",
            "image": "https://www.mywebsite.com/images/woven-label.jpg"
          }`}
        </script>
      </Helmet>
      <div className="customform-container">
        <h1 className="customform-heading">Get a Quote</h1>
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
              style={{ marginBottom: "1rem" }}
              placeholder="Select a product"
              className="customform-select"
            >
              {allProducts.map((product, index) => (
                <Option key={index} value={product}>
                  {product}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <input type="file" onChange={handlesubmit} />
          {url && (
            <img
              src={url}
              alt="Uploaded preview"
              style={{ width: "5rem", height: "5rem" }}
            />
          )}
          <div className="customform-item-row">
            <Form.Item
              label={<span className="customform-label">Size (inches)</span>}
              name="size"
              rules={[{ required: true, message: "Please enter the size!" }]}
            >
              <Input
                placeholder="Width x Height"
                className="customform-input"
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
              },
            ]}
          >
            <Input
              placeholder="Enter Your Contact Number"
              className="customform-input-number"
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
        <p className="customform-h6-form">
          In a Hurry? Give us a call at{" "}
          <a href="tel:+1234567890" className="customform-call-link">
            +123-456-7890
          </a>
        </p>
        <hr />
      </div>
    </div>
  );
}

export default Getaquote1;

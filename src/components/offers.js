import React from "react";
import { Card, Row, Col } from "antd";
import { Bounce } from "react-awesome-reveal";
import "./offers.css";

const seoTopics = [
  {
    title: "Custom Woven Labels",
    ImageUrl: "../../images/custom woven.jpg",
    description:
      "Custom woven labels are a must-have for businesses and individuals looking to add a touch of professionalism and branding to their products. These labels are meticulously crafted to showcase your unique logo, brand name, or personalized message with precision. Whether you are in the fashion industry, crafting handmade goods, or running a small business, custom woven labels offer a distinct and elegant way to leave a lasting impression on your customers.",
  },
  {
    title: "3-Day Rush Labels",
    ImageUrl: "../../images/3day.jpg",
    description:
      "Express Clothing Labels offer fully customizable, visually stunning options that surpass traditional woven and printed labels. With photographic quality and exceptional color capture, our labels showcase intricate details and vibrant colors in just three business days. Whether you need your brand logo, a special message, or a unique design, our labels ensure your products stand out. Experience the perfect blend of speed, quality, and personalization with Express Clothing Labels, where we redefine what labels can achieve.",
  },
  {
    title: "Custom Care Labels",
    ImageUrl: "../../images/custom care.jpg",
    description:
      "Custom care labels are essential for garment longevity and wearability. Often overlooked, these labels provide crucial information on washing, handling, and caring for clothing. Whether its instructions for delicate fabrics or optimal washing temperatures, custom care labels guide customers through laundry day. At CustomWovenLabels.com, we offer fully customizable options that not only showcase your brand identity but also deliver vital care instructions. Enhance your customers experience with garments that look great and last longer.",
  },
  {
    title: "Custom Cotton Labels",
    ImageUrl: "../../images/custom cotton.jpg",
    description:
      "Discover the timeless charm of custom cotton labels at CustomWovenLabels.com. Our labels beautifully capture the natural beauty of cotton while evoking a vintage aesthetic. With earthy tones and rustic textures, they add a handmade feel that resonates with discerning customers. Perfect for boutique brands and artisans, our labels provide a unique canvas for your branding, creating a genuine connection with your audience and celebrating the enduring appeal of cotton.",
  },
  {
    title: "Hang Tags",
    ImageUrl: "../../images/hang tags.jpg",
    description:
      "Make a statement and bring attention to your products with our stylish and informative hang tags from CustomWovenLabels.com. These tags are not just labels; theyre powerful branding tools that draw the eye and elevate your brands identity. Whether youre in the fashion industry, crafting unique goods, or showcasing your creations, our customizable hang tags are designed to leave a lasting impression.",
  },
  {
    title: "PVC Patches",
    ImageUrl: "../../images/pvc patches.jpg",
    description:
      "Discover the perfect blend of durability and aesthetics with our PVC patches. These weatherproof wonders not only boast a striking 3D appearance but are also designed to withstand the elements, making them ideal for outdoor adventures, sports, and rugged applications. With over 15 years of expertise, we ve honed our craft to deliver PVC patches that capture intricate details with precision, while their 3D look adds a tactile and eye-catching dimension to your brand or products.",
  },
];

const Offers1 = () => {
  return (
    <div className="hirecards-container">
      <Row gutter={[16, 16]} justify="center">
        {seoTopics.map((topic, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <Card className="hirecard" hoverable bordered={false}>
              <Bounce cascade>
                <img
                  src={topic.ImageUrl}
                  alt={topic.title}
                  className="card-icon"
                />
              </Bounce>
              <h3>{topic.title}</h3>
              <p className="hirecard-p">{topic.description}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Offers1;

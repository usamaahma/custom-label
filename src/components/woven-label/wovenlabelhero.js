import React, { useState } from 'react';
import "./wovenlabelhero.css";
import { Col, Row } from 'antd';

function Wovenlabelhero() {
    // State to hold the currently selected image
    const [selectedImage, setSelectedImage] = useState('../images/martin.png');

    // Array of images for the thumbnail carousel
    const thumbnailImages = [
        '../images/martin.png',
        '../images/girl.png',
        '../images/post.png',
        '../images/martin.png', // Add more images as needed
    ];

    return (
        <div className="centered-container">
            <Row className="centered-row" gutter={[16, 16]}>
                <Col xs={24} sm={16} md={12} className="text-column">
                    <p className='expresstext-clothing'>Woven Text Labels</p>
                    <p className='largetext-express'>
                        No artwork file? Not a problem. Our simple design tool allows you to easily create personalized name labels for clothing. These name labels for clothes are high quality and affordable, starting at only $18. Design your basic woven clothing labels with two thread colors and up to two lines of text. Three size options are also available. Name labels for clothing also allow you to approve your design before checkout, saving time and allowing your order to go directly into production. All woven text labels are manufactured individually and ship within 15 business days of placing your order.
                    </p>
                    <div className='hero-firstdiv'>
                        <div>
                            <ul className='list-express'>
                                <li>Online design tool
                                </li>
                                <li>No artwork file required
                                </li>
                                <li>Instant digital proof approval
                                </li>
                                <li>2 colors & 2 lines of text
                                </li>
                                <li>Straight cut (flat) only
                                </li>
                                <li>Fast turnaround & delivery
                                </li>
                            </ul>
                            <img className='image-post' alt='post' src='../images/post.png' />
                        </div>
                        <div className='second-firstdiv'>
                            <p className='our-productexpress'>Our Product Process</p>
                            <ol className='order-list'>
                                <li>Create your label and approve before adding to cart.</li>
                                <li>Complete our fast checkout.</li>
                                <li>See your Ship Date and track your order progress from your customer account.</li>
                            </ol>
                        </div>
                    </div>
                </Col>
                <Col xs={24} sm={8} md={6} className="image-column">
                    <div className="main-image-container">
                        <img alt="Express Clothing Labels" src={selectedImage} className="img-fluid main-image" />
                    </div>
                    <div className="thumbnail-carousel">
                        {/* Map through thumbnail images */}
                        {thumbnailImages.map((image, index) => (
                            <img
                                key={index}
                                alt={`Thumbnail ${index}`}
                                src={image}
                                className="thumbnail-image"
                                onClick={() => setSelectedImage(image)} // Update main image on click
                            />
                        ))}
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Wovenlabelhero;

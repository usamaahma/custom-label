import React, { useState } from 'react';
import "../expressclothing/expresshero.css";
import { Col, Row } from 'antd';

function Sublimationhero() {
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
                    <p className='expresstext-clothing'>Custom Sublimation Labels</p>
                    <p className='largetext-express'>
                        Custom sublimation labels utilize a dye-sublimation print to translate designs with complex color blends or photographic details onto your clothing labels. The results are impressive and allow us to produce clothing label designs not possible with traditional woven labels. Sublimation labels use our soft woven label material.                    </p>
                    <p className='largetext-express'>
                        Any special instructions not included in your artwork file can be included in the comment section below. You will receive a digital proof for final approval within 1 business day of placing your order. An expert staff member will be assigned to your order in case you have any questions.                    </p>

                    <div className='hero-firstdiv'>
                        <div>
                            <ul className='list-express'>
                                <li>Unlimited colors
                                </li>
                                <li>Any fold style
                                </li>
                                <li>Size versions available (s, m, l, xl)
                                </li>
                                <li>Sew-on, Iron-on or Peel & Stick
                                </li>
                                <li>Graphic artwork assistance
                                </li>
                                <li>Fast turnaround time & delivery
                                </li>
                            </ul>
                            <img className='image-post' alt='post' src='../images/post.png' />
                        </div>
                        <div className='second-firstdiv'>
                            <p className='our-productexpress'> Our Order Process</p>
                            <ol className='order-list'>
                                <li>Get your Digital Proof within 1 business day. Approve or reject your proof from your customer account.</li>
                                <li>If selected, get your Sample Photo within 5 business days of approving your digital proof.</li>
                                <li>After your approvals are complete, view your Ship Date in your customer account.</li>
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

export default Sublimationhero;

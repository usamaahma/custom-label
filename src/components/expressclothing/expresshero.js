import React, { useState } from 'react';
import "./expresshero.css";
import { Col, Row } from 'antd';

function Expresshero() {
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
                    <p className='expresstext-clothing'>Express Clothing Labels</p>
                    <p className='largetext-express'>
                        These fast delivery clothing labels include the industry's quickest 3-day turnaround time for customized fabric clothing labels. Express clothing labels are guaranteed to ship within 3 business days of receiving your digital proof approval. These custom woven labels are made in the USA and use a dye-sublimation printing process for unlimited colors. Your design is imprinted onto our premium woven label material and cut to size with an ultrasonic knife for soft edges that won't fray.
                    </p>
                    <p className='largetext-express'>
                        Upload artwork and select your options below. Our team will help finalize your express clothing label design and send you a digital proof for approval within 1 business day. You'll be able to approve your proof or make changes if necessary before full production. A team expert will be assigned to your order in case you have any questions.
                    </p>

                    <div className='hero-firstdiv'>
                        <div>
                            <ul className='list-express'>
                                <li>Fastest 3-Day Turnaround</li>
                                <li>Custom Woven Labels Made in USA</li>
                                <li>Straight Cut / Sew-on Only</li>
                                <li>Manufactured in New York</li>
                                <li>Free Artwork Assistance</li>
                            </ul>
                            <img className='image-post' alt='post' src='../images/post.png' />
                        </div>
                        <div className='second-firstdiv'>
                            <p className='our-productexpress'>Our Product Process</p>
                            <ol className='order-list'>
                                <li>Get your Digital Proof within 1 business day. Approve or reject your proof from your customer account.</li>
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

export default Expresshero;

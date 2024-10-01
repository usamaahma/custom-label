
import React from 'react';
import { Button, Card, Col, Row, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import "./tablescart.css"
import LastTable from './lasttable';

const { Dragger } = Upload;
const props = {
    name: 'file',
    multiple: true,
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};
const cardData = [
    { id: 1, imgSrc: '../images/straight.png', title: '0.75 x 1' },
    { id: 2, imgSrc: '../images/straight.png', title: '0.75 x 1' },
    { id: 3, imgSrc: '../images/straight.png', title: '0.75 x 1' },
    { id: 4, imgSrc: '../images/straight.png', title: '0.75 x 1' },
    { id: 5, imgSrc: '../images/straight.png', title: '0.75 x 1' },
    { id: 6, imgSrc: '../images/straight.png', title: '0.75 x 1' },
    { id: 7, imgSrc: '../images/straight.png', title: '0.75 x 1' },
    { id: 8, imgSrc: '../images/straight.png', title: '0.75 x 1' },
    { id: 9, imgSrc: '../images/straight.png', title: '0.75 x 1' },
    { id: 10, imgSrc: '../images/straight.png', title: '0.75 x 1' },
    { id: 11, imgSrc: '../images/straight.png', title: '0.75 x 1' },
    { id: 12, imgSrc: '../images/straight.png', title: '0.75 x 1' },
    { id: 13, imgSrc: '../images/straight.png', title: '0.75 x 1' },
    { id: 14, imgSrc: '../images/straight.png', title: '0.75 x 1' },
    { id: 15, imgSrc: '../images/straight.png', title: '0.75 x 1' },
    { id: 16, imgSrc: '../images/straight.png', title: '0.75 x 1' },
];


function CenteredColumns() {
    return (
        <div className='table-express'>
            <Row className="centered-row-table">
                <Col xs={24} md={16} className="left-column">
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <i class="fa fa-upload" aria-hidden="true"></i>
                        </p>
                        <p className="ant-upload-text">
                            Upload Your Artwork File</p>

                    </Dragger>
                    <div>
                        <div className='divs-tableexpress'>
                            <Card
                                bordered={false}
                                style={{
                                    width: "11rem",
                                    height: "12rem",
                                    background: "#FAFAFA",
                                }}
                            >
                                <img alt='abc' src='../images/straight.png' className='image-card-express' />
                                <p>Straight Cut <br />(Flat)</p>
                            </Card>
                        </div>
                        <div className='divs-tableexpress'>
                            <div className="card-grid">
                                {cardData.map((card) => (
                                    <div key={card.id} className="card-container">
                                        <Card
                                            bordered={false}
                                        >
                                            <img alt={card.title} src={card.imgSrc} className='image-card-express-1' />
                                            <p>{card.title} <br /> {card.subtitle}</p>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='divs-tableexpress'>
                            <Card
                                bordered={false}
                                style={{
                                    width: "11rem",
                                    height: "12rem",
                                    background: "#FAFAFA",
                                }}
                            >
                                <img alt='abc' src='../images/straight.png' className='image-card-express' />
                                <p>Straight Cut <br />(Flat)</p>
                            </Card>
                            <Card
                                bordered={false}
                                style={{
                                    width: "11rem",
                                    height: "12rem",
                                    background: "#FAFAFA",
                                }}
                            >
                                <img alt='abc' src='../images/straight.png' className='image-card-express' />
                                <p>Straight Cut <br />(Flat)</p>
                            </Card>
                        </div>
                        <div className='divs-tableexpress'>
                            <Card
                                bordered={false}
                                style={{
                                    width: "11rem",
                                    height: "12rem",
                                    background: "#FAFAFA",
                                }}
                            >
                                <img alt='abc' src='../images/straight.png' className='image-card-express' />
                                <p>Straight Cut <br />(Flat)</p>
                            </Card>
                        </div>
                        <div className='divs-tableexpress'>
                            <Card
                                bordered={false}
                                style={{
                                    width: "11rem",
                                    height: "12rem",
                                    background: "#FAFAFA",
                                }}
                            >
                                <img alt='abc' src='../images/straight.png' className='image-card-express' />
                                <p>Straight Cut <br />(Flat)</p>
                            </Card>
                        </div>
                        <div className='divs-tableexpress'>
                            <textarea
                                rows={4} // Set the number of rows to 4
                                style={{
                                    width: '100%', // Make it full width or adjust as needed
                                    resize: 'vertical', // Allow vertical resizing
                                    padding: '10px', // Add some padding for aesthetics
                                }}
                                placeholder="Enter your text here..."
                            />
                        </div>
                        <div className='divs-tableexpress'>
                            <LastTable />
                        </div>


                    </div>
                </Col>

                {/* Right Column with Sticky Div */}
                <Col xs={24} md={8} className="right-column">
                    <div className="sticky-div">
                        {/* Your sticky content goes here */}
                        <div className='sticky-first'><p>Your Instant Quote</p></div>
                        <div className='sticky-blue-1'>
                            <p className='marg-bot'>Express Clothing Labels</p>
                            <div className='sticky-blue-inside'>
                                <p>Artwork File:</p>
                                <p>No Artwork Uploaded</p>
                            </div>
                        </div>
                        <div className='sticky-blue'>
                            <div className='sticky-blue-inside'>
                                <p>Size:
                                </p>
                                <p>
                                    0.75" / 1" (19.05mm x 25.40mm)</p>
                            </div>
                        </div>
                        <div className='sticky-blue'>
                            <div className='sticky-blue-inside'>
                                <p>Style:</p>
                                <p>Straight Cut (Flat)
                                </p>
                            </div>
                        </div> <div className='sticky-blue'>
                            <div className='sticky-blue-inside'>
                                <p>Versions:
                                </p>
                                <p>None</p>
                            </div>
                        </div> <div className='sticky-blue'>
                            <div className='sticky-blue-inside'>
                                <p>Proof Options:
                                </p>
                                <p>Digital Proof Only
                                </p>
                            </div>
                        </div>
                        <div className='sticky-blue'>
                            <div className='sticky-blue-inside'>
                                <p>Turnaround Options:
                                </p>
                                <p>RUSH: 3 Business Days
                                </p>
                            </div>
                        </div>
                        <div className='sticky-blue'>
                            <div className='sticky-blue-inside'>
                                <p>1000 pcs
                                </p>
                                <p>$0.54/Each
                                </p>
                                <p>$540.00
                                </p>
                            </div>
                        </div>
                        <div className='sticky-blue'>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <Button className='button-tablecart'>
                                    <i class="fa fa-cart-arrow-down" aria-hidden="true"></i>
                                    ADD TO CART
                                </Button>
                            </div>

                        </div>
                        <div>
                            <div className='sticky-help'>
                                <p>Need Help?</p>
                                <a href="tel:+1234567890">
                                    <i class="fa fa-phone-square size-i" aria-hidden="true"></i>
                                </a>
                                <a href="mailto:demo@example.com">
                                    <i class="fa fa-envelope size-i" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default CenteredColumns;

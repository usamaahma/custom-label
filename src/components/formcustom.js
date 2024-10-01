import React from 'react';
import { Form, Input, Button, InputNumber, Upload, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Zoom} from 'react-awesome-reveal';
import './formcustom.css';

const { TextArea } = Input;
const { Option } = Select;

function Formcustom1() {
    const onFinish = (values) => {
        console.log('Form Values:', values);
    };

    const handleChange = (info) => {
        if (info.file.status !== 'uploading') {
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

                <Zoom cascade><img src="../../images/uploadform.png" alt="Approve" className='customform-upload-image' /></Zoom>
                <p className='customform-upload'>Upload Artwork</p>
                <p className='customform-upload'>Acceptable file types: png, jpg, jpeg, gif, pdf, ai, psd, svg</p>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label={<span className="customform-label">Select Products</span>}
                        name="products"
                        rules={[{ required: true, message: 'Please select a product!' }]}>
                        <Select placeholder="Select a product" className="customform-select">
                            <Option value="product1">Express Clothing Labels</Option>
                            <Option value="product2">Custom Heat Transfer Labels</Option>
                            <Option value="product3">Custom Cotton Labels</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label={<span className="customform-label">Upload Artwork</span>}
                        name="artwork"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => Array.isArray(e) ? e : e && e.fileList}
                        rules={[{ required: true, message: 'Please upload your artwork!' }]}>
                        <Upload onChange={handleChange} beforeUpload={() => false} multiple>
                            <Button className='customform-uploadbutton' icon={<UploadOutlined />}>Upload Artwork</Button>
                        </Upload>
                    </Form.Item>

                    <div className="customform-item-row">
                        <Form.Item
                            label={<span className="customform-label">Width (inches)</span>}
                            name="width"
                            rules={[{ required: true, message: 'Please enter the width!' }]}>
                            <InputNumber placeholder="Enter width" className="customform-input-number" min={1} />
                        </Form.Item>

                        <Form.Item
                            label={<span className="customform-label">Height (inches)</span>}
                            name="height"
                            rules={[{ required: true, message: 'Please enter the height!' }]}>
                            <InputNumber placeholder="Enter height" className="customform-input-number" min={1} />
                        </Form.Item>
                    </div>

                    <Form.Item
                        label={<span className="customform-label">Quantity</span>}
                        name="quantity"
                        rules={[{ required: true, message: 'Please enter the quantity!' }]}>
                        <InputNumber placeholder="Enter quantity" className="customform-input-number" min={1} />
                    </Form.Item>

                    <Form.Item
                        label={<span className="customform-label">Name</span>}
                        name="name"
                        rules={[{ required: true, message: 'Please enter your name!' }]}>
                        <Input placeholder="Enter your name" className="customform-input" />
                    </Form.Item>

                    <Form.Item
                        label={<span className="customform-label">Email Address</span>}
                        name="email"
                        rules={[
                            { required: true, message: 'Please enter your email!' },
                            { type: 'email', message: 'Please enter a valid email!' },
                        ]}>
                        <Input placeholder="Enter your email address" className="customform-input" />
                    </Form.Item>

                    <Form.Item
                        label={<span className="customform-label">Comments</span>}
                        name="comments"
                        rules={[{ required: true, message: 'Please add your comments!' }]}>
                        <TextArea placeholder="Your comments" rows={4} className="customform-textarea" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block className="customform-submit-button">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>

                <h6 className='customform-h6-form'>
                    In a Hurry? Give us a call at <a href="tel:+1234567890" className="customform-call-link">+123-456-7890</a>
                </h6>

                <hr />
            </div>
        </div>
    );
}

export default Formcustom1;

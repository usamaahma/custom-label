import React from 'react';
import "./iconmessage.css";
import { Tooltip } from 'antd'; // Using Ant Design for the Tooltip
import { InfoCircleOutlined } from '@ant-design/icons'; // Example icon

function IconMessage() {

  return (
    <div>
      <Tooltip title="We'll send your order confirmation here." placement="top">
        <InfoCircleOutlined  style={{ fontSize: '24px', cursor: 'pointer' }} />
      </Tooltip>
       
    </div>
  );
}

export default IconMessage;

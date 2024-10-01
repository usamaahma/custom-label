import React from 'react';
import { Table, Button } from 'antd';
import "./lasttable.css"

const columns = [
    {
        title: <b style={{ fontSize: '16px' }}>Quantity</b>,
        dataIndex: 'quantity',
        key: 'quantity',
        render: (text) => <a>{text}</a>,
    },
    {
        title: <b style={{ fontSize: '16px' }}>Unit Price</b>,
        dataIndex: 'unitprice',
        key: 'unitprice',
    },
    {
        title: <b style={{ fontSize: '16px' }}>Total</b>,
        dataIndex: 'total',
        key: 'total',
    },
];

const data = [
    {
        key: '1',
        quantity: '50 pcs',
        unitprice: '$1.96 Each',
        total: '$98.00',
    },
    {
        key: '2',
        quantity: '100 pcs',
        unitprice: '$1.68 Each',
        total: '$168.00',
    },
    {
        key: '3',
        quantity: '200 pcs',
        unitprice: '$1.12 Each',
        total: '$224.00',
    },
    {
        key: '4',
        quantity: '300 pcs',
        unitprice: '$0.92 Each',
        total: '$276.00',
    },
    {
        key: '5',
        quantity: '500 pcs',
        unitprice: '$0.69 Each',
        total: '$345.00',
    },
    {
        key: '6',
        quantity: '1000 pcs',
        unitprice: '$0.54 Each',
        total: '$540.00',
    },
    {
        key: '7',
        quantity: '1000+ pcs',
        unitprice: 'Wholesale Pricing',
        total: (
            <Button style={{ backgroundColor: '#007AB7', color: '#fff' }}>
                Get a Quote
            </Button>
        ),
    },
];

const LastTable = () => <Table columns={columns} dataSource={data} />;

export default LastTable;

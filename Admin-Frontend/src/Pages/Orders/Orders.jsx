import React from 'react'
import './Orders.css'
import { Table } from "antd";
const columns = [
    {
        title: "SNo",
        dataIndex: "key",
    },
    {
        title: "Name",
        dataIndex: "name",
    },
    {
        title: "Product",
        dataIndex: "product",
    },
    {
        title: "Status",
        dataIndex: "staus",
    },
];
const data1 = [];
for (let i = 0; i < 26; i++) {
    data1.push({
        key: i,
        name: `Edward King ${i}`,
        product: 32,
        staus: `London, Park Lane no. ${i}`,
    });
}
const Orders = () => {
    return (
        <>
            <div className='orders' >
                <p className="ordersHead">Orders</p>
                <Table columns={columns} dataSource={data1} /></div></>
    )
}

export default Orders
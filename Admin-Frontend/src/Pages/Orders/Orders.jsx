import React, { useEffect,useState } from 'react'
import './Orders.css'
import { Table } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader'
import { getOrder, updateOrderStatus } from '../../Services/Orders/OrdersAction'
const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
    render: (text, record, index) => index + 1,
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Product',
    dataIndex: 'product',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },
  {
    title: 'Date',
    dataIndex: 'date',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
]

const Orders = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getOrder())
  }, [])
  const orderState = useSelector((state) => state.order)
  const { loading, Order } = orderState

  const data1 = Array.isArray(Order)
    ? Order.map((item, index) => ({
        key: index,
        name: item.orderBy.firstName + ' ' + item.orderBy.lastName,
        product: (
          <Link to={`/admin/vieworder/${item._id}`}>View Orders</Link>
        ),
        amount: ` ₹${item.paymentIntent.amount}`,
        date: new Date(item.createdAt).toLocaleString(),
      status: (
        <>
          <select
            name=""
            defaultValue={item.orderStatus}
            className="outline-none form-control form-select"
            id=""
            onChange={(e) => setOrderStatus(e.target.value,item._id)}
          >
            <option value="Cash On Delivery">Cash On Delivery</option>
            <option value="Not Processed">Not Processed</option>
            <option value="Processing">Processing</option>
            <option value="Dispatch">Dispatch</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Delivered">Delivered</option>
          </select>
        </>
      ),
      }))
    : []
    const setOrderStatus=async(status,id)=>{
      await dispatch(updateOrderStatus(status,id))
      dispatch(getOrder())
    }
  return (
    <>
      <div className="orders">
        {loading && (
          <div className="loader">
            <ClipLoader
              color={'#52ab98'}
              loading={loading}
              size={25}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
        <p className="ordersHead">Orders</p>
        <Table columns={columns} dataSource={data1} />
      </div>
    </>
  )
}

export default Orders

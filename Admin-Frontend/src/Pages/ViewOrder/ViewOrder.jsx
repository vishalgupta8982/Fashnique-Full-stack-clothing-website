import React, { useEffect } from 'react'
import './ViewOrder.css'
import { Table } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader'
import {
  getOrderByUserId,
  resetOrdersState,
} from '../../Services/Orders/OrdersAction'
const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
    render: (text, record, index) => index + 1,
  },
  {
    title: 'Product Name',
    dataIndex: 'name',
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
  },
  {
    title: 'Count',
    dataIndex: 'count',
  },
  {
    title: 'Color',
    dataIndex: 'color',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },
  {
    title: 'Date',
    dataIndex: 'date',
  },
]

const ViewOrder = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const userId = location.pathname.split('/')[3]
  useEffect(() => {
    dispatch(resetOrdersState())
    dispatch(getOrderByUserId(userId))
  }, [])
  const orderState = useSelector((state) => state.order)
  const { loading, OrderByUserId } = orderState
  const data1 = Array.isArray(OrderByUserId)
    ? OrderByUserId.map((item, index) => ({
        key: index,
        name: item.product.title,
        brand: item.product.brand,
        count: item.count,
        amount: Math.floor(
          item.product.price -
            (item.product.price * item.product.discount) / 100,
        ),
        color: item.color,
        date: new Date(item.product.createdAt).toLocaleString(),
      }))
    : []
  return (
    <>
      <div className="viewOrders">
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
        <p className="viewOrdersHead">Orders</p>
        <Table columns={columns} dataSource={data1} />
      </div>
    </>
  )
}

export default ViewOrder

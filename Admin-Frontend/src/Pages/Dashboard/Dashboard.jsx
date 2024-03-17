import './Dashboard.css'
import { FaRupeeSign } from 'react-icons/fa'
import { FaArrowTrendUp } from 'react-icons/fa6'
import { Column } from '@ant-design/plots'
import { Table } from 'antd'
import { getOrder, updateOrderStatus } from '../../Services/Orders/OrdersAction'
import {useSelector,useDispatch} from "react-redux"
import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import { FaArrowTrendDown } from "react-icons/fa6";
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
const Dashboard = () => {
  const data = [
    {
      type: 'Jan',
      sales: 38,
    },
    {
      type: 'Feb',
      sales: 52,
    },
    {
      type: 'Mar',
      sales: 61,
    },
    {
      type: 'Apr',
      sales: 145,
    },
    {
      type: 'May',
      sales: 438,
    },
    {
      type: 'Jun',
      sales: 438,
    },
    {
      type: 'July',
      sales: 238,
    },
    {
      type: 'Aug',
      sales: 308,
    },
    {
      type: 'Sept',
      sales: 238,
    },
    {
      type: 'Oct',
      sales: 18,
    },
    {
      type: 'Nov',
      sales: 348,
    },
    {
      type: 'Dec',
      sales: 38,
    },
  ]
  const config = {
    data,
    xField: 'type',
    yField: 'sales',
    color: ({ type }) => {
      return '#52ab98'
    },
    label: {
      style: {
        fill: '#FFFFFF',
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Month',
      },
      sales: {
        alias: 'Income',
      },
    },
  }
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrder());
  }, []);

  const orderState = useSelector((state) => state.order);
  const { loading, Order } = orderState;

  const [totalSalesThisMonth, setTotalSalesThisMonth] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalProductsSold, setTotalProductsSold] = useState(0);
  const [totalSalesLastMonth, setTotalSalesLastMonth] = useState(0);
  const [salesIncreasePercentage, setSalesIncreasePercentage] = useState(0);
  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const lastYear = lastMonth === 12 ? currentYear - 1 : currentYear;

    let currentMonthSales = 0;
    let allTotalSales = 0;
    let productsSoldCount = 0;
    let lastMonthSales = 0;

    if (Array.isArray(Order)) {
      Order.forEach(order => {
        order.products.forEach(product => {
          allTotalSales += Math.floor((product.product.price * product.count) - product.product.price * product.count*product.product.discount/100);
          productsSoldCount += product.count;
          const orderDate = new Date(order.createdAt);
          const orderMonth = orderDate.getMonth() + 1;
          const orderYear = orderDate.getFullYear();
          if (orderMonth === currentMonth && orderYear === currentYear) {
            currentMonthSales += Math.floor((product.product.price * product.count) - product.product.price * product.count * product.product.discount / 100);
          }
          if (orderMonth === lastMonth && orderYear === lastYear) {
            lastMonthSales += Math.floor((product.product.price * product.count) - product.product.price * product.count * product.product.discount / 100);
          }
        });
      });
    }

    const increase = currentMonthSales - lastMonthSales;
    let percentageIncrease = 0;
    if (lastMonthSales === 0) {
      percentageIncrease = 'No Sales Last Month';
    } else {
      percentageIncrease = (((currentMonthSales - lastMonthSales) / lastMonthSales) * 100).toFixed(2);
      if (increase < 0) {
        percentageIncrease *= -1;
      }
    }
    setTotalSalesThisMonth(currentMonthSales);
    setTotalSales(allTotalSales);
    setTotalProductsSold(productsSoldCount);
    setTotalSalesLastMonth(lastMonthSales);
    setSalesIncreasePercentage(percentageIncrease);
  }, [Order]);

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
            onChange={(e) => setOrderStatus(e.target.value, item._id)}
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
  const setOrderStatus = async (status, id) => {
    await dispatch(updateOrderStatus(status, id))
    dispatch(getOrder())
  }
  return (
    <>
      <div className="dashboard">
        <p className="dashboardHead">Dashboard</p>
        <div className="dbCard w-[100%] flex md:flex-row flex-col ">
          <div className="dbCard1   w-[100%] md:w-1/3">
            <div>
              <p className="cardName">Current Month Sells</p>
              <p className="cardAmount ">
                <FaRupeeSign />
               {totalSalesThisMonth}
              </p>
            </div>

            <div>
              {typeof salesIncreasePercentage === 'number' ? (
                salesIncreasePercentage > 0 ? (
                  <p className="growth">
                    <FaArrowTrendUp />
                    &nbsp;{salesIncreasePercentage}
                  </p>
                ) : (
                  <p className="down">
                    <FaArrowTrendDown />
                    &nbsp;{salesIncreasePercentage}%
                  </p>
                )
              ) : (
                  <p className="growth">{salesIncreasePercentage}</p>
              )}
               
              <p className="cardName">Compared to Last Month</p>
            </div>
          </div>
          <div className="dbCard2   w-[100%] md:w-1/3">
            <div>
              <p className="cardName">Last Month Sells</p>
              <p className="cardAmount ">
                <FaRupeeSign />
               {totalSalesLastMonth}
              </p>
            </div>
          </div>
          <div className="dbCard3   w-[100%] md:w-1/3">
            <div>
              {' '}
              <p className="cardName">Total Sells</p>
              <p className="cardAmount ">
                <FaRupeeSign />
               {totalSales}
              </p>
            </div>
            <div>
              <p className="cardName">Total Orders</p>
              <p className="growth">
                <FaArrowTrendUp />&nbsp;{totalProductsSold}
              </p>
            </div>
          </div>
        </div>
        <div className="income">
          <p>Income Statistics</p>
          <div>
            <Column {...config} />
          </div>
        </div>
        <div className="income">
          <p>Recent order</p>
          <div>
            <Table columns={columns} dataSource={data1} />
          </div>
        </div>
      </div>
    </>
  )
}
export default Dashboard

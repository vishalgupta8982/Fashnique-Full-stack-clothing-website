import React, { useEffect } from 'react'
import './Customer.css'
import { Table } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import ClipLoader from 'react-spinners/ClipLoader'
import { getCustomer } from '../../Services/Customer/CustomerAction'
import { blockUser, unblockUser } from '../../Services/User/UserAction'
const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
    render: (text, record, index) => index + 1,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Mobile',
    dataIndex: 'mobile',
  },
]
const Customer = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCustomer())
  }, [])
  const customerList = useSelector((state) => state.customer)
  const { loading, Customer } = customerList
  console.log(Customer)
  const data1 = Array.isArray(Customer)
    ? Customer.filter(item => item.role === "user").map((item, index) => ({
      key: index,
      name: item.firstName + ' ' + item.lastName,
      email: item.email,
      mobile: item.mobile,
    }))
    : [];
const handleBlockUnblock=(id,e)=>{
  if (e ==="unblock"){
    dispatch(unblockUser(id))
  }
  else if (e === "block") {
    dispatch(blockUser(id))
  } 
}

  return (
    <>
      <div className="bloglist">
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
        <p className="bloglistHead">Customers</p>
        <Table columns={columns} dataSource={data1} />
      </div>
    </>
  )
}

export default Customer

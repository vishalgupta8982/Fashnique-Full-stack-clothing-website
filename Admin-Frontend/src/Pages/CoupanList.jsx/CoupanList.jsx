import React, { useEffect, useState } from 'react'
import './CoupanList.css'
import { Table } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { BiEdit } from 'react-icons/bi'
import { RiDeleteBinLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import CustomModal from '../../Components/CustomModel/CustomModel'
import ClipLoader from 'react-spinners/ClipLoader'
import { deleteCoupan, getCoupan } from '../../Services/Coupan/CoupanAction'

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
    title: 'Discount',
    dataIndex: 'discount',
    sorter: (a, b) => a.discount - b.discount,
  },
  {
    title: 'Expiry',
    dataIndex: 'expiry',
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
]

const CoupanList = () => {
  const [open, setOpen] = useState(false)
  const [coupanId, setcoupanId] = useState('')

  const dispatch = useDispatch()

  const showModal = (id) => {
    setOpen(true)
    setcoupanId(id)
  }
  const hideModal = () => {
    setOpen(false)
  }
  const coupanList = useSelector((state) => state.coupan)
  const { isSuccess, loading, Coupan } = coupanList
  const dltCoupan = (id) => {
    dispatch(deleteCoupan(id))
    setOpen(false)
  }

  useEffect(() => {
    dispatch(getCoupan())
    if (isSuccess) {
      toast.success('Deleted Successfully')
    }
  }, [dispatch, isSuccess])
  const data1 = Array.isArray(Coupan)
    ? Coupan.map((item, index) => ({
        key: index,
        name: item.name,
        discount: `${item.discount}%`,
        expiry: new Date(item.expiry).toLocaleString(),

        action: (
          <div className="icon">
            <Link to={`/admin/addcoupan/${item._id}`} className="edit">
              <BiEdit />
            </Link>
            <button className="delete" onClick={() => showModal(item._id)}>
              <RiDeleteBinLine />
            </button>
          </div>
        ),
      }))
    : []

  return (
    <>
      <div className="coupanList">
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
        <p className="coupanListHead">Coupan List</p>
        <Table columns={columns} dataSource={data1} />
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => {
            dltCoupan(coupanId)
          }}
          title="Are you sure you want to delete this blog category?"
        />
      </div>
    </>
  )
}

export default CoupanList

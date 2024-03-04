import React, { useEffect, useState } from 'react'
import './ColorList.css'
import { Table } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { BiEdit } from 'react-icons/bi'
import { RiDeleteBinLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import CustomModal from '../../Components/CustomModel/CustomModel'
import ClipLoader from 'react-spinners/ClipLoader'
import { deleteColor, getColor } from '../../Services/Color/ColorAction'
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
    title: 'Action',
    dataIndex: 'action',
  },
]

const ColorList = () => {
  const [open, setOpen] = useState(false)
  const [colorId, setColorId] = useState('')

  const dispatch = useDispatch()

  const showModal = (id) => {
    setOpen(true)
    setColorId(id)
  }
  const hideModal = () => {
    setOpen(false)
  }
  const colorList = useSelector((state) => state.color)
  const { isSuccess, loading, Color } = colorList
  const dltColor = (id) => {
    dispatch(deleteColor(id))
    setOpen(false)
  }

  useEffect(() => {
    dispatch(getColor())
    if (isSuccess) {
      toast.success('Deleted Successfully')
    }
  }, [dispatch, isSuccess])
  const data1 = Array.isArray(Color)
    ? Color.map((item, index) => ({
        key: index,
        name: (
          <div className="flex items-center">
            <div
              style={{ backgroundColor: item.title }}
              className={'colorShow '}
            ></div>
            {`${item.title}`}
          </div>
        ),
        action: (
          <div className="icon">
            <Link to={`/admin/addcolor/${item._id}`} className="edit">
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
      <div className="colorlist">
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
        <p className="colorlistHead">Color List</p>
        <Table columns={columns} dataSource={data1} />
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => {
            dltColor(colorId)
          }}
          title="Are you sure you want to delete this blog category?"
        />
      </div>
    </>
  )
}

export default ColorList

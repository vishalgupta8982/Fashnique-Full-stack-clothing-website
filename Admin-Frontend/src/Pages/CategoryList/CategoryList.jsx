import React, { useEffect, useState } from 'react'
import './CategoryList.css'
import { Table } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { BiEdit } from 'react-icons/bi'
import { RiDeleteBinLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import CustomModal from '../../Components/CustomModel/CustomModel'
import ClipLoader from 'react-spinners/ClipLoader'
import {
  deleteCategory,
  getCategory,
} from '../../Services/Category/CategoryAction'
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

const CategoryList = () => {
  const [open, setOpen] = useState(false)
  const [categoryId, setCategoryId] = useState('')
  const dispatch = useDispatch()

  const showModal = (id) => {
    setOpen(true)
    setCategoryId(id)
  }

  const hideModal = () => {
    setOpen(false)
  }

  const categoryList = useSelector((state) => state.category)
  const { isSuccess, loading, productCategory } = categoryList
  const dltCategory = (id) => {
    dispatch(deleteCategory(id))
    setOpen(false)
  }
  useEffect(() => {
    dispatch(getCategory())
    if (isSuccess) {
      toast.success('Deleted Successfully')
    }
  }, [dispatch, isSuccess])

  const data1 = Array.isArray(productCategory)
    ? productCategory.map((item, index) => ({
        key: index,
        name: `${item.title}`,
        action: (
          <div className="icon">
            <Link to={`/admin/addCategory/${item._id}`} className="edit">
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
      <div className="catlist">
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
        <p className="catlistHead">Product Categories</p>
        <Table columns={columns} dataSource={data1} />
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => {
            dltCategory(categoryId)
          }}
          title="Are you sure you want to delete this blog category?"
        />
      </div>
    </>
  )
}

export default CategoryList

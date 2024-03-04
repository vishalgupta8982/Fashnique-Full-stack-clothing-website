import React, { useEffect, useState } from 'react'
import './BlogList.css'
import { Table } from 'antd'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import ClipLoader from 'react-spinners/ClipLoader'
import CustomModal from '../../Components/CustomModel/CustomModel'
import { BiEdit } from 'react-icons/bi'
import { RiDeleteBinLine } from 'react-icons/ri'
import { useSelector, useDispatch } from 'react-redux'
import { deleteBlog, getBlog } from '../../Services/CreateBlog/CreateBlogAction'
const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
    render: (text, record, index) => index + 1,
  },
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'Category',
    dataIndex: 'category',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
]

const BlogList = () => {
  const [open, setOpen] = useState(false)
  const [BlogId, setBlogId] = useState('')
  const showModal = (id) => {
    setOpen(true)
    setBlogId(id)
  }
  const hideModal = () => {
    setOpen(false)
  }
  const dispatch = useDispatch()
  const dltBlog = (id) => {
    dispatch(deleteBlog(id))
    setOpen(false)
  }
  const blogList = useSelector((state) => state.blog)
  const { isSuccess, loading, Blog } = blogList
  useEffect(() => {
    dispatch(getBlog())
    if (isSuccess) {
      toast.success('Deleted Successfully')
    }
  }, [dispatch, isSuccess])
  const data1 = Array.isArray(Blog)
    ? Blog.map((item, index) => ({
        key: index,
        title: item.title,
        category: item.category,
        action: (
          <div className="icon">
            <Link to={`/admin/addblog/${item._id}`} className="edit">
              <BiEdit />
            </Link>
            <button onClick={() => showModal(item._id)} className="delete">
              <RiDeleteBinLine />
            </button>
          </div>
        ),
      }))
    : []
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
        <p className="bloglistHead">Blog List</p>
        <Table columns={columns} dataSource={data1} />
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => {
            dltBlog(BlogId)
          }}
          title="Are you sure you want to delete this blog category?"
        />
      </div>
    </>
  )
}

export default BlogList

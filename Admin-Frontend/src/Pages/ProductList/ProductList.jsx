import React, { useEffect, useState } from 'react'
import './ProductList.css'
import { Table } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { BiEdit } from 'react-icons/bi'
import { RiDeleteBinLine } from 'react-icons/ri'
import { toast } from 'react-toastify'
import { FaIndianRupeeSign } from 'react-icons/fa6'
import ClipLoader from 'react-spinners/ClipLoader'
import CustomModal from '../../Components/CustomModel/CustomModel'
import { Link } from 'react-router-dom'
import {
  deleteProduct,
  getProduct,
} from '../../Services/CreateProduct/CreateProductAction'
const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
    render: (text, record, index) => index + 1,
  },
  {
    title: 'Title',
    dataIndex: 'title',
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: 'Category',
    dataIndex: 'category',
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: 'Color',
    dataIndex: 'color',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
]

const ProductList = () => {
  const [open, setOpen] = useState(false)
  const [ProductId, setProductId] = useState('')
  const showModal = (id) => {
    setOpen(true)
    setProductId(id)
  }
  const hideModal = () => {
    setOpen(false)
  }
  const dltProduct = (id) => {
    dispatch(deleteProduct(id))
    setOpen(false)
  }
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.product)
  const { isSuccess, loading, Product } = productList
  useEffect(() => {
    dispatch(getProduct())
    if (isSuccess) {
      toast.success('Deleted Successfully')
    }
  }, [dispatch, isSuccess])

  const data1 = Array.isArray(Product?.data?.product)
    ? Product?.data?.product?.map((item, index) => ({
        key: index,
        title: item.title,
        brand: item.brand,
        category: item.category,
        color: (
          <div>
            {item.color.map((color, index) => (
              <div key={index}>{color}</div>
            ))}
          </div>
        ),
        price: (
          <div className="flex flex-row items-center">
            <FaIndianRupeeSign size={12} /> {item.price}
          </div>
        ),
        action: (
          <div className="icon">
            <Link to={`/admin/addproduct/${item.slug}`} className="edit">
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
      <div className="productlist">
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
        <p className="bloglistHead">Product List</p>
        <Table columns={columns} dataSource={data1} />{' '}
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => {
            dltProduct(ProductId)
          }}
          title="Are you sure you want to delete this blog category?"
        />
      </div>
    </>
  )
}

export default ProductList

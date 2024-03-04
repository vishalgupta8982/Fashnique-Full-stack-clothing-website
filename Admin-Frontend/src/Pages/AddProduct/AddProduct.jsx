import './AddProduct.css'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Button from '../../Components/Button/Button'
import ClipLoader from 'react-spinners/ClipLoader'
import { message, Upload } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory } from '../../Services/Category/CategoryAction'
import { getColor } from '../../Services/Color/ColorAction'
import { getBrand } from '../../Services/Brand/BrandAction'
import { Select } from 'antd'
import Dropzone from 'react-dropzone'
import {
  addProduct,
  getaProduct,
  updateProduct,
} from '../../Services/CreateProduct/CreateProductAction'
import { toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'
import {
  deleteImage,
  resetImageState,
  uploadImage,
} from '../../Services/Upload/UploadAction'

const AddProduct = () => {
  const location = useLocation()
  const [image, setImage] = useState([])
  const [productDetail, setProductDetail] = useState({
    title: '',
    description: '',
    price: 0,
    category: '',
    brand: '',
    quantity: 0,
    color: [],
    tags: [],
    images: [],
  })
  const [editProductDetail, setEditProductDetail] = useState({
    title: '',
    description: '',
    price: 0,
    category: '',
    brand: '',
    quantity: 0,
    color: [],
    tags: [],
    images: [],
  })

  const getProductId = location.pathname.split('/')[3]
  const dispatch = useDispatch()
  useEffect(() => {
    if (getProductId !== undefined) {
      dispatch(getaProduct(getProductId))
    }
  }, [dispatch, getProductId])
  useEffect(() => {
    dispatch(getCategory())
    dispatch(getColor())
    dispatch(getBrand())
    dispatch(resetImageState())
  }, [])
  const brandList = useSelector((state) => state.brand.brand)
  const categoryList = useSelector((state) => state.category.productCategory)
  const colorList = useSelector((state) => state.color.Color)
  const imgState = useSelector((state) => state.upload.Images)
  const newProduct = useSelector((state) => state.product)
  const imgStat = useSelector((state) => state.upload)
  const { isSuccess, error, loading, aProduct } = newProduct
  const { loading: imgLoad, isSuccess: imgSuccess, error: imgError } = imgState
  useEffect(() => {
    if (getProductId !== undefined && isSuccess) {
      toast.success('Updated Successfully')
    } else if (isSuccess) toast.success('Added Successfully')
    else if (error) {
      toast.error('Check All Fields')
    }
  }, [isSuccess, error])

  useEffect(() => {
    if (aProduct && getProductId !== undefined) {
      setEditProductDetail({
        title: aProduct.title,
        description: aProduct.description,
        price: aProduct.price,
        category: aProduct.category,
        brand: aProduct.brand,
        quantity: aProduct.quantity,
        color: aProduct.color,
        tags: aProduct.tags,
        images: aProduct.images,
      })
    }
  }, [aProduct, getProductId])
  const colorOpt = []
  if (colorList) {
    colorList.forEach((i) => {
      colorOpt.push({
        label: i.title,
        value: i.title,
      })
    })
  } else {
    console.error('colorList is undefined or null')
  }

  useEffect(() => {
    setProductDetail((prevProductDetail) => ({
      ...prevProductDetail,
      images: image,
    }))
  }, [image])
  useEffect(() => {
    if (Array.isArray(imgState)) {
      const newImg = imgState.map((i) => ({
        public_id: i.public_id,
        url: i.url,
      }))
      setImage(newImg)
    } else {
      console.error('imgState is not an array.')
    }
  }, [])
  const handleSave = () => {
    if (getProductId !== undefined) {
      dispatch(updateProduct(getProductId, editProductDetail))
    } else {
      dispatch(addProduct(productDetail))
    }
  }
  const handleChange = (e, fieldName) => {
    if (getProductId !== undefined) {
      setEditProductDetail((prevState) => ({
        ...prevState,
        [fieldName]:
          fieldName === 'description' || fieldName === 'color'
            ? e
            : e.target.value,
      }))
    } else {
      setProductDetail((prevState) => ({
        ...prevState,
        [fieldName]:
          fieldName === 'description' || fieldName === 'color'
            ? e
            : e.target.value,
      }))
    }
  }
 console.log(productDetail)
  return (
    <div className="addProduct">
      <p className="addProductHead">
        {getProductId !== undefined ? 'Update' : 'Add'}Product
      </p>
      <input
        className="inputTitle"
        value={
          getProductId !== undefined
            ? editProductDetail.title
            : productDetail.title
        }
        onChange={(e) => handleChange(e, 'title')}
        placeholder="Enter Product Title"
        type="text"
      />
      <select
        className="productCategory"
        onChange={(e) => handleChange(e, 'category')}
        value={
          getProductId !== undefined
            ? editProductDetail.category
            : productDetail.category
        }
        name=""
        id=""
      >
        <option>Select Product Category</option>
        {categoryList &&
          categoryList.map((i, j) => {
            return (
              <option key={j} value={i.title}>
                {i.title}
              </option>
            )
          })}
      </select>
      <div className="quill">
        <ReactQuill
          theme="snow"
          value={
            getProductId !== undefined
              ? editProductDetail.description
              : productDetail.description
          }
          onChange={(e) => handleChange(e, 'description')}
        />
      </div>
      <input
        className="inputTitle"
        value={
          getProductId !== undefined
            ? editProductDetail.price
            : productDetail.price
        }
        onChange={(e) => handleChange(e, 'price')}
        placeholder="Enter Product Price eg.4000"
        type="number"
      />
      <Select
        mode="multiple"
        allowClear
        className=" w-100"
        placeholder="Select colors"
        value={
          getProductId !== undefined
            ? editProductDetail.color
            : productDetail.color
        }
        onChange={(e) => handleChange(e, 'color')}
        options={colorOpt}
      />
      <select
        value={
          getProductId !== undefined
            ? editProductDetail.brand
            : productDetail.brand
        }
        onChange={(e) => handleChange(e, 'brand')}
        className="productCategory"
        name=""
        id=""
      >
        <option>Select Brand</option>
        {brandList &&
          brandList.map((i, j) => {
            return (
              <option key={j} value={i.title}>
                {i.title}
              </option>
            )
          })}
      </select>
      <input
        value={
          getProductId !== undefined
            ? editProductDetail.quantity
            : productDetail.quantity
        }
        onChange={(e) => handleChange(e, 'quantity')}
        className="inputTitle"
        placeholder="Enter Quantity"
        type="number"
      />
      <div className="p-5 text-center bg-[#fff] border-1">
        <Dropzone
          onDrop={(acceptedFiles) => dispatch(uploadImage(acceptedFiles))}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
      </div>
      <div className="flex flex-wrap ">
        {getProductId !== undefined
          ? editProductDetail.images.map((item) => (
              <img src={item.url} alt="" width={100} height={100} />
            ))
          : imgState &&
            imgState?.map((i, j) => {
              return (
                <div className="mt-1 mr-1 position-relative" key={j}>
                  {/* <span onClick={()=>dispatch(deleteImage(i.public_id))} className="mt-1 top-5 position-absolute " style={{ padding: 0, margin: 0 }}>
                                <RxCross1 />
                            </span> */}
                  <img src={i.url} alt="" width={100} height={100} />
                </div>
              )
            })}
      </div>
      {imgLoad && (
        <div className="loader">
          <ClipLoader
            color={'#52ab98'}
            loading={imgLoad}
            size={25}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}{' '}
      <div className="mt-3" onClick={handleSave}>
        <Button
          widthButton={'fit-content'}
          title={`  ${getProductId !== undefined ? 'Update' : 'Add'} Product`}
        />
      </div>
    </div>
  )
}

export default AddProduct

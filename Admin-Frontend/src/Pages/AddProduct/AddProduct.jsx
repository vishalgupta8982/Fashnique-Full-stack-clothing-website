import './AddProduct.css'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Button from '../../Components/Button/Button'
import ClipLoader from 'react-spinners/ClipLoader'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory } from '../../Services/Category/CategoryAction'
import { getColor } from '../../Services/Color/ColorAction'
import { getBrand } from '../../Services/Brand/BrandAction'
import { Select } from 'antd'
import { tags } from '../../assets/Constant/Size'
import { FaCheck } from "react-icons/fa6";
import Dropzone from 'react-dropzone'
import {
  addProduct,
  getaProduct,
  updateProduct,
} from '../../Services/CreateProduct/CreateProductAction'
import { toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'
import { size } from '../../assets/Constant/Size'
import {
  deleteImage,
  resetImageState,
  uploadImage,
} from '../../Services/Upload/UploadAction'

const AddProduct = () => {
  const location = useLocation()
  const [productDetail, setProductDetail] = useState({
    title: '',
    description: '',
    price: null,
    category: '',
    brand: '',
    quantity: null,
    discount: null,
    color: [],
    tags: [],
    images: [],
    size: [],
  })
  const [editProductDetail, setEditProductDetail] = useState({
    title: '',
    description: '',
    price: null,
    category: '',
    brand: '',
    quantity: null,
    discount: null,
    color: [],
    tags: [],
    images: [],
    size: [],
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
  const { loading: imgLoading, isSuccess: imgSucceess, error: imgError } = imgStat
  useEffect(() => {
    if (error) {
      toast.error('Check All Fields')
    }
    else if (getProductId !== undefined && isSuccess) {
      toast.success('Updated Successfully')
    } else if (isSuccess) toast.success('Added Successfully')

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
        discount: aProduct.discount,
        color: aProduct.color,
        tags: aProduct.tags,
        images: aProduct.images,
        size: aProduct.size,
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
      images: [...imgState],
    }))
  }, [imgState])
  useEffect(() => {
    if (Array.isArray(imgState)) {
      const newImg = imgState.map((i) => ({
        public_id: i.public_id,
        url: i.url,
      }))
    } else {
      console.error('imgState is not an array.')
    }
  }, [])
  const handleSave = async () => {
    if (getProductId !== undefined) {
      await dispatch(updateProduct(getProductId, editProductDetail))
      clearEditProductDetail()
    } else {
      await dispatch(addProduct(productDetail))
      clearProductDetail()
      await dispatch(resetImageState(null))  
    }
  }

  const clearEditProductDetail=()=>{
    setEditProductDetail({
      title: '',
      description: '',
      price: null,
      category: '',
      brand: '',
      quantity: null,
      discount: null,
      color: [],
      tags: [],
      images: [],
      size: [],
    })
  }
  const clearProductDetail=()=>{
    setProductDetail({
      title: '',
      description: '',
      price: null,
      category: '',
      brand: '',
      quantity: null,
      discount: null,
      color: [],
      tags: [],
      images: [],
      size: [],
    })
  }
  const handleChange = (e, fieldName) => {
    if (getProductId !== undefined) {
      setEditProductDetail((prevState) => ({
        ...prevState,
        [fieldName]:
          fieldName === 'description' ||
            fieldName === 'color' ||
            fieldName === 'size' ||
            fieldName === 'tags'
            ? e
            : e.target.value,
      }))
    } else {
      setProductDetail((prevState) => ({
        ...prevState,
        [fieldName]:
          fieldName === 'description' ||
            fieldName === 'color' ||
            fieldName === 'size' ||
            fieldName === 'tags'
            ? e
            : e.target.value,
      }))
    }
  }
  return (
    <div onKeyDown={(e) => { if (e.keyCode === 13) { handleSave(); } }} className="addProduct">
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
      <input
        className="inputTitle"
        value={
          getProductId !== undefined
            ? editProductDetail.discount
            : productDetail.discount
        }
        onChange={(e) => handleChange(e, 'discount')}
        placeholder="Enter Discount percentage eg.30"
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
      <Select
        mode="multiple"
        allowClear
        className="mt-2 w-100"
        placeholder="Select size"
        value={
          getProductId !== undefined
            ? editProductDetail.size
            : productDetail.size
        }
        onChange={(e) => handleChange(e, 'size')}
        options={size}
      />
      <Select
        mode="single"
        allowClear
        className="mt-2 w-100"
        placeholder="Select tags"
        value={
          getProductId !== undefined
            ? editProductDetail.tags
            : productDetail.tags
        }
        onChange={(e) => handleChange(e, 'tags')}
        options={tags}
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
        {imgError && <p className='imgUploadErr'>Images size is too large please resize images then try to upload it</p>}
        {imgSucceess && <p className='imgUploadSuccess'>Uploaded image successfully&nbsp;<FaCheck /></p>}
        {imgLoading && <p className='imgUploadSuccess'>Uploading image...</p>}
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
      {(loading || imgLoading) && (
        <div className="loader">
          <ClipLoader
            color={'#52ab98'}
            loading={loading || imgLoading}
            size={25}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
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

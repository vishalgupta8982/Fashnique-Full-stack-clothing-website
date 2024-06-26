import './AddBlog.css'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Button from '../../Components/Button/Button'
import { toast } from 'react-toastify'
import { FaCheck } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import Dropzone from 'react-dropzone'
import { useLocation } from 'react-router-dom'
import { getBlogCat } from '../../Services/BlogCategory/blogCatAction'
import ClipLoader from 'react-spinners/ClipLoader'
import {
  resetImageState,
  uploadImage,
} from '../../Services/Upload/UploadAction'
import {
  addBlog,
  getaBlog,
  updateBlog,
} from '../../Services/CreateBlog/CreateBlogAction'
const AddBlog = () => {
  const location = useLocation()
  const user = JSON.parse(localStorage.getItem('User'))
  const [BlogDetail, setBlogDetail] = useState({
    title: '',
    description: '',
    category: '',
    images: [],
    author: user?.firstName + ' ' + user?.lastName,
  })
  const [editBlogDetail, setEditBlogDetail] = useState({
    title: '',
    description: '',
    category: '',
    images: [],
  })
  const getBlogId = location.pathname.split('/')[3]

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBlogCat())
    dispatch(resetImageState())
  }, [])
  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getaBlog(getBlogId))
    }
  }, [dispatch, getBlogId])
  const blogCat = useSelector((state) => state.blogCat.blogCategory)
  const imgState = useSelector((state) => state.upload.Images)
  const imgStat = useSelector((state) => state.upload)
  const {
    loading: imgLoading,
    isSuccess: imgSucceess,
    error: imgError,
  } = imgStat
  const newBlog = useSelector((state) => state.blog)
  const { isSuccess, error, loading, aBlog } = newBlog
  useEffect(() => {
    if (getBlogId !== undefined && isSuccess) {
      toast.success('Updated Successfully')
    } else if (isSuccess) toast.success('Added Successfully')
    else if (error) {
      toast.error('Check All Fields')
    }
  }, [isSuccess, error])
  const handleChange = (e, fieldName) => {
    if (getBlogId !== undefined) {
      setEditBlogDetail((prevState) => ({
        ...prevState,
        [fieldName]:
          fieldName === 'description' || fieldName === 'color'
            ? e
            : e.target.value,
      }))
    } else {
      setBlogDetail((prevState) => ({
        ...prevState,
        [fieldName]:
          fieldName === 'description' || fieldName === 'color'
            ? e
            : e.target.value,
      }))
    }
  }
  useEffect(() => {
    setBlogDetail((prevBlogDetail) => ({
      ...prevBlogDetail,
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
    if (getBlogId !== undefined) {
      await dispatch(updateBlog(getBlogId, editBlogDetail))
      clearEditBlogDetail()
    } else {
      await dispatch(addBlog(BlogDetail))
      clearNewBlogDetail()
    }
  }
  const clearNewBlogDetail = () => {
    setBlogDetail({
      title: '',
      description: '',
      category: '',
      images: [],
      author: user.firstName + ' ' + user.lastName,
    })
    dispatch(resetImageState())
  }
  const clearEditBlogDetail = () => {
    setEditBlogDetail({
      title: '',
      description: '',
      category: '',
      images: [],
    })
    dispatch(resetImageState())
  }
  useEffect(() => {
    if (aBlog && getBlogId !== undefined) {
      setEditBlogDetail({
        title: aBlog.title,
        description: aBlog.description,
        category: aBlog.category,
        images: aBlog.images,
      })
    }
  }, [aBlog, getBlogId])
  return (
    <div
      onKeyDown={(e) => {
        if (e.keyCode === 13) {
          handleSave()
        }
      }}
      className="addBlog"
    >
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
      <p className="addBlogHead">
        {getBlogId !== undefined ? 'Update' : 'Add'} Blog
      </p>

      <input
        value={
          getBlogId !== undefined ? editBlogDetail.title : BlogDetail.title
        }
        onChange={(e) => handleChange(e, 'title')}
        className="inputTitle"
        placeholder="Enter Blog Title"
        type="text"
      />
      <select
        onChange={(e) => handleChange(e, 'category')}
        value={
          getBlogId !== undefined
            ? editBlogDetail.category
            : BlogDetail.category
        }
        className="blogCategory"
        name=""
        id=""
      >
        <option value="">Select Blog Category</option>
        {blogCat &&
          blogCat.map((i, j) => {
            return (
              <option key={j} value={i.title}>
                {i.title}
              </option>
            )
          })}
      </select>
      <div className="quill">
        <ReactQuill
          value={
            getBlogId !== undefined
              ? editBlogDetail.description
              : BlogDetail.description
          }
          onChange={(e) => handleChange(e, 'description')}
          theme="snow"
        />
      </div>
      <div className="p-5 text-center bg-[#fff] border-1">
        {imgError && (
          <p className="imgUploadErr">
            Images size is too large please resize images then try to upload it
          </p>
        )}
        {imgSucceess && (
          <p className="imgUploadSuccess">
            Uploaded image successfully&nbsp;
            <FaCheck />
          </p>
        )}
        {imgLoading && <p className="imgUploadSuccess">Uploading... image</p>}
        <Dropzone
          onDrop={(acceptedFiles) => dispatch(uploadImage(acceptedFiles))}
          maxFiles={1}
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
        {getBlogId !== undefined
          ? editBlogDetail.images.map((item) => (
              <img src={item.url} alt="" width={100} height={100} />
            ))
          : BlogDetail &&
            BlogDetail.images?.map((i, j) => {
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
      <div className="mt-3" onClick={handleSave}>
        <Button
          widthButton={'fit-content'}
          title={`  ${getBlogId !== undefined ? 'Update' : 'Add'} Blog`}
        />
      </div>
    </div>
  )
}

export default AddBlog

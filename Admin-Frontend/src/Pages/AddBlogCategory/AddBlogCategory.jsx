import React, { useEffect, useState } from 'react'
import './AddBlogCategory.css'
import Button from '../../Components/Button/Button'
import { useSelector, useDispatch } from 'react-redux'
import {
  addBlogCat,
  getaBlogCat,
  resetBlogCategoryState,
  updateBlogCat,
} from '../../Services/BlogCategory/blogCatAction'
import { toast } from 'react-toastify'
import ClipLoader from 'react-spinners/ClipLoader'
import { useLocation } from 'react-router-dom'

const AddBlogCategory = () => {
  const dispatch = useDispatch()
  const blogCat = useSelector((state) => state.blogCat)
  const { error, isSuccess, loading, ablogCategory } = blogCat

  const location = useLocation()
  const getBlogCatId = location.pathname.split('/')[3]

  useEffect(() => {
    if (getBlogCatId !== undefined) {
      dispatch(getaBlogCat(getBlogCatId))
    }
  }, [dispatch, getBlogCatId])

  const [editBlogCategory, setEditBlogCategory] = useState('')
  const [newBlogCategory, setNewBlogCategory] = useState('')

  useEffect(() => {
    if (getBlogCatId !== undefined && isSuccess) {
      toast.success('Updated Successfully')
    } else if (isSuccess) {
      toast.success('Added Successfully')
    } else if (error) {
      toast.error('Already exists')
    }
  }, [error, getBlogCatId, isSuccess])

  useEffect(() => {
    if (ablogCategory && getBlogCatId !== undefined) {
      setEditBlogCategory(ablogCategory.title)
    }
  }, [ablogCategory, getBlogCatId])

  const handleInputChange = (e) => {
    if (getBlogCatId !== undefined) {
      setEditBlogCategory(e.target.value)
    } else {
      setNewBlogCategory(e.target.value)
    }
  }

  const BlogCat = async () => {
    if (getBlogCatId !== undefined) {
      await dispatch(updateBlogCat(getBlogCatId, editBlogCategory))
      clearEditBlogCategory()
    } else {
      if (newBlogCategory.length < 1) {
        toast.error('This Field is required')
      } else {
        await dispatch(addBlogCat(newBlogCategory))
        clearNewBlogCategory()
      }
    }
  }
  const clearNewBlogCategory = () => {
    setNewBlogCategory('')
  }
  const clearEditBlogCategory = () => {
    setEditBlogCategory('')
  }
  return (
    <div
      onKeyDown={(e) => {
        if (e.keyCode === 13) {
          BlogCat()
        }
      }}
      className="addBlogCat"
    >
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
      <p className="addBlogCatHead">
        {getBlogCatId !== undefined ? 'Update' : 'Add'} Blog Category
      </p>
      <input
        className="inputTitle"
        onChange={handleInputChange}
        value={getBlogCatId !== undefined ? editBlogCategory : newBlogCategory}
        placeholder="Enter Blog Category Title"
        type="text"
      />
      <div onClick={BlogCat}>
        <Button
          widthButton={'fit-content'}
          title={`  ${getBlogCatId !== undefined ? 'Update' : 'Add'} Blog Category`}
        />
      </div>
    </div>
  )
}

export default AddBlogCategory

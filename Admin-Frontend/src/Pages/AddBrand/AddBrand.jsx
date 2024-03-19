import React, { useEffect, useState } from 'react'
import './AddBrand.css'
import Button from '../../Components/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import {
  addBrand,
  getaBrand,
  updateBrand,
} from '../../Services/Brand/BrandAction'
import ClipLoader from 'react-spinners/ClipLoader'
import { toast } from 'react-toastify'
const AddBrand = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const [editBrand, setEditBrand] = useState('')
  const [newBrand, setNewBrand] = useState('')
  const brandState = useSelector((state) => state.brand)
  const { error, isSuccess, loading, abrand } = brandState
  const getBrandId = location.pathname.split('/')[3]
  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getaBrand(getBrandId))
    }
  }, [dispatch, getBrandId])
  useEffect(() => {
    if (getBrandId !== undefined && isSuccess) {
      toast.success('Updated Successfully')
    } else if (isSuccess) {
      toast.success('Added Successfully')
    } else if (error) {
      toast.error('Already exists')
    }
  }, [error, getBrandId, isSuccess])

  useEffect(() => {
    if (abrand && getBrandId !== undefined) {
      setEditBrand(abrand.title)
    }
  }, [abrand, getBrandId])

  const handleInputChange = (e) => {
    if (getBrandId !== undefined) {
      setEditBrand(e.target.value)
    } else {
      setNewBrand(e.target.value)
    }
  }

  const Brand = async() => {
    if (getBrandId !== undefined) {
      await dispatch(updateBrand(getBrandId, editBrand))
      clearEditBrand()
    } else {
      await dispatch(addBrand(newBrand))
      clearNewBrand()
    }
  }
  const clearEditBrand=()=>{
    setEditBrand('')
  }
  const clearNewBrand=()=>{
    setNewBrand('')
  }
   
  return (
    <div onKeyDown={(e) => { if (e.keyCode === 13) { Brand(); } }}
 className="addBrand">
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
        {getBrandId !== undefined ? 'Update' : 'Add'} Brand
      </p>
      {/* <form className='flex ' action=""> */}
      <input
        className="inputTitle"
        onChange={handleInputChange}
        placeholder="Enter Brand"
        type="text"
        value={getBrandId !== undefined ? editBrand : newBrand}
      />
      {/* </form> */}
      <div   onClick={Brand}>
        <Button
          widthButton={'fit-content'}
          title={`  ${getBrandId !== undefined ? 'Update' : 'Add'} Brand`}
        />
      </div>
    </div>
  )
}

export default AddBrand

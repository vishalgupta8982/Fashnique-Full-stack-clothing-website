import React, { useEffect, useState } from 'react'
import './AddColor.css'
import Button from '../../Components/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import ClipLoader from 'react-spinners/ClipLoader'
import { useLocation } from 'react-router-dom'
import { colors } from '../../assets/Constant/Color'
import {
  addColor,
  getaColor,
  updateColor,
} from '../../Services/Color/ColorAction'
const AddColor = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const [editColor, setEditColor] = useState()
  const [newColor, setNewColor] = useState()
  const colorState = useSelector((state) => state.color)
  const { error, isSuccess, loading, aColor } = colorState
  const getColorId = location.pathname.split('/')[3]
  useEffect(() => {
    if (getColorId !== undefined) {
      dispatch(getaColor(getColorId))
    }
  }, [dispatch, getColorId])
  useEffect(() => {
    if (getColorId !== undefined && isSuccess) {
      toast.success('Updated Successfully')
    } else if (isSuccess) {
      toast.success('Added Successfully')
    } else if (error) {
      toast.error('Already exists')
    }
  }, [error, getColorId, isSuccess])

  useEffect(() => {
    if (aColor && getColorId !== undefined) {
      setEditColor(aColor.title)
    }
  }, [aColor, getColorId])

  const handleInputChange = (e) => {
    if (getColorId !== undefined) {
      setEditColor(e.target.value)
    } else {
      setNewColor(e.target.value)
    }
  }

  const color = () => {
    if (getColorId !== undefined) {
      dispatch(updateColor(getColorId, editColor))
    } else {
      dispatch(addColor(newColor))
    }
  }
  return (
    <div className="addColor">
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
      <p className="addColorHead">
        {getColorId !== undefined ? 'Update' : 'Add'} Color
      </p>
      <select
        onChange={handleInputChange}
        value={getColorId !== undefined ? editColor : newColor}
        className="blogCategory"
        name=""
        id=""
      >
        <option value="">Select Color</option>
        {colors.map((color) => (
          <option key={color.hex} value={`${color.name} - ${color.hex}`}>
            {color.name}
          </option>
        ))}
      </select>
      <div className="mt-3" onClick={color}>
        <Button
          widthButton={'fit-content'}
          title={`  ${getColorId !== undefined ? 'Update' : 'Add'} Color`}
        />
      </div>
    </div>
  )
}

export default AddColor

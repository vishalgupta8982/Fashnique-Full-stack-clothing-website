import React, { useEffect, useState } from 'react'
import './AddColor.css'
import Button from '../../Components/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import ClipLoader from 'react-spinners/ClipLoader'
import { useLocation } from 'react-router-dom'
import {
  addColor,
  getaColor,
  updateColor,
} from '../../Services/Color/ColorAction'
const AddColor = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const [editColor, setEditColor] = useState('')
  const [newColor, setNewColor] = useState('')
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
        {colors.map(color => (
          <option key={color.hex} value={color.name}>
            {color.name}
          </option>
        ))}
      </select>
      <div className='mt-3' onClick={color}>
        <Button
          widthButton={'fit-content'}
          title={`  ${getColorId !== undefined ? 'Update' : 'Add'} Color`}
        />
      </div>
    </div>
  )
}

export default AddColor
  export const colors=[
  { "name": "White", "hex": "#FFFFFF" },
  { "name": "Black", "hex": "#000000" },
  { "name": "Gray", "hex": "#808080" },
  { "name": "Navy Blue", "hex": "#000080" },
  { "name": "Red", "hex": "#FF0000" },
  { "name": "Pink", "hex": "#FFC0CB" },
  { "name": "Blue", "hex": "#0000FF" },
  { "name": "Green", "hex": "#008000" },
  { "name": "Yellow", "hex": "#FFFF00" },
  { "name": "Purple", "hex": "#800080" },
  { "name": "Brown", "hex": "#A52A2A" },
  { "name": "Orange", "hex": "#FFA500" },
  { "name": "Beige", "hex": "#F5F5DC" },
  { "name": "Cream", "hex": "#FFFDD0" },
  { "name": "Ivory", "hex": "#FFFFF0" },
  { "name": "Tan", "hex": "#D2B48C" },
  { "name": "Maroon", "hex": "#800000" },
  { "name": "Teal", "hex": "#008080" },
  { "name": "Charcoal", "hex": "#36454F" },
  { "name": "Olive Green", "hex": "#556B2F" },
  { "name": "Peach", "hex": "#FFDAB9" },
  { "name": "Turquoise", "hex": "#40E0D0" },
  { "name": "Magenta", "hex": "#FF00FF" },
  { "name": "Lavender", "hex": "#E6E6FA" },
  { "name": "Sky Blue", "hex": "#87CEEB" },
  { "name": "Mint Green", "hex": "#98FF98" },
  { "name": "Coral", "hex": "#FF7F50" },
  { "name": "Royal Blue", "hex": "#4169E1" },
  { "name": "Salmon", "hex": "#FA8072" },
  { "name": "Lilac", "hex": "#C8A2C8" },
  { "name": "Burgundy", "hex": "#800020" },
  { "name": "Mustard Yellow", "hex": "#FFDB58" },
  { "name": "Indigo", "hex": "#4B0082" },
  { "name": "Khaki", "hex": "#F0E68C" },
  { "name": "Aqua", "hex": "#00FFFF" },
  { "name": "Slate", "hex": "#708090" },
  { "name": "Ruby", "hex": "#E0115F" },
  { "name": "Orchid", "hex": "#DA70D6" },
  { "name": "Taupe", "hex": "#483C32" },
  { "name": "Copper", "hex": "#B87333" },
  { "name": "Gold", "hex": "#FFD700" },
  { "name": "Silver", "hex": "#C0C0C0" },
  { "name": "Bronze", "hex": "#CD7F32" },
  { "name": "Rust", "hex": "#B7410E" },
  { "name": "Emerald Green", "hex": "#50C878" },
  { "name": "Plum", "hex": "#8E4585" },
  { "name": "Cobalt Blue", "hex": "#0047AB" },
  { "name": "Mahogany", "hex": "#C04000" },
  { "name": "Mauve", "hex": "#E0B0FF" },
  { "name": "Olive Drab", "hex": "#6B8E23" }
]

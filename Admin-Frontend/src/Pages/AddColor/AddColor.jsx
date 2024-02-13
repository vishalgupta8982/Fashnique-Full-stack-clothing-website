import React from 'react'
import './AddColor.css'
import Button from '../../Components/Button/Button'
const AddColor = () => {
    return (
        <div className='addColor'>
            <p className='addColorHead'>Add Color</p>
            {/* <form className='flex ' action=""> */}
            <input className='inputTitle' placeholder='Enter Color Name ' type="text" />
            {/* </form> */}
            <Button widthButton={"fit-content"} title={"Add Blog Category"} />

        </div>
    )
}

export default AddColor
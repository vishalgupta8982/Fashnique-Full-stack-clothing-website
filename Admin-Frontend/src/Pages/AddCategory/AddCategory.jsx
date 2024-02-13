import React from 'react'
import './AddCategory.css'
import Button from '../../Components/Button/Button'
const AddCategory = () => {
    return (
        <div className='addCat'>
            <p className='addCatHead'>Add Category</p>
            {/* <form className='flex ' action=""> */}
            <input className='inputTitle' placeholder='Enter Blog Title' type="text" />
            {/* </form> */}
            <Button widthButton={"fit-content"} title={"Add Category"} />

        </div>
    )
}

export default AddCategory
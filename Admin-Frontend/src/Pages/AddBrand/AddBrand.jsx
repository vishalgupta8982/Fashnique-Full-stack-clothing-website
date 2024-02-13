import React from 'react'
import './AddBrand.css'
import Button from '../../Components/Button/Button'
const AddBrand = () => {
    return (
        <div className='addBrand'>
            <p className='addBrandHead'>Add Brand</p>
            {/* <form className='flex ' action=""> */}
            <input className='inputTitle' placeholder='Enter Brand' type="text" />
            {/* </form> */}
            <Button widthButton={"fit-content"} title={"Add Brand"} />

        </div>
    )
}

export default AddBrand
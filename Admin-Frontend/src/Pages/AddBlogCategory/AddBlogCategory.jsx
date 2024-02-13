import React from 'react'
import './AddBlogCategory.css'
import Button from '../../Components/Button/Button'
const AddBlogCategory = () => {
  return (
    <div className='addBlogCat'>
          <p className='addBlogCatHead'>Add Blog Category</p>
            {/* <form className='flex ' action=""> */}
                  <input className='inputTitle' placeholder='Enter Blog Title' type="text" />
            {/* </form> */}
            <Button widthButton={"fit-content"} title={"Add Blog Category"} />
          
    </div>
  )
}

export default AddBlogCategory
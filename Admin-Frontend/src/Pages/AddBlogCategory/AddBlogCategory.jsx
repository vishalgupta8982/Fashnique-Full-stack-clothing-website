import React, { useEffect, useState } from 'react';
import './AddBlogCategory.css';
import Button from '../../Components/Button/Button';
import { useSelector, useDispatch } from "react-redux";
import { addBlogCat, getaBlogCat, updateBlogCat } from '../../Services/BlogCategory/blogCatAction';
import { toast } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";
import { useLocation } from "react-router-dom";

const AddBlogCategory = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.user.token);
  const blogCat = useSelector((state) => state.blogCat);
  const { error, isSuccess, loading, blogCategory } = blogCat;
   

  const location = useLocation();
  const getBlogCatId = location.pathname.split("/")[3];

  useEffect(() => {
    if (getBlogCatId !== undefined) {
      dispatch(getaBlogCat(getBlogCatId));
    }
  }, [dispatch, getBlogCatId]);
 
  const [editBlogCategory, setEditBlogCategory] = useState("");
  const [newBlogCategory, setNewBlogCategory] = useState("");

  useEffect(() => {
    if (getBlogCatId !== undefined && isSuccess) {
      toast.success("Updated Successfully");
    } else if (isSuccess) {
      toast.success("Added Successfully");
    } else if (error) {
      toast.error("Already exists");
    }
  }, [error, getBlogCatId, isSuccess]);

  useEffect(() => {
    if (blogCategory && getBlogCatId !== undefined) {
      setEditBlogCategory(blogCategory.title);
    }
  }, [blogCategory, getBlogCatId]);
 
  const handleInputChange = (e) => {
    if (getBlogCatId !== undefined) {
      setEditBlogCategory(e.target.value);
    } else {
      setNewBlogCategory(e.target.value);
    }
  };

  const BlogCat = () => {
    if (getBlogCatId !== undefined) {
      dispatch(updateBlogCat(getBlogCatId, token, editBlogCategory));
    } else {
      dispatch(addBlogCat(token, newBlogCategory));
    }
  };

  return (
    <div className='addBlogCat'>
      {loading && (
        <div className='loader'>
          <ClipLoader
            color={"#52ab98"}
            loading={loading}
            size={25}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      <p className='addBlogCatHead'>{getBlogCatId !== undefined ? "Update" : "Add"} Blog Category</p>
      <input
        className='inputTitle'
        onChange={handleInputChange}
        value={getBlogCatId !== undefined ? editBlogCategory : newBlogCategory}
        placeholder='Enter Blog Title'
        type="text"
      />
      <div onClick={BlogCat}>
        <Button widthButton={"fit-content"} title={`  ${getBlogCatId !== undefined ? "Update" : "Add"} Blog Category`} />
      </div>
    </div>
  );
}

export default AddBlogCategory;

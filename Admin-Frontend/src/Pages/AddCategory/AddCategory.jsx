import React, { useEffect, useState } from 'react'
import './AddCategory.css'
import Button from '../../Components/Button/Button'
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from 'react-toastify';
import { addCategory, getaCategory, updateCategory } from '../../Services/Category/CategoryAction'
const AddCategory = () => {
    const dispatch = useDispatch()
    const location = useLocation();
    const [editCategory, setEditCategory] = useState("");
    const [newCategory, setNewCategory] = useState("");
    const token = useSelector((state) => state.auth.user.token);
    const categoryState = useSelector((state) => state.category);
    const { error, isSuccess, loading, productCategory } = categoryState;
    console.log(error, isSuccess)
    const getCategoryId = location.pathname.split("/")[3];
    useEffect(() => {
        if (getCategoryId !== undefined) {
            dispatch(getaCategory(getCategoryId));
        }
    }, [dispatch, getCategoryId]);
    useEffect(() => {
        if (getCategoryId !== undefined && isSuccess) {
            toast.success("Updated Successfully");
        }
        else if (isSuccess) {
            toast.success("Added Successfully");
        } else if (error) {
            toast.error("Already exists");
        }
    }, [error, getCategoryId, isSuccess]);
    useEffect(() => {
        if (productCategory && getCategoryId !== undefined) {
            setEditCategory(productCategory.title);
        }
    }, [productCategory, getCategoryId]);

    const handleInputChange = (e) => {
        if (getCategoryId !== undefined) {
            setEditCategory(e.target.value);
        } else {
            setNewCategory(e.target.value);
        }
    };

    const category = () => {
        if (getCategoryId !== undefined) {
            dispatch(updateCategory(getCategoryId, token, editCategory));
        }
        else {
            dispatch(addCategory(token, newCategory));
        }
    };
    return (
        <div className='addCat'>
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
            <p className='addCatHead'>{getCategoryId !== undefined ? "Update" : "Add"} Category</p>
            <input className='inputTitle' onChange={handleInputChange} placeholder='Enter Category' type="text" value={getCategoryId !== undefined ? editCategory : newCategory} />
            <div onClick={category}>
            <Button widthButton={"fit-content"} title={`  ${getCategoryId !== undefined ? "Update" : "Add"} Category`} />
</div>
        </div>
    )
}

export default AddCategory
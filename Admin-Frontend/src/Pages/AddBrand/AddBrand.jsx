import React, { useEffect, useState } from 'react'
import './AddBrand.css'
import Button from '../../Components/Button/Button'
import {useDispatch,useSelector} from "react-redux"
import {useLocation} from "react-router-dom"
import { addBrand, getaBrand, updateBrand } from '../../Services/Brand/BrandAction'
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from 'react-toastify';
const AddBrand = () => {
    const dispatch=useDispatch()
    const location = useLocation();
    const [editBrand, setEditBrand] = useState("");
    const [newBrand, setNewBrand] = useState("");
    const token = useSelector((state) => state.auth.user.token);
    const brandState = useSelector((state) => state.brand);
    const { error, isSuccess, loading, brand } = brandState;
    const getBrandId = location.pathname.split("/")[3];
    useEffect(() => {
        if (getBrandId !== undefined) {
             dispatch(getaBrand(getBrandId));
        }
    }, [dispatch, getBrandId]);
    useEffect(() => {
        if (getBrandId !== undefined && isSuccess) {
            toast.success("Updated Successfully");
        }
         else if (isSuccess) {
            toast.success("Added Successfully");
        } else if (error) {
            toast.error("Already exists");
        }
    }, [error, getBrandId, isSuccess]);
    
    useEffect(() => {
        if (brand && getBrandId !== undefined) {
            setEditBrand(brand.title);
        }
    }, [brand, getBrandId]);
 
    const handleInputChange = (e) => {
        if (getBrandId !== undefined) {
            setEditBrand(e.target.value);
        } else {
            setNewBrand(e.target.value);
        }
    };

    const Brand = () => {
        if (getBrandId !== undefined) {
            dispatch(updateBrand(getBrandId, token, editBrand));
        } 
         else {
            dispatch(addBrand(token, newBrand));
         }
    };
    return (
        <div className='addBrand'>
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
            <p className='addBlogCatHead'>{getBrandId !== undefined ? "Update" : "Add"} Brand</p>
            {/* <form className='flex ' action=""> */}
            <input className='inputTitle' 
                onChange={handleInputChange} placeholder='Enter Brand' type="text" value={getBrandId !== undefined ? editBrand : newBrand} />
            {/* </form> */}
            <div onClick={Brand}>
                <Button widthButton={"fit-content"} title={`  ${getBrandId !== undefined ? "Update" : "Add"} Brand`} />
            </div>

        </div>
    )
}

export default AddBrand
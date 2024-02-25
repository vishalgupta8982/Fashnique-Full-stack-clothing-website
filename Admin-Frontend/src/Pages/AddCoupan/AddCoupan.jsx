import React, { useEffect, useState } from 'react'
import './AddCoupan.css'
import Button from '../../Components/Button/Button'
import { useDispatch, useSelector } from "react-redux"
import { toast } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";
import { useLocation } from "react-router-dom"
import { addColor, getaColor, updateColor } from '../../Services/Color/ColorAction';
import { addCoupan, getaCoupan, updateCoupan } from '../../Services/Coupan/CoupanAction';
 
const AddCoupan = () => {
    const dispatch = useDispatch()
    const location = useLocation();
    const [editCoupan, setEditCoupan] = useState({name:'',discount:'',expiry:''});
    const [newCoupan, setNewCoupan] = useState({name:'',discount:'',expiry:''});
    const token = useSelector((state) => state.auth.user.token);
    const coupanState = useSelector((state) => state.coupan);
    const { error, isSuccess, loading, Coupan } = coupanState;
    const getCoupanId = location.pathname.split("/")[3];
    useEffect(() => {
        if (getCoupanId !== undefined) {
            dispatch(getaCoupan(getCoupanId,token));
        }
    }, [dispatch, getCoupanId]);
    useEffect(() => {
        if (getCoupanId !== undefined && isSuccess) {
            toast.success("Updated Successfully");
        }
        else if (isSuccess) {
            toast.success("Added Successfully");
        } else if (error) {
            toast.error("Check All Fields");
        }
    }, [error, getCoupanId, isSuccess]);

    useEffect(() => {
        if (Coupan && getCoupanId !== undefined) {
            setEditCoupan(Coupan);
        }
    }, [Coupan, getCoupanId]);

    const handleInputChange = (e,fieldName) => {
        if (getCoupanId !== undefined) {
            setEditCoupan(prevState=>({
                ...prevState,
                [fieldName]:e.target.value
            }));
        } else {
            setNewCoupan(prevState => ({
                ...prevState,
                [fieldName]: e.target.value
            }));
        }
    };
    
    const coupan = () => {
        if (getCoupanId !== undefined) {
            dispatch(updateCoupan(getCoupanId, token, editCoupan));
        }
        else {
            dispatch(addCoupan(token, newCoupan));
        }
    };
    return (
        <div className='addCoupan'>
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
            <p className='addCoupanHead'>{getCoupanId !== undefined ? "Update" : "Add"} Coupan</p>
            <input className='inputTitle' onChange={(e)=>handleInputChange(e,'name')} placeholder='Enter Coupan Name ' type="text" value={getCoupanId !== undefined ? editCoupan.name : newCoupan.name} />
            <input className='inputTitle' onChange={(e)=>handleInputChange(e,'discount')}placeholder='Enter Discount Percentage eg. 40 ' type="number" value={getCoupanId !== undefined ? editCoupan.discount : newCoupan.discount} />
            <input className='inputTitle' onChange={(e) => handleInputChange(e, 'expiry')} placeholder='Enter Coupan Expiry Date ' type="date" value={getCoupanId !== undefined ? editCoupan.expiry.split("T")[0] : newCoupan.expiry} />
            <div onClick={coupan}>
                <Button widthButton={"fit-content"} title={`  ${getCoupanId !== undefined ? "Update" : "Add"} Coupan`} /></div>
        </div>
    )
}

export default AddCoupan
import React, { useEffect, useState } from 'react'
import './AddColor.css'
import Button from '../../Components/Button/Button'
import { useDispatch, useSelector } from "react-redux"
import { toast } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";
import { useLocation } from "react-router-dom"
import { addColor, getaColor, updateColor } from '../../Services/Color/ColorAction';
const AddColor = () => {
    const dispatch = useDispatch()
    const location = useLocation();
    const [editColor, setEditColor] = useState("");
    const [newColor, setNewColor] = useState("");
    const token = useSelector((state) => state.auth.user.token);
    const colorState = useSelector((state) => state.color);
    const { error, isSuccess, loading, Color } = colorState;
    const getColorId = location.pathname.split("/")[3];
    useEffect(() => {
        if (getColorId !== undefined) {
            dispatch(getaColor(getColorId));
        }
    }, [dispatch, getColorId]);
    useEffect(() => {
        if (getColorId !== undefined && isSuccess) {
            toast.success("Updated Successfully");
        }
        else if (isSuccess) {
            toast.success("Added Successfully");
        } else if (error) {
            toast.error("Already exists");
        }
    }, [error, getColorId, isSuccess]);

    useEffect(() => {
        if (Color && getColorId !== undefined) {
            setEditColor(Color.title);
        }
    }, [Color, getColorId]);

    const handleInputChange = (e) => {
        if (getColorId !== undefined) {
            setEditColor(e.target.value);
        } else {
            setNewColor(e.target.value);
        }
    };

    const color = () => {
        if (getColorId !== undefined) {
            dispatch(updateColor(getColorId, token, editColor));
        }
        else {
            dispatch(addColor(token, newColor));
        }
    };
    return (
        <div className='addColor'>
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
            <p className='addColorHead'>{getColorId !== undefined ? "Update" : "Add"} Color</p>
            <input className='inputTitle' onChange={handleInputChange} placeholder='Enter Color Name or Color Code' type="text" value={getColorId !== undefined ? editColor : newColor} />
            <div onClick={color}> 
                <Button widthButton={"fit-content"} title={`  ${getColorId !== undefined ? "Update" : "Add"} Color`} /></div>
        </div>
    )
}

export default AddColor
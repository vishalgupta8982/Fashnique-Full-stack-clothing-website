import { useState,useEffect, useRef } from 'react';
import './MyAccount.css'
import { FaRegEdit } from "react-icons/fa";
import moment from 'moment';
import Button from '../Button/Button';
import {useSelector,useDispatch} from "react-redux"
import { userDetail, userDetailUpdate } from '../../services/Authentication/authAction';
import {toast} from "react-toastify"
import ClipLoader from 'react-spinners/ClipLoader'
const MyAccount = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(userDetail())
    }, [])
    const user = useSelector((state) => state.auth)
    const { loading,isSuccess, userInformation } = user;
    const [updateDetail, setUpdateDetail] = useState({ firstName: '', lastName: '', email: '', mobile: '', dateOfBirth: '', gender: '' })
    useEffect(()=>{
        if (!loading && userInformation) {
            setUpdateDetail({
                firstName: userInformation?.firstName,
                lastName: userInformation?.lastName,
                email: userInformation?.email,
                mobile: userInformation?.mobile,
                dateOfBirth: moment(userInformation?.dateOfBirth).format('YYYY-MM-DD'),
                gender: userInformation?.gender
            });
        }
    }, [userInformation, loading])
    
    const handleChange = (e, fieldName) => {
        setUpdateDetail(prevState => ({
            ...prevState,
            [fieldName]: e.target.value
        }));
    };
     const update=async()=>{
        try{
            await dispatch(userDetailUpdate(updateDetail))
            await dispatch(userDetail())
                toast.success("Updated Successfully")
            setEditPi(false)
        }catch(err){
            throw new Error(err)
        }
         
     }
     
    const [editPi, setEditPi] = useState(false)
    const inputRef = useRef(null);
    return (
        <>
            <div className="personalInfoCont px-5 w-[100%] md:w-[90%]">
                <div className='flex flex-row items-center'>
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
                    <p className='piHead'>Personal Information</p></div>
                <div className="flex flex-col piInfo">
                    <div className='flex flex-col items-center justify-center profileImgCont md:items-start md:flex-row md:justify-between'>
                        <div className='profileImg' >
                            <FaRegEdit className='editIcon' />
                            <img className='profileImg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgbI78v3a7Q5Tcm1DrdpZ7KEH2-ArooT9qzvFe6cLOYxy4wY-hp6dG-NrJKyv9_n5Hcjs&usqp=CAU" alt="" /></div>
                        <p onClick={() => { setEditPi(!editPi); inputRef.current.focus() }} className="editPi"><FaRegEdit />&nbsp;Change Profile Information</p>
                    </div>
                    <div className='flex flex-col md:flex-row' >
                        <div className="piInputCont">
                            <p className="piInputHead">FirstName</p>
                            <input className={`piInput w-[90%]    ${editPi ? `text-[#000]` : `text-[Grey]`} `} readOnly={!editPi} type="text" value={updateDetail.firstName} ref={inputRef} onChange={(e) => handleChange(e, 'firstName')} />
                        </div>
                        <div className="piInputCont">
                            <p className="piInputHead">LastName</p>
                            <input className={`piInput w-[90%]   ${editPi ? `text-[#000]` : `text-[Grey]`} `} readOnly={!editPi} type="text" value={updateDetail.lastName} onChange={(e) => handleChange(e, 'lastName')} />
                        </div></div>
                    <div className="piInputCont">
                        <p className="piInputHead">Phone Number +91</p>
                        <input className={`piInput w-[90%] md:w-[45%] ${editPi ? `text-[#000]` : `text-[Grey]`} `} readOnly={!editPi} type="text" value={updateDetail.mobile} onChange={(e) => handleChange(e, 'mobile')} />
                    </div>
                    <div className="piInputCont">
                        <p className="piInputHead">Email</p>
                        <input className={`piInput w-[90%] md:w-[45%] ${editPi ? `text-[#000]` : `text-[Grey]`} `} readOnly={!editPi} type="text" value={updateDetail.email} onChange={(e) => handleChange(e, 'email')} />
                    </div>
                    <div className="piInputCont">
                        <p className="piInputHead">Date Of Birth</p>
                        <input className={`piInput w-[90%] md:w-[45%] ${editPi ? `text-[#000]` : `text-[Grey]`} `} readOnly={!editPi} type="date" value={updateDetail.dateOfBirth} onChange={(e) => handleChange(e, 'dateOfBirth')}   />
                        <div
                            className={`checkbox-container w-[90%] md:w-[45%]  `}  >
                            <p className="piInputHead">Gender</p>
                            <div className='genderCheckBox '>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        checked={updateDetail.gender === 'male'}
                                        onChange={(e) => handleChange(e, 'gender')}
                                        disabled={!editPi}
                                        className='checkBoxGender '
                                    />
                                    Male
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        disabled={!editPi}
                                        value="female"
                                        checked={updateDetail.gender === 'female'}
                                        onChange={(e) => handleChange(e, 'gender')}
                                        className='checkBoxGender'
                                    />
                                    Female
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="preferNotToSay"
                                        disabled={!editPi}
                                        checked={updateDetail.gender === 'preferNotToSay'}
                                        onChange={(e) => handleChange(e, 'gender')}
                                        className='checkBoxGender'
                                    />
                                    Prefer Not to Say
                                </label></div>
                        </div>
                    </div>
                    <div onClick={update} className='saveInfo'>
                        <Button widthButton={"100%"} title={"Save Information"} />
                    </div>
                </div>

            </div></>
    )
}
export default MyAccount;
import { useState, useRef } from 'react';
import './MyAccount.css'
import { FaRegEdit } from "react-icons/fa";
import DatePicker from "react-datepicker"
import Button from '../Button/Button';
const MyAccount = () => {
    const [editPi, setEditPi] = useState(false)
    const [Name, setName] = useState("vishal")
    const [gender, setGender] = useState('');
    const inputRef = useRef(null);
    return (
        <>
            <div className="personalInfoCont px-5 w-[100%] md:w-[90%]">
                <div className='flex flex-row items-center'>
                    <p className='piHead'>Personal Information</p></div>
                <div className="flex flex-col piInfo">
                    <div className='flex flex-col items-center justify-center profileImgCont md:items-start md:flex-row md:justify-between'>
                        <div className='profileImg' >
                            <FaRegEdit className='editIcon' />
                            <img className='profileImg' src="https://demo-digitic.myshopify.com/cdn/shop/products/19.jpg?v=1655097254&width=269" alt="" /></div>
                        <p onClick={() => { setEditPi(!editPi); inputRef.current.focus() }} className="editPi"><FaRegEdit />&nbsp;Change Profile Information</p>
                    </div>
                    <div className='flex flex-col md:flex-row' >
                        <div className="piInputCont">
                            <p className="piInputHead">FirstName</p>
                            <input className={`piInput w-[90%]    ${editPi ? `text-[#000]` : `text-[Grey]`} `} readOnly={!editPi} onChange={(e) => setName(e.target.value)} type="text" value={Name} ref={inputRef} />
                        </div>
                        <div className="piInputCont">
                            <p className="piInputHead">LastName</p>
                            <input className={`piInput w-[90%]   ${editPi ? `text-[#000]` : `text-[Grey]`} `} readOnly={!editPi} onChange={(e) => setName(e.target.value)} type="text" value={Name} />
                        </div></div>
                    <div className="piInputCont">
                        <p className="piInputHead">Phone Number +91</p>
                        <input className={`piInput w-[90%] md:w-[45%] ${editPi ? `text-[#000]` : `text-[Grey]`} `} readOnly={!editPi} onChange={(e) => setName(e.target.value)} type="text" value={Name} />
                    </div>
                    <div className="piInputCont">
                        <p className="piInputHead">Email</p>
                        <input className={`piInput w-[90%] md:w-[45%] ${editPi ? `text-[#000]` : `text-[Grey]`} `} readOnly={!editPi} onChange={(e) => setName(e.target.value)} type="text" value={Name} />
                    </div>
                    <div className="piInputCont">
                        <p className="piInputHead">Date Of Birth</p>
                        <input className={`piInput w-[90%] md:w-[45%] ${editPi ? `text-[#000]` : `text-[Grey]`} `} readOnly={!editPi} onChange={(e) => setName(e.target.value)} type="date" value={Name} />
                        <div
                            className={`checkbox-container w-[90%] md:w-[45%]  `}  >
                            <p className="piInputHead">Gender</p>
                            <div className='genderCheckBox '>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        checked={gender === 'male'}
                                        onChange={(e) => setGender(e.target.value)}
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
                                        checked={gender === 'female'}
                                        onChange={(e) => setGender(e.target.value)}
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
                                        checked={gender === 'preferNotToSay'}
                                        onChange={(e) => setGender(e.target.value)}
                                        className='checkBoxGender'
                                    />
                                    Prefer Not to Say
                                </label></div>
                        </div>
                    </div>
                    <div className='saveInfo'>
                        <Button widthButton={"100%"} title={"Save Information"} />
                    </div>
                </div>

            </div></>
    )
}
export default MyAccount;
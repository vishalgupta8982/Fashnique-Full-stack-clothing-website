import './ChangePassword.css'
import Button from '../Button/Button';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useState } from 'react';
const ChangePassword = () => {
    const [showCurrPswrd, setShowCurrPswrd] = useState(false)
    const [showNewPswrd, setShowNewPswrd] = useState(false)
    const [showCnfNewPswrd, setShowCnfNewPNew] = useState(false)
    return (
        <>
            <div className="changePassword w-[screen]   min-h-[73vh]   ">
                <div className="chngPswwrdCard ">
                    <div className='cpHead'> <p >Change Password</p></div>
                    <div className='inputContainer'>
                        <p className='label'>Current Password</p>
                        <div className='inputCp'> 
                        <input  className='outline-none'  type={showCurrPswrd ? 'password' : 'text'} placeholder='Current Password' id="" />
                        <span onClick={() => setShowCurrPswrd(!showCurrPswrd)} className='eye'>
                            {showCurrPswrd ? (<FaEyeSlash   />) : (<FaEye  />)}
                            </span></div>
                    </div>
                    <div className='inputContainer'>
                        <p className='label'>New Password</p>
                        <div className='inputCp'>
                            <input className='outline-none' type={showNewPswrd ? 'password' : 'text'} placeholder='Current Password' id="" />
                            <span onClick={() => setShowNewPswrd(!showNewPswrd)} className='eye'>
                                {showNewPswrd ? (<FaEyeSlash />) : (<FaEye />)}
                            </span></div>
                    </div>
                    <div className='mb-3 inputContainer'>
                        <p className='label'>Confirm New Password</p>
                        <div className='inputCp'>
                            <input className='outline-none' type={showCnfNewPswrd ? 'password' : 'text'} placeholder='Current Password' id="" />
                            <span onClick={() => setShowCnfNewPNew(!showCnfNewPswrd)} className='eye'>
                                {showCnfNewPswrd ? (<FaEyeSlash />) : (<FaEye />)}
                            </span></div>
                    </div>
                    <Button title={"Update Password"} />
                </div>
            </div>
        </>
    )
}

export default ChangePassword;
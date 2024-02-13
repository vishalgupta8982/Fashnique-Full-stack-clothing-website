import './Login.css'
import { IoLockClosedOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import Button from '../Button/Button';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
const Login = () => {

    const navigate = useNavigate()
    const [secure, setSecure] = useState(true)
    return (
        <>
                <div className="loginPage w-[screen]   min-h-[74vh]   ">
                    <div className="loginCard ">
                        <div className='LoginHead'> <p >Sign in</p></div>
                        <div className='inputContainer'>
                            <p className='label'>Email</p>
                            <div className='inputField'>
                                <CgProfile color='#AEAEAE' size={18} />
                                <input
                                    className='input'
                                    type="text"
                                    placeholder='Email'
                                // value={value}
                                // onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className='inputContainer'>
                            <p className='label'>Password</p>
                            <div className='inputField'>
                                <IoLockClosedOutline color='#AEAEAE' size={18} />
                                <input
                                    className='input'
                                    type={secure ? 'password' : 'text'}
                                    placeholder='Password'

                                    style={{ appearance: 'none' }}
                                // value={value}
                                // onChange={handleChange}
                                />
                                <span onClick={() => setSecure(!secure)} className='eye'>
                                    {secure ? (<FaEyeSlash />) : (<FaEye />)}
                                </span>
                            </div>
                        </div>
                        <p className='forgot'>Forgot Password?</p>
                        <div className="LoginButton">
                            <Button title='Sign in' widthButton={"270px"} />
                            </div>
                        <p className='newMember'>New to Marketooze? <span onClick={() => navigate('/signUp')} className='join'>Join now</span></p>
                    </div>
                </div>
        </>
    )
}

export default Login;
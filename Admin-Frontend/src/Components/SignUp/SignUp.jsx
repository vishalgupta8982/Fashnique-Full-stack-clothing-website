import './SignUp.css'
import { IoLockClosedOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import Button from '../Button/Button.jsx';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import { adminRegister } from '../../Services/authentication/authAction.jsx';
import {useDispatch,useSelector} from "react-redux"
import { toast } from 'react-toastify'
import ClipLoader from "react-spinners/ClipLoader";
const SignUp = () => {
    const dispatch=useDispatch()
    const [secure, setSecure] = useState(true)
    const [credential, setCredential] = useState({ firstName: '', lastName: '', email: '', mobile: '', password :'',role:'admin'})
    const handleChange=(e,fieldName)=>{
        setCredential(prevState=>({
            ...prevState,
            [fieldName]:e.target.value
        }))
    }
    const register=()=>{
        dispatch(adminRegister(credential))
    }
    const authState = useSelector((state) => state)
    const { user, error, isSuccess, loading } = authState.auth;
    
    useEffect(() => {
        if (isSuccess) {
            navigate("/admin");
            toast.success("Register Successfull")
        } else {
            navigate("");
        }
    }, [user, error, isSuccess, loading]);
    const navigate = useNavigate()
    return (
        <>
                <div className="signUpPage w-[screen]   min-h-[100vh]   ">
                    <div className="signUpCard ">
                        <div className='signUpHead'> <p >Sign up</p></div>
                    {error && (
                        <p className='invalid'>*Account already axist</p>)}
                        <div className='flex flex-col md:flex-row md:justify-between '> 
                        <div className=' inputContainer'>
                            <p className='label'>First name</p>
                            <div className='inputField'>
                                <input
                                        className='inputName'
                                    type="text"
                                    placeholder='First name'
                                value={credential.firstName}
                                onChange={(e)=>handleChange(e,'firstName')}
                                />
                            </div>
                        </div>
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
                        <div className='inputContainer'>
                            <p className='label'>Last name</p>
                            <div className='inputField'>
                                <input
                                    className='inputName'
                                    type="text"
                                    placeholder='Last name'
                                    value={credential.lastName}
                                    onChange={(e) => handleChange(e, 'lastName')}
                                />
                            </div>
                        </div>
                        </div>
                        <div className='inputContainer'>
                            <p className='label'>Email</p>
                            <div className='inputField'>
                                <CgProfile color='#AEAEAE' size={18} />
                                <input
                                    className='input'
                                    type="text"
                                    placeholder='Email'
                                value={credential.email}
                                onChange={(e) => handleChange(e, 'email')}
                                />
                            </div>
                        </div>
                        <div className='inputContainer'>
                            <p className='label'>Mobile</p>
                            <div className='inputField'>
                                <CgProfile color='#AEAEAE' size={18} />
                                <input
                                    className='input'
                                    type="number"
                                    placeholder='Mobile'
                                value={credential.mobile}
                                onChange={(e) => handleChange(e, 'mobile')}
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
                                    placeholder='Password must be a 8 character'
                                    security={secure}
                                    style={{ appearance: 'none' }}
                                value={credential.password}
                                onChange={(e) => handleChange(e, 'password')}
                                />
                                <span className='eye'>
                                    {secure ? (<FaEyeSlash onClick={() => setSecure(!secure)} />) : (<FaEye onClick={() => setSecure(!secure)} />)}
                                </span>
                            </div>
                        </div>
                        <p className='forgot'>Forgot Password?</p>
                        <div onClick={register} className="signUpButton">
                            <Button title='Sign up'  widthButton={"100%"} /></div>
                        <p onClick={() => navigate('/')} className='Member'>Already a member? <span className='Login'>Login</span></p>
                    </div>
                </div>
        </>
    )
}

export default SignUp;
import './Login.css'
import { IoLockClosedOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import Button from '../Button/Button';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import {useDispatch,useSelector } from "react-redux";
import { adminLogin } from '../../Services/authentication/authAction';
import ClipLoader from "react-spinners/ClipLoader";
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [secure, setSecure] = useState(true)
    const [credential,setCredential]=useState({email:'',password:''})
    //this is used for setcredential
    const handleChange = (e, fieldName) => {
        setCredential(prevState => ({
            ...prevState,
            [fieldName]: e.target.value
        }));
    };
    const login=()=>{
        dispatch(adminLogin(credential));
    }
    const authState=useSelector((state)=>state)
    const { user, error, isSuccess, loading } = authState.auth;
    console.log(error)
    useEffect(() => {
        if (isSuccess) {
            navigate("admin");
            toast.success("Login Successfull")
        } else {
            navigate("");
        }
    }, [user, error, isSuccess, loading]);
    return (
        <>
                <div className="loginPage w-[screen]   min-h-[100vh]   ">
                    <div className="loginCard ">
                        <div className='LoginHead'> <p >Sign in</p>
                         </div>

                        {error&&( 
                        <p className='invalid'>*Invalid email or password</p>)}
                    
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
                            <p className='label'>Password</p>
                            <div className='inputField'>
                                <IoLockClosedOutline color='#AEAEAE' size={18} />
                                <input
                                    className='input'
                                    type={secure ? 'password' : 'text'}
                                    placeholder='Password'

                                    style={{ appearance: 'none' }}
                                value={credential.password}
                                onChange={(e) => handleChange(e, 'password')}
                                />
                                <span onClick={() => setSecure(!secure)} className='eye'>
                                    {secure ? (<FaEyeSlash />) : (<FaEye />)}
                                </span>
                            </div>
                        </div>
                        <p className='forgot'>Forgot Password?</p>
                        <div onClick={login} className="LoginButton">
                            <Button  title='Sign in' widthButton={"270px"} />
                            </div>
                        <p className='newMember'>New to Marketooze? <span onClick={() => navigate('/signUp')} className='join'>Join now</span></p>
                    </div>
                </div>
        </>
    )
}

export default Login;
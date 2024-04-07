import './Login.css'
import { IoLockClosedOutline } from 'react-icons/io5'
import { CgProfile } from 'react-icons/cg'
import Button from '../Button/Button'
import { FaEyeSlash } from 'react-icons/fa'
import { FaEye } from 'react-icons/fa'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { userLogin } from '../../services/Authentication/authAction.jsx'
import ClipLoader from 'react-spinners/ClipLoader'
import { useEffect } from 'react'
import { getAllCategory } from '../../services/Category/CategoryActions.jsx'
import { resetVerifcationState, sendOtpForgotPassword } from '../../services/Verification/VerifyAction.jsx'
import OTP from '../OTP/OTP.jsx'
import OtpForgotPassword from '../OtpForgotPassword/OtpForgotPassword.jsx'
const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getAllCategory())
  }, [])
  const [secure, setSecure] = useState(true)
  const [sendOtp,setSendOtp]=useState(false)
  const [showScreen,setShowScreen]=useState("signin")
  const [credential, setCredential] = useState({ email: '', password: '' })
  const handleChange = (e, fieldName) => {
    setCredential((prevState) => ({
      ...prevState,
      [fieldName]: e.target.value,
    }))
  }
  const verifyStateError = useSelector((state) => state.verify.error);
   
  const login = async() => {
    await dispatch(userLogin(credential))
  }
  useEffect(()=>{
    if (!verifyStateError && sendOtp){
      setShowScreen("otp")
    }
  }, [ verifyStateError,sendOtp])
  const forgotPassword = async() => {
    await dispatch(resetVerifcationState())
    if (credential.email.length < 1) {
      toast.error("*email field is required")
    }
    else {
      await dispatch(sendOtpForgotPassword(credential.email))
      setSendOtp(true)
    }
  }
  const authState = useSelector((state) => state)
  const { user, error, isLoginSuccess, loading } = authState.auth
  useEffect(() => {
    if (isLoginSuccess) {
      navigate('/')
      toast.success('Login Successfull')
    } else {
      navigate('')
    }
  }, [user, error, isLoginSuccess, loading])
  return (
    <>
      <div className='loginPage w-[screen]   min-h-[74vh]   '>
        {showScreen == "signin" && (<div className='loginCard '>
          <div className='LoginHead'>
            {' '}
            <p>Sign in</p>
          </div>
          {error && <p className='invalid'>*Invalid email or password</p>}
          {verifyStateError && <p className='invalid'>*User doesn't exist</p>}
          {loading && (
            <div className='loader'>
              <ClipLoader
                color={'#52ab98'}
                loading={loading}
                size={25}
                aria-label='Loading Spinner'
                data-testid='loader'
              />
            </div>
          )}
          <div className='inputContainer'>
            <p className='label'>Email</p>
            <div className='inputField'>
              <CgProfile color='#AEAEAE' size={18} />
              <input
                className='input'
                type='text'
                placeholder='Email'
                value={credential.email}
                onChange={(e) => handleChange(e, 'email')}
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
                value={credential.password}
                onChange={(e) => handleChange(e, 'password')}
              />
              <span onClick={() => setSecure(!secure)} className='eye'>
                {secure ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          {/* <p onClick={forgotPassword} className='forgot'>Forgot Password?</p> */}
          <div className='LoginButton'>
            <div onClick={login}>
              <Button title='Sign in' widthButton={'270px'} />
            </div>
          </div>
          <p className='newMember'>
            New to Fashionique?{' '}
            <span onClick={() => navigate('/signUp')} className='join'>
              Join now
            </span>
          </p>
        </div >
         )}
         {showScreen == "otp" && (<OtpForgotPassword email={credential.email} />)}
      </div>
    </>
  )
}

export default Login

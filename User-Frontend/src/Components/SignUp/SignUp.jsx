import './SignUp.css'
import { IoLockClosedOutline } from 'react-icons/io5'
import { CgProfile } from 'react-icons/cg'
import Button from '../Button/Button'
import { FaEyeSlash } from 'react-icons/fa'
import { FaEye } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ClipLoader from 'react-spinners/ClipLoader'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import OTP from '../OTP/OTP.jsx'
import { userRegister } from '../../services/Authentication/authAction.jsx'
const SignUp = () => {
  const dispatch = useDispatch()
  const [secure, setSecure] = useState(true)
  const [showOtp, setShowOtp] = useState(false)
  const [credential, setCredential] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
  })
  const handleChange = (e, fieldName) => {
    setCredential((prevState) => ({
      ...prevState,
      [fieldName]: e.target.value,
    }))
  }
  const authState = useSelector((state) => state)
  const { userInformation, error, isRegisterSuccess, loading } = authState.auth
  const [registrationFinished, setRegistrationFinished] = useState(false)
  const navigate = useNavigate()
  const register = async () => {
    try {
      if (
        credential.firstName.length < 1 &&
        credential.lastName.length < 1 &&
        credential.email.length < 1 &&
        credential.mobile.length < 1 &&
        credential.password.length < 1
      ) {
        toast.error('*All fields are required')
      } else if (credential.password.length < 8) {
        toast.error('Password must be 8 characters')
      } else {
        await dispatch(userRegister(credential))
        setRegistrationFinished(true)
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.')
    }
  }
  useEffect(() => {
    if (registrationFinished && !error) {
      setShowOtp(true)
    }
  }, [registrationFinished, error])
  return (
    <>
      <div className='signUpPage w-[screen]   min-h-[74vh]   '>
        {showOtp ? (
          <OTP email={credential.email} />
        ) : (
          <div className='signUpCard '>
            <div className='signUpHead'>
              {' '}
              <p>Sign up</p>
            </div>
            {error && <p className='invalid'>*Account already axist</p>}
            <div className='flex flex-col md:flex-row md:justify-between '>
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
              <div className=' inputContainer'>
                <p className='label'>First name</p>
                <div className='inputField'>
                  <input
                    className='inputName'
                    type='text'
                    placeholder='First name'
                    value={credential.firstName}
                    onChange={(e) => handleChange(e, 'firstName')}
                  />
                </div>
              </div>
              <div className='inputContainer'>
                <p className='label'>Last name</p>
                <div className='inputField'>
                  <input
                    className='inputName'
                    type='text'
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
                  type='text'
                  placeholder='Email'
                  value={credential.email}
                  onChange={(e) => handleChange(e, 'email')}
                />
              </div>
            </div>
            <div className='inputContainer'>
              <p className='label'>Phone</p>
              <div className='inputField'>
                <CgProfile color='#AEAEAE' size={18} />
                <input
                  className='input'
                  type='text'
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
                  placeholder='Password'
                  security={secure}
                  style={{ appearance: 'none' }}
                  value={credential.password}
                  onChange={(e) => handleChange(e, 'password')}
                />
                <span className='eye'>
                  {secure ? (
                    <FaEyeSlash onClick={() => setSecure(!secure)} />
                  ) : (
                    <FaEye onClick={() => setSecure(!secure)} />
                  )}
                </span>
              </div>
            </div>
            {/* <p className='forgot'>Forgot Password?</p> */}
            <div onClick={register} className='signUpButton'>
              <Button title='Sign up' widthButton={'100%'} />
            </div>
            <p onClick={() => navigate('/login')} className='Member'>
              Already a member? <span className='Login'>Login</span>
            </p>
          </div>
        )}
      </div>
    </>
  )
}

export default SignUp

import './SignUp.css'
import { IoLockClosedOutline } from 'react-icons/io5'
import { CgProfile } from 'react-icons/cg'
import Button from '../Button/Button'
import { FaEyeSlash } from 'react-icons/fa'
import { FaEye } from 'react-icons/fa'
import { useState } from 'react'
import Layout from '../../Layouts/Layout/Layout.js'
import { useNavigate } from 'react-router-dom'
const SignUp = () => {
  const [secure, setSecure] = useState(true)
  const navigate = useNavigate()
  return (
    <>
      <div className='signUpPage w-[screen]   min-h-[74vh]   '>
        <div className='signUpCard '>
          <div className='signUpHead'>
            {' '}
            <p>Sign up</p>
          </div>
          <div className='flex flex-col md:flex-row md:justify-between '>
            <div className=' inputContainer'>
              <p className='label'>First name</p>
              <div className='inputField'>
                <input
                  className='inputName'
                  type='text'
                  placeholder='First name'
                  // value={value}
                  // onChange={handleChange}
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
                  // value={value}
                  // onChange={handleChange}
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
                // value={value}
                // onChange={handleChange}
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
                placeholder='Phone'
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
                security={secure}
                style={{ appearance: 'none' }}
                // value={value}
                // onChange={handleChange}
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
          <p className='forgot'>Forgot Password?</p>
          <div className='signUpButton'>
            <Button title='Sign up' navigation={'/otp'} widthButton={'100%'} />
          </div>
          <p onClick={() => navigate('/login')} className='Member'>
            Already a member? <span className='Login'>Login</span>
          </p>
        </div>
      </div>
    </>
  )
}

export default SignUp

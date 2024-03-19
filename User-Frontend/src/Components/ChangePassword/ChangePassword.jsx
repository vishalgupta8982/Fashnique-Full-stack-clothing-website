import './ChangePassword.css'
import Button from '../Button/Button'
import { FaEyeSlash } from 'react-icons/fa'
import { FaEye } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { updatePassword } from '../../services/Authentication/authAction'
import ClipLoader from 'react-spinners/ClipLoader'
import { useNavigate } from 'react-router-dom'
const ChangePassword = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth)
  const { loading, isLoginSuccess, userInformation, error } = user
  const [passwords, setPasswords] = useState({ newPassword: '', currentPassword: '' })
  const [confirmPassword, setConfirmPassword] = useState('')
  const handleChange = (e, fieldName) => {
    setPasswords((prevState) => ({
      ...prevState,
      [fieldName]: e.target.value,
    }))
  }

  const update = async (event) => {
    navigate('?tab=Change%20Password')
    if (passwords.newPassword !== confirmPassword) {
      toast.error('New Password does not match')
    }
    // else if ((passwords.newPassword).length < 8) {
    //     toast.error("Password must have at least 8 characters");
    // }
    else {
      await dispatch(updatePassword(passwords))
    }
  }
  console.log(isLoginSuccess, error)
  useEffect(() => {
    if (isLoginSuccess) {
      toast.success('Password update successfully')
    } else if (error) {
      toast.error('Check Current Password')
    }
  }, [isLoginSuccess, error])

  const [showCurrPswrd, setShowCurrPswrd] = useState(true)
  const [showNewPswrd, setShowNewPswrd] = useState(true)
  const [showCnfNewPswrd, setShowCnfNewPNew] = useState(true)
  return (
    <>
      <div className='changePassword w-[screen]   min-h-[73vh]   '>
        <div className='chngPswwrdCard '>
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
          <div className='cpHead'>
            {' '}
            <p>Change Password</p>
          </div>
          <div className='inputContainer'>
            <p className='label'>Current Password</p>
            <div className='inputCp'>
              <input
                onChange={(e) => handleChange(e, 'currentPassword')}
                value={passwords.currentPassword}
                className='outline-none'
                type={showCurrPswrd ? 'password' : 'text'}
                placeholder='Current Password'
                id=''
              />
              <span onClick={() => setShowCurrPswrd(!showCurrPswrd)} className='eye'>
                {showCurrPswrd ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div className='inputContainer'>
            <p className='label'>New Password</p>
            <div className='inputCp'>
              <input
                onChange={(e) => handleChange(e, 'newPassword')}
                value={passwords.newPassword}
                className='outline-none'
                type={showNewPswrd ? 'password' : 'text'}
                placeholder='Current Password'
                id=''
              />
              <span onClick={() => setShowNewPswrd(!showNewPswrd)} className='eye'>
                {showNewPswrd ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div className='mb-3 inputContainer'>
            <p className='label'>Confirm New Password</p>
            <div className='inputCp'>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                className='outline-none'
                type={showCnfNewPswrd ? 'password' : 'text'}
                placeholder='Current Password'
                id=''
              />
              <span onClick={() => setShowCnfNewPNew(!showCnfNewPswrd)} className='eye'>
                {showCnfNewPswrd ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div onClick={update}>
            <Button title={'Update Password'} />
          </div>
        </div>
      </div>
    </>
  )
}

export default ChangePassword

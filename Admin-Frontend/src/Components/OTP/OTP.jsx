import './OTP.css'
import Button from '../Button/Button'
import { useNavigate } from 'react-router-dom'
import OTPInput from 'react-otp-input'
import { useEffect, useRef, useState } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import {useDispatch,useSelector} from "react-redux"
import { toast } from 'react-toastify'
import { verifyOtp } from '../../Services/User/UserAction'
const OTP = ({email}) => {
  const navigate = useNavigate()
  const dispatch=useDispatch()
  const [otp, setOtp] = useState('')
  const [otpVerification,setOtpVerification]=useState(false)
  const verifyOTP = async() => {
    await dispatch(verifyOtp(otp,email))
setOtpVerification(true)
  }
  const verifyState = useSelector((state) => state.user.isVerified)
   const loading=useSelector((state)=>state.user.loading)
  useEffect(() => {
    if (verifyState === "Account verified successfully." && otpVerification) {
      toast.success("Account verified successfully");
      navigate('/');
    }
  }, [verifyState, otpVerification]);
  return (
    <>
      <div className="otpPage w-[screen]  min-h-[100vh]   ">
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
        <div className="otpCard ">
          <div className="otpHead">
            {' '}
            <p>Verify with otp</p>
          </div>
          <p className="sentto">sent to {email}</p>
          <div className="otp">
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span></span>}
              renderInput={(props) => <input {...props} />}
              inputStyle={{
                textAlign: 'center',
                height: '40px',
                textAlign: 'center',
                border: '1px solid var(--primary)',
                backgroundColor: 'white',
                margin: '0px 15px',
                fontSize: '18px',
                width: '40px',
              }}
            />
          </div>
          <div onClick={verifyOTP} className="LoginButton">
            <Button   title="Verify" widthButton={'270px'} />
          </div>
          <p onClick={() => navigate('/signUp')} className="newMember">
            Not recieved your code? <span className="join">Resend</span>
          </p>
        </div>
      </div>{' '}
    </>
  )
}
export default OTP

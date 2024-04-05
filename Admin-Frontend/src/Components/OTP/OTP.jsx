import './OTP.css'
import Button from '../Button/Button'
import { useNavigate } from 'react-router-dom'
import OTPInput from 'react-otp-input'
import { useEffect, useRef, useState } from 'react'
import {useDispatch,useSelector} from "react-redux"
import { toast } from 'react-toastify'
const OTP = ({email}) => {
  const navigate = useNavigate()
  const dispatch=useDispatch()
  const [otp, setOtp] = useState('')
  const verifyOTP=()=>{
    dispatch(verifyOTP(otp,email))
  }
  const verifyState=useSelector((state)=>state.user.verify)
  useEffect(()=>{
    if (verifyState.message == "Account verified successfully."){
      toast.success('Register Successfull')
    }
    else{
      toast.error('Incorrect OTP')
    }
  },[dispatch])
  return (
    <>
      <div className="otpPage w-[screen]  min-h-[100vh]   ">
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
              numInputs={4}
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
          <div className="LoginButton">
            <Button onClick={verifyOTP} title="Verify" widthButton={'270px'} />
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

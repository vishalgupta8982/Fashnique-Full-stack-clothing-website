import './OTP.css'
import Button from '../Button/Button'
import { useNavigate } from 'react-router-dom'
import OTPInput from 'react-otp-input'
import { useRef, useState } from 'react'
const OTP = () => {
  const navigate = useNavigate()
  const [otp, setOtp] = useState('')
  console.log(otp)
  return (
    <>
      <div className="otpPage w-[screen]  min-h-[100vh]   ">
        <div className="otpCard ">
          <div className="otpHead">
            {' '}
            <p>Verify with otp</p>
          </div>
          <p className="sentto">sent to vg980514@gmail.com</p>
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
            <Button title="Verify" widthButton={'270px'} />
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

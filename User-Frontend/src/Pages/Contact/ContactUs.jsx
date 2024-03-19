import { useState, useEffect } from 'react'
import './Contact.css'
import contactImg from '../../assets/images/contact.png'
import Button from '../../Components/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { resetUserDetail, userDetail } from '../../services/Authentication/authAction'
import { toast } from 'react-toastify'
import { postEnq } from '../../services/Enquiry/EnquiryAction'
import ClipLoader from 'react-spinners/ClipLoader'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
const ContactUs = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    if (Cookies.get('fashioniqueUserToken')) {
      dispatch(userDetail())
    }
  }, [])
  const user = useSelector((state) => state.auth)
  const { loading, userInformation } = user
  const enquirySuccess = useSelector((state) => state.enquiry.isSuccess)
  const [enqDetail, setEnqDetail] = useState({ name: '', email: '', mobile: '', comment: '' })
  useEffect(() => {
    if (!loading && userInformation) {
      setEnqDetail({
        name: userInformation?.firstName + ' ' + userInformation?.lastName,
        email: userInformation?.email,
        mobile: userInformation?.mobile,
        comment: '',
      })
    }
    if (enquirySuccess) {
      if (enquirySuccess) {
        toast.success('Submitted Successfully')
      }
    }
  }, [userInformation, loading, enquirySuccess])

  const submit = async () => {
    if (!Cookies.get('token')) {
      toast.error('Please login to submit comment')
      navigate('/login')
    } else if (enqDetail.comment === '') {
      toast.error('Required comment field')
    } else {
      try {
        await dispatch(postEnq(enqDetail))
      } catch (error) {
        toast.error('Submission failed. Please try again later.')
      }
    }
  }

  return (
    <>
      <div className='contactPage min-h-[73vh]'>
        <div className='ContactContainer md:flex-row flex-col-reverse md:w-[90vw]'>
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
          <div className='md:w-1/2 contactInputsContainer'>
            <p className='getInTouch'>GET IN TOUCH WITH US</p>
            <p className='feelFree'>
              Feel free to contact us and we will get back to you as soon as it possible
            </p>
            <input
              value={enqDetail.name}
              className='contactInput'
              type='text'
              readOnly={true}
              placeholder='Name'
            />

            <input
              className='contactInput'
              value={enqDetail.email}
              readOnly={true}
              type='text'
              placeholder='Email'
            />
            <input
              className='contactInput'
              value={enqDetail.mobile}
              readOnly={true}
              type='text'
              placeholder='Mobile'
            />
            <textarea
              className='contactInput'
              onChange={(e) => setEnqDetail({ ...enqDetail, comment: e.target.value })}
              value={enqDetail.comment}
              name='message'
              rows='4'
              placeholder='message'
            />
            <div onClick={submit}>
              <Button title={'Submit'} widthButton={'98%'} />
            </div>
          </div>
          <div data-aos='zoom-in' data-aos-duration='500' className='md:w-1/2 contactImgContainer'>
            <img className='contactImg md:w-[80%]' src={contactImg} alt='' />
          </div>
        </div>
      </div>
    </>
  )
}
export default ContactUs

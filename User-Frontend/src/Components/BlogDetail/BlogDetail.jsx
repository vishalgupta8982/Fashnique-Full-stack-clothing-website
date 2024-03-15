import { BiCategory } from 'react-icons/bi'
import './BlogDetail.css'
import { CiUser } from 'react-icons/ci'
import { CiCalendarDate } from 'react-icons/ci'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { BiDislike } from 'react-icons/bi'
import { BiLike } from 'react-icons/bi'
import { BiSolidDislike } from 'react-icons/bi'
import { BiSolidLike } from 'react-icons/bi'
import { dislikeBlog, getaBlog, likeBlog, resetBlogState } from '../../services/Blogs/BlogAction'
import { useDispatch, useSelector } from 'react-redux'
import ClipLoader from 'react-spinners/ClipLoader'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { userDetail } from '../../services/Authentication/authAction'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie';
const BlogDetail = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const getBlogId = location.pathname.split('/')[2]
  const ablogState = useSelector((state) => state.blog)
  const { loading, aBlog, isSuccess } = ablogState
  const handleLikeDisLike = async (id, action) => {
    if (!Cookies.get('token')){
      toast.error("Please login to like/dislike blog");
      navigate('/login')
    }
       if (action == 'like') {
      await dispatch(likeBlog(id))
      dispatch(getaBlog(getBlogId))
    } else {
      await dispatch(dislikeBlog(id))
      dispatch(getaBlog(getBlogId))
    }
  }
  useEffect(() => {
    dispatch(userDetail())
    dispatch(resetBlogState())
    dispatch(getaBlog(getBlogId))
    window.scrollTo(0, 0)
  }, [])
  const user = useSelector((state) => state.auth)
  const {  userInformation } = user
  return (
    <>
      <div className='blogDetailPage'>
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
        <div className='blogdetailContainer w-[100vw] md:w-[70vw]'>
          <p className='blogName'>{aBlog?.title}</p>
          <div className=' blogDetailNameAndDate'>
            <p className=' blogDetailDate'>
              <CiCalendarDate size={16} />
              &nbsp; {moment(aBlog?.createdAt).format('DD MMM YYYY')}
            </p>
            <span className='borderBetween'>|</span>
            <p className=' blogDetailName'>
              <CiUser size={16} />
              &nbsp; {aBlog?.author}
            </p>{' '}
            <span className='borderBetween'>|</span>
            <p className=' blogDetailName'>
              <BiCategory size={16} />
              &nbsp; {aBlog?.category}
            </p>{' '}
            {/* <span className="borderBetween">|</span>
              <p className=" blogDetailName">
                <FaRegEye size={16} />
                &nbsp; {aBlog?.numViews}&nbsp;Views
              </p>{" "} */}
          </div>
          <div className=' blogDetailNameAndDate'>
            <div>
              <p className=' blogDetailDate'>
                {aBlog?.likes.some((user) => user._id === userInformation?._id) ? (
                  <span
                    className='cursor-pointer'
                    onClick={() => {
                      handleLikeDisLike(aBlog._id, 'like')
                    }}
                  >
                    {' '}
                    <BiSolidLike color={'#52ab98'} size={18} />
                  </span>
                ) : (
                  <span
                    className='cursor-pointer'
                    onClick={() => {
                      handleLikeDisLike(aBlog._id, 'like')
                    }}
                  >
                    {' '}
                    <BiLike padding='5px' size={18} />
                  </span>
                )}
                &nbsp; {aBlog?.likes.length}
              </p>
            </div>
            <span className='borderBetween'>|</span>
            <div>
              <p className=' blogDetailDate'>
                {aBlog?.disLikes.some((user) => user._id === userInformation._id) ? (
                  <span
                    className='cursor-pointer'
                    onClick={() => {
                      handleLikeDisLike(aBlog._id, 'dislike')
                    }}
                  >
                    {' '}
                    <BiSolidDislike padding='5px' color={'#FF6008'} size={18} />
                  </span>
                ) : (
                  <span
                    className='cursor-pointer'
                    onClick={() => {
                      handleLikeDisLike(aBlog._id, 'dislike')
                    }}
                  >
                    {' '}
                    <BiDislike padding='5px' size={18} />
                  </span>
                )}
                &nbsp; {aBlog?.disLikes.length}
              </p>
            </div>
          </div>
          <img
            className='blogDetailImg'
            src={
              aBlog?.images[0]?.url ||
              'https://res.cloudinary.com/dytlgwywf/image/upload/v1709644422/tlbnraoyd03bekjtyuzk.jpg'
            }
            alt=''
          />
          <p className='text-justify' dangerouslySetInnerHTML={{ __html: aBlog?.description }}></p>
        </div>
      </div>
    </>
  )
}
export default BlogDetail

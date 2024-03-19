import Button from '../Button/Button'
import './BlogCard.css'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
const BlogCard = ({ data }) => {
  const navigate = useNavigate()
  return (
    <>
      <div onClick={() => navigate(`/blogDetail/${data._id}`)} className=' blogCard'>
        <div className='blogCards md:mb-2 mb-1  md:hover:duration-[0.3s] md:hover:translate-y-[-3px] md:hover:scale-[1.01]'>
          <img
            src={
              data.images[0]?.url ||
              'https://res.cloudinary.com/dytlgwywf/image/upload/v1709644422/tlbnraoyd03bekjtyuzk.jpg'
            }
            alt=''
            className=' blogCardImg'
          />
          <div className=' blogCardContent'>
            <p className='blogDate'>{moment(data.createdAt).format('DD MMM YYYY')}</p>
            <p className='blogHead'>{data.title.slice(0, 16)}...</p>
            <p
              className='blogContent'
              dangerouslySetInnerHTML={{
                __html: data?.description ? `${data.description.slice(0, 35)}...` : '',
              }}
            ></p>
          </div>
          <Button widthButton={'100px'} title='Read More' />
        </div>
      </div>
    </>
  )
}
export default BlogCard

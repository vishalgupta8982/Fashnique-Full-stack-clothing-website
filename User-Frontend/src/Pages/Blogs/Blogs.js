import './Blogs.css'
import { useSelector, useDispatch } from 'react-redux'
import BlogCard from '../../Components/BlogCard.js/BlogCard'
import { getBlog } from '../../services/Blogs/BlogAction'
import { useEffect } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
const Blogs = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBlog())
  }, [])
  const blog = useSelector((state) => state.blog)
  const { isSuccess, loading, Blog } = blog
  return (
    <>
      <div className='grid justify-between grid-cols-2 mx-1 gap-x-1 md:gap-x-2   md:grid-cols-5 min-h-[50vh] md:mt-2'>
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
        {Blog && Blog.map((item) => <BlogCard data={item} />)}
      </div>
    </>
  )
}
export default Blogs

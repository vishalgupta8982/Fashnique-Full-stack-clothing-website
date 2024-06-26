import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LandingPage from './LandingPage/LandingPages'
import Services from './ourservice/Services'
import BlogCard from '../../Components/BlogCard.js/BlogCard'
import './Homepage.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Pagination, Navigation } from 'swiper/modules'
import ProductCard from '../../Components/ProductCard/ProductCard'
import TopDeals from '../../Components/TopDeals/TopDeals'
import { useEffect } from 'react'
import { getBlog } from '../../services/Blogs/BlogAction'
import { getAllProduct, getProduct } from '../../services/Products/ProductsActions'
import ClipLoader from 'react-spinners/ClipLoader'
import { getCart } from '../../services/Cart/CartAction'
const Homepage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCart())
    dispatch(getBlog())
    dispatch(getAllProduct())
  }, [])
  const blog = useSelector((state) => state.blog)
  const product = useSelector((state) => state.product.Product)
  const { loading, Blog } = blog
  const [swiperRef, setSwiperRef] = useState(null)
  return (
    <>
      <LandingPage />
      <Services />
      {product.data && (
        <section className='homeContainer'>
          <p className='pl-1 text-center md:text-left blogMainHead '>Top deals</p>
          <Swiper
            onSwiper={setSwiperRef}
            centeredSlides={true}
            centeredSlidesBounds={true}
            style={{
              '--swiper-navigation-color': 'red',
              '--swiper-navigation-size': '25px',
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              480: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
              1300: {
                slidesPerView: 5,
              },
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className='mySwiper '
          >
            {product.data &&
              product.data.product.map(
                (item) =>
                  item.tags.length > 0 && (
                    <SwiperSlide key={item._id}>
                      <ProductCard data={item} />
                    </SwiperSlide>
                  ),
              )}
          </Swiper>
        </section>
      )}
      {loading && (
        <div className='flex justify-center'>
          <ClipLoader
            color={'#52ab98'}
            loading={loading}
            size={25}
            aria-label='Loading Spinner'
            data-testid='loader'
          />
        </div>
      )}
      {product.data && (
        <section className='homeContainer '>
          <p className='pl-1 text-center md:text-left blogMainHead '>Popular Product</p>
          <Swiper
            onSwiper={setSwiperRef}
            centeredSlides={true}
            centeredSlidesBounds={true}
            style={{
              '--swiper-navigation-color': 'red',
              '--swiper-navigation-size': '25px',
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              480: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
              1300: {
                slidesPerView: 5,
              },
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className='mySwiper '
          >
            {product.data &&
              product.data.product.slice(0, 10).map((item) => (
                <SwiperSlide>
                  <ProductCard data={item} />
                </SwiperSlide>
              ))}
          </Swiper>
        </section>
      )}
      {Blog && (
        <section className='homeContainer '>
          <p className='pl-1 text-center md:text-left blogMainHead '>Marketooze Blogs</p>
          <Swiper
            onSwiper={setSwiperRef}
            centeredSlides={true}
            centeredSlidesBounds={true}
            style={{
              '--swiper-navigation-color': 'red',
              '--swiper-navigation-size': '25px',
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              480: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
              1300: {
                slidesPerView: 5,
              },
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className='mySwiper '
          >
            {Blog &&
              Blog.slice(0, 8).map((item) => (
                <SwiperSlide>
                  <BlogCard data={item} />
                </SwiperSlide>
              ))}
          </Swiper>
        </section>
      )}
    </>
  )
}

export default Homepage

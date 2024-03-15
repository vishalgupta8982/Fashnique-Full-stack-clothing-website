import './ProductDetail.css'
import { FaRegHeart } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import ReactStars from 'react-rating-stars-component'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FaIndianRupeeSign } from 'react-icons/fa6'
import { Pagination, Navigation } from 'swiper/modules'
import Button from '../Button/Button.jsx'
import { CgShoppingCart } from 'react-icons/cg'
import { IoIosShareAlt } from 'react-icons/io'
import { RWebShare } from 'react-web-share'
import { useParams } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../ProductCard/ProductCard.jsx'
import { addProductInWishlist, getProductById } from '../../services/Products/ProductsActions.jsx'
import ClipLoader from 'react-spinners/ClipLoader'
import { userDetail } from '../../services/Authentication/authAction.jsx'
import { addToCartProduct, getCart } from '../../services/Cart/CartAction.jsx'
const ProductDetail = () => {
  const dispatch = useDispatch()
  const [swiperRef, setSwiperRef] = useState(null)
  const { id } = useParams()
  const getProductId = id.split('=')[1]
  const getProductSlug = id.split('=')[0]
  useEffect(() => {
    dispatch(getProductById(getProductSlug))
    dispatch(userDetail())
  }, [getProductId])
  const product = useSelector((state) => state.product)
  const user = useSelector((state) => state.auth.userInformation)
  const cartLoading = useSelector((state) => state.cart.loading)
  const { aProduct, loading, isSuccess, Product } = product
  const [addToCartProductDetail, setAddToCartProductDetail] = useState({
    productId: getProductId,
    quantity: 1,
    color: '',
    size: '',
  })
  const [productImg, setProductImg] = useState()
  const addInWishlist = async (id) => {
    try {
      await dispatch(addProductInWishlist(id))
      await dispatch(userDetail())
      if (user && user.wishlist.find((item) => item == getProductId))
        toast.success('Remove from your wishlist')
      else {
        toast.success('Added to your wishlist')
      }
    } catch (error) {
      console.error('Error occurred while adding to wishlist:', error)
    }
  }

  const addToCart = async () => {
    if (!addToCartProductDetail.color) {
      toast.error('Choose color of product')
    } else if (!addToCartProductDetail.size) {
      toast.error('Choose size of product')
    } else {
      await dispatch(addToCartProduct(addToCartProductDetail))
      await dispatch(getCart())
      toast.success('Added to cart')
    }
  }
  return (
    <>
      <section className='pdTopSection w-[screen] md:flex-row flex-col justify-center items-start   '>
        {(loading || cartLoading) && (
          <div className='loader'>
            <ClipLoader
              color={'#52ab98'}
              loading={loading || cartLoading}
              size={25}
              aria-label='Loading Spinner'
              data-testid='loader'
            />
          </div>
        )}
        <div className='pdAllImgCont w-[100%] md:w-1/3'>
          <div className='pdImgCont md:p-5 '>
            <div onClick={() => addInWishlist(aProduct?._id)} className='icon'>
              {user && user.wishlist.find((item) => item == getProductId) ? (
                <FaHeart color='#FF6008' size={20} />
              ) : (
                <FaRegHeart size={20} />
              )}
            </div>
            <img
              src={productImg || (aProduct?.images?.length > 0 && aProduct?.images[0].url)}
              alt=''
              className='pdImg'
            />
          </div>
          <div className='pdSmallImgCont'>
            {aProduct?.images &&
              aProduct.images.map((item) => (
                <div
                  onClick={() => setProductImg(item.url)}
                  className={`pdSmallImgBorder ${productImg === item.url ? 'selected' : ''}`}
                >
                  <img
                    src={
                      item.url ||
                      'https://res.cloudinary.com/dytlgwywf/image/upload/v1709644422/tlbnraoyd03bekjtyuzk.jpg'
                    }
                    alt=''
                    className='pdSmallImg '
                  />
                </div>
              ))}
          </div>
        </div>
        <div className='w-[100%] mt-3 md:mt-0 md:w-1/2 pdDetailContainer md:ml-4'>
          <p className='pdName'>
            {aProduct?.title} | {aProduct?.category}{' '}
          </p>
          <div className='hidden pdAvailable md:flex md:flex-row'>
            <p>Available:</p>
            <p className='pdStock'>In Stock</p>
          </div>
          <div className='pdProductPrice'>
            <p className='flex items-center'>
              <FaIndianRupeeSign size={18} />
              {aProduct.price}
            </p>
          </div>
          <div className='pdRating'>
            <ReactStars
              edit={false}
              count={5}
              value={aProduct?.totalRatings}
              size={20}
              activeColor='#FFA534'
              isHalf={true}
            />
            <p>&nbsp;{aProduct.totalRatings}</p>
            <p className='pdNumRating'>&nbsp;{aProduct.ratings?.length} ratings</p>
          </div>

          <div className='pdSize'>
            <p className='pdSmallHead'>Select size:</p>
            <select
              className='pdItemDropDown'
              value={addToCartProductDetail.size}
              onChange={(e) =>
                setAddToCartProductDetail({
                  ...addToCartProductDetail,
                  size: e.target.value,
                })
              }
            >
              <option value=''>Select size</option>
              {aProduct?.size &&
                aProduct.size.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
            </select>
            <div className='flex flex-row ml-8'>
              <div className='pdAllColor'>
                <p className='pdSmallHead'>Select Colors:</p>
                {aProduct?.color &&
                  aProduct.color.map((item) => (
                    <div
                      onClick={(e) =>
                        setAddToCartProductDetail({
                          ...addToCartProductDetail,
                          color: item,
                        })
                      }
                      style={
                        addToCartProductDetail.color === item
                          ? { borderColor: item.split('-')[1] }
                          : { borderColor: '#fff' }
                      }
                      className='border-2 pdColorOuter'
                    >
                      <div
                        style={{ backgroundColor: item.split('-')[1] }}
                        className='pdColorDiv'
                      ></div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className='pdDescription'>
            <p className='pdSmallHead'>Description:</p>
            <p dangerouslySetInnerHTML={{ __html: aProduct.description }}></p>
          </div>
          <div className='hidden pdCartBuy md:flex md:flex-row md:items-center md:block'>
            {user && user.wishlist.find((item) => item == getProductId) ? (
              <Button widthButton={'150px'} icon={<FaHeart />} title={'Wishlisted'} />
            ) : (
              <div onClick={() => addInWishlist(aProduct?._id)}>
                <Button widthButton={'150px'} icon={<FaHeart />} title={'Wishlist'} />
              </div>
            )}
            <div onClick={addToCart}>
              <Button widthButton={'150px'} icon={<CgShoppingCart />} title={'Add to Cart'} />
            </div>
            <RWebShare
              data={{
                text: 'Fashion Fusion',
                url: window.location.href,
                title: 'Fashion Fusion',
              }}
            >
              <p className='pdShare'>
                Share
                <IoIosShareAlt />
              </p>
            </RWebShare>
          </div>
          <div className='fixed bottom-0 left-0 flex flex-row w-[100%] pdCartBuy md:hidden'>
            <p onClick={addToCart} className='w-1/2 pdbuttonCart'>
              Add to cart
            </p>
            <p className='w-1/2 pdbuttonBuy'>Buy Now</p>
          </div>
          <div className='pdSeller'>
            <p className='pdSmallHead'>
              Seller: <span className='sellerName'>Vishal</span>
            </p>
            <p>100% Original Products</p>
            <p> Pay on delivery might be available</p>
            <p> Easy 14 days returns and exchanges</p>
            <p> Try & Buy might be available</p>
          </div>
          <div className='pdSeller'>
            <p className='pdSmallHead'>Material and care: </p>
            <p>cotton</p>
            <p>washing machine</p>
          </div>
          <div className='flex flex-col items-center pdAvgRating md:hidden'>
            <p className='avgRating'>Average Rating</p>
            <p className='pdrating'>{aProduct.totalRatings}</p>
            <div className=''>
              <ReactStars
                edit={false}
                count={5}
                value={aProduct.totalRatings}
                size={20}
                activeColor='#FFA534'
                half={true}
              />
            </div>
            <p className=''>{aProduct.ratings?.length}</p>
          </div>
        </div>
      </section>
      <div className='flex flex-col bg-[#fff]'>
        {Product?.data?.product?.slice(0, 4).map(
          (item) =>
            item._id !== getProductId &&
            item.category == aProduct?.category && (
              <section className='homeContainer '>
                <p className='pl-1 text-center md:text-left blogMainHead '>You May Also Like </p>
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
                  <SwiperSlide>
                    <ProductCard data={item} />
                  </SwiperSlide>
                </Swiper>
              </section>
            ),
        )}
      </div>
    </>
  )
}
export default ProductDetail

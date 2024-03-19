import { useState, useEffect } from 'react'
import './AddToCart.css'
import { FaIndianRupeeSign } from 'react-icons/fa6'
import { HiMiniMinus } from 'react-icons/hi2'
import { IoAdd } from 'react-icons/io5'
import { MdDelete } from 'react-icons/md'
import { IoMdHeart } from 'react-icons/io'
import Button from '../Button/Button'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCartProduct, deleteProductFromCart, getCart } from '../../services/Cart/CartAction'
import { toast } from 'react-toastify'
import ClipLoader from 'react-spinners/ClipLoader'
import { addProductInWishlist } from '../../services/Products/ProductsActions'
import { getWishlist } from '../../services/Wishlist/WishlistAction'
import { applyCoupan, applyCoupanResetState } from '../../services/Coupan/CoupanAction'
import Cookies from 'js-cookie'

const AddToCart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    if (Cookies.get('fashioniqueUserToken')) {
      dispatch(applyCoupanResetState())
      dispatch(getCart())
      dispatch(getWishlist())
    }
  }, [])
  const [coupanCode, setCoupanCode] = useState('')
  const cart = useSelector((state) => state.cart)
  const wishlist = useSelector((state) => state.wishlist)
  const coupan = useSelector((state) => state.Coupan)
  const { loading: coupanLoading, cartPriceUsingCoupan, error, isSuccess: couponSuccess } = coupan
  const { loading: wishlistLoading, Wishlist, isSuccess: wishlistSuccess } = wishlist
  const { Cart, loading } = cart
  const increaseDecreaseQuantiy = async (value, product) => {
    const data = {
      productId: product.productId._id,
      quantity: value,
      color: product.color,
      size: product.size,
    }
    await dispatch(addToCartProduct(data))
    await dispatch(getCart())
  }
  const deleteProduct = async (id) => {
    await dispatch(deleteProductFromCart(id))
    await dispatch(getCart())
    toast.success('Remove from cart')
  }
  const addToWishList = async (id) => {
    const isAlreadyInWishlist = Wishlist.wishlist.some((item) => item._id === id)
    if (isAlreadyInWishlist) {
      toast.success('Already in your wishlist')
    } else {
      await dispatch(addProductInWishlist(id))
      toast.success('Added to your wishlist')
      await dispatch(getWishlist())
    }
  }
  const apply = (coupan) => {
    dispatch(applyCoupanResetState())
    dispatch(applyCoupan(coupan))
  }
  return (
    <>
      <div className='flex w-[screen] min-h-[60vh]'>
        {(loading || coupanLoading) && (
          <div className='loader'>
            <ClipLoader
              color={'#52ab98'}
              loading={loading || coupanLoading}
              size={25}
              aria-label='Loading Spinner'
              data-testid='loader'
            />
          </div>
        )}
        {Cart?.products?.length > 0 ? (
          <div className='flex flex-col AddToCartPage md:flex-row w-[100%]'>
            <section className=' md:w-2/3 cartContainer'>
              <p className='cartHead'>Cart</p>
              {Cart.products.map((item) => (
                <div className='cartItemContainer'>
                  <div className='cartProductImgContainer'>
                    <img className='cartProductImg' src={item.productId.images[0]?.url} alt='' />
                  </div>
                  <div className=' cartProductDetail'>
                    <div className='flex cartItemNamePrice'>
                      <p
                        onClick={() => navigate(`/productDetail/${item.productId.slug}`)}
                        className='cartItemName'
                      >
                        {item.productId.title.length > 20
                          ? `${item.productId.title.slice(0, 30)}...`
                          : item.productId.title.slice(0, 30)}
                        | {item.productId.brand}
                      </p>
                      <div className='flex flex-row items-center'>
                        <p className=' cartItemPrice'>
                          <FaIndianRupeeSign />{' '}
                          {Math.floor(
                            item.productId.price * item.quantity -
                              (item.productId.price * item.quantity * item.productId.discount) /
                                100,
                          )}
                        </p>
                        <p className=' cartBeforePrice'>
                          <span>{item.productId.price}</span>
                        </p>{' '}
                        <p className='cartDiscount'>
                          <span>{item.productId.discount}% off</span>
                        </p>
                      </div>
                    </div>
                    <p className='showStock'>In Stock</p>
                    <div className='flex flex-row items-center'>
                      <p className='size'>Size: {item.size} &nbsp; </p>
                      <p className='flex flex-row items-center size'>
                        Color:&nbsp;
                        <div
                          style={{ backgroundColor: item.color.split('-')[1] }}
                          className='pdColorDiv'
                        ></div>
                        &nbsp;{item.color.split('-')[0]}
                      </p>
                    </div>
                    <div className='flex-col colorQuantityCart md:flex-row'>
                      <div className='flex text-left'>
                        <div className='cartItemQuantity'>
                          <span
                            onClick={() => {
                              if (item.quantity > 1) {
                                increaseDecreaseQuantiy(-1, item)
                              }
                            }}
                          >
                            <HiMiniMinus
                              className={`  ${item.quantity < 2 ? 'decQuantity' : 'redIcon'}`}
                            />
                          </span>
                          <span className='cartItemQuantityValue'>{item.quantity}</span>{' '}
                          <span onClick={() => increaseDecreaseQuantiy(1, item)}>
                            <IoAdd className='greenIcon' />
                          </span>
                        </div>
                      </div>
                      <div className='flex flex-row items-center mt-2 md:ml-auto md:mt-0'>
                        <div onClick={() => addToWishList(item.productId._id)} className='save'>
                          <IoMdHeart className='mr-1 greenIcon' />
                          Move to wishlist{' '}
                        </div>
                        <div onClick={() => deleteProduct(item._id)} className='delete'>
                          <MdDelete className='mr-1 redIcon' />
                          Delete
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>
            <section className='w-[100%] mt-4 md:mt-0 md:w-1/3 billContainer'>
              <div className='cartBillContainer md:ml-2'>
                <p className='cartDelivery'>Delivery Free</p>
                <p className='cartDeliveryDate'>
                  Delivery Date:{' '}
                  {new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB')}
                </p>
                <p className='mt-5'></p>
                {error && <p className='invalid'>Invalid Coupon</p>}
                {couponSuccess && <p className='valid'>Coupon applied</p>}
                <div className=' cartCoupan'>
                  <input
                    value={coupanCode}
                    onChange={(e) => setCoupanCode(e.target.value)}
                    className='cartPromoCode'
                    type='text'
                    placeholder='Enter coupon code'
                  />
                  <div onClick={() => apply(coupanCode)}>
                    <Button title={'Apply'} />
                  </div>
                </div>
                <div className=' cartPriceContainer'>
                  <div className='totalContainer'>
                    <p className='subTotal'>Subtotal</p>
                    <p className=' subTotal'>
                      <FaIndianRupeeSign size={14} />
                      {Cart.totalPrice}
                    </p>
                  </div>
                  <div className='totalContainer'>
                    <p className='smallHeadPrice'>Discount</p>
                    <p className='smallHeadPrice'>
                      -<FaIndianRupeeSign size={12} />
                      {cartPriceUsingCoupan ? Cart.totalPrice - cartPriceUsingCoupan : 0}
                    </p>
                  </div>
                  <div className='totalContainer'>
                    <p className='smallHeadPrice'>Delivery</p>
                    <p className='smallHeadPrice'> Free</p>
                  </div>
                </div>
                <div className='totalContainer'>
                  <p className='subTotal'>Total Amount</p>
                  <p className=' subTotal'>Rs. {cartPriceUsingCoupan || Cart.totalPrice}</p>
                </div>
                <div className='proceedToCheckOut'>
                  <Button
                    widthButton={'100%'}
                    navigation={'/checkout'}
                    title={'Proceed to checkout'}
                  />
                  <p onClick={() => navigate('/store')} className='continueShop'>
                    Continue Shopping
                  </p>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div className='emptyCartImg'>
            <img
              className='emptycartImg'
              src='https://res.cloudinary.com/dytlgwywf/image/upload/v1710181332/djyjxsphr874hu1od7xg.png'
              alt='emptyCart'
            />
            <p className='emptyText'>Your cart is empty</p>
            <div className='flex justify-center'>
              {Cookies.get('fashioniqueUserToken') ? (
                <Button navigation={'/store'} title={'Shop Now'} />
              ) : (
                <Button navigation={'/login'} title={'Login'} />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
export default AddToCart

import React, { useEffect } from 'react'
import './MyOrder.css'
import { useDispatch, useSelector } from 'react-redux'
import { getOrder } from '../../services/Order/OrderAction'
import { FaIndianRupeeSign } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import { userDetail } from '../../services/Authentication/authAction'
import { postRating } from '../../services/Rating/RatingAction'
import { useState } from 'react'
import { toast } from 'react-toastify'
function MyOrder() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [star, setStar] = useState(0)
  const [prodId, setProdId] = useState('')
 
  useEffect(() => {
    dispatch(getOrder())
    dispatch(userDetail())
  }, [])
  const user = useSelector((state) => state.auth)
  const { userInformation } = user
  const orderState = useSelector((state) => state.order)
  const { Order } = orderState
 
  useEffect(() => {
    const fetchData = async () => {
      if (star !== 0) {
        await dispatch(postRating({ prodId: prodId, star: star }))
        toast.success(`Thank you for feedback`)
        await dispatch(getOrder())
      }
    }
    fetchData()
  }, [star])
  return (
    <div className='myOrderBox'>
      {Order &&
        Order.map((item) =>
          item.products.map((product) => (
            <div className='orderBox'>
              <img className='myOrderImage' src={product.product?.images[0]?.url} alt='' />
              <div className='orderProductDetail'>
                <div className='w-[40%]'>
                  <p
                    onClick={() => navigate(`/order-detail/${item._id}-${product._id}`)}
                    className='orderProductName '
                  >
                    {product.product?.brand} {product.product?.title}{' '}
                  </p>
                  <p className='orderProductColor'>
                    Color:{product.color?.split('-')[0]}&nbsp;&nbsp;Size:{product.size}
                    &nbsp;&nbsp;Quantity:{product.count}{' '}
                  </p>
                  {!product?.product?.ratings || product.product.ratings.length === 0 ? (
                    <ReactStars
                      edit={true}
                      count={5}
                      value={star}
                      onChange={(newValue) => {
                        setStar(newValue)
                        setProdId(product.product._id)
                      }}
                      size={20}
                      activeColor='#FFA534'
                      isHalf={true}
                    />
                  ) : (
                    product.product.ratings.map((item) =>
                      item.postedBy !== userInformation?._id ? (
                        <ReactStars
                          edit={true}
                          count={5}
                          value={star}
                          onChange={(newValue) => {
                            setStar(newValue)
                            setProdId(product.product._id)
                          }}
                          size={20}
                          activeColor='#FFA534'
                          isHalf={true}
                        />
                      ) : (
                        <ReactStars
                          edit={false}
                          count={5}
                          value={item.star}
                          size={20}
                          activeColor='#FFA534'
                          isHalf={true}
                        />
                      ),
                    )
                  )}
                </div>
                <p className='flex flex-row items-center text-center w-[20%] justify-center'>
                  <FaIndianRupeeSign size={14} />
                  {Math.floor(
                    product.product.price * product.count -
                      (product.product.price * product.count * product.product.discount) / 100,
                  )}
                </p>
                {item.orderStatus === 'Cancelled' ? (
                  <p className='orderStatusCancel'>{item.orderStatus}</p>
                ) : (
                  <p className='orderStatus'>{item.orderStatus}</p>
                )}
              </div>
            </div>
          )),
        )}
      {Order.length < 1 && (
        <div className='notOrderImgCont'>
          <img
            className='notOrderImg'
            src='https://myntraweb.blob.core.windows.net/selfserveui/assets/images/cards@3x.png'
            alt='firstOrder'
          />
          <p className='noOrderText'>You haven't placed any order yet!</p>
        </div>
      )}
    </div>
  )
}

export default MyOrder

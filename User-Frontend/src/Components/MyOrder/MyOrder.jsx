import React, { useEffect } from 'react'
import './MyOrder.css'
import { useDispatch, useSelector } from 'react-redux'
import { getOrder } from '../../services/Order/OrderAction'
import { FaIndianRupeeSign } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
function MyOrder() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getOrder())
  }, [])
  const orderState = useSelector((state) => state.order)
  const { Order } = orderState
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
                    Color:{product.color?.split('-')[0]}&nbsp;&nbsp;Size:{product.size}&nbsp;&nbsp;Quantity:{product.count}{' '}
                  </p>
                </div>
                <p className='flex flex-row items-center text-center w-[20%] justify-center'>
                  <FaIndianRupeeSign size={14} />
                  {Math.floor((product.product.price*product.count) - (product.product.price *product.count* product.product.discount / 100))}
                </p>
                {item.orderStatus === "Cancelled" ? (<p className='orderStatusCancel'>{item.orderStatus}</p>) : (<p className='orderStatus'>{item.orderStatus}</p>)}
              </div>
            </div>
          )),
        )}
      {Order.length<1  && (
        <div className='notOrderImgCont'>
          <img className='notOrderImg' src='https://myntraweb.blob.core.windows.net/selfserveui/assets/images/cards@3x.png' alt='firstOrder' />
          <p className='noOrderText'>You haven't placed any order yet!
          </p>
        </div>
      )}
    </div>
  )
}

export default MyOrder

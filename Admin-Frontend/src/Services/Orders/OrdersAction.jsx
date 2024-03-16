import { baseUrl } from '../../Utils/baseUrl'
import axios from 'axios'
import { config } from '../../Utils/axiosConfig'
export const GetOrdersRqst = () => ({
  type: 'GET_ORDER_REQUEST',
})

export const GetOrdersSuccess = (Order) => ({
  type: 'GET_ORDER_SUCCESS',
  payload: { Order },
})

export const GetOrdersFailure = (error) => ({
  type: 'GET_ORDER_FAILURE',
  payload: error,
})
export const GetOrdersByUserIdRqst = () => ({
  type: 'GET_ORDER_BY_USER_ID_REQUEST',
})

export const GetOrdersByUserIdSuccess = (Order) => ({
  type: 'GET_ORDER_BY_USER_ID_SUCCESS',
  payload: { Order },
})

export const GetOrdersByUserIdFailure = (error) => ({
  type: 'GET_ORDER_BY_USER_ID_FAILURE',
  payload: error,
})
export const UpdateOrdersRqst = () => ({
  type: 'UPDATE_ORDER_REQUEST',
})

export const UpdateOrdersSuccess = () => ({
  type: 'UPDATE_ORDER_SUCCESS',
   
})

export const UpdateOrdersFailure = (error) => ({
  type: 'UPDATE_ORDER_FAILURE',
  payload: error,
})
export const resetOrdersState = () => ({
  type: 'RESET_ORDER_STATE',
})

export const getOrder = () => async (dispatch) => {
  dispatch(GetOrdersRqst())
  try {
    const response = await axios.get(`${baseUrl}/user/get-all-order`)
console.log(response.data)
    if (response) {
      await dispatch(GetOrdersSuccess(response.data))
    }
  } catch (err) {
    dispatch(GetOrdersFailure(err.response.data))
    return err.response.data
  }
}
export const getOrderByUserId = (id) => async (dispatch) => {
  dispatch(GetOrdersByUserIdRqst())
  try {
    const response = await axios.get(
      `${baseUrl}/user/getorderbyorderid/${id}`,
      config,
    )
    if (response) {
      await dispatch(GetOrdersByUserIdSuccess(response.data.products))
    }
  } catch (err) {
    dispatch(GetOrdersByUserIdFailure(err.response.data))
    console.log(err.response.data)
    return err.response.data
  }
}
export const updateOrderStatus = (status,id) => async (dispatch) => {
  dispatch(UpdateOrdersRqst())
  try {
    const response = await axios.put(`${baseUrl}/user/order/update-order/${id}`,{status},config)
console.log(response)
    if (response) {
      await dispatch(UpdateOrdersSuccess(response.data))
    }
  } catch (err) {
    dispatch(UpdateOrdersFailure(err.response.data))
    return err.response.data
  }
}
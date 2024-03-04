import { baseUrl } from '../../Utils/baseUrl'
import axios from 'axios'
import { config } from '../../Utils/axiosConfig'
export const GetCustomerRqst = () => ({
  type: 'GET_CUSTOMER_REQUEST',
})

export const GetCustomerSuccess = (Customer) => ({
  type: 'GET_CUSTOMER_SUCCESS',
  payload: { Customer },
})

export const GetCustomerFailure = (error) => ({
  type: 'GET_CUSTOMER_FAILURE',
  payload: error,
})

export const resetCustomerState = () => ({
  type: 'RESET_CUSTOMER_STATE',
})

export const getCustomer = () => async (dispatch) => {
  dispatch(GetCustomerRqst())
  try {
    const response = await axios.get(`${baseUrl}/user/all-users`)
    if (response) {
      await dispatch(GetCustomerSuccess(response.data))
    }
  } catch (err) {
    dispatch(GetCustomerFailure(err.response.data))
    return err.response.data
  }
}

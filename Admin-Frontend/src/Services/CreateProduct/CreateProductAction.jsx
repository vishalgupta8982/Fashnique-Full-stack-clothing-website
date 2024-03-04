import { baseUrl } from '../../Utils/baseUrl'
import axios from 'axios'
import { config } from '../../Utils/axiosConfig'

export const AddProductRqst = () => ({
  type: 'ADD_PRODUCT_REQUEST',
})

export const AddProductSuccess = (product) => ({
  type: 'ADD_PRODUCT_SUCCESS',
  payload: product,
})

export const AddProductFailure = (error) => ({
  type: 'ADD_PRODUCT_FAILURE',
  payload: error,
})

export const GetProductRqst = () => ({
  type: 'GET_PRODUCT_REQUEST',
})

export const GetProductSuccess = (Product) => ({
  type: 'GET_PRODUCT_SUCCESS',
  payload: { Product },
})
export const GetProductFailure = (error) => ({
  type: 'GET_PRODUCT_FAILURE',
  payload: error,
})
export const DeleteProductRqst = () => ({
  type: 'DELETE_PRODUCT_REQUEST',
})

export const DeleteProductSuccess = (Category) => ({
  type: 'DELETE_PRODUCT_SUCCESS',
})

export const DeleteProductFailure = (error) => ({
  type: 'DELETE_PRODUCT_FAILURE',
  payload: error,
})
export const GetaProductRqst = () => ({
  type: 'GETA_PRODUCT_REQUEST',
})

export const GetaProductSuccess = (Product) => ({
  type: 'GETA_PRODUCT_SUCCESS',
  payload: { Product },
})

export const GetaProductFailure = (error) => ({
  type: 'GETA_PRODUCT_FAILURE',
  payload: error,
})
export const updateProductRqst = () => ({
  type: 'UPDATE_PRODUCT_REQUEST',
})

export const updateProductSuccess = () => ({
  type: 'UPDATE_PRODUCT_SUCCESS',
})

export const updateProductFailure = (error) => ({
  type: 'UPDATE_PRODUCT_FAILURE',
  payload: error,
})

export const resetProductState = () => ({
  type: 'RESET_PRODUCT_STATE',
})
export const addProduct = (product) => async (dispatch) => {
  dispatch(AddProductRqst())
  try {
    const response = await axios.post(`${baseUrl}/product/`, product, config)
    if (response) {
      await dispatch(AddProductSuccess(response.data))
      setTimeout(() => {
        dispatch(resetProductState())
      }, 1000)
    }
  } catch (err) {
    dispatch(AddProductFailure(err.response.data))
    setTimeout(() => {
      dispatch(resetProductState())
    }, 1000)
    return err.response.data
  }
}

export const getProduct = () => async (dispatch) => {
  dispatch(GetProductRqst())
  try {
    const response = await axios.get(`${baseUrl}/product`, config)
    if (response) {
      await dispatch(GetProductSuccess(response.data))
    }
  } catch (err) {
    dispatch(GetProductFailure(err.response.data))
    return err.response.data
  }
}

export const deleteProduct = (id) => async (dispatch) => {
  dispatch(DeleteProductRqst())
  try {
    const response = await axios.delete(`${baseUrl}/product/${id}`, config)
    if (response) {
      await dispatch(DeleteProductSuccess(response.data))
      setTimeout(() => {
        dispatch(resetProductState())
      }, 1000)
    }
  } catch (err) {
    dispatch(DeleteProductFailure(err.response.data))
    setTimeout(() => {
      dispatch(resetProductState())
    }, 1000)
    return err.response.data
  }
}

export const getaProduct = (id) => async (dispatch) => {
  console.log(id, config)
  dispatch(GetaProductRqst(1))
  try {
    const response = await axios.get(`${baseUrl}/product/${id}`, config)
    console.log(response.data)
    if (response) {
      await dispatch(GetaProductSuccess(response.data))
    }
  } catch (err) {
    dispatch(GetaProductFailure(err.response.data))
    return err.response.data
  }
}

export const updateProduct = (id, product) => async (dispatch) => {
  dispatch(updateProductRqst())
  try {
    const response = await axios.put(
      `${baseUrl}/product/${id}`,
      product,
      config,
    )
    if (response) {
      await dispatch(updateProductSuccess(response.data))
      setTimeout(() => {
        dispatch(resetProductState())
      }, 1000)
    }
  } catch (err) {
    dispatch(updateProductFailure(err.response.data))
    setTimeout(() => {
      dispatch(resetProductState())
    }, 1000)
    return err.response.data
  }
}

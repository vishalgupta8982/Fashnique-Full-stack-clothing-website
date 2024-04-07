import { baseUrl } from '../../Utils/baseUrl'
import axios from 'axios'
import { config } from '../../Utils/axiosConfig'

export const AddCoupanRqst = () => ({
  type: 'ADD_COUPAN_REQUEST',
})

export const AddCoupanSuccess = (Coupan) => ({
  type: 'ADD_COUPAN_SUCCESS',
  payload: Coupan,
})

export const AddCoupanFailure = (error) => ({
  type: 'ADD_COUPAN_FAILURE',
  payload: error,
})

export const GetCoupanRqst = () => ({
  type: 'GET_COUPAN_REQUEST',
})

export const GetCoupanSuccess = (Coupan) => ({
  type: 'GET_COUPAN_SUCCESS',
  payload: { Coupan },
})

export const GetCoupanFailure = (error) => ({
  type: 'GET_COUPAN_FAILURE',
  payload: error,
})
export const DeleteCoupanRqst = () => ({
  type: 'DELETE_COUPAN_REQUEST',
})

export const DeleteCoupanSuccess = (Category) => ({
  type: 'DELETE_COUPAN_SUCCESS',
})

export const DeleteCoupanFailure = (error) => ({
  type: 'DELETE_COUPAN_FAILURE',
  payload: error,
})
export const GetaCoupanRqst = () => ({
  type: 'GETA_COUPAN_REQUEST',
})

export const GetaCoupanSuccess = (Coupan) => ({
  type: 'GETA_COUPAN_SUCCESS',
  payload: { Coupan },
})

export const GetaCoupanFailure = (error) => ({
  type: 'GETA_COUPAN_FAILURE',
  payload: error,
})
export const updateCoupanRqst = () => ({
  type: 'UPDATE_COUPAN_REQUEST',
})

export const updateCoupanSuccess = (Coupan) => ({
  type: 'UPDATE_COUPAN_SUCCESS',
  payload: { Coupan },
})

export const updateCoupanFailure = (error) => ({
  type: 'UPDATE_COUPAN_FAILURE',
  payload: error,
})

export const resetCoupanState = () => ({
  type: 'RESET_COUPAN_STATE',
})
export const addCoupan = (coupan) => async (dispatch) => {
  dispatch(AddCoupanRqst())
  try {
    const response = await axios.post(`${baseUrl}/coupan`, coupan, config())
    if (response) {
      await dispatch(AddCoupanSuccess(response.data))
      setTimeout(() => {
        dispatch(resetCoupanState())
      }, 1000)
    }
  } catch (err) {
    dispatch(AddCoupanFailure(err.response.data))
    setTimeout(() => {
      dispatch(resetCoupanState())
    }, 1000)
    return err.response.data
  }
}

export const getCoupan = () => async (dispatch) => {
  dispatch(GetCoupanRqst())
  try {
    const response = await axios.get(`${baseUrl}/coupan`, config())
    if (response) {
      await dispatch(GetCoupanSuccess(response.data))
    }
  } catch (err) {
    dispatch(GetCoupanFailure(err.response.data))
    return err.response.data
  }
}

export const deleteCoupan = (id) => async (dispatch) => {
  dispatch(DeleteCoupanRqst())
  try {
    const response = await axios.delete(`${baseUrl}/coupan/${id}`, config())
    if (response) {
      await dispatch(DeleteCoupanSuccess(response.data))
      setTimeout(() => {
        dispatch(resetCoupanState())
      }, 1000)
    }
  } catch (err) {
    dispatch(DeleteCoupanFailure(err.response.data))
    setTimeout(() => {
      dispatch(resetCoupanState())
    }, 1000)
    return err.response.data
  }
}

export const getaCoupan = (id) => async (dispatch) => {
  dispatch(GetaCoupanRqst())
  try {
    const response = await axios.get(`${baseUrl}/coupan/${id}`, config())
    if (response) {
      await dispatch(GetaCoupanSuccess(response.data))
    }
  } catch (err) {
    dispatch(GetaCoupanFailure(err.response.data))
    return err.response.data
  }
}

export const updateCoupan = (id, coupan) => async (dispatch) => {
  dispatch(updateCoupanRqst())
  try {
    const response = await axios.put(
      `${baseUrl}/coupan/${id}`,
      coupan,
      config(),
    )
    if (response) {
      await dispatch(updateCoupanSuccess(response.data))
      setTimeout(() => {
        dispatch(resetCoupanState())
      }, 1000)
    }
  } catch (err) {
    dispatch(updateCoupanFailure(err.response.data))
    setTimeout(() => {
      dispatch(resetCoupanState())
    }, 1000)
    return err.response.data
  }
}

import { baseUrl } from '../../Utils/baseUrl'
import axios from 'axios'
import { config } from '../../Utils/axiosConfig'

export const AddColorRqst = () => ({
  type: 'ADD_COLOR_REQUEST',
})

export const AddColorSuccess = (Color) => ({
  type: 'ADD_COLOR_SUCCESS',
  payload: Color,
})

export const AddColorFailure = (error) => ({
  type: 'ADD_COLOR_FAILURE',
  payload: error,
})

export const GetColorRqst = () => ({
  type: 'GET_COLOR_REQUEST',
})

export const GetColorSuccess = (Color) => ({
  type: 'GET_COLOR_SUCCESS',
  payload: { Color },
})

export const GetColorFailure = (error) => ({
  type: 'GET_COLOR_FAILURE',
  payload: error,
})
export const DeleteColorRqst = () => ({
  type: 'DELETE_COLOR_REQUEST',
})

export const DeleteColorSuccess = (Category) => ({
  type: 'DELETE_COLOR_SUCCESS',
})

export const DeleteColorFailure = (error) => ({
  type: 'DELETE_COLOR_FAILURE',
  payload: error,
})
export const GetaColorRqst = () => ({
  type: 'GETA_COLOR_REQUEST',
})

export const GetaColorSuccess = (Color) => ({
  type: 'GETA_COLOR_SUCCESS',
  payload: { Color },
})

export const GetaColorFailure = (error) => ({
  type: 'GETA_COLOR_FAILURE',
  payload: error,
})
export const updateColorRqst = () => ({
  type: 'UPDATE_COLOR_REQUEST',
})

export const updateColorSuccess = (productCategory) => ({
  type: 'UPDATE_COLOR_SUCCESS',
  payload: { productCategory },
})

export const updateColorFailure = (error) => ({
  type: 'UPDATE_COLOR_FAILURE',
  payload: error,
})

export const resetColorState = () => ({
  type: 'RESET_COLOR_STATE',
})

export const addColor = (title) => async (dispatch) => {
  dispatch(AddColorRqst())
  try {
    const response = await axios.post(`${baseUrl}/color`, { title }, config())
    if (response) {
      await dispatch(AddColorSuccess(response.data))
      setTimeout(() => {
        dispatch(resetColorState())
      }, 1000)
    }
  } catch (err) {
    dispatch(AddColorFailure(err.response.data))
    setTimeout(() => {
      dispatch(resetColorState())
    }, 1000)
    return err.response.data
  }
}

export const getColor = () => async (dispatch) => {
  dispatch(GetColorRqst())
  try {
    const response = await axios.get(`${baseUrl}/color`)
    if (response) {
      await dispatch(GetColorSuccess(response.data))
    }
  } catch (err) {
    dispatch(GetColorFailure(err.response.data))
    return err.response.data
  }
}

export const deleteColor = (id) => async (dispatch) => {
  dispatch(DeleteColorRqst())
  console.log(id)
  try {
    const response = await axios.delete(`${baseUrl}/color/${id}`, config())
    if (response) {
      await dispatch(DeleteColorSuccess(response.data))
      setTimeout(() => {
        dispatch(resetColorState())
      }, 1000)
    }
  } catch (err) {
    dispatch(DeleteColorFailure(err.response.data))
    setTimeout(() => {
      dispatch(resetColorState())
    }, 1000)
    return err.response.data
  }
}

export const getaColor = (id) => async (dispatch) => {
  dispatch(GetaColorRqst())
  try {
    const response = await axios.get(`${baseUrl}/color/${id}`, config())

    if (response) {
      await dispatch(GetaColorSuccess(response.data))
    }
  } catch (err) {
    dispatch(GetaColorFailure(err.response.data))
    return err.response.data
  }
}

export const updateColor = (id, title) => async (dispatch) => {
  dispatch(updateColorRqst())
  try {
    const response = await axios.put(
      `${baseUrl}/color/${id}`,
      { title },
      config(),
    )
    if (response) {
      await dispatch(updateColorSuccess(response.data))
      setTimeout(() => {
        dispatch(resetColorState())
      }, 1000)
    }
  } catch (err) {
    dispatch(updateColorFailure(err.response.data))
    setTimeout(() => {
      dispatch(resetColorState())
    }, 1000)
    return err.response.data
  }
}

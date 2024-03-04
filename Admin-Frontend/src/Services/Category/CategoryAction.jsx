import { baseUrl } from '../../Utils/baseUrl'
import axios from 'axios'
import { config } from '../../Utils/axiosConfig'

export const AddCategoryRqst = () => ({
  type: 'ADD_CATEGORY_REQUEST',
})

export const AddCategorySuccess = (Category) => ({
  type: 'ADD_CATEGORY_SUCCESS',
  payload: Category,
})

export const AddCategoryFailure = (error) => ({
  type: 'ADD_CATEGORY_FAILURE',
  payload: error,
})

export const GetCategoryRqst = () => ({
  type: 'GET_CATEGORY_REQUEST',
})

export const GetCategorySuccess = (productCategory) => ({
  type: 'GET_CATEGORY_SUCCESS',
  payload: { productCategory },
})

export const GetCategoryFailure = (error) => ({
  type: 'GET_CATEGORY_FAILURE',
  payload: error,
})
export const DeleteCategoryRqst = () => ({
  type: 'DELETE_CATEGORY_REQUEST',
})

export const DeleteCategorySuccess = (Category) => ({
  type: 'DELETE_CATEGORY_SUCCESS',
})

export const DeleteCategoryFailure = (error) => ({
  type: 'DELETE_CATEGORY_FAILURE',
  payload: error,
})
export const GetaCategoryRqst = () => ({
  type: 'GETA_CATEGORY_REQUEST',
})

export const GetaCategorySuccess = (productCategory) => ({
  type: 'GETA_CATEGORY_SUCCESS',
  payload: { productCategory },
})

export const GetaCategoryFailure = (error) => ({
  type: 'GETA_CATEGORY_FAILURE',
  payload: error,
})
export const updateCategoryRqst = () => ({
  type: 'UPDATE_CATEGORY_REQUEST',
})

export const updateCategorySuccess = (productCategory) => ({
  type: 'UPDATE_CATEGORY_SUCCESS',
  payload: { productCategory },
})

export const updateCategoryFailure = (error) => ({
  type: 'UPDATE_CATEGORY_FAILURE',
  payload: error,
})

export const resetCategoryState = () => ({
  type: 'RESET_CATEGORY_STATE',
})

export const addCategory = (title) => async (dispatch) => {
  console.log(title)
  dispatch(AddCategoryRqst())
  try {
    const response = await axios.post(
      `${baseUrl}/productCategory`,
      { title },
      config,
    )
    if (response) {
      await dispatch(AddCategorySuccess(response.data))
      setTimeout(() => {
        dispatch(resetCategoryState())
      }, 1000)
    }
  } catch (err) {
    dispatch(AddCategoryFailure(err.response.data))
    setTimeout(() => {
      dispatch(resetCategoryState())
    }, 1000)
    return err.response.data
  }
}

export const getCategory = () => async (dispatch) => {
  dispatch(GetCategoryRqst())
  try {
    const response = await axios.get(`${baseUrl}/productCategory`)
    if (response) {
      await dispatch(GetCategorySuccess(response.data))
    }
  } catch (err) {
    dispatch(GetCategoryFailure(err.response.data))
    return err.response.data
  }
}

export const deleteCategory = (id) => async (dispatch) => {
  dispatch(DeleteCategoryRqst())
  try {
    const response = await axios.delete(
      `${baseUrl}/productCategory/${id}`,
      config,
    )
    if (response) {
      await dispatch(DeleteCategorySuccess(response.data))
      setTimeout(() => {
        dispatch(resetCategoryState())
      }, 1000)
    }
  } catch (err) {
    dispatch(DeleteCategoryFailure(err.response.data))
    setTimeout(() => {
      dispatch(resetCategoryState())
    }, 1000)
    return err.response.data
  }
}

export const getaCategory = (id) => async (dispatch) => {
  dispatch(GetaCategoryRqst())
  try {
    const response = await axios.get(`${baseUrl}/productCategory/${id}`, config)
    if (response) {
      await dispatch(GetaCategorySuccess(response.data))
    }
  } catch (err) {
    dispatch(GetaCategoryFailure(err.response.data))
    return err.response.data
  }
}

export const updateCategory = (id, title) => async (dispatch) => {
  dispatch(updateCategoryRqst())
  try {
    const response = await axios.put(
      `${baseUrl}/productCategory/${id}`,
      { title },
      config,
    )
    if (response) {
      await dispatch(updateCategorySuccess(response.data))
      setTimeout(() => {
        dispatch(resetCategoryState())
      }, 1000)
    }
  } catch (err) {
    dispatch(updateCategoryFailure(err.response.data))
    setTimeout(() => {
      dispatch(resetCategoryState())
    }, 1000)
    return err.response.data
  }
}

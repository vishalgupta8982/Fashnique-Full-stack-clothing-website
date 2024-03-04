import { baseUrl } from '../../Utils/baseUrl'
import axios from 'axios'
import { config } from '../../Utils/axiosConfig'

export const AddBlogCategoryRqst = () => ({
  type: 'ADD_BLOG_CATEGORY_REQUEST',
})

export const AddBlogCategorySuccess = (Category) => ({
  type: 'ADD_BLOG_CATEGORY_SUCCESS',
  payload: Category,
})

export const AddBlogCategoryFailure = (error) => ({
  type: 'ADD_BLOG_CATEGORY_FAILURE',
  payload: error,
})

export const GetBlogCategoryRqst = () => ({
  type: 'GET_BLOG_CATEGORY_REQUEST',
})

export const GetBlogCategorySuccess = (Category) => ({
  type: 'GET_BLOG_CATEGORY_SUCCESS',
  payload: { Category },
})

export const GetBlogCategoryFailure = (error) => ({
  type: 'GET_BLOG_CATEGORY_FAILURE',
  payload: error,
})
export const DeleteBlogCategoryRqst = () => ({
  type: 'DELETE_BLOG_CATEGORY_REQUEST',
})

export const DeleteBlogCategorySuccess = (Category) => ({
  type: 'DELETE_BLOG_CATEGORY_SUCCESS',
})

export const DeleteBlogCategoryFailure = (error) => ({
  type: 'DELETE_BLOG_CATEGORY_FAILURE',
  payload: error,
})
export const GetaBlogCategoryRqst = () => ({
  type: 'GETA_BLOG_CATEGORY_REQUEST',
})

export const GetaBlogCategorySuccess = (Category) => ({
  type: 'GETA_BLOG_CATEGORY_SUCCESS',
  payload: { Category },
})

export const GetaBlogCategoryFailure = (error) => ({
  type: 'GETA_BLOG_CATEGORY_FAILURE',
  payload: error,
})
export const updateBlogCategoryRqst = () => ({
  type: 'UPDATE_BLOG_CATEGORY_REQUEST',
})

export const updateBlogCategorySuccess = (Category) => ({
  type: 'UPDATE_BLOG_CATEGORY_SUCCESS',
  payload: { Category },
})

export const updateBlogCategoryFailure = (error) => ({
  type: 'UPDATE_BLOG_CATEGORY_FAILURE',
  payload: error,
})

export const resetBlogCategoryState = () => ({
  type: 'RESET_BLOG_CATEGORY_STATE',
})

export const addBlogCat = (title) => async (dispatch) => {
  dispatch(AddBlogCategoryRqst())
  try {
    const response = await axios.post(`${baseUrl}/blogCategory`, { title },config)
    if (response) {
      await dispatch(AddBlogCategorySuccess(response.data))
      setTimeout(() => {
        dispatch(resetBlogCategoryState())
      }, 1000)
    }
  } catch (err) {
    console.log(err.response.data)
    dispatch(AddBlogCategoryFailure(err.response.data))
    setTimeout(() => {
      dispatch(resetBlogCategoryState())
    }, 1000)
    return err.response.data
  }
}

export const getBlogCat = () => async (dispatch) => {
  dispatch(GetBlogCategoryRqst())
  try {
    const response = await axios.get(`${baseUrl}/blogCategory`)
    if (response) {
      await dispatch(GetBlogCategorySuccess(response.data))
    }
  } catch (err) {
    dispatch(GetBlogCategoryFailure(err.response.data))
    setTimeout(() => {
      dispatch(resetBlogCategoryState())
    }, 1000)
    return err.response.data
  }
}

export const deleteBlogCat = (id) => async (dispatch) => {
  dispatch(DeleteBlogCategoryRqst())
  console.log(id)
  try {
    const response = await axios.delete(`${baseUrl}/blogCategory/${id}`, config)
    if (response) {
      await dispatch(DeleteBlogCategorySuccess(response.data))
      setTimeout(() => {
        dispatch(resetBlogCategoryState())
      }, 1000)
    }
  } catch (err) {
    dispatch(DeleteBlogCategoryFailure(err.response.data))
    setTimeout(() => {
      dispatch(resetBlogCategoryState())
    }, 1000)
    return err.response.data
  }
}

export const getaBlogCat = (id) => async (dispatch) => {
  dispatch(GetaBlogCategoryRqst())
  try {
    const response = await axios.get(`${baseUrl}/blogCategory/${id}`, config)
    if (response) {
      await dispatch(GetaBlogCategorySuccess(response.data))
      setTimeout(() => {
        dispatch(resetBlogCategoryState())
      }, 1000)
    
    }
  } catch (err) {
    dispatch(GetaBlogCategoryFailure(err.response.data))
    return err.response.data
  }
}

export const updateBlogCat = (id, title) => async (dispatch) => {
  dispatch(updateBlogCategoryRqst())
  try {
    const response = await axios.put(
      `${baseUrl}/blogCategory/${id}`,
      { title },
      config,
    )
    if (response) {
      await dispatch(updateBlogCategorySuccess(response.data))
      setTimeout(() => {
        dispatch(resetBlogCategoryState())
      }, 1000)
    }
  } catch (err) {
    dispatch(updateBlogCategoryFailure(err.response.data))
     setTimeout(() => {
        dispatch(resetBlogCategoryState())
      }, 1000)
    return err.response.data
  }
}

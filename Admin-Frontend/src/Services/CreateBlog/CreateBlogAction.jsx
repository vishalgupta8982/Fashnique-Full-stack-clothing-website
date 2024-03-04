import { baseUrl } from '../../Utils/baseUrl'
import axios from 'axios'
import { config } from '../../Utils/axiosConfig'

export const AddBlogRqst = () => ({
  type: 'ADD_BLOG_REQUEST',
})

export const AddBlogSuccess = (Blog) => ({
  type: 'ADD_BLOG_SUCCESS',
  payload: Blog,
})

export const AddBlogFailure = (error) => ({
  type: 'ADD_BLOG_FAILURE',
  payload: error,
})

export const GetBlogRqst = () => ({
  type: 'GET_BLOG_REQUEST',
})

export const GetBlogSuccess = (Blog) => ({
  type: 'GET_BLOG_SUCCESS',
  payload: { Blog },
})
export const GetBlogFailure = (error) => ({
  type: 'GET_BLOG_FAILURE',
  payload: error,
})
export const DeleteBlogRqst = () => ({
  type: 'DELETE_BLOG_REQUEST',
})

export const DeleteBlogSuccess = (Category) => ({
  type: 'DELETE_BLOG_SUCCESS',
})

export const DeleteBlogFailure = (error) => ({
  type: 'DELETE_BLOG_FAILURE',
  payload: error,
})
export const GetaBlogRqst = () => ({
  type: 'GETA_BLOG_REQUEST',
})

export const GetaBlogSuccess = (Blog) => ({
  type: 'GETA_BLOG_SUCCESS',
  payload: { Blog },
})

export const GetaBlogFailure = (error) => ({
  type: 'GETA_BLOG_FAILURE',
  payload: error,
})
export const updateBlogRqst = () => ({
  type: 'UPDATE_BLOG_REQUEST',
})

export const updateBlogSuccess = () => ({
  type: 'UPDATE_BLOG_SUCCESS',
})

export const updateBlogFailure = (error) => ({
  type: 'UPDATE_BLOG_FAILURE',
  payload: error,
})

export const resetBlogState = () => ({
  type: 'RESET_BLOG_STATE',
})
export const addBlog = (blog) => async (dispatch) => {
  dispatch(AddBlogRqst())
  try {
    const response = await axios.post(`${baseUrl}/blog/`, blog, config)
    if (response) {
      await dispatch(AddBlogSuccess(response.data))
      setTimeout(() => {
        dispatch(resetBlogState())
      }, 1000)
    }
  } catch (err) {
    dispatch(AddBlogFailure(err.response.data))
    setTimeout(() => {
      dispatch(resetBlogState())
    }, 1000)
    console.log(err.response.data)
    return err.response.data
  }
}

export const getBlog = () => async (dispatch) => {
  dispatch(GetBlogRqst())
  try {
    const response = await axios.get(`${baseUrl}/blog`, config)
    if (response) {
      await dispatch(GetBlogSuccess(response.data))
    }
  } catch (err) {
    dispatch(GetBlogFailure(err.response.data))
    return err.response.data
  }
}

export const deleteBlog = (id) => async (dispatch) => {
  dispatch(DeleteBlogRqst())
  try {
    const response = await axios.delete(`${baseUrl}/blog/${id}`, config)
    if (response) {
      await dispatch(DeleteBlogSuccess(response.data))
      setTimeout(() => {
        dispatch(resetBlogState())
      }, 1000)
    }
  } catch (err) {
    dispatch(DeleteBlogFailure(err.response.data))
    setTimeout(() => {
      dispatch(resetBlogState())
    }, 1000)
    return err.response.data
  }
}

export const getaBlog = (id) => async (dispatch) => {
  dispatch(GetaBlogRqst())
  try {
    const response = await axios.get(`${baseUrl}/blog/${id}`, config)
    if (response) {
      await dispatch(GetaBlogSuccess(response.data))
    }
  } catch (err) {
    dispatch(GetaBlogFailure(err.response.data))
    return err.response.data
  }
}

export const updateBlog = (id, blog) => async (dispatch) => {
  dispatch(updateBlogRqst())
  try {
    const response = await axios.put(`${baseUrl}/blog/${id}`, blog, config)
    if (response) {
      await dispatch(updateBlogSuccess(response.data))
      setTimeout(() => {
        dispatch(resetBlogState())
      }, 1000)
    }
  } catch (err) {
    dispatch(updateBlogFailure(err.response.data))
    setTimeout(() => {
      dispatch(resetBlogState())
    }, 1000)
    return err.response.data
  }
}

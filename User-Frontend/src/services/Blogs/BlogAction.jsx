import { baseUrl } from '../../utils/baseUrl'
import axios from 'axios'
import { Config } from '../../utils/AxiosConfig'
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
export const likeBlogRqst = (Blog) => ({
  type: 'LIKE_BLOG_REQUEST',
})
export const likeBlogSuccess = (Blog) => ({
  type: 'LIKE_BLOG_SUCCESS',
})
export const likeBlogFailure = (error) => ({
  type: 'LIKE_BLOG_FAILURE',
  payload: error,
})
export const dislikeBlogRqst = (Blog) => ({
  type: 'DISLIKE_BLOG_REQUEST',
})
export const dislikeBlogSuccess = (Blog) => ({
  type: 'DISLIKE_BLOG_SUCCESS',
})
export const dislikeBlogFailure = (error) => ({
  type: 'DISLIKE_BLOG_FAILURE',
  payload: error,
})
export const resetBlogState = () => ({
  type: 'RESET_BLOG_STATE',
})

export const getBlog = () => async (dispatch) => {
  dispatch(GetBlogRqst())
  try {
    const response = await axios.get(`${baseUrl}/blog`, Config)
    if (response) {
      await dispatch(GetBlogSuccess(response.data))
    }
  } catch (err) {
    dispatch(GetBlogFailure(err.response.data))
    return err.response.data
  }
}

export const getaBlog = (id) => async (dispatch) => {
  dispatch(GetaBlogRqst())
  try {
    const response = await axios.get(`${baseUrl}/blog/${id}`, Config)
    if (response) {
      await dispatch(GetaBlogSuccess(response.data))
    }
  } catch (err) {
    dispatch(GetaBlogFailure(err.response.data))
    return err.response.data
  }
}

export const likeBlog = (blogId) => async (dispatch) => {
  dispatch(likeBlogRqst())
  try {
    const response = await axios.put(`${baseUrl}/blog/likes`, { blogId }, Config)
    if (response) {
      await dispatch(likeBlogSuccess())
    }
  } catch (err) {
    dispatch(likeBlogFailure(err.response.data))
    return err.response.data
  }
}

export const dislikeBlog = (blogId) => async (dispatch) => {
  dispatch(dislikeBlogRqst())
  try {
    const response = await axios.put(`${baseUrl}/blog/dislikes`, { blogId }, Config)
    if (response) {
      await dispatch(dislikeBlogSuccess())
    }
  } catch (err) {
    dispatch(dislikeBlogFailure(err.response.data))
    return err.response.data
  }
}

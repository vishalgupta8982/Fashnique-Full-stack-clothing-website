import { baseUrl } from '../../utils/baseUrl'
import axios from 'axios'
import { Config } from '../../utils/AxiosConfig'
export const postRatingRqst = () => ({
  type: 'POST_RATING_REQUEST',
})
export const postRatingSuccess = () => ({
  type: 'POST_RATING_SUCCESS',
})
export const postRatingFailure = (error) => ({
  type: 'POST_RATING_FAILURE',
  payload: error,
})
export const resetRatingState = () => ({
  type: 'RATING_RESET_STATE',
})

export const postRating = (data) => async (dispatch) => {
  console.log(data, 'dfsd')
  dispatch(postRatingRqst())
  try {
    const response = await axios.put(`${baseUrl}/product/rating`, data, Config())
    console.log(response.data)
    if (response) {
      await dispatch(postRatingSuccess(response.data))
      setTimeout(() => {
        dispatch(resetRatingState())
      }, 1000)
    }
  } catch (err) {
    console.log(err.reponse.data)
    dispatch(postRatingFailure(err.response.data))
    return err.response.data
  }
}

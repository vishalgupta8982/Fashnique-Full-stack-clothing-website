import { baseUrl } from '../../Utils/baseUrl'
import axios from 'axios'
import { config } from '../../Utils/axiosConfig'
export const GetEnquiriesRqst = () => ({
  type: 'GET_ENQUIRY_REQUEST',
})

export const GetEnquiriesSuccess = (Enquiry) => ({
  type: 'GET_ENQUIRY_SUCCESS',
  payload: { Enquiry },
})

export const GetEnquiriesFailure = (error) => ({
  type: 'GET_ENQUIRY_FAILURE',
  payload: error,
})
export const UpdateEnquiryRqst = () => ({
  type: 'UPDATE_ENQUIRY_REQUEST',
})

export const UpdateEnquirySuccess = () => ({
  type: 'UPDATE_ENQUIRY_SUCCESS',
})

export const UpdateEnquiryFailure = (error) => ({
  type: 'UPDATE_ENQUIRY_FAILURE',
  payload: error,
})
export const deleteEnquiryRqst = () => ({
  type: 'DELETE_ENQUIRY_REQUEST',
})

export const deleteEnquirySuccess = () => ({
  type: 'DELETE_ENQUIRY_SUCCESS',
})

export const deleteEnquiryFailure = (error) => ({
  type: 'DELETE_ENQUIRY_FAILURE',
  payload: error,
})

export const resetEnquiryState = () => ({
  type: 'RESET_ENQUIRY_STATE',
})

export const getEnquiry = () => async (dispatch) => {
  dispatch(GetEnquiriesRqst())
  try {
    const response = await axios.get(`${baseUrl}/enquiry/`)
    if (response) {
      await dispatch(GetEnquiriesSuccess(response.data))
    }
  } catch (err) {
    dispatch(GetEnquiriesFailure(err.response.data))
    return err.response.data
  }
}

export const deleteEnquiry = (id) => async (dispatch) => {
  dispatch(deleteEnquiryRqst())
  try {
    const response = await axios.delete(`${baseUrl}/enquiry/${id}`, config)
    if (response) {
      await dispatch(deleteEnquirySuccess())
      setTimeout(() => {
        dispatch(resetEnquiryState())
      }, 1000)
    }
  } catch (err) {
    dispatch(deleteEnquiryFailure(err.response.data))
    setTimeout(() => {
      dispatch(resetEnquiryState())
    }, 1000)
    return err.response.data
  }
}

export const updateEnquiry = (enquiry) => async (dispatch) => {
  dispatch(UpdateEnquiryRqst())
  try {
    const response = await axios.put(
      `${baseUrl}/enquiry/${enquiry.id}`,
      { status: enquiry.enqData },
      config,
    )
    if (response) {
      await dispatch(UpdateEnquirySuccess(response.data))
    }
  } catch (err) {
    dispatch(UpdateEnquiryFailure(err.response.data))
    setTimeout(() => {
      dispatch(resetEnquiryState())
    }, 1000)
    return err.response.data
  }
}

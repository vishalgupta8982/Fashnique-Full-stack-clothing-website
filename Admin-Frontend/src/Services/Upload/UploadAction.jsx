import { baseUrl } from '../../Utils/baseUrl'
import axios from 'axios'
import { config } from '../../Utils/axiosConfig'
export const UploadImageRqst = () => ({
  type: 'UPLOAD_IMAGE_REQUEST',
})

export const UploadImageSuccess = (Images) => ({
  type: 'UPLOAD_IMAGE_SUCCESS',
  payload: { Images },
})

export const UploadImageFailure = (error) => ({
  type: 'UPLOAD_IMAGE_FAILURE',
  payload: error,
})
export const deleteImageRqst = () => ({
  type: 'DELETE_IMAGE_REQUEST',
})

export const deleteImageSuccess = (err) => ({
  type: 'DELETE_IMAGE_SUCCESS',
  // payload:deleteId,
})

export const deleteImageFailure = (error) => ({
  type: 'DELETE_IMAGE_FAILURE',
  payload: error,
})

export const resetImageState = () => ({
  type: 'RESET_IMAGE_STATE',
})

export const uploadImage = (images) => async (dispatch) => {
  dispatch(UploadImageRqst())
  const formData = new FormData()
  for (let i = 0; i < images.length; i++) {
    formData.append(`images`, images[i])
  }
  console.log(formData)
  try {
    const response = await axios.post(
      `${baseUrl}/product/upload`,
      formData,
      config(),
    )
    if (response) {
      console.log(response.data)
      dispatch(UploadImageSuccess(response.data))
    }
  } catch (err) {
    console.log(err.response.data)
    dispatch(UploadImageFailure(err.response.data.message))
    return err.response.data
  }
}

export const deleteImage = (id) => async (dispatch) => {
  dispatch(deleteImageRqst())
  try {
    const response = await axios.delete(
      `${baseUrl}/product/deleteImages/${id}`,
      config(),
    )

    if (response) {
      console.log(response, 'fads')
      dispatch(deleteImageSuccess(response))
    }
  } catch (err) {
    console.log(err.response.data)
    dispatch(deleteImageFailure(err.response))
    return err.response.data
  }
}

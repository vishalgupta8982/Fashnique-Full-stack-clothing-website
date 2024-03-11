import { baseUrl } from '../../utils/baseUrl'
import axios from 'axios'
import { config } from '../../utils/AxiosConfig'
export const postEnqRqst = () => ({
    type: 'POST_ENQUIRY_REQUEST',
})
export const postEnqSuccess = (Blog) => ({
    type: 'POST_ENQUIRY_SUCCESS',
    payload: { Blog },
})
export const postEnqFailure = (error) => ({
    type: 'POST_ENQUIRY_FAILURE',
    payload: error,
})
export const resetEnqState = () => ({
    type: 'ENQUIRY_RESET_STATE',
})

export const postEnq = (enquiry) => async (dispatch) => {
    dispatch(postEnqRqst())
     console.log(enquiry)
    try {
        const response = await axios.post(`${baseUrl}/enquiry/`, enquiry, config)
        if (response) {
            await dispatch(postEnqSuccess(response.data))
            setTimeout(() => {
                dispatch(resetEnqState())
            }, 1000)
        }
    } catch (err) {
        console.log(err.reponse.data)
        dispatch(postEnqFailure(err.response.data))
        return err.response.data
    }
}

 
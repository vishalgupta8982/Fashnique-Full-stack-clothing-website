import { baseUrl } from '../../utils/baseUrl'
import axios from 'axios'
import { config } from '../../utils/AxiosConfig'
export const getColorRqst = () => ({
    type: 'GET_COLOR_REQUEST',
})
export const getColorSuccess = (color) => ({
    type: 'GET_COLOR_SUCCESS',
    payload: { color },
})
export const getColorFailure = (error) => ({
    type: 'GET_COLOR_FAILURE',
    payload: error,
})
export const resetColorState = () => ({
    type: 'COLOR_RESET_STATE',
})

export const getColor = () => async (dispatch) => {
    dispatch(getColorRqst())
    try {
        const response = await axios.get(`${baseUrl}/color/`, config)
        if (response) {
            await dispatch(getColorSuccess(response.data))
            setTimeout(() => {
                dispatch(resetColorState())
            }, 1000)
        }
    } catch (err) {
        console.log(err.reponse.data)
        dispatch(getColorFailure(err.response.data))
        return err.response.data
    }
}


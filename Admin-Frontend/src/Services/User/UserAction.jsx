import { baseUrl } from '../../Utils/baseUrl'
import axios from 'axios'
import { config } from '../../Utils/axiosConfig'
export const blockUserRqst = () => ({
    type: 'BLOCK_USER_REQUEST',
})
export const blockUserSuccess = (Enquiry) => ({
    type: 'BLOCK_USER_SUCCESS',
    payload: { Enquiry },
})

export const blockUserFailure = (error) => ({
    type: 'BLOCK_USER_FAILURE',
    payload: error,
})
export const unblockUserRqst = () => ({
    type: 'UNBLOCK_USER_REQUEST',
})

export const unblockUserSuccess = () => ({
    type: 'UNBLOCK_USER_SUCCESS',
})

export const unblockUserFailure = () => ({
    type: 'UNBLOCK_USER_FAILURE',
})

export const resetUserState = () => ({
    type: 'RESET_USER_STATE',
})

export const blockUser = (id) => async (dispatch) => {
    dispatch(blockUserRqst())
    try {
        const response = await axios.put(`${baseUrl}/user/block-user/${id}`,config())
        console.log(response)
        if (response) {
            await dispatch(blockUserSuccess(response.data))
        }
    } catch (err) {
        console.log(err.response.data)
        dispatch(blockUserFailure(err.response.data))
        return err.response.data
    }
}
export const unblockUser = (id) => async (dispatch) => {
    dispatch(unblockUserRqst())
    try {
        const response = await axios.put(`${baseUrl}/user/unblock-user/${id}`, config());
        if (response) {
            await dispatch(unblockUserSuccess())
            setTimeout(() => {
                dispatch(resetUserState())
            }, 1000)
        }
    } catch (err) {
        dispatch(unblockUserFailure(err.response.data))
        setTimeout(() => {
            dispatch(resetUserState())
        }, 1000)
        return err.response.data
    }
}
 
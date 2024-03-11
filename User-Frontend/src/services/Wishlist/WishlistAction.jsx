import { baseUrl } from '../../utils/baseUrl'
import axios from 'axios'
import { config } from '../../utils/AxiosConfig'
export const getWishlistRqst = () => ({
    type: 'GET_WISHLIST_REQUEST',
})
export const getWishlistSuccess = (wishlist) => ({
    type: 'GET_WISHLIST_SUCCESS',
    payload: { wishlist },
})
export const getWishlistFailure = (error) => ({
    type: 'GET_WISHLIST_FAILURE',
    payload: error,
})
export const resetWishlistState = () => ({
    type: 'WISHLIST_RESET_STATE',
})

export const getWishlist = () => async (dispatch) => {
    dispatch(getWishlistRqst())
    try {
        const response = await axios.get(`${baseUrl}/user/wishlist`,  config)
        console.log(response)
        if (response) {
            await dispatch(getWishlistSuccess(response.data))
            setTimeout(() => {
                dispatch(resetWishlistState())
            }, 1000)
        }
    } catch (err) {
        console.log(err.reponse.data)
        dispatch(getWishlistFailure(err.response.data))
        return err.response.data
    }
}


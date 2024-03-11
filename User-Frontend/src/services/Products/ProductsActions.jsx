import { baseUrl } from '../../utils/baseUrl'
import axios from 'axios'
import { config } from '../../utils/AxiosConfig'
export const getProductRqst = () => ({
    type: 'GET_PRODUCT_REQUEST',
})
export const getProductSuccess = (product) => ({
    type: 'GET_PRODUCT_SUCCESS',
    payload: { product },
})
export const getProductFailure = (error) => ({
    type: 'GET_PRODUCT_FAILURE',
    payload: error,
})
export const getProductByIdRqst = () => ({
    type: 'GET_PRODUCT_BY_ID_REQUEST',
})
export const getProductByIdSuccess = (product) => ({
    type: 'GET_PRODUCT_BY_ID_SUCCESS',
    payload: { product },
})
export const getProductByIdFailure = (error) => ({
    type: 'GET_PRODUCT_BY_ID_FAILURE',
    payload: error,
})
export const addProductInWishlistRqst = () => ({
    type: 'ADD_PRODUCT_IN_WISHLIST_REQUEST',
})
export const addProductInWishlistSuccess = (product) => ({
    type: 'ADD_PRODUCT_IN_WISHLIST_SUCCESS',
})
export const addProductInWishlistFailure = (error) => ({
    type: 'ADD_PRODUCT_IN_WISHLIST_FAILURE',
    payload: error,
})
export const resetProductState = () => ({
    type: 'PRODUCT_RESET_STATE',
})

export const getProduct = (filter) => async (dispatch) => {
    const filterParam = filter ? `?${filter}&limit=8` : '?sort=null?page=1&limit=8';
    console.log(filterParam)
    dispatch(getProductRqst())
    try {
            const response = await axios.get(`${baseUrl}/product${filterParam}`, config)
        
        if (response) {
            await dispatch(getProductSuccess(response.data))
            setTimeout(() => {
                dispatch(resetProductState())
            }, 1000)
            }
        
    } catch (err) {
        console.log(err.reponse.data)
        dispatch(getProductFailure(err.response.data))
        return err.response.data
    }
}
export const getProductById = (slug) => async (dispatch) => {
    dispatch(getProductByIdRqst())
    try {
        const response = await axios.get(`${baseUrl}/product/${slug}`, config)
        if (response) {
            await dispatch(getProductByIdSuccess(response.data))
            setTimeout(() => {
                dispatch(resetProductState())
            }, 1000)
        }
    } catch (err) {
        dispatch(getProductByIdFailure(err.response.data))
        return err.response.data
    }
}

export const addProductInWishlist = (prodId) => async (dispatch) => {
    dispatch(addProductInWishlistRqst())
    try {
        const response = await axios.put(`${baseUrl}/product/wishlist/`, {prodId}, config)
        if (response) {
            await dispatch(addProductInWishlistSuccess(response.data))
            setTimeout(() => {
                dispatch(resetProductState())
            }, 1000)
        }
    } catch (err) {
        console.log(err.reponse.data)
        dispatch(addProductInWishlistFailure(err.response.data))
        return err.response.data
    }
}


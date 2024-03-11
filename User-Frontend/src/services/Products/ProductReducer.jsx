const initialState = {
    loading: false,
    error: null,
    isSuccess: false,
    Product: [],
    aProduct:[]
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_PRODUCT_REQUEST':
            return { ...state, loading: true, error: null }
        case 'GET_PRODUCT_SUCCESS':
            return {
                ...state,
                loading: false,
                isSuccess: true,
                error: null,
                Product: action.payload.product
            }
        case 'GET_PRODUCT_FAILURE':
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        case 'GET_PRODUCT_BY_ID_REQUEST':
            return { ...state, loading: true, error: null }
        case 'GET_PRODUCT_BY_ID_SUCCESS':
            return {
                ...state,
                loading: false,
                isSuccess: true,
                error: null,
                aProduct: action.payload.product
            }
        case 'GET_PRODUCT_BY_ID_FAILURE':
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        case 'ADD_PRODUCT_IN_WISHLIST_REQUEST':
            return { ...state, loading: true, error: null }
        case 'ADD_PRODUCT_IN_WISHLIST_SUCCESS':
            return {
                ...state,
                loading: false,
                isSuccess: true,
                error: null,
            }
        case 'ADD_PRODUCT_IN_WISHLIST_FAILURE':
            return {
                ...state,
                error: action.payload,
                loading: false,
            }

        case 'PRODUCT_RESET_STATE':
            return {
                ...state,
                error: null,
                loading: false,
                isSuccess: false,
            }
        default:
            return state
    }
}

export default productReducer

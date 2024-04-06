const initialState = {
    loading: false,
    error: null,
    isSuccess: false,
    isVerified:false
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'BLOCK_USER_REQUEST':
            return { ...state, loading: true, error: null }
        case 'BLOCK_USER_SUCCESS':
            return {
                ...state,
                loading: false,
                Enquiry: action.payload.Enquiry,
                error: null,
            }
        case 'BLOCK_USER_FAILURE':
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
       
        case 'UNBLOCK_USER_REQUEST':
            return { ...state, loading: true, error: null }
        case 'UNBLOCK_USER_SUCCESS':
            return {
                ...state,
                loading: false,
                error: null,
                isSuccess: true,
            }
        case 'UNBLOCK_USER_FAILURE':
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        case 'VERIFY_OTP_REQUEST':
            return { ...state, loading: true, error: null }
        case 'VERIFY_OTP_SUCCESS':
            return {
                ...state,
                loading: false,
                isVerified: action.payload.verify,
                error: null,
            }
        case 'VERIFY_OTP_FAILURE':
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        case 'RESET_USER_STATE':
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

export default userReducer

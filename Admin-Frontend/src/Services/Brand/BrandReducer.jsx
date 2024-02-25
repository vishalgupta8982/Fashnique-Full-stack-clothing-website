
const initialState = {
    loading: false,
    error: null,
    isSuccess: false,
    brand: null
};

const brandReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_BRAND_REQUEST":
            return { ...state, loading: true, error: null };
        case 'ADD_BRAND_SUCCESS':
            return {
                ...state,
                loading: false,
                error: null,
                isSuccess: true
            };
        case 'ADD_BRAND_FAILURE':
            return {
                ...state,
                error: action.payload,
                loading: false,
                isSuccess: false
            };
        case "GET_BRAND_REQUEST":
            return { ...state, loading: true, error: null };
        case 'GET_BRAND_SUCCESS':
            return {
                ...state,
                loading: false,
                brand: action.payload.brand,
                error: null,

            };
        case 'GET_BRAND_FAILURE':
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case "DELETE_BRAND_REQUEST":
            return { ...state, loading: true, error: null };
        case 'DELETE_BRAND_SUCCESS':
            return {
                ...state,
                loading: false,
                error: null,
                isSuccess: true,
            };
        case 'DELETE_BRAND_FAILURE':
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case "GET_A_BRAND_REQUEST":
            return { ...state, loading: true, error: null };
        case 'GET_A_BRAND_SUCCESS':
            return {
                ...state,
                loading: false,
                brand: action.payload.brand,
                error: null,

            };
        case 'GET_A_BRAND_FAILURE':
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case "UPDATE_BRAND_REQUEST":
            return { ...state, loading: true, error: null };
        case 'UPDATE_BRAND_SUCCESS':
            return {
                ...state,
                loading: false,
                error: null,
                isSuccess: true

            };
        case 'UPDATE_BRAND_FAILURE':
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case 'RESET_BRAND_STATE':
            return {
                ...state,
                error: null,
                loading: false,
                isSuccess: false
            };
        default:
            return state;
    }
};

export default brandReducer;

const initialState = {
    loading: false,
    error: null,
    isSuccess: false,
    productCategory: null
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_CATEGORY_REQUEST":
            return { ...state, loading: true, error: null };
        case 'ADD_CATEGORY_SUCCESS':
            return {
                ...state,
                loading: false,
                error: null,
                isSuccess: true
            };
        case 'ADD_CATEGORY_FAILURE':
            return {
                ...state,
                error: action.payload,
                loading: false,
                isSuccess: false
            };
        case "GET_CATEGORY_REQUEST":
            return { ...state, loading: true, error: null };
        case 'GET_CATEGORY_SUCCESS':
            return {
                ...state,
                loading: false,
                productCategory: action.payload.productCategory,
                error: null,

            };
        case 'GET_CATEGORY_FAILURE':
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case "DELETE_CATEGORY_REQUEST":
            return { ...state, loading: true, error: null };
        case 'DELETE_CATEGORY_SUCCESS':
            return {
                ...state,
                loading: false,
                error: null,
                isSuccess: true,
            };
        case 'DELETE_CATEGORY_FAILURE':
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case "GETA_CATEGORY_REQUEST":
            return { ...state, loading: true, error: null };
        case 'GETA_CATEGORY_SUCCESS':
            return {
                ...state,
                loading: false,
                productCategory: action.payload.productCategory,
                error: null,

            };
        case 'GETA_CATEGORY_FAILURE':
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case "UPDATE_CATEGORY_REQUEST":
            return { ...state, loading: true, error: null };
        case 'UPDATE_CATEGORY_SUCCESS':
            return {
                ...state,
                loading: false,
                error: null,
                isSuccess: true

            };
        case 'UPDATE_CATEGORY_FAILURE':
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case 'RESET_CATEGORY_STATE':
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

export default categoryReducer;
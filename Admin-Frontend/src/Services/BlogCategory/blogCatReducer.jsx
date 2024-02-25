
const initialState = {
    loading: false,
    error: null,
    isSuccess: false,
    blogCategory:null
};

const blogCatReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_BLOG_CATEGORY_REQUEST":
            return { ...state, loading: true, error: null };
        case 'ADD_BLOG_CATEGORY_SUCCESS':
            return {
                ...state,
                loading: false,
                error: null,
                isSuccess: true
            };
        case 'ADD_BLOG_CATEGORY_FAILURE':
            return {
                ...state,
                error: action.payload,
                loading: false,
                isSuccess:false
            };
        case "GET_BLOG_CATEGORY_REQUEST":
            return { ...state, loading: true, error: null };
        case 'GET_BLOG_CATEGORY_SUCCESS':
            return {
                ...state,
                loading: false,
                blogCategory:action.payload.Category,
                error: null,
                
            };
        case 'GET_BLOG_CATEGORY_FAILURE':
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case "DELETE_BLOG_CATEGORY_REQUEST":
            return { ...state, loading: true, error: null };
        case 'DELETE_BLOG_CATEGORY_SUCCESS':
            return {
                ...state,
                loading: false,
                error: null,
                isSuccess: true,
            };
        case 'DELETE_BLOG_CATEGORY_FAILURE':
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case "GETA_BLOG_CATEGORY_REQUEST":
            return { ...state, loading: true, error: null };
        case 'GETA_BLOG_CATEGORY_SUCCESS':
            return {
                ...state,
                loading: false,
                blogCategory: action.payload.Category,
                error: null,

            };
        case 'GETA_BLOG_CATEGORY_FAILURE':
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case "UPDATE_BLOG_CATEGORY_REQUEST":
            return { ...state, loading: true, error: null };
        case 'UPDATE_BLOG_CATEGORY_SUCCESS':
            return {
                ...state,
                loading: false,
                error: null,
                isSuccess:true

            };
        case 'UPDATE_BLOG_CATEGORY_FAILURE':
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case 'RESET_BLOG_CATEGORY_STATE':
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

export default blogCatReducer;
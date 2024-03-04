const initialState = {
  loading: false,
  error: null,
  isSuccess: false,
  Blog: null,
  aBlog: null,
}

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_BLOG_REQUEST':
      return { ...state, loading: true, error: null }
    case 'ADD_BLOG_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        isSuccess: true,
      }
    case 'ADD_BLOG_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
        isSuccess: false,
      }
    case 'GET_BLOG_REQUEST':
      return { ...state, loading: true, error: null }
    case 'GET_BLOG_SUCCESS':
      return {
        ...state,
        loading: false,
        Blog: action.payload.Blog,
        error: null,
      }
    case 'GET_BLOG_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'DELETE_BLOG_REQUEST':
      return { ...state, loading: true, error: null }
    case 'DELETE_BLOG_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        isSuccess: true,
      }
    case 'DELETE_BLOG_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'GETA_BLOG_REQUEST':
      return { ...state, loading: true, error: null }
    case 'GETA_BLOG_SUCCESS':
      return {
        ...state,
        loading: false,
        aBlog: action.payload.Blog,
        error: null,
      }
    case 'GETA_BLOG_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'UPDATE_BLOG_REQUEST':
      return { ...state, loading: true, error: null }
    case 'UPDATE_BLOG_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        isSuccess: true,
      }
    case 'UPDATE_BLOG_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'RESET_BLOG_STATE':
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

export default blogReducer

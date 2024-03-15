const initialState = {
  loading: false,
  error: null,
  isSuccess: false,
  Blog: null,
  aBlog: null,
}

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
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
    case 'GETA_BLOG_REQUEST':
      return { ...state, loading: true, error: null }
    case 'GETA_BLOG_SUCCESS':
      return {
        ...state,
        loading: false,
        aBlog: action.payload.Blog,
        isSuccess: true,
        error: null,
      }
    case 'GETA_BLOG_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'LIKE_BLOG_REQUEST':
      return { ...state, loading: true, error: null }
    case 'LIKE_BLOG_SUCCESS':
      return {
        ...state,
        loading: false,
        isSuccess: true,
        error: null,
      }
    case 'LIKE_BLOG_FAILURE':
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
        aBlog: null,
      }
    default:
      return state
  }
}

export default blogReducer

const initialState = {
  loading: false,
  error: null,
  isSuccess: false,
  Color: null,
  aColor: null,
}

const colorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_COLOR_REQUEST':
      return { ...state, loading: true, error: null }
    case 'ADD_COLOR_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        isSuccess: true,
      }
    case 'ADD_COLOR_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
        isSuccess: false,
      }
    case 'GET_COLOR_REQUEST':
      return { ...state, loading: true, error: null }
    case 'GET_COLOR_SUCCESS':
      return {
        ...state,
        loading: false,
        Color: action.payload.Color,
        error: null,
      }
    case 'GET_COLOR_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'DELETE_COLOR_REQUEST':
      return { ...state, loading: true, error: null }
    case 'DELETE_COLOR_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        isSuccess: true,
      }
    case 'DELETE_COLOR_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'GETA_COLOR_REQUEST':
      return { ...state, loading: true, error: null }
    case 'GETA_COLOR_SUCCESS':
      return {
        ...state,
        loading: false,
        aColor: action.payload.Color,
        error: null,
      }
    case 'GETA_COLOR_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'UPDATE_COLOR_REQUEST':
      return { ...state, loading: true, error: null }
    case 'UPDATE_COLOR_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        isSuccess: true,
      }
    case 'UPDATE_COLOR_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'RESET_COLOR_STATE':
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

export default colorReducer
